import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://walidsardib.es',
  // La antigua página de trabajos ahora es /servicios
  redirects: {
    '/trabajos': '/servicios',
    // El caso de estudio del TFG se integró en la página de LaRue3x3
    '/projects/federacion': '/larue3x3',
  },
});
