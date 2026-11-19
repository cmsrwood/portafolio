# portafolio — cmsrwood

Portafolio personal de **Dilan** (`cmsrwood`) — Desarrollador Web Full Stack en Bogotá, Colombia. Muestra proyectos, stack tecnológico, servicios y repositorios de GitHub en tiempo real.

## Stack

- Astro 5 (SSG, build estático)
- Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- DaisyUI v5 (tema `night`, override a fondo negro `#06060a`)
- Axios (fetch de repos GitHub en build time)

## Variables de entorno

```bash
# .env.local (no commitear)
GITHUB_TOKEN=ghp_...   # PAT de GitHub con scope public_repo — para el fetch de repos en build
```

Sin `GITHUB_TOKEN` el build funciona igual — la sección de repos queda vacía (try/catch protegido).

## Comandos

```bash
npm install         # instalar dependencias
npm run dev         # servidor de desarrollo en localhost:4321
npm run build       # genera dist/ (incluye sitemap-index.xml)
npm run preview     # previsualizar el build localmente
```

## Estructura

```
src/
  pages/
    index.astro     # página única: navbar, hero, skills, proyectos, repos, servicios, contacto
  css/
    styles.css      # sistema de diseño completo (glassmorphism, gradientes, dark theme)
public/
  robots.txt        # apunta al sitemap
  favicon.svg
dist/               # build estático con sitemap
astro.config.mjs    # integra @astrojs/sitemap, @tailwindcss/vite, site URL
```

## Secciones del sitio

- **Navbar** — glassmorphism fijo, links de navegación
- **Hero** — nombre con gradiente, badge "disponible", tech pills, CTAs, link a nuatalker.com
- **Stack** — grid de categorías (Frontend, Backend, Cloud & AWS, Herramientas)
- **Proyectos destacados** — IU Digital Virtual Agent, Landing Pages Bogotá
- **Repos GitHub** — fetch en build time desde la API de GitHub (público, no forks)
- **Servicios** — Landing Pages, Desarrollo Web, Soluciones AWS
- **Contacto** — email + GitHub

## Deploy (AWS Amplify)

- Conectado a `github.com/cmsrwood/portafolio`
- Build command: `npm run build`
- Output directory: `dist`
- Env var `GITHUB_TOKEN` configurada en Amplify console
- Cuando tengas dominio: actualizar `site:` en `astro.config.mjs` y `Sitemap:` en `public/robots.txt`

## SEO

- JSON-LD `Person` schema con knowsAbout, email, sameAs GitHub
- Open Graph + Twitter Card
- Geo tags Bogotá, Colombia (`CO-DC`)
- Sitemap auto-generado por `@astrojs/sitemap`
- `robots.txt` con referencia al sitemap
