import type { MetadataRoute } from "next"
import { STORY_SLUGS } from "@/lib/story"

const SITE_URL = "https://koreanfolktales.ink"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const folktalePages: MetadataRoute.Sitemap = Object.values(STORY_SLUGS).map(
    (slug) => ({
      url: `${SITE_URL}/folktales/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  )
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...folktalePages,
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
