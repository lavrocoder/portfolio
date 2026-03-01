import type { Metadata } from 'next'
import { getMeta } from '@/lib/content'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Связаться с бэкенд-разработчиком. Telegram, email, форма обратной связи.',
}

export default function ContactsPage() {
  const meta = getMeta()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0f0f1c] border-b border-[#252540]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-3">
            Контакты
          </p>
          <h1 className="section-heading mb-3">Обсудим вашу задачу</h1>
          <p className="text-zinc-400 max-w-xl leading-relaxed">
            Опишите, что нужно сделать — разберу задачу, задам уточняющие
            вопросы и предложу решение. Отвечаю в течение нескольких часов.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Contact form */}
          <div className="lg:col-span-3">
            <ContactForm meta={meta} />
          </div>

          {/* Direct contacts */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
              Прямые контакты
            </h2>
            <div className="space-y-4">
              <a
                href={`https://t.me/${meta.contacts.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#13131f] border border-[#252540] hover:border-cyan-500/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#229ED9]/15 border border-[#229ED9]/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#229ED9]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.4l-2.974-.924c-.647-.203-.66-.647.136-.958l11.57-4.461c.537-.194 1.006.131.902.164z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Telegram</p>
                  <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                    {meta.contacts.telegram}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${meta.contacts.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#13131f] border border-[#252540] hover:border-cyan-500/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                  <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                    {meta.contacts.email}
                  </p>
                </div>
              </a>

              <a
                href={meta.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#13131f] border border-[#252540] hover:border-cyan-500/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-700/30 border border-zinc-600/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">GitHub</p>
                  <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                    github.com/lavrocoder
                  </p>
                </div>
              </a>
            </div>

            {/* Response time */}
            <div className="mt-8 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Активен</span>
              </div>
              <p className="text-zinc-500 text-sm">
                Обычно отвечаю в течение 2–4 часов в рабочее время (МСК).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
