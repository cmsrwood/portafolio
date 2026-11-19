import { useState } from 'react'
import { CONTACT, Lamp, Screws, siteUrl, vibrate } from '@dl/ui'
import { BOARDS, STACK, type Line } from './data'

const condensed = { fontVariationSettings: '"wdth" 75' }

function LineRow({ line }: { line: Line }) {
  const [open, setOpen] = useState(false)
  const id = `linea-${line.ext}`
  return (
    <li className="border-t border-edge/70 first:border-t-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          vibrate(8)
          setOpen((o) => !o)
        }}
        className="flex w-full cursor-pointer items-start gap-4 py-4 text-left"
      >
        <span className="w-9 shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-brass">{line.ext}</span>
        <span className="flex-1">
          <span className="block text-[1.1rem] font-semibold leading-snug">{line.title}</span>
          <span className="mt-0.5 block text-[0.95rem] text-dim">{line.summary}</span>
        </span>
        <Lamp on={open} className="mt-1.5" />
      </button>
      <div id={id} className={`fold ${open ? 'is-open' : ''}`}>
        <div>
          <div className="pb-5 pl-[3.25rem] pr-2">
            <p className="leading-relaxed text-ink/90">{line.detail}</p>
            <p className="mt-3 text-sm text-dim">
              Con {line.tools.slice(0, -1).join(', ')}
              {line.tools.length > 1 ? ' y ' : ''}
              {line.tools[line.tools.length - 1]}.
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function App() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between">
        <a href={siteUrl('home')} className="flex items-center gap-2.5 py-2 font-semibold">
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#e1c587,var(--color-brass)_45%,var(--color-brass-dark))]"
          >
            <span className="size-2.5 rounded-full bg-[#0c0a09]" />
          </span>
          Dilan López
        </a>
        <a href={`mailto:${CONTACT.email}`} className="py-2 text-sm text-dim underline decoration-edge underline-offset-4 hover:text-ink">
          Escríbeme
        </a>
      </header>

      <section className="rise pb-14 pt-14">
        <h1 className="text-[clamp(3.6rem,17vw,6.5rem)] font-extrabold leading-[0.85] tracking-[-0.035em]" style={condensed}>
          Lo que he
          <br />
          construido
        </h1>
        <p className="mt-7 max-w-[34rem] text-[1.15rem] leading-relaxed text-dim">
          Soy desarrollador en Bogotá. De día hago que las máquinas contesten llamadas y chats, y que eso se conecte con
          todo lo demás. De noche hago juegos que todavía no termino.
        </p>
      </section>

      {BOARDS.map((board, i) => (
        <section key={board.id} className="rise pb-14" style={{ animationDelay: `${120 + i * 80}ms` }} aria-labelledby={`t-${board.id}`}>
          <h2 id={`t-${board.id}`} className="text-[2.1rem] font-bold leading-none tracking-[-0.02em]" style={condensed}>
            {board.title}
          </h2>
          <p className="mt-2 max-w-[34rem] text-dim">{board.intro}</p>
          <div className="relative mt-5 rounded-[1.2rem] border border-edge bg-panel-2 px-5 py-2 shadow-[inset_0_1px_0_rgb(255_255_255/.04),0_18px_40px_-24px_rgb(0_0_0/.9)]">
            <Screws />
            <ul className="px-1">
              {board.lines.map((line) => (
                <LineRow key={line.ext} line={line} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="pb-14" aria-labelledby="t-stack">
        <h2 id="t-stack" className="text-[2.1rem] font-bold leading-none tracking-[-0.02em]" style={condensed}>
          Con qué trabajo
        </h2>
        <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3">
          {STACK.map((s) => (
            <div key={s.group} className="contents">
              <dt className="font-semibold text-brass">{s.group}</dt>
              <dd className="text-ink/90">{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-edge pb-10 pt-12" aria-labelledby="t-contacto">
        <h2 id="t-contacto" className="text-[clamp(2.6rem,12vw,4rem)] font-extrabold leading-[0.9] tracking-[-0.03em]" style={condensed}>
          ¿Hablamos?
        </h2>
        <p className="mt-4 max-w-[30rem] text-dim">
          Si quieres armar algo, preguntarme por algún proyecto o simplemente saludar, escríbeme.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-full bg-brass px-5 py-3 font-semibold text-panel shadow-[0_6px_18px_-8px_rgb(201_163_91/.7)] transition-transform active:scale-95"
          >
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-edge px-5 py-3 font-semibold transition-colors hover:border-brass active:scale-95"
          >
            GitHub
          </a>
        </div>
      </section>

      <footer className="pt-6 text-sm text-dim">Hecho a mano en Bogotá.</footer>
    </div>
  )
}
