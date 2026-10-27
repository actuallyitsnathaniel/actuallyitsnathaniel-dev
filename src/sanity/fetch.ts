import {client} from './client'
import {
  mapAboutFromProfile,
  mapProsePages,
  mapSkillOverlays,
  mapSoftwareProjects,
  portableTextToParagraphs,
} from './map'
import {
  DEV_PAGES_QUERY,
  DEV_PROJECTS_QUERY,
  DEV_SITE_QUERY,
  DEV_SKILLS_QUERY,
  PROFILE_QUERY,
} from './queries'

export async function fetchDevContent() {
  const [site, projects, skills, pages, profile] = await Promise.all([
    client.fetch(DEV_SITE_QUERY),
    client.fetch(DEV_PROJECTS_QUERY),
    client.fetch(DEV_SKILLS_QUERY),
    client.fetch(DEV_PAGES_QUERY),
    client.fetch(PROFILE_QUERY),
  ])

  return {
    site,
    siteAbout: portableTextToParagraphs(site?.about),
    projects: mapSoftwareProjects(projects || []),
    skillOverlays: mapSkillOverlays(skills || []),
    prose: mapProsePages(pages || []),
    about: mapAboutFromProfile(profile),
    profile,
  }
}
