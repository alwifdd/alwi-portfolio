import AllProjectsClient from "@/components/AllProjectsClient";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

interface SanityProject {
  _id: string;
  title: string;
  slug?: string;
  shortDescription?: string;
  categories?: string[];
  thumbnail?: Parameters<typeof urlFor>[0];
  cardColor?: string;
  technologies?: string[];
  techs?: string[];
}

export interface ProjectCardItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  categories: string[];
  thumbnail: string;
  cardColor: string;
  technologies: string[];
}

async function getProjects(): Promise<ProjectCardItem[]> {
  const projects = await client.fetch<SanityProject[]>(allProjectsQuery);

  return projects
    .filter((project) => Boolean(project.slug))
    .map((project) => ({
      id: project._id,

      title: project.title,

      slug: project.slug!,

      description: project.shortDescription ?? "",

      categories: project.categories ?? [],

      thumbnail: project.thumbnail
        ? urlFor(project.thumbnail).width(1200).quality(90).url()
        : "",

      cardColor: project.cardColor || "#f4f6f8",

      technologies: project.technologies ?? project.techs ?? [],
    }));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <AllProjectsClient projects={projects} />
    </main>
  );
}
