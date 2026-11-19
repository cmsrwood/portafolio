import { useRef, useState } from 'react'
import { CONTACT, Dymo, Lamp, Screws, vibrate } from '@dl/ui'

/*
  La página de inicio no lleva a ningún lado: cada enchufe muestra algo sobre Dilan
  en la pantalla del mismo panel.
*/
type Jack = {
  id: string
  label: string
  cable: string
  lines: string[]
}

const JACKS: Jack[] = [
  {
    id: 'hola',
    label: 'hola',
    cable: 'var(--color-cable-red)',
    lines: ['Soy Dilan López.', 'Desarrollador en Bogotá.', 'Me gusta construir cosas que hablan con la gente.'],
  },
  {
    id: 'trabajo',
    label: 'trabajo',
    cable: 'var(--color-cable-blue)',
    lines: [
      'En Nua Talker hago agentes virtuales',
      'que contestan llamadas y chats,',
      'y todo lo que los conecta: telefonía, CRM, reportes.',
    ],
  },
  {
    id: 'juegos',
    label: 'juegos',
    cable: 'var(--color-cable-mustard)',
    lines: ['Por gusto hago juegos.', 'Uno de terror espacial con una IA de compañía', 'y otro narrativo que pasa por Bogotá.'],
  },
  {
    id: 'contacto',
    label: 'contacto',
    cable: 'var(--color-cable-red)',
    lines: [CONTACT.email, 'github.com/cmsrwood'],
  },
]

type Patch = { id: string; d: string; color: string }

export default function App() {
  const panel = useRef<HTMLDivElement>(null)
  const plug = useRef<HTMLSpanElement>(null)
  const holes = useRef<Record<string, HTMLSpanElement | null>>({})
  const [patch, setPatch] = useState<Patch | null>(null)

  const connect = (jack: Jack) => {
    if (patch?.id === jack.id) {
      vibrate(8)
      setPatch(null)
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
    const d = `M ${px} ${py} C ${px} ${py - 60}, ${jx} ${jy + 90}, ${jx} ${jy}`

    vibrate(18)
    setPatch({ id: jack.id, d, color: jack.cable })
  }

  const active = JACKS.find((j) => j.id === patch?.id)

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))] md:grid md:max-w-5xl md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16 md:px-10">
      <div>
        <h1
          className="rise text-[clamp(4.5rem,24vw,7rem)] font-extrabold leading-[0.82] tracking-[-0.04em] md:text-[clamp(7rem,12vw,10.5rem)]"
          style={{ fontVariationSettings: '"wdth" 75' }}
        >
          Dilan
          <br />
          <span className="text-dim">López</span>
        </h1>
        <p className="rise mt-6 max-w-[21rem] text-[1.15rem] leading-relaxed text-dim" style={{ animationDelay: '120ms' }}>
          Conecta un cable para saber un poco más de mí.
        </p>
      </div>

      <div className="mt-auto pt-10 md:mt-0 md:pt-0">
        <div
          ref={panel}
          className="rise relative rounded-[1.4rem] border border-edge bg-panel-2 px-4 pb-16 pt-6 shadow-[inset_0_1px_0_rgb(255_255_255/.04),0_30px_60px_-24px_rgb(0_0_0/.9)]"
          style={{ animationDelay: '240ms' }}
        >
          <Screws />

          {/* pantalla */}
          <div
            aria-live="polite"
            className="mx-1 mb-6 min-h-[8.5rem] rounded-xl border border-black/60 bg-[#07090c] px-4 py-3.5 shadow-[inset_0_2px_10px_rgb(0_0_0/.8)]"
          >
            {active ? (
              <div key={active.id} className="screen-in space-y-1 text-[0.98rem] leading-snug text-lamp">
                {active.lines.map((l) => (
                  <p key={l} className={l.includes('@') || l.startsWith('github') ? 'select-all' : ''}>
                    {l}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[0.98rem] text-dim/70">
                sin señal
                <span className="blink ml-0.5 inline-block w-2 text-lamp">_</span>
              </p>
            )}
          </div>

          <ul className="grid grid-cols-4 gap-1">
            {JACKS.map((j) => {
              const live = patch?.id === j.id
              return (
                <li key={j.id}>
                  <button
                    type="button"
                    onClick={() => connect(j)}
                    aria-pressed={live}
                    className="group flex w-full cursor-pointer flex-col items-center gap-2.5 py-1"
                  >
                    <Lamp on={live} />
                    <span
                      ref={(el) => {
                        holes.current[j.id] = el
                      }}
                      className="grid size-12 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#f4f6f9,#c3c9d2_40%,#6b717c)] shadow-[0_2px_4px_rgb(0_0_0/.7)] transition-transform group-active:scale-95"
                    >
                      <span className="size-6 rounded-full bg-[#050608] shadow-[inset_0_3px_5px_rgb(0_0_0/.95)]" />
                    </span>
                    <Dymo>{j.label}</Dymo>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* clavija de donde sale el cable */}
          <span
            ref={plug}
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-9 w-5 -translate-x-1/2 rounded-t-md bg-[linear-gradient(90deg,#2a2d33,#4a4f58_45%,#1f2227)] shadow-[0_-2px_4px_rgb(0_0_0/.5)]"
          >
            <span className="absolute -top-2.5 left-1/2 h-3 w-1.5 -translate-x-1/2 rounded-t-sm bg-[#c3c9d2]" />
          </span>

          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {patch && (
              <g key={patch.id}>
                <path d={patch.d} pathLength={1} className="cable" style={{ ['--len' as string]: 1 }} fill="none" stroke="rgb(0 0 0 / .5)" strokeWidth={9} strokeLinecap="round" transform="translate(1 3)" />
                <path d={patch.d} pathLength={1} className="cable" style={{ ['--len' as string]: 1 }} fill="none" stroke={patch.color} strokeWidth={7} strokeLinecap="round" />
                <path d={patch.d} pathLength={1} className="cable" style={{ ['--len' as string]: 1 }} fill="none" stroke="rgb(255 255 255 / .22)" strokeWidth={2} strokeLinecap="round" transform="translate(-1.5 -1.5)" />
              </g>
            )}
          </svg>
        </div>
      </div>
    </main>
  )
}
