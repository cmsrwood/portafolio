import { useEffect, useRef, useState } from 'react'
import { CONTACT, Dymo, Lamp, Screws, siteUrl, vibrate } from '@dl/ui'

type Jack = {
  id: string
  label: string
  href?: () => string
  cable: string
  soon?: boolean
}

const JACKS: Jack[] = [
  { id: 'portafolio', label: 'portafolio', href: () => siteUrl('portafolio'), cable: 'var(--color-cable-red)' },
  { id: 'github', label: 'github', href: () => CONTACT.github, cable: 'var(--color-cable-blue)' },
  { id: 'correo', label: 'correo', href: () => `mailto:${CONTACT.email}`, cable: 'var(--color-cable-mustard)' },
  { id: 'cv', label: 'cv', cable: 'var(--color-cable-red)', soon: true },
  { id: 'juegos', label: 'juegos', cable: 'var(--color-cable-blue)', soon: true },
]

type Patch = { id: string; d: string; color: string; end: { x: number; y: number } }

export default function App() {
  const panel = useRef<HTMLDivElement>(null)
  const plug = useRef<HTMLSpanElement>(null)
  const holes = useRef<Record<string, HTMLSpanElement | null>>({})
  const [patch, setPatch] = useState<Patch | null>(null)
  const [blink, setBlink] = useState<string | null>(null)
  const [status, setStatus] = useState('')

  // Si vuelve con el botón atrás, el panel aparece desconectado otra vez
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setPatch(null)
        setStatus('')
      }
    }
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  const connect = (jack: Jack) => {
    if (jack.soon || !jack.href) {
      vibrate([10, 40, 10])
      setBlink(null)
      requestAnimationFrame(() => setBlink(jack.id))
      setStatus(`${jack.label}: todavía no está conectado. pronto.`)
      return
    }
    const box = panel.current?.getBoundingClientRect()
    const from = plug.current?.getBoundingClientRect()
    const to = holes.current[jack.id]?.getBoundingClientRect()
    if (!box || !from || !to) return

    const px = from.left + from.width / 2 - box.left
    const py = from.top - box.top + 4
    const jx = to.left + to.width / 2 - box.left
    const jy = to.top + to.height / 2 - box.top
    const d = `M ${px} ${py} C ${px} ${py - 70}, ${jx} ${jy + 110}, ${jx} ${jy}`

    vibrate(20)
    setPatch({ id: jack.id, d, color: jack.cable, end: { x: jx, y: jy } })
    setStatus(`conectando con ${jack.label}…`)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => {
      window.location.href = jack.href!()
    }, reduced ? 0 : 750)
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] md:grid md:max-w-5xl md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16 md:px-10">
      <div>
      <h1
        className="rise text-[clamp(4.5rem,24vw,7rem)] font-extrabold leading-[0.82] tracking-[-0.04em] md:text-[clamp(7rem,12vw,10.5rem)]"
        style={{ fontVariationSettings: '"wdth" 75' }}
      >
        Dilan
        <br />
        <span className="text-brass">López</span>
      </h1>

      <p className="rise mt-6 max-w-[21rem] text-[1.15rem] leading-relaxed text-dim" style={{ animationDelay: '120ms' }}>
        Programo agentes que contestan llamadas y chats, las integraciones que los conectan con todo lo demás y,
        cuando me queda tiempo, juegos. Vivo en Bogotá.
      </p>
      </div>

      <div className="mt-auto pt-10 md:mt-0 md:pt-0">
      <div
        ref={panel}
        className="rise relative rounded-[1.4rem] border border-edge bg-panel-2 px-4 pb-16 pt-8 shadow-[inset_0_1px_0_rgb(255_255_255/.05),0_24px_50px_-20px_rgb(0_0_0/.8)]"
        style={{ animationDelay: '240ms' }}
      >
        <Screws />

        <ul className="flex flex-wrap justify-center gap-y-7">
          {JACKS.map((j) => {
            const live = patch?.id === j.id
            return (
              <li key={j.id} className="w-1/3">
                <button
                  type="button"
                  onClick={() => connect(j)}
                  disabled={!!patch}
                  className="group flex w-full cursor-pointer flex-col items-center gap-2.5 py-1 disabled:cursor-default"
                  aria-label={j.soon ? `${j.label}, todavía no disponible` : `ir a ${j.label}`}
                >
                  <Lamp on={live} blinking={blink === j.id} />
                  <span
                    ref={(el) => {
                      holes.current[j.id] = el
                    }}
                    className="grid size-14 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#e1c587,var(--color-brass)_45%,var(--color-brass-dark))] shadow-[0_2px_3px_rgb(0_0_0/.6)] transition-transform group-active:scale-95"
                  >
                    <span className="size-7 rounded-full bg-[#0c0a09] shadow-[inset_0_3px_5px_rgb(0_0_0/.9)]" />
                  </span>
                  <Dymo black={j.soon} tilt={j.id.length % 2 ? -1.5 : 1}>
                    {j.label}
                  </Dymo>
                </button>
              </li>
            )
          })}
        </ul>

        {/* clavija en reposo, de donde sale el cable */}
        <span
          ref={plug}
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-9 w-5 -translate-x-1/2 rounded-t-md bg-[linear-gradient(90deg,#3a322b,#5a4c3f_45%,#2a241f)] shadow-[0_-2px_4px_rgb(0_0_0/.5)]"
        >
          <span className="absolute -top-2.5 left-1/2 h-3 w-1.5 -translate-x-1/2 rounded-t-sm bg-brass" />
        </span>

        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {patch && (
            <g>
              <path
                d={patch.d}
                pathLength={1}
                className="cable"
                style={{ ['--len' as string]: 1 }}
                fill="none"
                stroke="rgb(0 0 0 / .45)"
                strokeWidth={9}
                strokeLinecap="round"
                transform="translate(1 3)"
              />
              <path
                d={patch.d}
                pathLength={1}
                className="cable"
                style={{ ['--len' as string]: 1 }}
                fill="none"
                stroke={patch.color}
                strokeWidth={7}
                strokeLinecap="round"
              />
              <path
                d={patch.d}
                pathLength={1}
                className="cable"
                style={{ ['--len' as string]: 1 }}
                fill="none"
                stroke="rgb(255 255 255 / .16)"
                strokeWidth={2}
                strokeLinecap="round"
                transform="translate(-1.5 -1.5)"
              />
            </g>
          )}
        </svg>
      </div>

      <p aria-live="polite" className="mt-4 min-h-6 text-center text-sm text-dim">
        {status}
      </p>
      </div>
    </main>
  )
}
