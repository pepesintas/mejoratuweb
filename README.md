# Mejora tu web

Herramientas gratuitas y guías en español sobre por qué un negocio pequeño
no aparece en internet.

**En producción:** https://mejoratuweb.world

## Qué hay aquí

| | |
|---|---|
| `index.html` | El auditor de visibilidad, que es la portada |
| `presupuesto.html` | Calculadora de precio de una web |
| `blog/` | Índice y cinco artículos |
| `sobre-mi.html` `contacto.html` `gracias.html` | Páginas del sitio |
| `aviso-legal.html` · `politica-de-privacidad.html` · `politica-de-cookies.html` | Obligatorias por LSSI y RGPD |
| `estilo.css` | El sistema visual de todo el sitio, en un solo archivo |
| `ambiente.js` | Apariciones al hacer scroll (menos de 1 KB) |
| `netlify/functions/auditar.js` | El servidor del auditor |
| `img/logo.png` | **Sustituir por el logo real** |

## Cómo se despliega

Netlify está conectado a este repositorio. **Cada cambio en `main` se publica
solo**, sin arrastrar nada.

La función de `netlify/functions/` se sirve en `/api/auditar` y la detecta
`netlify.toml`.

## Lo que falta por rellenar

Busca `[` en cualquier archivo. Son los datos personales: nombre, zona,
correo, y el NIF y domicilio que exige el artículo 10 de la LSSI en las
páginas legales.

## Cómo funciona el auditor

1. El navegador pide `/api/auditar?url=…`
2. La función descarga esa página, más `robots.txt`, `sitemap.xml` y `llms.txt`
3. Devuelve el HTML y el navegador hace unas 31 comprobaciones en cuatro
   bloques: lo que mira Google, presencia como negocio local, cómo se ve el
   enlace al compartirlo, y si la puede leer la inteligencia artificial

La función es un endpoint público que descarga la URL que le pidas, así que
bloquea direcciones internas y limita tamaño y tiempo. **Esas comprobaciones
no se quitan.**
