import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";

const siteUrl = "https://alwifuad.vercel.app";

interface SitemapProject {
  slug: string;
  _updatedAt: string;
}

const sitemapProjectsQuery = `
  *[
    _type == "project" &&
    defined(slug.current) &&
    visible != false
  ] | order(_updatedAt desc) {
    "slug": slug.current,
    _updatedAt
  }
`;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch<SitemapProject[]>(sitemapProjectsQuery);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/certificates`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
