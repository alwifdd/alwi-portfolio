// src/data/projects.ts

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  studyCaseLink: string;
  githubLink?: string;
  demoLink?: string;
  mockupType: "mobile" | "desktop";
  screenshots: string[];
  bgColor: string;
  patternBg: string;
}

/*
  Legacy/local projects sudah tidak digunakan.

  Project sekarang dikelola melalui Sanity CMS.
  Array ini sementara tetap ada karena beberapa
  component masih menggunakan ProjectItem
  dan localProjects sebagai fallback.
*/
export const projects: ProjectItem[] = [];
