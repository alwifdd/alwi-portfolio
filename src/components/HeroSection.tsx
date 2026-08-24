"use client";

import React, { useRef, useState } from "react";
import { FiArrowDown } from "react-icons/fi";

import styles from "../styles/HeroSection.module.css";
import StatusIndicator from "./StatusIndicator";

type CursorMode = "default" | "title" | "text";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || !lensRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    lensRef.current.style.left = `${x}px`;
    lensRef.current.style.top = `${y}px`;
  };

  const getCursorClass = () => {
    if (cursorMode === "title") {
      return styles.cursorTitle;
    }

    if (cursorMode === "text") {
      return styles.cursorText;
    }

    return styles.cursorDefault;
  };

  return (
    <section
      ref={heroRef}
      className={styles.heroSection}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => {
        setCursorVisible(false);
        setCursorMode("default");
      }}
    >
      {/* LIQUID CURSOR */}
      <div
        ref={lensRef}
        className={`
          ${styles.liquidCursor}
          ${getCursorClass()}
          ${cursorVisible ? styles.cursorVisible : ""}
        `}
      />

      {/* HERO CONTENT */}
      <div className={styles.heroContent}>
        <StatusIndicator text="Available For Works" isAvailable={true} />

        <h1
          className={styles.heroTitle}
          onMouseEnter={() => setCursorMode("title")}
          onMouseLeave={() => setCursorMode("default")}
        >
          Hello I&apos;m <span className={styles.alwiText}>Alwi</span>
        </h1>

        <p
          className={styles.heroDescription}
          onMouseEnter={() => setCursorMode("text")}
          onMouseLeave={() => setCursorMode("default")}
        >
          I&apos;m a fullstack developer with a strong interest in design. I
          build responsive, functional, and user-friendly web experiences
          combining clean code, usability, and smooth interaction across all
          devices.
        </p>

        <p className={styles.heroMicrocopy}>
          Glad you&apos;re here — enjoy exploring ^^
        </p>

        {/* SCROLL TO PROJECTS */}
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
