"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";

import styles from "../styles/ExperienceSection.module.css";

export interface ExperienceViewModel {
  id: string;

  companyName: string;

  title: string;

  type: string;

  logo: string;

  detailLogo: string;

  period: string;

  timelineLabel: string;

  description: string[];

  companyUrl?: string;
}

interface ExperienceSectionClientProps {
  experiences: ExperienceViewModel[];
}

const ExperienceSectionClient: React.FC<ExperienceSectionClientProps> = ({
  experiences,
}) => {
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? "");

  const [hasOverflow, setHasOverflow] = useState(false);

  const [canScrollBackward, setCanScrollBackward] = useState(false);

  const [canScrollForward, setCanScrollForward] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      experiences.length > 0 &&
      !experiences.some((experience) => experience.id === activeId)
    ) {
      setActiveId(experiences[0].id);
    }
  }, [experiences, activeId]);

  const activeExperience =
    experiences.find((experience) => experience.id === activeId) ??
    experiences[0];

  const updateScrollState = useCallback(() => {
    const viewport = timelineRef.current;

    if (!viewport) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const overflow = viewport.scrollHeight > viewport.clientHeight + 2;

      setHasOverflow(overflow);

      setCanScrollBackward(viewport.scrollTop > 2);

      setCanScrollForward(
        viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 2,
      );
    } else {
      const overflow = viewport.scrollWidth > viewport.clientWidth + 2;

      setHasOverflow(overflow);

      setCanScrollBackward(viewport.scrollLeft > 2);

      setCanScrollForward(
        viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 2,
      );
    }
  }, []);

  useEffect(() => {
    const viewport = timelineRef.current;

    if (!viewport) return;

    updateScrollState();

    viewport.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollState);

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });

    resizeObserver.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", updateScrollState);

      window.removeEventListener("resize", updateScrollState);

      resizeObserver.disconnect();
    };
  }, [experiences, updateScrollState]);

  const centerExperience = (experienceId: string) => {
    const viewport = timelineRef.current;

    const element = document.getElementById(`experience-${experienceId}`);

    if (!viewport || !element) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const target =
        element.offsetTop -
        viewport.clientHeight / 2 +
        element.clientHeight / 2;

      viewport.scrollTo({
        top: Math.max(0, target),
        behavior: "smooth",
      });
    } else {
      const target =
        element.offsetLeft - viewport.clientWidth / 2 + element.clientWidth / 2;

      viewport.scrollTo({
        left: Math.max(0, target),
        behavior: "smooth",
      });
    }

    window.setTimeout(updateScrollState, 350);
  };

  const handleExperienceClick = (experienceId: string) => {
    setActiveId(experienceId);

    requestAnimationFrame(() => {
      centerExperience(experienceId);
    });
  };

  const handleTimelineScroll = (direction: "left" | "right") => {
    const viewport = timelineRef.current;

    if (!viewport) return;

    const amount = Math.min(viewport.clientWidth * 0.72, 520);

    viewport.scrollBy({
      left: direction === "left" ? -amount : amount,

      behavior: "smooth",
    });

    window.setTimeout(updateScrollState, 350);
  };

  if (!activeExperience) {
    return null;
  }

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className="container">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionEyebrow}>My Journey</span>

          <h2 className={styles.sectionTitle}>Experience</h2>

          <p className={styles.sectionDescription}>
            A timeline of the places, programs, and roles that shaped how I work
            and learn.
          </p>
        </div>

        <div className={styles.experienceWorkspace}>
          {/* DETAIL CARD */}

          <div key={activeExperience.id} className={styles.experienceDetailBox}>
            <div className={styles.detailLogoColumn}>
              <div className={styles.detailLogo}>
                {activeExperience.detailLogo ? (
                  <Image
                    src={activeExperience.detailLogo}
                    alt={activeExperience.companyName}
                    width={190}
                    height={190}
                  />
                ) : (
                  <span className={styles.logoPlaceholder}>
                    {activeExperience.companyName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.detailContent}>
              <div className={styles.detailTop}>
                <div>
                  <span className={styles.experienceType}>
                    {activeExperience.type}
                  </span>

                  <h3 className={styles.detailTitle}>
                    {activeExperience.title}
                  </h3>

                  <p className={styles.companyName}>
                    {activeExperience.companyName}
                  </p>

                  <p className={styles.period}>{activeExperience.period}</p>
                </div>

                {activeExperience.companyUrl && (
                  <a
                    href={activeExperience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.companyLink}
                    aria-label={`Visit ${activeExperience.companyName}`}
                  >
                    <FiExternalLink />
                  </a>
                )}
              </div>

              <ul className={styles.descriptionList}>
                {activeExperience.description.map((description, index) => (
                  <li key={index}>{description}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* TIMELINE */}

          <div className={styles.timelineArea}>
            {hasOverflow && (
              <button
                type="button"
                className={`${styles.timelineArrow} ${styles.timelineArrowLeft}`}
                onClick={() => handleTimelineScroll("left")}
                disabled={!canScrollBackward}
                aria-label="Previous experiences"
              >
                <FiChevronLeft />
              </button>
            )}

            <div ref={timelineRef} className={styles.timelineViewport}>
              <div className={styles.timelineTrack}>
                {experiences.map((experience) => {
                  const isActive = experience.id === activeId;

                  return (
                    <button
                      type="button"
                      id={`experience-${experience.id}`}
                      key={experience.id}
                      className={`${styles.timelineItem} ${
                        isActive ? styles.active : ""
                      }`}
                      onClick={() => handleExperienceClick(experience.id)}
                      aria-pressed={isActive}
                      title={experience.companyName}
                    >
                      <span className={styles.timelineDot} />

                      <span className={styles.companyLogoWrapper}>
                        {experience.logo ? (
                          <Image
                            src={experience.logo}
                            alt={experience.companyName}
                            width={64}
                            height={64}
                          />
                        ) : (
                          <span className={styles.smallLogoPlaceholder}>
                            {experience.companyName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </span>

                      <span className={styles.timelineCompany}>
                        {experience.companyName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {hasOverflow && (
              <button
                type="button"
                className={`${styles.timelineArrow} ${styles.timelineArrowRight}`}
                onClick={() => handleTimelineScroll("right")}
                disabled={!canScrollForward}
                aria-label="Next experiences"
              >
                <FiChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSectionClient;
