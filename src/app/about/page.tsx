import type { Metadata } from 'next'
import Link from 'next/link'
import { getAbout, getMeta } from '@/lib/content'
import { assetPath } from '@/lib/asset-path'

export const metadata: Metadata = {
  title: 'Обо мне',
  description: 'Бэкенд-разработчик с 5+ годами опыта. Python, FastAPI, Telegram-боты, API. Портфолио и резюме.',
}

const approachIcons: Record<number, string> = {
  0: '💬',
  1: '⏱️',
  2: '📄',
  3: '🎯',
}

export default function AboutPage() {
  const about = getAbout()
  const meta = getMeta()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0f0f1c] border-b border-[#252540]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-3">
            Обо мне
          </p>
          <h1 className="section-heading mb-3">{meta.name}</h1>
          <p className="text-zinc-400 text-lg">{meta.headline}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* ── Bio ──────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Avatar placeholder */}
          <div className="lg:col-span-1">
            <div className="aspect-square max-w-xs mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-blue-900/60 to-cyan-900/30 border border-[#252540] flex items-center justify-center overflow-hidden">
              <img
                src={assetPath('/assets/about/photo.svg')}
                alt={meta.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Quick contacts */}
            <div className="mt-6 space-y-2">
              <a
                href={`https://t.me/${meta.contacts.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <span className="text-base">✈️</span> {meta.contacts.telegram}
              </a>
              <a
                href={`mailto:${meta.contacts.email}`}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <span className="text-base">📧</span> {meta.contacts.email}
              </a>
              <a
                href={meta.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <span className="text-base">🐙</span> GitHub
              </a>
            </div>
            {about.resumeFile && (
              <a
                href={about.resumeFile}
                download
                className="btn-primary mt-6 w-full justify-center"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Скачать резюме
              </a>
            )}
          </div>

          {/* Bio text */}
          <div className="lg:col-span-2">
            <h2 className="section-heading mb-6">Кратко о себе</h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              {about.bio}
            </p>

            {/* Hero metrics */}
            <div className="grid grid-cols-3 gap-4">
              {['5+', '20+', '3'].map((val, i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded-xl bg-[#13131f] border border-[#252540]"
                >
                  <p className="text-2xl font-bold text-cyan-400">{val}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {['лет опыта', 'проектов', 'года фриланса'][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────── */}
        <section>
          <h2 className="section-heading mb-8">Навыки и технологии</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {about.skills.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl bg-[#13131f] border border-[#252540]"
              >
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────── */}
        <section>
          <h2 className="section-heading mb-8">Опыт работы</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#252540] ml-3.5 hidden sm:block" />

            <div className="space-y-6">
              {about.experience.map((exp, i) => (
                <div key={i} className="flex gap-6 items-start">
                  {/* Dot */}
                  <div className="shrink-0 hidden sm:flex w-7 h-7 rounded-full border-2 border-cyan-500/40 bg-[#0a0a12] items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Approach ─────────────────────────────────────── */}
        <section>
          <h2 className="section-heading mb-4">Подход к работе</h2>
          <p className="text-zinc-500 mb-8">
            Заказчикам важно не только что сделано, но и как выстроен процесс.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {about.approach.map((item, i) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-[#13131f] border border-[#252540] hover:border-cyan-500/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{approachIcons[i] ?? '✨'}</span>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <div className="text-center py-8 border-t border-[#252540]">
          <p className="text-zinc-400 mb-6 text-lg">
            Готов обсудить вашу задачу
          </p>
          <Link href="/contacts" className="btn-primary text-base px-8 py-3">
            Связаться
          </Link>
        </div>
      </div>
    </div>
  )
}
