# dilanlopez.com

Monorepo con los sitios de Dilan López. Usan Vite, React, TypeScript y Tailwind v4.

| App | Dominio | Qué es |
|---|---|---|
| `apps/home` | dilanlopez.com | Página de inicio: nombre y un conmutador telefónico que lleva a cada sitio |
| `apps/portafolio` | portafolio.dilanlopez.com | Proyectos, organizados como líneas de un conmutador |
| `packages/ui` | | Estilo compartido (colores, etiqueta Dymo, lámpara, tornillos) y utilidades |

## Comandos

```bash
npm install
npm run dev:home         # http://localhost:5180 (también visible en la red local)
npm run dev:portafolio   # http://localhost:5181
npm run build            # compila las dos apps
```

En local, los enlaces entre sitios apuntan a los puertos de cada app. En producción usan los dominios reales (`siteUrl` en `packages/ui`).

## Despliegue

En AWS Amplify hay una app por sitio, las dos conectadas a este repo como monorepo. `amplify.yml` define cada app con su `appRoot`.
