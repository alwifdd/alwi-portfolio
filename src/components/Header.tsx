"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "../styles/Header.module.css";

const Header: React.FC = () => {
  const [dotAnimationKey, setDotAnimationKey] = useState(0);

  const hasScrolledAway = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      /*
        Kalau user sudah cukup jauh meninggalkan bagian atas,
        tandai bahwa nanti animasi boleh dimainkan lagi.
      */
      if (scrollY > 120) {
        hasScrolledAway.current = true;
      }

      /*
        Ketika user kembali ke atas,
        jalankan animasi dot sekali lagi.
      */
      if (scrollY <= 20 && hasScrolledAway.current) {
        setDotAnimationKey((prev) => prev + 1);

        hasScrolledAway.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Back to homepage">
          <span className={styles.logoH}>A</span>

          <span key={dotAnimationKey} className={styles.logoDot}>
            .
          </span>
        </Link>

        <nav>
          <a
            href="/CV_MOH ALWI FUAD.pdf"
            download
            className={styles.downloadCvLink}
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
