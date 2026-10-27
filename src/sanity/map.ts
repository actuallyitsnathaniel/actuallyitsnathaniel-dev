import {ABOUT} from '../lib/about'
import {PROJECTS, type ProjectEntry} from '../lib/projects'
import type {ProsePage} from '../lib/pages'

type SanitySoftwareProject = {
  title: string
  slug: string
  role?: string
  timeframe?: string
  stack?: string[]
  liveUrl?: string
  highlights?: Array<{kind?: 'add' | 'note'; text?: string}>
}

type SanitySkill = {
  name: string
  slug: string
  category: string
  url?: string
}

type SanityPage = {
  title: string
  slug: string
  summary?: string
  body?: Array<{_type?: string; children?: Array<{text?: string}>}>
}

export function mapSoftwareProjects(remote: SanitySoftwareProject[]): ProjectEntry[] {
  return remote.map((doc, index) => {
    const local = PROJECTS.find(
      (p) =>
        p.name === doc.title ||
        p.aliases.includes(doc.slug) ||
        p.name.replace(/\s+/g, '-') === doc.slug,
    )
    return {
      ver: local?.ver ?? `v0.${Math.max(0, PROJECTS.length - index)}.0`,
      date: doc.timeframe || local?.date || '',
      name: doc.title || local?.name || doc.slug,
      tag: local?.tag || '',
      role: doc.role || local?.role || '',
      stack: doc.stack?.length ? doc.stack.join(' · ') : local?.stack || '',
      liveUrl: doc.liveUrl || local?.liveUrl,
      bullets:
        doc.highlights
          ?.filter((h): h is {kind: 'add' | 'note'; text: string} => Boolean(h.text && h.kind))
          .map((h) => ({type: h.kind, text: h.text})) ||
        local?.bullets ||
        [],
      aliases: local?.aliases || [doc.slug],
    }
  })
}

export function mapSkillOverlays(remote: SanitySkill[]) {
  return Object.fromEntries(
    remote.map((skill) => [
      skill.slug,
      {
        name: skill.name,
        href: skill.url,
        category: skill.category,
      },
    ]),
  ) as Record<string, {name: string; href?: string; category: string}>
}

export function mapProsePages(remote: SanityPage[]): Partial<Record<string, ProsePage>> {
  const out: Partial<Record<string, ProsePage>> = {}
  for (const page of remote) {
    const paragraphs = (page.body || [])
      .filter((b) => b._type === 'block')
      .map((b) => (b.children || []).map((c) => c.text || '').join(''))
      .filter(Boolean)
    if (!paragraphs.length) continue
    out[page.slug] = {
      title: page.title,
      paragraphs,
    }
  }
  return out
}

export function mapAboutFromProfile(profile: {
  shortBio?: string
} | null): typeof ABOUT | null {
  if (!profile?.shortBio) return null
  return {
    ...ABOUT,
    bio: profile.shortBio,
  }
}

export function portableTextToParagraphs(
  blocks: Array<{_type?: string; children?: Array<{text?: string}>}> | undefined,
): string[] {
  if (!blocks?.length) return []
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text || '').join(''))
    .filter(Boolean)
}
