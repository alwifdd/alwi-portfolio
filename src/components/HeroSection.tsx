"use client";

import React from "react";
import { FiArrowDown } from "react-icons/fi";

import styles from "../styles/HeroSection.module.css";
import StatusIndicator from "./StatusIndicator";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <StatusIndicator text="Available For Works" isAvailable={true} />

        <h1 className={styles.heroTitle}>
          Hello I&apos;m <span className={styles.alwiText}>Alwi</span>
        </h1>

        <p className={styles.heroDescription}>
          I&apos;m an Information Systems graduate who enjoys building,
          testing, and improving digital products. I work across QA, UI/UX,
          data, and web development, with a focus on creating useful and
          user-friendly experiences.
        </p>

        <p className={styles.heroMicrocopy}>
          Glad you&apos;re here — enjoy exploring ^^
        </p>

        <a
          href="#selected-work"
          className={styles.scrollIndicator}
          aria-label="Scroll to selected work"
        >
          <span className={styles.scrollButton}>
            <FiArrowDown />
          </span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;