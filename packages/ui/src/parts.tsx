import type { ReactNode } from 'react'

export function Lamp({ on = false, blinking = false, className = '' }: { on?: boolean; blinking?: boolean; className?: string }) {
  return <span aria-hidden="true" className={`lamp ${on ? 'is-on' : ''} ${blinking ? 'is-blinking' : ''} ${className}`} />
}

export function Dymo({ children, black = false, tilt = 0, className = '' }: { children: ReactNode; black?: boolean; tilt?: number; className?: string }) {
  return (
    <span className={`dymo ${black ? 'dymo-black' : ''} ${className}`} style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}>
      {children}
    </span>
  )
}

/** Cuatro tornillos de latón en las esquinas de un panel con position: relative. */
export function Screws() {
  return (
    <>
      <span className="screw left-2.5 top-2.5" style={{ ['--r' as string]: '30deg' }} aria-hidden="true" />
      <span className="screw right-2.5 top-2.5" style={{ ['--r' as string]: '-50deg' }} aria-hidden="true" />
      <span className="screw bottom-2.5 left-2.5" style={{ ['--r' as string]: '80deg' }} aria-hidden="true" />
      <span className="screw bottom-2.5 right-2.5" style={{ ['--r' as string]: '10deg' }} aria-hidden="true" />
    </>
  )
}
