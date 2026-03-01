import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getMeta } from '@/lib/content'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Евгений Лавров — Бэкенд-разработчик',
    default: 'Евгений Лавров — Бэкенд-разработчик',
  },
  description:
    'Разрабатываю ботов, API и сервисы, которые решают задачи бизнеса. Python, FastAPI, Telegram, PostgreSQL, Docker.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const meta = getMeta()

  return (
    <html lang="ru" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Header name={meta.name} />
        <main className="pt-16">{children}</main>
        <Footer name={meta.name} contacts={meta.contacts} />
      </body>
    </html>
  )
}
