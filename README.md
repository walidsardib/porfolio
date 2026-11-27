# walidsardib.es

Portfolio personal de **Walid Sardi Boukhari**, desarrollador full-stack en Zaragoza. Reúne mi producto propio, [LaRue3x3](https://larue3x3.walidsardib.es), las webs que he hecho para negocios, mis servicios y mi CV, en español e inglés.

**[Ver la web](https://walidsardib.es)** · **[English version](https://walidsardib.es/en/)**

[![Portfolio de Walid Sardi Boukhari](https://walidsardib.es/og.png)](https://walidsardib.es)

## Qué incluye

- **Caso de estudio de LaRue3x3**, con un recorrido animado por scroll que sigue una canasta desde la mesa de anotación hasta la grada. La escena está hecha en SVG, sin librerías de animación ([`CourtTour.astro`](src/components/CourtTour.astro)).
- **Trabajos para clientes**: [Tacos Street](https://tacosstreet.es), [ZazaStop](https://zazastop.walidsardib.es) y [Gabriel's Barber & Gallery](https://barberiagabriel.walidsardib.es).
- **Web bilingüe** (español e inglés), con selector de idioma.
- **SEO**: URLs canónicas, `hreflang`, Open Graph, datos estructurados JSON-LD y sitemap.
- **Animaciones ligadas al scroll** que respetan la preferencia de movimiento reducido (`prefers-reduced-motion`).
- **Formulario de contacto** con validación propia, campo trampa contra bots y envío mediante Web3Forms.
- **CV descargable** en los dos idiomas.

## Tecnologías

- [Astro 4](https://astro.build) para generar el sitio estático
- HTML, CSS y JavaScript, sin frameworks de interfaz
- SVG para las escenas animadas

La única dependencia del proyecto es Astro.

## Desarrollo

Requiere Node.js 20 o superior (ver [`.nvmrc`](.nvmrc)).

```bash
git clone https://github.com/walidsardib/porfolio.git
cd porfolio
npm install
npm run dev        # http://localhost:4321
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run preview` | Sirve en local la versión generada |

## Estructura

```
src/
├── pages/         Páginas en español; las versiones en inglés, en pages/en/
├── components/    Layout común y recorrido animado de LaRue3x3
├── data/          Proyectos propios y trabajos para clientes
└── *.css          Estilos
public/            Imágenes, vídeos, PDF del CV y scripts
cv/                Fuente HTML del CV
og/                Plantillas de las imágenes para compartir
```

Cómo regenerar los [PDF del CV](cv/README.md) y las [imágenes Open Graph](og/README.md).

## Contacto

[walidsardib.es](https://walidsardib.es) · [GitHub](https://github.com/walidsardib) · [LinkedIn](https://www.linkedin.com/in/walid-sardi-740619304/)
