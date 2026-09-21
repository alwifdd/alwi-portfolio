"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/ArticlesSection.module.css";

export type Article = {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime?: string;
  mediumUrl: string;
  category?: string;
  thumbnailUrl: string;
  thumbnailAlt?: string;
};

type ArticlesSectionProps = {
  articles: Article[];
};

const getAccent = (category?: string) => {
  const normalized = category?.toLowerCase() || "";

  if (normalized.includes("qa") || normalized.includes("testing")) {
    return {
      color: "#8B5CF6",
      soft: "#F3EEFF",
    };
  }

  if (normalized.includes("data")) {
    return {
      color: "#3B82F6",
      soft: "#EDF5FF",
    };
  }

  if (
    normalized.includes("ai") ||
    normalized.includes("ml") ||
    normalized.includes("machine")
  ) {
    return {
      color: "#10B981",
      soft: "#ECFBF5",
    };
  }

  if (normalized.includes("ui") || normalized.includes("ux")) {
    return {
      color: "#F59E0B",
      soft: "#FFF7E8",
    };
  }

  if (normalized.includes("web")) {
    return {
      color: "#06B6D4",
      soft: "#ECFAFC",
    };
  }

  if (normalized.includes("career")) {
    return {
      color: "#EC4899",
      soft: "#FFF0F7",
    };
  }

  return {
    color: "#6366F1",
    soft: "#F1F2FF",
  };
};

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  const [showAll, setShowAll] = useState(false);

  if (articles.length === 0) {
    return null;
  }

  const visibleArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>What I Read &amp; Learn</h2>

          <p className={styles.subtitle}>
            Things I&apos;ve been reading, exploring, and learning along the
            way.
          </p>
        </div>

        <div className={styles.grid}>
          {visibleArticles.map((article) => {
            const accent = getAccent(article.category);

            return (
              <a
                key={article._id}
                href={article.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                style={
                  {
                    "--accent": accent.color,
                    "--accent-soft": accent.soft,
                  } as React.CSSProperties
                }
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={article.thumbnailUrl}
                    alt={article.thumbnailAlt || article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 360px"
                    className={styles.image}
                  />

                  <div className={styles.glass}>
                    {article.readTime && (
                       <div className={styles.meta}>
      <span>{article.readTime}</span>
    </div>
  )}

  <h3 className={styles.cardTitle}>{article.title}</h3>
                    

                    <h3 className={styles.cardTitle}>{article.title}</h3>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p>{article.description}</p>

                  <span className={styles.readMore}>
                    Read on Medium
                    <span className={styles.arrow}>↗</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {articles.length > 3 && (
          <div className={styles.showMoreWrapper}>
            <button
              type="button"
              className={styles.showMore}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;