import { useEffect, useRef, useState } from 'react'
import { vibrate } from '@dl/ui'

/*
  Milú y Body, los gatos de Dilan, asomados sobre el borde del escritorio.
  Siguen el dedo o el cursor con los ojos; si los tocas, dicen algo.
*/

type Point = { x: number; y: number } | null

const LINES: Record<'milu' | 'body', string[]> = {
  milu: [
    'ese escritorio es mío',
    '¿ya comiste? yo no',
    'deja de programar y acaríciame',
    'miau (traducción: hola)',
    'yo reviso el código. lo apruebo',
  ],
  body: [
    'yo solo vine a dormir en el teclado',
    '¿eso es un bug? lo puedo empujar de la mesa',
    'zzz',
    'Milú miente: el escritorio es mío',
    'no sé qué es AWS pero suena a comida',
  ],
}

function usePointer() {
  const [p, setP] = useState<Point>(null)
  useEffect(() => {
    const move = (e: PointerEvent) => setP({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', move)
    }
  }, [])
  return p
}

function useBlink(offset: number) {
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    let t: number
    const loop = () => {
      t = window.setTimeout(() => {
        setClosed(true)
        window.setTimeout(() => setClosed(false), 140)
        loop()
      }, 2800 + Math.random() * 3200 + offset)
    }
    loop()
    return () => window.clearTimeout(t)
  }, [offset])
  return closed
}

const VIEW_W = 160
const VIEW_H = 128

type CatProps = {
  name: 'milu' | 'body'
  pointer: Point
}

function Cat({ name, pointer }: CatProps) {
  const svg = useRef<SVGSVGElement>(null)
  const [happy, setHappy] = useState(false)
  const [said, setSaid] = useState<string | null>(null)
  const [count, setCount] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  const blink = useBlink(name === 'milu' ? 0 : 900)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Desplazamiento de las pupilas hacia el puntero
  const look = (cx: number, cy: number) => {
    const el = svg.current
    if (!el || !pointer) return { dx: 0, dy: 0 }
    const r = el.getBoundingClientRect()
    const sx = r.left + (cx / VIEW_W) * r.width
    const sy = r.top + (cy / VIEW_H) * r.height
    const ang = Math.atan2(pointer.y - sy, pointer.x - sx)
    const dist = Math.min(1, Math.hypot(pointer.x - sx, pointer.y - sy) / 220)
    return { dx: Math.cos(ang) * 3.6 * dist, dy: Math.sin(ang) * 3.2 * dist }
  }

  const tap = () => {
    vibrate(12)
    const lines = LINES[name]
    setSaid(lines[count % lines.length])
    setCount((c) => c + 1)
    setHappy(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setHappy(false)
      setSaid(null)
    }, 2600)
  }

  const isBody = name === 'body'
  const eyes = isBody ? [{ x: 58, y: 70 }, { x: 102, y: 70 }] : [{ x: 60, y: 72 }, { x: 100, y: 72 }]
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  return (
    <div className="relative flex flex-col items-center">
      <p
        aria-live="polite"
        className={`absolute bottom-full mb-2 w-max max-w-[11rem] rounded-2xl border border-edge bg-panel-2 px-3 py-2 text-center text-[0.85rem] leading-snug text-ink shadow-lg transition-all duration-200 ${
          said ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'
        }`}
      >
        {said ?? ' '}
      </p>
      <button type="button" onClick={tap} aria-label={isBody ? 'tocar a Body' : 'tocar a Milú'} className="block cursor-pointer active:scale-[0.97]">
        <svg ref={svg} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-[clamp(7.5rem,32vw,10rem)] text-ink" aria-hidden="true">
          {isBody ? (
            <>
              {/* Body: más grande, oreja con muesca y rayitas en la frente */}
              <path {...s} d="M18 128 C14 96 20 64 36 48 L30 10 L62 36 C74 32 86 32 98 36 L130 10 L124 48 C140 64 146 96 142 128" />
              <path {...s} d="M30 10 L36 20 M44 18 L40 24" strokeWidth={2.4} />
              <path {...s} d="M72 40 L74 52 M80 38 L80 51 M88 40 L86 52" strokeWidth={2.4} />
            </>
          ) : (
            <>
              {/* Milú: más redondita, orejas suaves */}
              <path {...s} d="M24 128 C20 100 26 74 40 60 C36 40 40 24 46 16 C56 26 64 36 68 44 C76 42 84 42 92 44 C96 36 104 26 114 16 C120 24 124 40 120 60 C134 74 140 100 136 128" />
              <path {...s} d="M48 30 C50 38 54 44 58 48 M112 30 C110 38 106 44 102 48" strokeWidth={2.2} />
            </>
          )}

          {/* ojos */}
          {eyes.map((e, i) => {
            const { dx, dy } = look(e.x, e.y)
            return happy || blink ? (
              <path key={i} {...s} d={happy ? `M${e.x - 9} ${e.y + 2} q9 -10 18 0` : `M${e.x - 9} ${e.y} h18`} />
            ) : (
              <g key={i}>
                <ellipse cx={e.x} cy={e.y} rx="10" ry="11" fill="none" stroke="currentColor" strokeWidth={2.6} />
                <circle cx={e.x + dx} cy={e.y + dy} r="5" fill="var(--color-lamp)" style={{ transition: 'cx 120ms linear, cy 120ms linear' }} />
                <circle cx={e.x + dx + 1.6} cy={e.y + dy - 1.8} r="1.4" fill="var(--color-panel)" />
              </g>
            )
          })}

          {/* nariz, boca y bigotes */}
          <path d="M74 86 h12 l-6 6 z" fill="currentColor" />
          <path {...s} strokeWidth={2.4} d="M80 92 q-6 8 -13 3 M80 92 q6 8 13 3" />
          <path {...s} strokeWidth={2} d="M42 88 L12 82 M42 96 L14 100 M118 88 L148 82 M118 96 L146 100" opacity={0.7} />

          {/* sonrojo cuando lo tocan */}
          <g stroke="var(--color-cable-red)" strokeWidth={2} strokeLinecap="round" style={{ opacity: happy ? 0.9 : 0, transition: 'opacity 200ms' }}>
            <path d="M40 104 l5 -6 M47 106 l5 -6 M120 98 l-5 6 M113 100 l-5 6" />
          </g>

          {/* patitas sobre el borde */}
          <path {...s} fill="var(--color-panel)" d={isBody ? 'M40 128 C40 110 66 110 66 128' : 'M46 128 C46 112 70 112 70 128'} />
          <path {...s} fill="var(--color-panel)" d={isBody ? 'M94 128 C94 110 120 110 120 128' : 'M90 128 C90 112 114 112 114 128'} />
        </svg>
      </button>
      <span className="mt-1.5 text-xs font-semibold text-dim">{isBody ? 'Body' : 'Milú'}</span>
    </div>
  )
}

export function Cats() {
  const pointer = usePointer()
  return (
    <div className="relative">
      <div className="flex items-end justify-center gap-[clamp(1.5rem,8vw,4rem)] md:justify-start md:pl-6">
        <Cat name="milu" pointer={pointer} />
        <Cat name="body" pointer={pointer} />
      </div>
      {/* borde del escritorio */}
      <div className="absolute inset-x-0 bottom-[1.6rem] h-px bg-ink/30" aria-hidden="true" />
    </div>
  )
}
