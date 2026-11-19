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

/* Colores sacados de las fotos de Milú (atigrada café) y Body (gris con blanco) */
const C = {
  line: '#15161a',
  white: '#f1efea',
  miluFur: '#8a7253',
  miluDark: '#3f3222',
  miluEar: '#b98f80',
  miluEye: '#c6c46c',
  miluNose: '#c08a80',
  bodyFur: '#6c7178',
  bodyDark: '#3b3e44',
  bodyEar: '#a07f86',
  bodyEye: '#b3c58b',
  bodyNose: '#eaa9b2',
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
              {/* Body: gris con blanco, cachetón, V blanca entre los ojos */}
              <path fill={C.bodyFur} d="M12 128 C6 96 14 66 34 52 L30 10 L64 38 C74 35 86 35 96 38 L130 10 L126 52 C146 66 154 96 148 128 Z" />
              <path fill={C.bodyEar} d="M38 46 L36 22 L58 40 Z M122 46 L124 22 L102 40 Z" />
              <path fill={C.white} d="M80 46 C75 58 68 72 63 84 C68 92 92 92 97 84 C92 72 85 58 80 46 Z" />
              <path fill={C.white} d="M40 128 C40 102 58 86 80 86 C102 86 120 102 120 128 Z" />
              <path fill="none" stroke={C.bodyDark} strokeWidth={2} strokeLinecap="round" opacity={0.5} d="M70 30 l2 8 M80 28 v8 M90 30 l-2 8" />
            </>
          ) : (
            <>
              {/* Milú: atigrada café con blanco, franja blanca desde la nariz */}
              <path fill={C.miluFur} d="M20 128 C16 98 22 70 38 56 L32 14 L65 40 C75 37 85 37 95 40 L128 14 L122 56 C138 70 144 98 140 128 Z" />
              <path fill={C.miluEar} d="M42 50 L39 26 L59 42 Z M118 50 L121 26 L101 42 Z" />
              <g fill="none" stroke={C.miluDark} strokeWidth={3.4} strokeLinecap="round">
                <path d="M64 46 L68 60 M73 42 L74 56 M87 42 L86 56 M96 46 L92 60" />
                <path d="M26 90 L42 88 M27 99 L41 98 M134 90 L118 88 M133 99 L119 98" />
                <path d="M44 66 L50 70 M116 66 L110 70" strokeWidth={2.6} />
              </g>
              <path fill={C.white} d="M80 54 C77 64 73 76 71 85 L89 85 C87 76 83 64 80 54 Z" />
              <path fill={C.white} d="M50 128 C50 104 63 87 80 86 C97 87 110 104 110 128 Z" />
            </>
          )}

          {/* ojos */}
          {eyes.map((e, i) => {
            const { dx, dy } = look(e.x, e.y)
            return happy || blink ? (
              <path key={i} {...s} stroke={C.line} strokeWidth={3} d={happy ? `M${e.x - 9} ${e.y + 2} q9 -10 18 0` : `M${e.x - 9} ${e.y} h18`} />
            ) : (
              <g key={i}>
                <ellipse cx={e.x} cy={e.y} rx="10" ry="10.5" fill={isBody ? C.bodyEye : C.miluEye} stroke={C.line} strokeWidth={2} />
                <ellipse cx={e.x + dx} cy={e.y + dy} rx="3" ry="7" fill={C.line} style={{ transition: 'cx 120ms linear, cy 120ms linear' }} />
                <circle cx={e.x + dx + 2.4} cy={e.y + dy - 3} r="1.6" fill="#ffffff" />
              </g>
            )
          })}

          {/* nariz, boca y bigotes */}
          <path d="M73 85 h14 l-7 7 z" fill={isBody ? C.bodyNose : C.miluNose} />
          {isBody && <ellipse cx="75.5" cy="87" rx="2.6" ry="2.2" fill={C.bodyDark} />}
          <path {...s} stroke={C.line} strokeWidth={2.2} d="M80 92 q-6 8 -13 3 M80 92 q6 8 13 3" />
          <path {...s} stroke="#f4f4f2" strokeWidth={1.4} d="M46 92 L10 85 M46 98 L12 102 M114 92 L150 85 M114 98 L148 102" opacity={0.85} />

          {/* sonrojo cuando lo tocan */}
          <g fill="#f08c9a" style={{ opacity: happy ? 0.75 : 0, transition: 'opacity 200ms' }}>
            <ellipse cx={isBody ? 44 : 48} cy="96" rx="8" ry="4.5" />
            <ellipse cx={isBody ? 116 : 112} cy="96" rx="8" ry="4.5" />
          </g>

          {/* patitas blancas sobre el borde */}
          <path fill={C.white} stroke={C.line} strokeWidth={1.6} d={isBody ? 'M40 128 C40 110 66 110 66 128' : 'M46 128 C46 112 70 112 70 128'} />
          <path fill={C.white} stroke={C.line} strokeWidth={1.6} d={isBody ? 'M94 128 C94 110 120 110 120 128' : 'M90 128 C90 112 114 112 114 128'} />
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
