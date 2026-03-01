'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Проекты', href: '/projects' },
  { label: 'Обо мне', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
]

interface HeaderProps {
  name: string
}

export default function Header({ name }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a12]/95 backdrop-blur-md border-b border-[#252540]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-semibold text-base tracking-tight hover:text-cyan-400 transition-colors"
          >
            {name}
            <span className="text-cyan-400 ml-0.5">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <Link href="/contacts" className="btn-primary hidden md:inline-flex">
              Обсудить проект
            </Link>

            {/* Burger button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 rounded"
              aria-label="Меню"
            >
              <span
                className={`block h-0.5 bg-zinc-300 transition-all duration-300 ${
                  mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'
                }`}
              />
              <span
                className={`block h-0.5 bg-zinc-300 transition-all duration-300 ${
                  mobileOpen ? 'opacity-0 w-0' : 'w-4'
                }`}
              />
              <span
                className={`block h-0.5 bg-zinc-300 transition-all duration-300 ${
                  mobileOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-[#252540] space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2.5 px-2 text-sm rounded transition-colors ${
                  pathname === item.href
                    ? 'text-white bg-white/5'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/contacts" className="btn-primary w-full justify-center">
                Обсудить проект
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
