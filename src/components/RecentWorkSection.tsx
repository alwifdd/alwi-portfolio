import RecentWorkSectionClient from "./RecentWorkSectionClient";

import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import { projects as localProjects, type ProjectItem } from "../data/projects";

interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail?: unknown;
  cardBackgroundColor?: string | null;
  technologies?: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  order?: number;
}

const patternBg =
  "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L0,100 L100,100 L100,0 C75,25 25,25 0,0 Z' fill='rgba(255,255,255,0.2)' /%3E%3C/svg%3E";

async function getHomepageProjects(): Promise<ProjectItem[]> {
  try {
    const sanityProjects = await client.fetch<SanityProject[]>(
      featuredProjectsQuery,
    );

    // DEBUG: lihat berapa project yang benar-benar dikirim Sanity
    console.log(
      "SANITY HOMEPAGE PROJECTS:",
      sanityProjects.map((project) => ({
        title: project.title,
        slug: project.slug,
        order: project.order,
      })),
    );

    const convertedSanityProjects: ProjectItem[] = sanityProjects
      .filter((project) => Boolean(project.slug))
      .map((project, index) => ({
        id: 1000 + index,

        name: project.title,

        description: project.shortDescription,

        technologies: project.technologies ?? [],

        studyCaseLink: `/projects/${project.slug}`,

        githubLink: project.githubUrl ?? undefined,

        demoLink: project.demoUrl ?? undefined,

        mockupType: "desktop",

        screenshots: project.thumbnail
          ? [urlFor(project.thumbnail).width(1200).quality(90).url()]
          : [],

        bgColor: project.cardBackgroundColor || "#4E8DF7",

        patternBg,
      }));

    const sanityLinks = new Set(
      convertedSanityProjects.map((project) => project.studyCaseLink),
    );

    const remainingLocalProjects = localProjects.filter(
      (project) => !sanityLinks.has(project.studyCaseLink),
    );

    const finalProjects = [
      ...convertedSanityProjects,
      ...remainingLocalProjects,
    ].slice(0, 3);

    console.log(
      "FINAL HOMEPAGE PROJECTS:",
      finalProjects.map((project) => ({
        name: project.name,
        link: project.studyCaseLink,
      })),
    );

    return finalProjects;
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error);

    return localProjects.slice(0, 3);
  }
}

export default async function RecentWorkSection() {
  const projects = await getHomepageProjects();

  return <RecentWorkSectionClient projects={projects} />;
}
