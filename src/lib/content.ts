import fs from 'fs'
import path from 'path'
import { Project, Meta, About, AllTags } from '@/types'

const contentDir = path.join(process.cwd(), 'content')
const projectsDir = path.join(contentDir, 'projects')

export function getProjects(): Project[] {
  const files = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), 'utf-8')
    return JSON.parse(raw) as Project
  })

  return projects.sort((a, b) => a.order - b.order)
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Project
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured)
}

export function getAllTags(): AllTags {
  const projects = getProjects()
  const type = new Set<string>()
  const stack = new Set<string>()
  const industry = new Set<string>()

  for (const p of projects) {
    p.tags.type.forEach((t) => type.add(t))
    p.tags.stack.forEach((t) => stack.add(t))
    p.tags.industry.forEach((t) => industry.add(t))
  }

  return {
    type: Array.from(type),
    stack: Array.from(stack),
    industry: Array.from(industry),
  }
}

export function getAbout(): About {
  const raw = fs.readFileSync(path.join(contentDir, 'about.json'), 'utf-8')
  return JSON.parse(raw) as About
}

export function getMeta(): Meta {
  const raw = fs.readFileSync(path.join(contentDir, 'meta.json'), 'utf-8')
  return JSON.parse(raw) as Meta
}
