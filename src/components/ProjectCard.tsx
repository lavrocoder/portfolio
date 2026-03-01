'use client'

import Link from 'next/link'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

const stackColors: Record<string, string> = {
  Python: 'text-blue-400 bg-blue-400/10',
  FastAPI: 'text-green-400 bg-green-400/10',
  Django: 'text-emerald-400 bg-emerald-400/10',
  aiogram: 'text-cyan-400 bg-cyan-400/10',
  PostgreSQL: 'text-indigo-400 bg-indigo-400/10',
  Redis: 'text-red-400 bg-red-400/10',
  Docker: 'text-sky-400 bg-sky-400/10',
  Celery: 'text-lime-400 bg-lime-400/10',
  RabbitMQ: 'text-orange-400 bg-orange-400/10',
}

const coverGradients = [
  'from-blue-900/80 to-cyan-900/40',
  'from-indigo-900/80 to-blue-900/40',
  'from-violet-900/80 to-indigo-900/40',
  'from-teal-900/80 to-cyan-900/40',
  'from-slate-800/80 to-zinc-900/40',
  'from-emerald-900/80 to-teal-900/40',
  'from-sky-900/80 to-blue-900/40',
]

function getCoverGradient(slug: string) {
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return coverGradients[hash % coverGradients.length]
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const visibleStack = project.tags.stack.slice(0, 4)
  const gradient = getCoverGradient(project.slug)

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="card-base h-full flex flex-col overflow-hidden">
        {/* Cover */}
        <div className={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}>
          <img
            src={project.media.cover}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          {/* NDA badge */}
          {project.isNda && (
            <div className="absolute top-3 left-3">
              <span className="nda-badge">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                NDA
              </span>
            </div>
          )}
          {/* Type tags */}
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {project.tags.type.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-zinc-200 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Title */}
          <div>
            <h3 className="text-white font-semibold text-base leading-snug group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-xs text-zinc-500 mt-1">{project.subtitle}</p>
            )}
          </div>

          {/* Brief */}
          <p className="text-sm text-zinc-400 leading-relaxed flex-1">{project.brief}</p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {visibleStack.map((tech) => {
              const colorClass = stackColors[tech] ?? 'text-zinc-400 bg-zinc-400/10'
              return (
                <span
                  key={tech}
                  className={`text-xs px-2 py-0.5 rounded-md font-medium ${colorClass}`}
                >
                  {tech}
                </span>
              )
            })}
            {project.tags.stack.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded-md text-zinc-600 bg-zinc-700/20">
                +{project.tags.stack.length - 4}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
