import HeroSection from "../../components/HeroSection";
import RecentWorkSection from "../../components/RecentWorkSection";
import ExperienceSection from "../../components/ExperienceSection";
import ArticlesSection, {
  type Article,
} from "../../components/ArticlesSection";
import CertificateSection from "../../components/CertificateSection";
import DocumentationSection from "../../components/DocumentationSection";
import AIChatWidget from "../../components/AIChat/AIChatWidget";

import { client } from "../../sanity/lib/client";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://alwifuad.vercel.app/#website",
      url: "https://alwifuad.vercel.app/",
      name: "Moh Alwi Fuad | Portfolio",
      description:
        "Portfolio of Moh Alwi Fuad showcasing projects and experience in data, artificial intelligence, machine learning, web development, and UI/UX.",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://alwifuad.vercel.app/#person",
      name: "Moh Alwi Fuad",
      url: "https://alwifuad.vercel.app/",
      jobTitle: "Information Systems Student",
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Gunadarma",
      },
      sameAs: [
        "https://www.linkedin.com/in/mohalwifif/",
        "https://github.com/alwifdd",
      ],
      knowsAbout: [
        "Data Analysis",
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Web Development",
        "UI/UX Design",
      ],
    },
  ],
};

export default async function Home() {
  const articles = await client.fetch<Article[]>(
    `*[
      _type == "article" &&
      visible == true
    ] | order(publishedAt desc) {
      _id,
      title,
      description,
      publishedAt,
      readTime,
      mediumUrl,
      category,
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": thumbnail.alt
    }`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <HeroSection />

      <RecentWorkSection />

      <ExperienceSection />

      <ArticlesSection articles={articles} />

      <CertificateSection />

      <DocumentationSection />

      <AIChatWidget />
    </>
  );
}