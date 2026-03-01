import type { Metadata } from 'next'
import { getProjects, getAllTags } from '@/lib/content'
import ProjectsClient from '@/components/ProjectsClient'

export const metadata: Metadata = {
  title: 'Проекты',
  description: 'Портфолио бэкенд-проектов: боты, API, сервисы автоматизации. Python, FastAPI, aiogram, PostgreSQL.',
}

export default function ProjectsPage() {
  const projects = getProjects()
  const allTags = getAllTags()

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[#0f0f1c] border-b border-[#252540]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-3">
            Портфолио
          </p>
          <h1 className="section-heading mb-3">Проекты</h1>
          <p className="text-zinc-400 max-w-xl">
            Реальные задачи бизнеса, конкретные результаты. Часть проектов
            защищена соглашением о неразглашении — описание обезличено.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectsClient projects={projects} allTags={allTags} />
      </div>
    </div>
  )
}
