import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock, TypedObject } from "@portabletext/types";

import { urlFor } from "@/sanity/lib/image";
import styles from "../styles/StudyCaseRenderer.module.css";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

interface SectionTitleBlock extends TypedObject {
  _type: "sectionTitle";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

interface StudyCaseImageBlock extends TypedObject {
  _type: "studyCaseImage";
  image?: unknown;
  alt?: string;
  caption?: string;
  layout?: "content" | "wide" | "full";
  borderRadius?: boolean;
}

interface StatsBlock extends TypedObject {
  _type: "statsBlock";
  title?: string;
  items?: {
    _key?: string;
    value?: string;
    label?: string;
  }[];
}

interface CardGridBlock extends TypedObject {
  _type: "cardGrid";
  title?: string;
  columns?: number;
  cards?: {
    _key?: string;
    title?: string;
    description?: string;
    backgroundColor?: string;
    textColor?: string;
  }[];
}

interface TwoColumnBlock extends TypedObject {
  _type: "twoColumn";
  leftTitle?: string;
  leftText?: string;
  leftColor?: string;
  rightTitle?: string;
  rightText?: string;
  rightColor?: string;
}

interface GalleryBlock extends TypedObject {
  _type: "gallery";
  title?: string;
  columns?: number;
  images?: {
    _key?: string;
    asset?: unknown;
    alt?: string;
    caption?: string;
  }[];
}

/* ================================================= */
/* YOUTUBE VIDEO                                     */
/* ================================================= */

interface YouTubeVideoBlock extends TypedObject {
  _type: "youtubeVideo";
  title?: string;
  url?: string;
  caption?: string;
  layout?: "content" | "wide";
}

interface HighlightBlock extends TypedObject {
  _type: "highlight";
  label?: string;
  title?: string;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface SpacerBlock extends TypedObject {
  _type: "spacer";
  size?: "small" | "medium" | "large";
  showDivider?: boolean;
}

export type StudyCaseBlock =
  | PortableTextBlock
  | SectionTitleBlock
  | StudyCaseImageBlock
  | StatsBlock
  | CardGridBlock
  | TwoColumnBlock
  | GalleryBlock
  | YouTubeVideoBlock
  | HighlightBlock
  | SpacerBlock;

/* ================================================= */
/* YOUTUBE HELPERS                                   */
/* ================================================= */

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    const hostname = parsedUrl.hostname.replace("www.", "");

    /* youtube.com/watch?v=... */
    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      /*
        youtube.com/embed/...
        youtube.com/shorts/...
        youtube.com/live/...
      */
      const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

      if (
        pathParts[0] === "embed" ||
        pathParts[0] === "shorts" ||
        pathParts[0] === "live"
      ) {
        return pathParts[1] || null;
      }
    }

    /* youtu.be/... */
    if (hostname === "youtu.be") {
      const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

      return pathParts[0] || null;
    }

    return null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) {
    return null;
  }

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  /*
    youtube-nocookie = privacy enhanced embed
  */
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/* ================================================= */
/* PORTABLE TEXT COMPONENTS                          */
/* ================================================= */

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,

    h2: ({ children }) => <h2 className={styles.richH2}>{children}</h2>,

    h3: ({ children }) => <h3 className={styles.richH3}>{children}</h3>,

    h4: ({ children }) => <h4 className={styles.richH4}>{children}</h4>,

    blockquote: ({ children }) => (
      <blockquote className={styles.quote}>{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className={styles.list}>{children}</ul>,

    number: ({ children }) => <ol className={styles.list}>{children}</ol>,
  },

  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";

      const external = href.startsWith("http");

      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={styles.inlineLink}
        >
          {children}
        </a>
      );
    },
  },

  types: {
    /* ================================================= */
    /* SECTION TITLE                                     */
    /* ================================================= */

    sectionTitle: ({ value }) => {
      const block = value as SectionTitleBlock;

      return (
        <section className={styles.sectionTitleBlock}>
          {block.eyebrow && (
            <span className={styles.eyebrow}>{block.eyebrow}</span>
          )}

          {block.title && (
            <h2 className={styles.sectionHeading}>{block.title}</h2>
          )}

          {block.subtitle && (
            <p className={styles.sectionSubtitle}>{block.subtitle}</p>
          )}
        </section>
      );
    },

    /* ================================================= */
    /* IMAGE                                             */
    /* ================================================= */

    studyCaseImage: ({ value }) => {
      const block = value as StudyCaseImageBlock;

      if (!block.image) {
        return null;
      }

      const imageUrl = urlFor(block.image).width(1800).quality(90).url();

      const layoutClass =
        block.layout === "full"
          ? styles.imageFull
          : block.layout === "content"
            ? styles.imageContent
            : styles.imageWide;

      return (
        <figure className={`${styles.imageBlock} ${layoutClass}`}>
          <Image
            src={imageUrl}
            alt={block.alt || block.caption || "Project image"}
            width={1800}
            height={1100}
            className={`${styles.studyImage} ${
              block.borderRadius === false ? styles.noRadius : ""
            }`}
          />

          {block.caption && (
            <figcaption className={styles.caption}>{block.caption}</figcaption>
          )}
        </figure>
      );
    },

    /* ================================================= */
    /* STATISTICS                                        */
    /* ================================================= */

    statsBlock: ({ value }) => {
      const block = value as StatsBlock;

      return (
        <section className={styles.statsSection}>
          {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}

          <div className={styles.statsGrid}>
            {block.items?.map((item, index) => (
              <div key={item._key || index} className={styles.statCard}>
                <strong className={styles.statValue}>{item.value}</strong>

                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      );
    },

    /* ================================================= */
    /* COLORED CARDS                                     */
    /* ================================================= */

    cardGrid: ({ value }) => {
      const block = value as CardGridBlock;

      return (
        <section className={styles.blockSection}>
          {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}

          <div
            className={styles.cardGrid}
            style={{
              gridTemplateColumns: `repeat(${
                block.columns || 2
              }, minmax(0, 1fr))`,
            }}
          >
            {block.cards?.map((card, index) => (
              <div
                key={card._key || index}
                className={styles.colorCard}
                style={{
                  backgroundColor: card.backgroundColor || "#F5F7FA",
                  color: card.textColor || "#333333",
                }}
              >
                {card.title && (
                  <h4 className={styles.colorCardTitle}>{card.title}</h4>
                )}

                {card.description && (
                  <p className={styles.colorCardText}>{card.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    },

    /* ================================================= */
    /* TWO COLUMN                                        */
    /* ================================================= */

    twoColumn: ({ value }) => {
      const block = value as TwoColumnBlock;

      return (
        <section className={styles.twoColumn}>
          <div
            className={styles.columnCard}
            style={{
              backgroundColor: block.leftColor || "#F5F7FA",
            }}
          >
            {block.leftTitle && <h3>{block.leftTitle}</h3>}

            {block.leftText && <p>{block.leftText}</p>}
          </div>

          <div
            className={styles.columnCard}
            style={{
              backgroundColor: block.rightColor || "#F5F7FA",
            }}
          >
            {block.rightTitle && <h3>{block.rightTitle}</h3>}

            {block.rightText && <p>{block.rightText}</p>}
          </div>
        </section>
      );
    },

    /* ================================================= */
    /* GALLERY                                           */
    /* ================================================= */

    gallery: ({ value }) => {
      const block = value as GalleryBlock;

      return (
        <section className={styles.blockSection}>
          {block.title && <h3 className={styles.blockTitle}>{block.title}</h3>}

          <div
            className={styles.gallery}
            style={{
              gridTemplateColumns: `repeat(${
                block.columns || 2
              }, minmax(0, 1fr))`,
            }}
          >
            {block.images?.map((image, index) => {
              const imageUrl = urlFor(image).width(1400).quality(90).url();

              return (
                <figure
                  key={image._key || index}
                  className={styles.galleryItem}
                >
                  <Image
                    src={imageUrl}
                    alt={image.alt || image.caption || "Gallery image"}
                    width={1400}
                    height={900}
                    className={styles.galleryImage}
                  />

                  {image.caption && (
                    <figcaption className={styles.caption}>
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      );
    },

    /* ================================================= */
    /* YOUTUBE VIDEO                                     */
    /* ================================================= */

    youtubeVideo: ({ value }) => {
      const block = value as YouTubeVideoBlock;

      const embedUrl = getYouTubeEmbedUrl(block.url);

      if (!embedUrl) {
        return null;
      }

      const layoutClass =
        block.layout === "content" ? styles.youtubeContent : styles.youtubeWide;

      return (
        <section className={`${styles.youtubeSection} ${layoutClass}`}>
          {block.title && (
            <h3 className={styles.youtubeTitle}>{block.title}</h3>
          )}

          <div className={styles.youtubeFrame}>
            <iframe
              src={embedUrl}
              title={block.title || "Project walkthrough video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {block.caption && (
            <p className={styles.youtubeCaption}>{block.caption}</p>
          )}
        </section>
      );
    },

    /* ================================================= */
    /* HIGHLIGHT                                         */
    /* ================================================= */

    highlight: ({ value }) => {
      const block = value as HighlightBlock;

      return (
        <section
          className={styles.highlight}
          style={{
            backgroundColor: block.backgroundColor || "#4E8DF7",

            color: block.textColor || "#FFFFFF",
          }}
        >
          {block.label && (
            <span className={styles.highlightLabel}>{block.label}</span>
          )}

          {block.title && (
            <h3 className={styles.highlightTitle}>{block.title}</h3>
          )}

          {block.text && <p className={styles.highlightText}>{block.text}</p>}
        </section>
      );
    },

    /* ================================================= */
    /* SPACING                                           */
    /* ================================================= */

    spacer: ({ value }) => {
      const block = value as SpacerBlock;

      const spacerClass =
        block.size === "large"
          ? styles.spacerLarge
          : block.size === "small"
            ? styles.spacerSmall
            : styles.spacerMedium;

      return (
        <div
          className={`${spacerClass} ${
            block.showDivider ? styles.divider : ""
          }`}
        />
      );
    },
  },
};

/* ================================================= */
/* RENDERER                                          */
/* ================================================= */

export default function StudyCaseRenderer({
  value,
}: {
  value: StudyCaseBlock[];
}) {
  if (!value || value.length === 0) {
    return <p className={styles.empty}>Study case content belum tersedia.</p>;
  }

  return (
    <div className={styles.builder}>
      <PortableText value={value} components={components} />
    </div>
  );
}
