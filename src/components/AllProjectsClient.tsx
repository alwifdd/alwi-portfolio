"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import styles from "../styles/AllProjects.module.css";

interface ProjectCardItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  categories: string[];
  thumbnail: string;
  cardColor: string;
  technologies: string[];
}

interface AllProjectsClientProps {
  projects: ProjectCardItem[];
}

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "AI / ML",
    value: "ai-ml",
  },
  {
    label: "Data",
    value: "data",
  },
  {
    label: "Web",
    value: "web",
  },
  {
    label: "UI / UX",
    value: "ui-ux",
  },
];

function formatCategory(category: string) {
  switch (category) {
    case "ai-ml":
      return "AI / ML";

    case "data":
      return "Data";

    case "web":
      return "Web";

    case "ui-ux":
      return "UI / UX";

    default:
      return category;
  }
}

const AllProjectsClient: React.FC<AllProjectsClientProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.includes(activeFilter),
    );
  }, [activeFilter, projects]);

  return (
    <section className={styles.projectsPage}>
      <div className="container">
        <div className={styles.heading}>
          <span className={styles.eyebrow}>Selected & Beyond</span>

          <h1 className={styles.title}>All Projects</h1>

          <p className={styles.description}>
            A collection of projects I&apos;ve built, explored, researched, and
            designed across AI, data, web, and product experiences.
          </p>
        </div>

        <div
          className={styles.filters}
          role="tablist"
          aria-label="Project categories"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                className={`${styles.filterButton} ${
                  isActive ? styles.filterButtonActive : ""
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filteredProjects.length > 0 ? (
          <div className={styles.grid}>
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={styles.card}
              >
                <div
                  className={styles.imageArea}
                  style={{
                    backgroundColor: project.cardColor,
                  }}
                >
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={1200}
                      height={800}
                      className={styles.projectImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      {project.title.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className={styles.openIndicator}>
                    <FiArrowUpRight />
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.categoryList}>
                    {project.categories.map((category) => (
                      <span key={category} className={styles.category}>
                        {formatCategory(category)}
                      </span>
                    ))}
                  </div>

                  <h2 className={styles.cardTitle}>{project.title}</h2>

                  <p className={styles.cardDescription}>
                    {project.description}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className={styles.techList}>
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className={styles.tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjectsClient;
