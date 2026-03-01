import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjects, getProject } from '@/lib/content'
import MetricCard from '@/components/MetricCard'
import { assetPath } from '@/lib/asset-path'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.brief,
  }
}

const stackColors: Record<string, string> = {
  Python: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  FastAPI: 'text-green-400 bg-green-400/10 border-green-400/20',
  Django: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  aiogram: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  PostgreSQL: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  Redis: 'text-red-400 bg-red-400/10 border-red-400/20',
  Docker: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  Celery: 'text-lime-400 bg-lime-400/10 border-lime-400/20',
  RabbitMQ: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  Nginx: 'text-green-500 bg-green-500/10 border-green-500/20',
  SQLAlchemy: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const caseSteps = [
    {
      icon: '⚡',
      label: 'Задача',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10 border-orange-400/20',
      content: project.case.problem,
    },
    {
      icon: '🔧',
      label: 'Решение',
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10 border-cyan-400/20',
      content: project.case.solution,
    },
    {
      icon: '✅',
      label: 'Результат',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
      content: project.case.result,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0f0f1c] border-b border-[#252540]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/projects" className="hover:text-zinc-300 transition-colors">
              Проекты
            </Link>
            <span>/</span>
            <span className="text-zinc-400">{project.title}</span>
          </nav>

          <div className="flex flex-wrap items-start gap-3 mb-4">
            {project.isNda && <span className="nda-badge">NDA</span>}
            {project.tags.type.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-zinc-500 text-sm mb-4">{project.subtitle}</p>
          )}

          <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">
            {project.brief}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Metrics ──────────────────────────────────────── */}
        {project.metrics && project.metrics.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
              Ключевые результаты
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.metrics.map((m, i) => (
                <MetricCard key={i} metric={m} accent={i === 0} />
              ))}
            </div>
          </section>
        )}

        {/* ── Case: Task → Solution → Result ───────────────── */}
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">
            О проекте
          </h2>
          <div className="space-y-4">
            {caseSteps.map((step) => (
              <div
                key={step.label}
                className="rounded-xl border border-[#252540] overflow-hidden"
              >
                <div className={`px-5 py-3 border-b border-[#252540] flex items-center gap-2 ${step.bg}`}>
                  <span className="text-base">{step.icon}</span>
                  <span className={`text-sm font-semibold ${step.color}`}>
                    {step.label}
                  </span>
                </div>
                <div className="px-5 py-5 bg-[#13131f]">
                  <p className="text-zinc-300 leading-relaxed text-[0.9375rem]">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tech stack ───────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
            Технологии
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.tags.stack.map((tech) => {
              const colorClass =
                stackColors[tech] ?? 'text-zinc-300 bg-zinc-700/30 border-zinc-600/30'
              return (
                <span
                  key={tech}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium border ${colorClass}`}
                >
                  {tech}
                </span>
              )
            })}
            {project.tags.industry.map((ind) => (
              <span
                key={ind}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium bg-violet-500/10 border border-violet-500/20 text-violet-400"
              >
                {ind}
              </span>
            ))}
          </div>
        </section>

        {/* ── Architecture ─────────────────────────────────── */}
        {project.media.architecture && (
          <section>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
              Архитектура
            </h2>
            <div className="rounded-xl border border-[#252540] overflow-hidden bg-[#0a0a12]">
              <img
                src={assetPath(project.media.architecture)}
                alt={`Архитектура: ${project.title}`}
                className="w-full"
              />
            </div>
          </section>
        )}

        {/* ── Screenshots ──────────────────────────────────── */}
        {project.media.screenshots && project.media.screenshots.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
              Скриншоты
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.media.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#252540] overflow-hidden bg-[#0a0a12]"
                >
                  <img
                    src={assetPath(src)}
                    alt={`Скриншот ${i + 1}: ${project.title}`}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Role ─────────────────────────────────────────── */}
        {project.role && (
          <section>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
              Моя роль
            </h2>
            <div className="p-5 rounded-xl bg-[#13131f] border border-[#252540]">
              <p className="text-zinc-300 leading-relaxed">{project.role}</p>
            </div>
          </section>
        )}

        {/* ── NDA notice ───────────────────────────────────── */}
        {project.isNda && (
          <div className="flex items-start gap-3 p-5 rounded-xl bg-amber-500/5 border border-amber-500/15">
            <svg
              className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <div>
              <p className="text-amber-400 text-sm font-medium mb-1">
                Проект под NDA
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Название компании и конфиденциальные детали скрыты согласно
                соглашению о неразглашении. Описание проекта обезличено.
                Дополнительные детали могу предоставить при личном общении.
              </p>
            </div>
          </div>
        )}

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <div className="border-t border-[#252540] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-zinc-400 mb-1">Понравился подход?</p>
            <p className="text-white font-semibold text-lg">
              Обсудим вашу задачу
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contacts" className="btn-primary">
              Написать
            </Link>
            <Link href="/projects" className="btn-secondary">
              Все проекты
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
