import Link from 'next/link'
import { Contacts } from '@/types'

interface FooterProps {
  name: string
  contacts: Contacts
}

export default function Footer({ name, contacts }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#252540] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-white font-semibold text-base hover:text-cyan-400 transition-colors">
              {name}<span className="text-cyan-400">.</span>
            </Link>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              Бэкенд-разработчик. Боты, API, автоматизация.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
              Навигация
            </p>
            <nav className="space-y-2">
              {[
                { label: 'Проекты', href: '/projects' },
                { label: 'Обо мне', href: '/about' },
                { label: 'Контакты', href: '/contacts' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
              Контакты
            </p>
            <div className="space-y-2">
              <a
                href={`https://t.me/${contacts.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <TelegramIcon />
                {contacts.telegram}
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <EmailIcon />
                {contacts.email}
              </a>
              <a
                href={contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon />
                GitHub
              </a>
              {contacts.linkedin && (
                <a
                  href={contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#252540] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-600">
            © {year} {name}. Все права защищены.
          </p>
          <p className="text-xs text-zinc-700">
            Разработано на Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

function TelegramIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.4l-2.974-.924c-.647-.203-.66-.647.136-.958l11.57-4.461c.537-.194 1.006.131.902.164z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
