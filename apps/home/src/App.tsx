import type { ReactNode } from 'react'
import { CONTACT } from '@dl/ui'
import { ABOUT, ABOUT_QUOTE, BEYOND, CLOSING, DOING, INTRO, PATH, PROJECTS, STACK } from './content'

const condensed = { fontVariationSettings: '"wdth" 75' }

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-edge py-16 md:py-20">
      <h2 id={id} className="text-[clamp(2.2rem,8vw,3.4rem)] font-extrabold leading-[0.95] tracking-[-0.025em]" style={condensed}>
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function App() {
  return (
    <main className="mx-auto max-w-[46rem] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-8">
      {/* Portada */}
      <header className="flex min-h-[92dvh] flex-col justify-end pb-16 pt-[max(2rem,env(safe-area-inset-top))]">
        <p className="mb-auto pt-2 text-sm text-dim">Bogotá, Colombia</p>
        <h1 className="hero-name text-[clamp(4.2rem,19vw,9.5rem)] font-extrabold leading-[0.84] tracking-[-0.04em]">
          Hola,
          <br />
          soy Dilan
        </h1>
        <p className="rise mt-8 max-w-[32rem] text-[clamp(1.25rem,4.6vw,1.6rem)] leading-snug" style={{ animationDelay: '500ms' }}>
          Desarrollador de software, entusiasta de la nube y alguien que nunca deja de construir cosas.
        </p>
      </header>

      <div className="space-y-5 pb-16 text-[1.08rem] leading-relaxed text-dim">
        {INTRO.map((p) => (
          <p key={p} className="max-w-[38rem]">
            {p}
          </p>
        ))}
      </div>

      <Section id="sobre-mi" title="Un poco sobre mí">
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/85">
          {ABOUT.map((p) => (
            <p key={p} className="max-w-[38rem]">
              {p}
            </p>
          ))}
        </div>
        <blockquote className="mt-10 max-w-[36rem] border-l-2 border-lamp pl-5 text-[clamp(1.25rem,4.4vw,1.55rem)] font-medium leading-snug">
          {ABOUT_QUOTE}
        </blockquote>
        <ol className="mt-12 space-y-0">
          {PATH.map((step, i) => (
            <li key={step.place} className="relative grid grid-cols-[1.25rem_1fr] gap-x-3 pb-6 last:pb-0">
              <span aria-hidden="true" className="relative flex justify-center">
                <span className="mt-2 size-2.5 rounded-full bg-brass" />
                {i < PATH.length - 1 && <span className="absolute -bottom-2 top-5 w-px bg-edge" />}
              </span>
              <div>
                <p className="font-semibold">{step.place}</p>
                <p className="text-dim">{step.what}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="lo-que-hago" title="Lo que hago">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {DOING.map((d) => (
            <div key={d.title}>
              <h3 className="text-[1.2rem] font-bold">{d.title}</h3>
              <p className="mt-2 leading-relaxed text-dim">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="proyectos" title="Proyectos y experimentos">
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.name} className="border-t border-edge/60 py-8 first:border-t-0 first:pt-0">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="text-[clamp(1.8rem,6.5vw,2.4rem)] font-extrabold leading-none tracking-[-0.02em]" style={condensed}>
                  {p.name}
                </h3>
                <span className="text-sm text-dim">{p.kind}</span>
                {p.status && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-lamp/30 px-2.5 py-0.5 text-xs font-semibold text-lamp">
                    <span className="pulse size-1.5 rounded-full bg-lamp" aria-hidden="true" />
                    {p.status}
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-[38rem] leading-relaxed text-ink/85">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="stack" title="Mi stack">
        <dl className="grid gap-x-8 gap-y-5 md:grid-cols-[13rem_1fr]">
          {STACK.map((s) => (
            <div key={s.group} className="contents">
              <dt className="font-semibold text-brass">{s.group}</dt>
              <dd className="-mt-4 text-ink/85 md:mt-0">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="mas-alla" title="Más allá del código">
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/85">
          {BEYOND.map((p) => (
            <p key={p} className="max-w-[38rem]">
              {p}
            </p>
          ))}
          <p className="max-w-[38rem] text-dim">
            Y siempre estoy buscando algo nuevo que aprender, construir o experimentar. Creo que la curiosidad es una de las
            mejores cualidades que alguien puede conservar.
          </p>
        </div>
      </Section>

      <Section id="algo-nuevo" title="Siempre hay algo nuevo por construir">
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/85">
          {CLOSING.map((p) => (
            <p key={p} className="max-w-[38rem]">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <section aria-labelledby="construimos" className="border-t border-edge pb-12 pt-16 md:pt-24">
        <h2
          id="construimos"
          className="text-[clamp(3.2rem,15vw,7rem)] font-extrabold leading-[0.86] tracking-[-0.04em]"
          style={condensed}
        >
          ¿Construimos algo?
        </h2>
        <p className="mt-6 max-w-[32rem] text-[1.1rem] leading-relaxed text-dim">
          Me gusta conocer personas, intercambiar ideas y participar en proyectos interesantes. Si tienes algo en mente,
          conversemos.
        </p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3.5 font-semibold text-panel transition-transform active:scale-95"
        >
          Escríbeme a {CONTACT.email}
        </a>
      </section>

      <footer className="border-t border-edge pt-6 text-sm text-dim">
        <p className="font-semibold text-ink">Dilan Santiago López Romero</p>
        <p>Desarrollador de software en Bogotá, Colombia</p>
      </footer>
    </main>
  )
}
