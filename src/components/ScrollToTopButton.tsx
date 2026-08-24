// Lokasi: src/components/ScrollToTopButton.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/ScrollToTopButton.module.css";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressStyle = {
    background: `conic-gradient(
      #007bff ${scrollProgress}%, 
      transparent ${scrollProgress}%
    )`,
  };

  return (
    <button
      className={`${styles.scrollToTopBtn} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
      style={progressStyle}
      aria-label="Scroll to top"
    >
      <div className={styles.innerCircle}>
        <FaArrowUp className={styles.arrowIcon} />
      </div>
    </button>
  );
};

export default ScrollToTopButton;
