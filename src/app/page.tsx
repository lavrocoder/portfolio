import Link from 'next/link'
import { getMeta, getFeaturedProjects, getAbout } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'
import MetricCard from '@/components/MetricCard'

export default function HomePage() {
  const meta = getMeta()
  const featured = getFeaturedProjects()
  const about = getAbout()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 bg-hero-glow pointer-events-none"
        />
        {/* Grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Открыт для новых проектов
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              {meta.headline}
              <br />
              <span className="text-gradient-accent">для вашего бизнеса</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl">
              {meta.tagline}. Помогаю автоматизировать процессы, сократить
              ручной труд и выстроить надёжный технический фундамент.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/contacts" className="btn-primary text-base px-6 py-3">
                Обсудить проект
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/projects" className="btn-secondary text-base px-6 py-3">
                Смотреть проекты
              </Link>
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-16 flex flex-wrap gap-px">
            {meta.heroMetrics.map((m, i) => (
              <div
                key={i}
                className="flex-1 min-w-[120px] px-6 py-5 bg-[#13131f] first:rounded-l-xl last:rounded-r-xl border border-[#252540]"
              >
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400 leading-none">
                  {m.value}
                </p>
                <p className="mt-1.5 text-xs text-zinc-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured projects ────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f1c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-2">
                Портфолио
              </p>
              <h2 className="section-heading">Выбранные проекты</h2>
            </div>
            <Link href="/projects" className="btn-secondary shrink-0">
              Все проекты
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About preview ────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-3">
                Обо мне
              </p>
              <h2 className="section-heading mb-6">С кем вы будете работать</h2>
              <p className="text-zinc-400 leading-relaxed text-lg mb-4">
                {about.bio}
              </p>
              <Link href="/about" className="btn-secondary">
                Подробнее обо мне
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {about.approach.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-[#13131f] border border-[#252540] hover:border-cyan-500/20 transition-colors"
                >
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f1c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-[#252540] bg-[#13131f] p-10 sm:p-16 text-center">
            {/* Glow */}
            <div
              aria-hidden
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            />
            <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-4">
              Начнём работу
            </p>
            <h2 className="section-heading mb-4">Есть задача? Давайте обсудим.</h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Опишите, что нужно сделать — разберу задачу и предложу решение.
              Отвечаю в течение нескольких часов.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contacts" className="btn-primary text-base px-8 py-3">
                Написать в Telegram
              </Link>
              <a
                href={`mailto:${meta.contacts.email}`}
                className="btn-secondary text-base px-8 py-3"
              >
                Отправить email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
