'use client'

import { useState, FormEvent } from 'react'
import { Meta } from '@/types'

interface ContactFormProps {
  meta: Meta
}

export default function ContactForm({ meta }: ContactFormProps) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = `Имя: ${name}\nКонтакт: ${contact}\n\nЗадача:\n${message}`
    const mailtoUrl = `mailto:${meta.contacts.email}?subject=${encodeURIComponent('Запрос с портфолио')}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClass =
    'w-full bg-[#0f0f1c] border border-[#252540] rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-colors'

  return (
    <div>
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
        Форма обратной связи
      </h2>

      {submitted ? (
        <div className="p-8 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-emerald-400 font-semibold mb-2">Открываем почтовый клиент</p>
          <p className="text-zinc-500 text-sm">Письмо подготовлено. Отправьте его из вашего почтового клиента.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">
              Имя <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как вас зовут?"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">
              Email или Telegram <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="email@example.com или @username"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">
              Описание задачи <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Расскажите о вашем проекте: что нужно сделать, какой результат ожидаете, есть ли сроки..."
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-center py-3 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Отправить сообщение
          </button>

          <p className="text-xs text-zinc-600 text-center">
            Нажатие откроет ваш почтовый клиент с готовым письмом.
            <br />
            Или напишите напрямую:{' '}
            <a href={`https://t.me/${meta.contacts.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">
              {meta.contacts.telegram}
            </a>
          </p>
        </form>
      )}
    </div>
  )
}
