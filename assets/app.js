"use strict";
    let selectedProduct = null;
    let selectedQuantity = 1;
    let selectedSauces = new Set();
    let activeCategory = document.body.dataset.category || "Todos";

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    function formatPrice(value) {
      return new Intl.NumberFormat("es-AR", {
        style: "currency", currency: "ARS", maximumFractionDigits: 0
      }).format(value);
    }

    function showToast(message) {
      const toast = $("#toast");
      toast.textContent = message;
      toast.classList.add("show");
      window.clearTimeout(showToast.timer);
      showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3400);
    }

    function whatsappUrl(message) {
      const number = String(CONFIG.whatsappNumber || "").replace(/\D/g, "");
      if (!number) return null;
      return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    }

    function handleWhatsAppClick(event) {
      const link = event.currentTarget;
      const message = link.dataset.message || "Hola, quería hacer una consulta.";
      const url = whatsappUrl(message);
      if (!url) {
        event.preventDefault();
        showToast("Falta configurar el número de WhatsApp.");
        return;
      }
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    /* Ventana para personalizar cada producto */
    function openModal(product) {
      selectedProduct = product;
      selectedQuantity = 1;
      selectedSauces = new Set();
      $("#orderNotes").value = "";
      $("#modalImg").src = product.image;
      $("#modalImg").alt = product.name;
      $("#modalTitle").textContent = product.name;
      $("#modalDesc").textContent = product.description || "Elegí la cantidad y los extras para tu pedido.";
      $("#deliveryCostText").textContent = CONFIG.deliveryFee > 0 ? formatPrice(CONFIG.deliveryFee) : "A confirmar";
      $("#customizeSection").hidden = product.category === "Bebidas";
      $("#productModal .modal-scroll").scrollTop = 0;
      renderSauces();
      updateModalValues();
      const modal = $("#productModal");
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      const modal = $("#productModal");
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    function renderSauces() {
      const box = $("#sauceOptions");
      box.replaceChildren();
      CONFIG.sauces.forEach(sauce => {
        const label = document.createElement("label");
        label.className = "sauce-option";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = sauce.id;
        checkbox.checked = selectedSauces.has(sauce.id);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) selectedSauces.add(sauce.id);
          else selectedSauces.delete(sauce.id);
          updateModalValues();
        });
        const name = document.createElement("span");
        name.textContent = sauce.name;
        const price = document.createElement("small");
        price.textContent = sauce.price > 0 ? `+${formatPrice(sauce.price)}` : "Incluido";
        label.append(checkbox, name, price);
        box.append(label);
      });
    }

    function selectedSauceItems() {
      return CONFIG.sauces.filter(sauce => selectedSauces.has(sauce.id));
    }

    function updateModalValues() {
      if (!selectedProduct) return;
      $("#qtyVal").textContent = selectedQuantity;
      const extrasPerUnit = selectedSauceItems().reduce((sum, sauce) => sum + sauce.price, 0);
      const subtotal = (selectedProduct.price + extrasPerUnit) * selectedQuantity;
      const total = subtotal + CONFIG.deliveryFee;
      $("#modalTotalPrice").textContent = formatPrice(total);
    }

    $("#btnMinus")?.addEventListener("click", () => {
      if (selectedQuantity > 1) {
        selectedQuantity--;
        updateModalValues();
      }
    });

    $("#btnPlus")?.addEventListener("click", () => {
      selectedQuantity++;
      updateModalValues();
    });

    $("#modalClose")?.addEventListener("click", closeModal);
    $("#productModal")?.addEventListener("click", (e) => {
      if (e.target === $("#productModal")) closeModal();
    });
    function joinWithY(items) {
      if (items.length <= 1) return items.join("");
      return items.slice(0, -1).join(", ") + " y " + items[items.length - 1];
    }

    function buildOrderMessage() {
      const qty = selectedQuantity;
      const p = selectedProduct;
      const label = qty === 1
        ? (p.singular || p.name.toLowerCase())
        : (p.plural || p.name.toLowerCase());
      const sauces = p.category === "Bebidas" ? [] : selectedSauceItems().map(s => s.name.toLowerCase());
      const notes = $("#orderNotes").value.trim();
      let text = `Hola buenas, queria pedir ${qty} ${label}`;
      if (sauces.length) text += ` ${qty === 1 ? "incluido" : "incluidos"} con ${joinWithY(sauces)}`;
      text += " porfavor";
      if (notes) text += `. Aclaraciones: ${notes}`;
      return text;
    }

    $("#btnSendOrder")?.addEventListener("click", () => {
      if (!selectedProduct) return;
      const url = whatsappUrl(buildOrderMessage());
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        closeModal();
      } else {
        showToast("Configurá el WhatsApp del negocio en CONFIG para habilitar los pedidos.");
      }
    });

    function renderCategoryFilters() {
      const container = $("#categoryFilters"); if (!container) return;
      container.replaceChildren();
      const categories = ["Todos", ...new Set(CONFIG.products.map(product => product.category).filter(Boolean))];
      categories.forEach(category => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `filter-chip${activeCategory === category ? " active" : ""}`;
        button.textContent = category;
        button.setAttribute("aria-pressed", String(activeCategory === category));
        button.addEventListener("click", () => {
          activeCategory = category;
          renderCategoryFilters();
          renderProducts();
        });
        container.append(button);
      });
    }

    function renderProducts() {
      const grid = $("#productGrid"); if (!grid) return;
      grid.replaceChildren();
      const products = CONFIG.products.filter(product => activeCategory === "Todos" || product.category === activeCategory).filter(p => !grid.dataset.featured || p.tag).slice(0, Number(grid.dataset.limit) || Infinity);
      products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.addEventListener("click", () => openModal(product));
        const imageWrap = document.createElement("div");
        imageWrap.className = "product-image";
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.imageAlt || product.name;
        image.loading = "lazy";
        image.decoding = "async";
        image.onerror = () => { image.removeAttribute("src"); imageWrap.style.background = "linear-gradient(135deg, #dce8d8, #7bad89)"; };
        imageWrap.append(image);
        if (product.tag) {
          const tag = document.createElement("span");
          tag.className = "product-tag";
          tag.textContent = product.tag;
          imageWrap.append(tag);
        }
        const body = document.createElement("div");
        body.className = "product-body";
        const title = document.createElement("h3");
        title.textContent = product.name;
        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description || "";
        const bottom = document.createElement("div");
        bottom.className = "product-bottom";
        const price = document.createElement("div");
        price.className = "price";
        price.textContent = formatPrice(product.price);
        const priceNote = document.createElement("span");
        priceNote.className = "price-note";
        if (CONFIG.priceNote) { priceNote.textContent = CONFIG.priceNote; price.append(priceNote); }
        const order = document.createElement("button");
        order.className = "order-btn";
        order.setAttribute("aria-label", `Personalizar y pedir ${product.name}`);
        order.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
        order.addEventListener("click", (e) => { e.stopPropagation(); openModal(product); });
        bottom.append(price, order);
        body.append(title, description, bottom);
        card.append(imageWrap, body);
        grid.append(card);
      });
    }

    function renderSocials() {
      const socials = [
        { label: "Instagram", url: CONFIG.instagramUrl, icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>' },
        { label: "Facebook", url: CONFIG.facebookUrl, icon: '<path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h1.7V1.4C18 1.2 16.8 1 15.4 1 12.4 1 10.5 2.8 10.5 6v3H7v4h3.5v8Z"/>' },
        { label: "TikTok", url: CONFIG.tiktokUrl, icon: '<path d="M14 4v10.5a4.5 4.5 0 1 1-4-4.47"/><path d="M14 4c.8 2.7 2.5 4.2 5 4.5"/>' }
      ];
      const container = $("#socialLinks"); if (!container) return;
      container.replaceChildren();
      socials.filter(item => /^https:\/\/(www\.)?(instagram\.com|facebook\.com|tiktok\.com)\//i.test(item.url)).forEach(item => {
        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${item.icon}</svg>`;
        const label = document.createElement("span");
        label.textContent = item.label;
        link.append(label);
        container.append(link);
      });
      container.hidden = container.children.length === 0;
    }

    const mobileNav = $("#mobileNav");
    const backdrop = $("#navBackdrop");
    const menuOpen = $("#menuOpen");
    function setMenu(open) {
      mobileNav.classList.toggle("open", open);
      backdrop.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      mobileNav.setAttribute("aria-hidden", String(!open));
      backdrop.setAttribute("aria-hidden", String(!open));
      menuOpen.setAttribute("aria-expanded", String(open));
      if (open) $("#menuClose").focus();
      else menuOpen.focus();
    }
    menuOpen.addEventListener("click", () => setMenu(true));
    $("#menuClose").addEventListener("click", () => setMenu(false)); backdrop.addEventListener("click", () => setMenu(false)); $$(".mobile-nav a").forEach(link => link.addEventListener("click", () => {
      if(link.id !== "mobileNavLocation") setMenu(false);
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        if (mobileNav.classList.contains("open")) setMenu(false);
        closeModal();
        
      }
    });

function renderOffers() {
  const box = $("#offersList"); if (!box) return;
  box.replaceChildren();
  if (!CONFIG.offers.length) {
    const p = document.createElement("p"); p.className = "empty-note";
    p.textContent = "Hoy no hay ofertas cargadas. Escribinos y te contamos qué hay.";
    box.append(p); return;
  }
  CONFIG.offers.forEach(o => {
    const card = document.createElement("article"); card.className = "offer-card";
    const h = document.createElement("h3"); h.textContent = o.title;
    const p = document.createElement("p"); p.textContent = o.text;
    const price = document.createElement("div"); price.className = "offer-price"; price.textContent = formatPrice(o.price);
    const until = document.createElement("span"); until.textContent = o.until || "";
    const btn = document.createElement("a"); btn.className = "btn btn-primary whatsapp-link"; btn.href = "/contacto/";
    btn.dataset.message = "Hola, quiero la oferta: " + o.title; btn.textContent = "Pedir esta oferta";
    card.append(h, p, price, until, btn); box.append(card);
  });
}

function renderFaq() {
  const box = $("#faqList"); if (!box) return;
  box.replaceChildren();
  CONFIG.faq.forEach(f => {
    const item = document.createElement("div"); item.className = "faq-item";
    const h = document.createElement("h3"); h.textContent = f.q;
    const p = document.createElement("p"); p.textContent = f.a;
    item.append(h, p); box.append(item);
  });
}

function renderHours() {
  const list = $("#hoursList"); if (!list) return;
  list.replaceChildren();
  CONFIG.hours.forEach(([day, time]) => {
    const li = document.createElement("li");
    const s = document.createElement("span"); s.textContent = day;
    const b = document.createElement("strong"); b.textContent = time;
    li.append(s, b); list.append(li);
  });
}

function configureBusiness() {
  $$("[data-business-name]").forEach(el => el.textContent = CONFIG.businessName);
  $$("[data-config]").forEach(el => { el.textContent = CONFIG[el.dataset.config] || el.textContent; });
  $$("img[data-img]").forEach(img => { if (CONFIG[img.dataset.img]) img.src = CONFIG[img.dataset.img]; });
  $$("[data-maps]").forEach(a => {
    if (CONFIG.mapsUrl) { a.href = CONFIG.mapsUrl; a.target = "_blank"; a.rel = "noopener noreferrer"; a.hidden = false; }
  });
  renderOffers(); renderFaq(); renderHours();
  renderCategoryFilters(); renderProducts(); renderSocials();
  $$(".whatsapp-link").forEach(link => link.addEventListener("click", handleWhatsAppClick));
  const float = $(".whatsapp-float"); if (float) float.hidden = !CONFIG.whatsappNumber;
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
}
configureBusiness();
