"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../styles/RecentWorkSection.module.css";
import type { ProjectItem } from "../data/projects";

interface RecentWorkSectionClientProps {
  projects: ProjectItem[];
}

const RecentWorkSectionClient: React.FC<RecentWorkSectionClientProps> = ({
  projects,
}) => {
  const isOdd = (index: number) => (index + 1) % 2 !== 0;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    cssEase: "linear",
  };

  return (
    <section id="selected-work" className={styles.recentWorkSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Selected Work</h2>

        <div className={styles.projectsContainer}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.projectRow} ${
                isOdd(index) ? styles.oddRow : styles.evenRow
              }`}
            >
              {/* PROJECT IMAGE */}
              <div
                className={styles.projectImageColumn}
                style={{
                  backgroundColor: project.bgColor || "#4E8DF7",
                }}
              >
                <div
                  className={styles.projectWavePattern}
                  style={{
                    backgroundImage: `url("${project.patternBg}")`,
                  }}
                />

                <Link
                  href={project.studyCaseLink}
                  className={styles.projectImageLink}
                >
                  <div className={styles.mockupSliderContainer}>
                    {project.screenshots.length > 0 ? (
                      <Slider {...sliderSettings}>
                        {project.screenshots.map(
                          (screenshot, screenshotIndex) => (
                            <div
                              key={screenshotIndex}
                              className={styles.screenshotSlide}
                            >
                              <Image
                                src={screenshot}
                                alt={`Screenshot ${project.name} ${
                                  screenshotIndex + 1
                                }`}
                                width={
                                  project.mockupType === "mobile" ? 300 : 600
                                }
                                height={
                                  project.mockupType === "mobile" ? 600 : 400
                                }
                                style={{
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          ),
                        )}
                      </Slider>
                    ) : (
                      <div className={styles.placeholderMockup}>
                        No Images Available
                      </div>
                    )}
                  </div>
                </Link>
              </div>

              {/* PROJECT CONTENT */}
              <div className={styles.projectContentColumn}>
                <h3 className={styles.projectName}>{project.name}</h3>

                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.projectTechs}>
                  {project.technologies.map((technology, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {technology}
                    </span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <Link
                    href={project.studyCaseLink}
                    className={styles.studyCaseButton}
                  >
                    Show Study Case
                  </Link>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionLink}
                    >
                      GitHub
                    </a>
                  )}

                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionLink}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/projects" className={`${styles.seeAllButton} btn`}>
          See All My Works
        </Link>
      </div>
    </section>
  );
};

export default RecentWorkSectionClient;
