const CONFIG = {
  businessName: "El Trensito",
  locationLabel: "Tartagal, Salta",
  whatsappNumber: "5493873687359", // +54 9 3873 687359 (código de país + área + número, solo dígitos)
  deliveryFee: 0, // 0 = se confirma por WhatsApp; si tenés costo fijo, ponelo en pesos
  instagramUrl: "",
  facebookUrl: "",
  tiktokUrl: "",
  mapsUrl: "",
  heroImage: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=1100&q=85",
  storyImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
  storyText: "Lomitos bien cargados, pizzas, milanesas y bebidas bien frías. Armá tu pedido, ponele los aderezos que te gusten y lo arreglamos por WhatsApp.",
  sauces: [
    { id: "mayonesa", name: "Mayonesa", price: 0 },
    { id: "mayonesa-apio", name: "Mayonesa de apio", price: 0 },
    { id: "ketchup", name: "Ketchup", price: 0 },
    { id: "mostaza", name: "Mostaza", price: 0 },
    { id: "salsa-golf", name: "Salsa golf", price: 0 },
    { id: "criolla", name: "Salsa criolla", price: 0 },
    { id: "cheddar", name: "Queso cheddar", price: 500 },
    { id: "barbacoa", name: "Barbacoa", price: 300 }
  ],
  products: [
    { id: "sandwich-milanesa", singular: "sandwich de milanesa", plural: "sandwiches de milanesa", category: "Sandwiches", name: "Sandwich de milanesa", description: "Milanesa, lechuga, tomate y pan tostado. Personalizalo con tus aderezos.", price: 6500, tag: "Favorito", image: "https://www.clarin.com/img/2021/09/06/ZUZbnAZNY_1256x620__2.jpg#1654906764352", imageAlt: "Sandwich abundante" },
    { id: "lomito", singular: "lomito", plural: "lomitos", category: "Sandwiches", name: "Lomito completo", description: "Carne, jamón, queso, huevo y verduras frescas.", price: 7800, tag: "Completo", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80", imageAlt: "Hamburguesa o sandwich completo" },
    { id: "hamburguesa", singular: "hamburguesa especial", plural: "hamburguesas especiales", category: "Sandwiches", name: "Hamburguesa especial", description: "Carne, queso, lechuga, tomate y salsa a elección.", price: 6000, tag: "", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80", imageAlt: "Hamburguesa con queso" },
    { id: "pizza-muzza", singular: "pizza muzzarella", plural: "pizzas muzzarella", category: "Pizzas", name: "Pizza muzzarella", description: "Salsa de tomate, muzzarella y aceitunas.", price: 8500, tag: "Para compartir", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80", imageAlt: "Pizza de muzzarella" },
    { id: "pizza-napolitana", singular: "pizza napolitana", plural: "pizzas napolitanas", category: "Pizzas", name: "Pizza napolitana", description: "Muzzarella, tomate, ajo y orégano.", price: 9500, tag: "", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80", imageAlt: "Pizza napolitana" },
    { id: "milanesa-plato", singular: "milanesa con papas", plural: "milanesas con papas", category: "Al plato", name: "Milanesa con papas", description: "Milanesa dorada con una porción de papas fritas.", price: 8000, tag: "Abundante", image: "https://images.unsplash.com/photo-1639744091984-5a3d4d8b5d67?auto=format&fit=crop&w=700&q=80", imageAlt: "Milanesa con guarnición" },
    { id: "napolitana-plato", singular: "milanesa napolitana", plural: "milanesas napolitanas", category: "Al plato", name: "Milanesa napolitana", description: "Con salsa, jamón, queso y guarnición a elección.", price: 9200, tag: "", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80", imageAlt: "Comida al plato" },
    { id: "gaseosa-cola", singular: "gaseosa cola", plural: "gaseosas cola", category: "Bebidas", name: "Gaseosa cola", description: "Elegí tamaño y presentación al confirmar el pedido.", price: 2500, tag: "Bien fría", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80", imageAlt: "Vaso de bebida cola" },
    { id: "gaseosa-lima", singular: "gaseosa lima-limón", plural: "gaseosas lima-limón", category: "Bebidas", name: "Gaseosa lima-limón", description: "Ideal para acompañar tu comida.", price: 2300, tag: "", image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80", imageAlt: "Bebida refrescante" }
  ],
  priceNote: "", // ej: "Precio de ejemplo" mientras probás
  // EJEMPLOS: reemplazalos por las ofertas reales (o dejá [] para que diga "no hay ofertas")
  offers: [
    { title: "Combo lomito + gaseosa", text: "Lomito completo con una gaseosa cola bien fría.", price: 9500, until: "Todos los días" },
    { title: "2 pizzas muzzarella", text: "Dos pizzas para compartir.", price: 15500, until: "Martes y jueves" }
  ],
  // EJEMPLO: cambiá los horarios reales
  hours: [["Lunes a viernes", "19:00 a 00:00"], ["Sábados y domingos", "19:00 a 01:00"]],
  faq: [
    { q: "¿Cuánto sale el envío?", a: "Depende de la zona. Escribinos y te decimos al toque." },
    { q: "¿Cómo se paga?", a: "Eso lo arreglamos por WhatsApp cuando confirmamos tu pedido." },
    { q: "¿Cuánto tarda?", a: "Depende de cuánta gente haya pidiendo. Preguntanos y te damos un tiempo real." },
    { q: "¿Dónde están?", a: "Estamos en Tartagal, Salta. Escribinos y te pasamos la ubicación exacta." }
  ]
};
