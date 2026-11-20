# El Trensito (plantilla)

Sitio estático para Cloudflare Pages. Sin build: build command vacío, output directory `/`.

## Para un cliente nuevo
1. Copiá la carpeta y cambiá `assets/js/config.js` (nombre, WhatsApp, productos, ofertas, horarios, preguntas).
2. Buscá y reemplazá "El Trensito" en los `.html`, `site.webmanifest` y la URL en `sitemap.xml` / `robots.txt`.
3. Cambiá `favicon.svg` y los PNG (`favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`).
4. Poné fotos reales en `assets/img/` y apuntalas desde `config.js`.

## Cambios chicos (precios, textos, horarios)
Solo se edita `assets/js/config.js` y `git push`.

## Páginas
`/`, `/menu/`, `/sandwiches/`, `/pizzas/`, `/al-plato/`, `/bebidas/`, `/ofertas/`, `/preguntas-frecuentes/`, `/contacto/`, `404.html`.
Los links son absolutos (`/menu/`), así que probalo con `npx serve .` y no abriendo el archivo directo.
