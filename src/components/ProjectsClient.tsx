'use client'

import { useState, useMemo } from 'react'
import { Project, AllTags } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectsClientProps {
  projects: Project[]
  allTags: AllTags
}

type FilterState = {
  type: string | null
  stack: string | null
  industry: string | null
}

const filterLabels: Record<keyof FilterState, string> = {
  type: 'Тип',
  stack: 'Стек',
  industry: 'Отрасль',
}

export default function ProjectsClient({ projects, allTags }: ProjectsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: null,
    stack: null,
    industry: null,
  })
  const [expandedGroup, setExpandedGroup] = useState<keyof FilterState | null>('type')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filters.type && !p.tags.type.includes(filters.type)) return false
      if (filters.stack && !p.tags.stack.includes(filters.stack)) return false
      if (filters.industry && !p.tags.industry.includes(filters.industry)) return false
      return true
    })
  }, [projects, filters])

  const hasActiveFilters = Object.values(filters).some(Boolean)

  function toggle(group: keyof FilterState, value: string) {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group] === value ? null : value,
    }))
  }

  function reset() {
    setFilters({ type: null, stack: null, industry: null })
  }

  const tagGroups: { key: keyof FilterState; values: string[] }[] = [
    { key: 'type', values: allTags.type },
    { key: 'stack', values: allTags.stack },
    { key: 'industry', values: allTags.industry },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Sidebar filters */}
      <aside className="lg:w-56 xl:w-64 shrink-0">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              Фильтры
            </p>
            {hasActiveFilters && (
              <button
                onClick={reset}
                className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                Сбросить
              </button>
            )}
          </div>

          <div className="space-y-4">
            {tagGroups.map(({ key, values }) => (
              <div key={key} className="border border-[#252540] rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedGroup(expandedGroup === key ? null : key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-zinc-300 hover:text-white bg-[#13131f] transition-colors"
                >
                  <span className="font-medium">{filterLabels[key]}</span>
                  <span className="flex items-center gap-2">
                    {filters[key] && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    )}
                    <ChevronIcon open={expandedGroup === key} />
                  </span>
                </button>

                {expandedGroup === key && (
                  <div className="px-3 pb-3 pt-1 bg-[#0f0f1c] flex flex-wrap gap-1.5">
                    {values.map((val) => (
                      <button
                        key={val}
                        onClick={() => toggle(key, val)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                          filters[key] === val
                            ? 'bg-cyan-500 text-zinc-950 font-semibold'
                            : 'bg-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-700/60'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Active filter summary */}
          {hasActiveFilters && (
            <div className="mt-4 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
              <p className="text-xs text-zinc-500 mb-2">Активные фильтры:</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(filters).map(([key, val]) =>
                  val ? (
                    <span key={key} className="text-xs text-cyan-400">
                      {val}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Projects grid */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-500">
            {filtered.length === projects.length
              ? `${projects.length} проектов`
              : `${filtered.length} из ${projects.length}`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium mb-1">Ничего не найдено</p>
            <p className="text-sm text-zinc-600">Попробуйте изменить фильтры</p>
            <button
              onClick={reset}
              className="mt-4 btn-secondary text-sm"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
