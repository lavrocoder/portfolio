export interface ProjectMetric {
  value: string
  label: string
}

export interface ProjectTags {
  type: string[]
  stack: string[]
  industry: string[]
}

export interface ProjectCase {
  problem: string
  solution: string
  result: string
}

export interface ProjectMedia {
  cover: string
  architecture?: string
  screenshots?: string[]
  video?: string
}

export interface Project {
  slug: string
  title: string
  subtitle?: string
  isNda: boolean
  featured: boolean
  order: number
  tags: ProjectTags
  brief: string
  case: ProjectCase
  role?: string
  metrics?: ProjectMetric[]
  media: ProjectMedia
}

export interface HeroMetric {
  value: string
  label: string
}

export interface Contacts {
  email: string
  telegram: string
  github: string
  linkedin?: string
}

export interface Meta {
  name: string
  headline: string
  tagline: string
  heroMetrics: HeroMetric[]
  contacts: Contacts
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Experience {
  period: string
  role: string
  description: string
}

export interface ApproachItem {
  title: string
  description: string
}

export interface About {
  bio: string
  skills: SkillCategory[]
  experience: Experience[]
  approach: ApproachItem[]
  resumeFile: string
}

export interface AllTags {
  type: string[]
  stack: string[]
  industry: string[]
}
