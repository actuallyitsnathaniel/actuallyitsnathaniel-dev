import {defineQuery} from 'groq'

export const DEV_SITE_QUERY = defineQuery(`*[_type == "site" && key == "dev"][0]{
  name, headline, description, about, links[]{label, url}, seo
}`)

export const DEV_PROJECTS_QUERY = defineQuery(`*[_type == "project" && discipline == "software" && "site-dev" in sites[]._ref]
  | order(sortOrder asc){
    _id,
    title,
    "slug": slug.current,
    role,
    timeframe,
    stack,
    liveUrl,
    highlights[]{kind, text}
  }`)

export const DEV_SKILLS_QUERY = defineQuery(`*[_type == "skill" && site._ref == "site-dev"] | order(name asc){
  name,
  "slug": slug.current,
  category,
  url
}`)

export const DEV_PAGES_QUERY = defineQuery(`*[_type == "page" && site._ref == "site-dev"]{
  title,
  "slug": slug.current,
  summary,
  body
}`)

export const PROFILE_QUERY = defineQuery(`*[_type == "profile"][0]{
  name, alternateName, email, jobTitle, shortBio, location, sameAs[]{label, url}
}`)
