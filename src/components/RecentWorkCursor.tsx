"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "../styles/RecentWorkSection.module.css";

const RecentWorkCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const current = useRef({
    x: 0,
    y: 0,
  });

  const previous = useRef({
    x: 0,
    y: 0,
  });

  const hasPointerPosition = useRef(false);
  const isVisible = useRef(false);

  const [mounted, setMounted] = useState(false);

  /* ================================================= */
  /* MOUNT                                             */
  /* ================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ================================================= */
  /* CURSOR LOGIC                                      */
  /* ================================================= */

  useEffect(() => {
    if (!mounted) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointer.matches) return;

    /*
      Lebih aman pakai ID section
      daripada query CSS module.
    */
    const section = document.getElementById("selected-work");

    if (!section) return;

    let animationFrame = 0;
    let scrollFrame = 0;

    /* ================================================= */
    /* SHOW CURSOR                                       */
    /* ================================================= */

    const showCursor = () => {
      const cursor = cursorRef.current;

      if (!cursor) return;

      if (!isVisible.current) {
        /*
          Saat masuk kembali ke Recent Work,
          langsung muncul di posisi mouse.

          Jadi tidak terbang dari posisi lama.
        */
        current.current.x = mouse.current.x;
        current.current.y = mouse.current.y;

        previous.current.x = mouse.current.x;
        previous.current.y = mouse.current.y;
      }

      isVisible.current = true;

      cursor.classList.add(styles.recentCursorVisible);
    };

    /* ================================================= */
    /* HIDE CURSOR                                       */
    /* ================================================= */

    const hideCursor = () => {
      const cursor = cursorRef.current;

      if (!cursor) return;

      isVisible.current = false;

      cursor.classList.remove(styles.recentCursorVisible);

      /*
        Balikin ke default supaya saat masuk
        section lagi tidak nyangkut mode image/card.
      */
      cursor.dataset.mode = "default";
    };

    /* ================================================= */
    /* DETECT CURSOR MODE                                */
    /* ================================================= */

    const updateCursorMode = (target: HTMLElement) => {
      const cursor = cursorRef.current;

      if (!cursor) return;

      /* IMAGE */

      if (target.closest(`.${styles.projectImageLink}`)) {
        cursor.dataset.mode = "image";
        return;
      }

      /* BUTTON / LINK */

      if (
        target.closest(`.${styles.studyCaseButton}`) ||
        target.closest(`.${styles.actionLink}`) ||
        target.closest(`.${styles.seeAllButton}`)
      ) {
        cursor.dataset.mode = "interactive";
        return;
      }

      /* PROJECT CARD */

      if (target.closest(`.${styles.projectRow}`)) {
        cursor.dataset.mode = "card";
        return;
      }

      /* DEFAULT */

      cursor.dataset.mode = "default";
    };

    /* ================================================= */
    /* CHECK IF POINTER IS STILL INSIDE SECTION          */
    /* ================================================= */

    const validatePointerPosition = () => {
      if (!hasPointerPosition.current) {
        hideCursor();
        return;
      }

      /*
        Cari element yang sekarang tepat
        berada di bawah posisi mouse.

        Ini penting saat user SCROLL tanpa
        menggerakkan mouse.
      */
      const elementUnderPointer = document.elementFromPoint(
        mouse.current.x,
        mouse.current.y,
      ) as HTMLElement | null;

      if (!elementUnderPointer) {
        hideCursor();
        return;
      }

      /*
        Kalau element yang sekarang di bawah mouse
        bukan bagian Recent Work -> bubble hilang.
      */
      const isInsideRecentWork = section.contains(elementUnderPointer);

      if (!isInsideRecentWork) {
        hideCursor();
        return;
      }

      /*
        Masih di Recent Work.
      */
      showCursor();

      updateCursorMode(elementUnderPointer);
    };

    /* ================================================= */
    /* GLOBAL POINTER MOVE                               */
    /* ================================================= */

    const handlePointerMove = (event: PointerEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      hasPointerPosition.current = true;

      validatePointerPosition();
    };

    /* ================================================= */
    /* SCROLL FIX                                        */
    /* ================================================= */

    const handleScroll = () => {
      /*
        Scroll bisa fire banyak sekali.
        Jadi kita batasi check ke satu
        requestAnimationFrame per frame.
      */

      if (scrollFrame) {
        cancelAnimationFrame(scrollFrame);
      }

      scrollFrame = requestAnimationFrame(() => {
        validatePointerPosition();

        scrollFrame = 0;
      });
    };

    /* ================================================= */
    /* WINDOW LEAVE                                      */
    /* ================================================= */

    const handleWindowBlur = () => {
      hideCursor();
    };

    const handleDocumentLeave = (event: MouseEvent) => {
      /*
        relatedTarget null =
        pointer benar-benar keluar window/browser area.
      */
      if (!event.relatedTarget) {
        hideCursor();
      }
    };

    /* ================================================= */
    /* FAST + SMOOTH ANIMATION                           */
    /* ================================================= */

    const animate = () => {
      const cursor = cursorRef.current;

      if (cursor && isVisible.current) {
        /*
          Responsive tapi tetap sedikit liquid.
        */
        const ease = 0.32;

        current.current.x += (mouse.current.x - current.current.x) * ease;

        current.current.y += (mouse.current.y - current.current.y) * ease;

        /* ============================================= */
        /* VELOCITY                                      */
        /* ============================================= */

        const velocityX = mouse.current.x - previous.current.x;

        const velocityY = mouse.current.y - previous.current.y;

        const speed = Math.min(Math.hypot(velocityX, velocityY), 22);

        /*
          Sedikit stretch.
          Nggak terlalu jelly/lambat.
        */
        const scaleX = 1 + speed * 0.005;

        const scaleY = Math.max(1 - speed * 0.002, 0.9);

        const rotation = Math.atan2(velocityY, velocityX) * (180 / Math.PI);

        /* ============================================= */
        /* APPLY                                         */
        /* ============================================= */

        cursor.style.left = `${current.current.x}px`;

        cursor.style.top = `${current.current.y}px`;

        cursor.style.setProperty("--cursor-rotation", `${rotation}deg`);

        cursor.style.setProperty("--cursor-scale-x", `${scaleX}`);

        cursor.style.setProperty("--cursor-scale-y", `${scaleY}`);

        /* ============================================= */
        /* RECOVERY                                      */
        /* ============================================= */

        previous.current.x += (mouse.current.x - previous.current.x) * 0.55;

        previous.current.y += (mouse.current.y - previous.current.y) * 0.55;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    /* ================================================= */
    /* EVENTS                                            */
    /* ================================================= */

    /*
      Pointer move sekarang GLOBAL.

      Jadi kita selalu tahu mouse ada di mana,
      bukan cuma saat Recent Work menerima event.
    */
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    /*
      FIX UTAMA BUG:
      setiap scroll kita cek element
      yang berada di bawah mouse.
    */
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll, {
      passive: true,
    });

    window.addEventListener("blur", handleWindowBlur);

    document.addEventListener("mouseout", handleDocumentLeave);

    /* ================================================= */
    /* START                                             */
    /* ================================================= */

    animationFrame = requestAnimationFrame(animate);

    /* ================================================= */
    /* CLEANUP                                           */
    /* ================================================= */

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);

      window.removeEventListener("blur", handleWindowBlur);

      document.removeEventListener("mouseout", handleDocumentLeave);

      cancelAnimationFrame(animationFrame);

      if (scrollFrame) {
        cancelAnimationFrame(scrollFrame);
      }
    };
  }, [mounted]);

  /* ================================================= */
  /* BEFORE MOUNT                                      */
  /* ================================================= */

  if (!mounted) return null;

  /* ================================================= */
  /* CURSOR                                            */
  /* ================================================= */

  return createPortal(
    <div
      ref={cursorRef}
      className={styles.recentWorkCursor}
      data-mode="default"
      aria-hidden="true"
    >
      <div className={styles.recentCursorInner} />

      <div className={styles.recentCursorHighlight} />
    </div>,
    document.body,
  );
};

export default RecentWorkCursor;
