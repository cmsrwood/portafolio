export type Site = 'home' | 'portafolio'

const PROD: Record<Site, string> = {
  home: 'https://dilanlopez.com',
  portafolio: 'https://portafolio.dilanlopez.com',
}

const DEV_PORT: Record<Site, number> = {
  home: 5180,
  portafolio: 5181,
}

/** URL del otro sitio: en producción usa los dominios reales; en local, el puerto de cada app. */
export function siteUrl(site: Site): string {
  const host = window.location.hostname
  if (host === 'dilanlopez.com' || host.endsWith('.dilanlopez.com')) return PROD[site]
  return `${window.location.protocol}//${host}:${DEV_PORT[site]}`
}

export const CONTACT = {
  email: 'dilanfantas@gmail.com',
  github: 'https://github.com/cmsrwood',
}

export function vibrate(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    // iOS no lo soporta
  }
}

export { Lamp, Dymo, Screws } from './parts'
