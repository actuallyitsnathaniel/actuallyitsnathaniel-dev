import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {ABOUT} from '../lib/about'
import {PROSE, type ProsePage} from '../lib/pages'
import {PROJECTS, type ProjectEntry} from '../lib/projects'
import {skills as localSkills} from '../Components/skills/skills-data'
import type {Skill, SkillCategory} from '../types/skill.types'
import {fetchDevContent} from './fetch'

type DevContent = {
  ready: boolean
  projects: ProjectEntry[]
  skills: Skill[]
  about: typeof ABOUT
  prose: typeof PROSE
  siteDescription?: string
}

const DevContentContext = createContext<DevContent | null>(null)

export function DevContentProvider({children}: {children: ReactNode}) {
  const [ready, setReady] = useState(false)
  const [projects, setProjects] = useState(PROJECTS)
  const [skills, setSkills] = useState(localSkills)
  const [about, setAbout] = useState(ABOUT)
  const [prose, setProse] = useState(PROSE)
  const [siteDescription, setSiteDescription] = useState<string | undefined>()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const remote = await fetchDevContent()
        if (cancelled) return
        if (remote.projects.length) setProjects(remote.projects)
        if (remote.about) setAbout(remote.about)
        if (remote.site?.description) setSiteDescription(remote.site.description)

        if (Object.keys(remote.skillOverlays).length) {
          setSkills(
            localSkills.map((skill) => {
              const overlay = remote.skillOverlays[skill.id]
              if (!overlay) return skill
              return {
                ...skill,
                name: overlay.name || skill.name,
                href: overlay.href || skill.href,
                category: (overlay.category as SkillCategory) || skill.category,
              }
            }),
          )
        }

        const nextProse = {...PROSE}
        for (const key of ['developers', 'docs', 'contact', 'privacy'] as const) {
          const page = remote.prose[key] as ProsePage | undefined
          if (page) nextProse[key] = page
        }
        if (remote.prose.about?.paragraphs?.length) {
          // about essay lives in AboutStage via ABOUT; keep PROSE keys only
        }
        setProse(nextProse)

        // Merge long about essay paragraphs into ABOUT.note when present
        const aboutPage = remote.prose.about
        if (aboutPage?.paragraphs?.length) {
          const [titleMaybe, ...rest] = aboutPage.paragraphs
          const note =
            titleMaybe?.includes('why hire') || titleMaybe?.includes('essay')
              ? rest
              : aboutPage.paragraphs
          setAbout((prev) => ({
            ...prev,
            noteTitle: aboutPage.title || prev.noteTitle,
            note: note.length ? note : prev.note,
          }))
        }
      } catch (error) {
        console.warn('[sanity] using local dev content fallback', error)
      } finally {
        if (!cancelled) setReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({ready, projects, skills, about, prose, siteDescription}),
    [ready, projects, skills, about, prose, siteDescription],
  )

  return <DevContentContext.Provider value={value}>{children}</DevContentContext.Provider>
}

export function useDevContent() {
  const ctx = useContext(DevContentContext)
  if (!ctx) throw new Error('useDevContent must be used within DevContentProvider')
  return ctx
}
