import type { Metadata } from "next";

import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import StudyCaseRenderer, {
  type StudyCaseBlock,
} from "@/components/StudyCaseRenderer";

import styles from "./StudyCasePage.module.css";

// =====================================================
// CONFIG
// =====================================================

const SITE_URL = "https://alwifuad.vercel.app";

// =====================================================
// TYPES
// =====================================================

interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  category?: string;
  year?: string;
  role?: string;
  duration?: string;
  thumbnail?: unknown;
  cardBackgroundColor?: string | null;
  technologies?: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  studyCase?: StudyCaseBlock[];
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// =====================================================
// FETCH PROJECT
// =====================================================

const getProject = cache(async (slug: string) => {
  return client.fetch<Project | null>(projectBySlugQuery, {
    slug,
  });
});

// =====================================================
// DYNAMIC SEO METADATA
// =====================================================

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const canonicalUrl = `${SITE_URL}/projects/${slug}`;

  const description =
    project.shortDescription ||
    `Explore the ${project.title} project case study.`;

  const heroImage = project.thumbnail
    ? urlFor(project.thumbnail).width(1600).height(1000).quality(90).url()
    : null;

  return {
    title: project.title,

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: project.title,
      description,
      url: canonicalUrl,
      siteName: "Moh Alwi Fuad Portfolio",
      type: "article",

      images: heroImage
        ? [
            {
              url: heroImage,
              width: 1600,
              height: 1000,
              alt: project.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: heroImage ? [heroImage] : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// =====================================================
// PAGE
// =====================================================

export default async function ProjectStudyCasePage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const heroImage = project.thumbnail
    ? urlFor(project.thumbnail).width(1600).quality(90).url()
    : null;

  return (
    <>
      {/* ============================================ */}
      {/* BACK NAVIGATION                              */}
      {/* ============================================ */}

      <header className={styles.studyCaseHeader}>
        <Link href="/#selected-work" className={styles.backLink}>
          <FiArrowLeft className={styles.backArrow} aria-hidden="true" />

          <span>Back to my work</span>
        </Link>
      </header>

      {/* ============================================ */}
      {/* STUDY CASE PAGE                              */}
      {/* ============================================ */}

      <main className={styles.studyCasePage}>
        {/* ========================================== */}
        {/* HERO                                       */}
        {/* ========================================== */}

        <section className={styles.hero}>
          {/* ======================================== */}
          {/* LEFT CONTENT                             */}
          {/* ======================================== */}

          <div className={styles.heroContent}>
            {project.category && (
              <span className={styles.category}>
                {project.category.replaceAll("-", " ")}
              </span>
            )}

            <h1 className={styles.title}>{project.title}</h1>

            {project.shortDescription && (
              <p className={styles.description}>{project.shortDescription}</p>
            )}

            {/* ====================================== */}
            {/* META                                   */}
            {/* ====================================== */}

            <div className={styles.meta}>
              {project.role && (
                <div>
                  <span>Role</span>
                  <strong>{project.role}</strong>
                </div>
              )}

              {project.duration && (
                <div>
                  <span>Duration</span>
                  <strong>{project.duration}</strong>
                </div>
              )}

              {project.year && (
                <div>
                  <span>Year</span>
                  <strong>{project.year}</strong>
                </div>
              )}
            </div>

            {/* ====================================== */}
            {/* TECHNOLOGIES                           */}
            {/* ====================================== */}

            {project.technologies && project.technologies.length > 0 && (
              <div className={styles.techs}>
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            )}

            {/* ====================================== */}
            {/* ACTIONS                                */}
            {/* ====================================== */}

            <div className={styles.actions}>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  Live Demo
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryButton}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* ======================================== */}
          {/* RIGHT IMAGE                              */}
          {/* ======================================== */}

          {heroImage && (
            <div
              className={styles.heroImageBox}
              style={{
                backgroundColor: project.cardBackgroundColor || "#4E8DF7",
              }}
            >
              <Image
                src={heroImage}
                alt={project.title}
                width={1600}
                height={1000}
                priority
                className={styles.heroImage}
              />
            </div>
          )}
        </section>

        {/* ========================================== */}
        {/* STUDY CASE CONTENT                         */}
        {/* ========================================== */}

        <article className={styles.article}>
          <StudyCaseRenderer value={project.studyCase ?? []} />
        </article>
      </main>
    </>
  );
}
