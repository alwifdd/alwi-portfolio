import ExperienceSectionClient, {
  type ExperienceViewModel,
} from "./ExperienceSectionClient";

import { client } from "@/sanity/lib/client";
import { experiencesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import { experiences as localExperiences } from "../data/experience";

type SanityImageSource = Parameters<typeof urlFor>[0];

interface SanityExperience {
  _id: string;

  companyName: string;
  title: string;
  type?: string;

  logo?: SanityImageSource;
  detailLogo?: SanityImageSource;

  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;

  description?: string[];

  companyUrl?: string | null;
}

function formatMonthYear(date?: string) {
  if (!date) return "";

  const [year, month] = date.split("-");

  if (!year || !month) {
    return date;
  }

  const parsedDate = new Date(Date.UTC(Number(year), Number(month) - 1, 1));

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
}

function formatExperienceType(type?: string) {
  switch (type) {
    case "full-time":
      return "Full-time";

    case "part-time":
      return "Part-time";

    case "internship":
      return "Internship";

    case "freelance":
      return "Freelance";

    case "assistantship":
      return "Assistantship";

    case "independent-study":
      return "Independent Study";

    case "program":
      return "Bootcamp / Program";

    case "course":
      return "Course / Training";

    case "organization":
      return "Organization";

    default:
      return "Program";
  }
}

function getLocalType(companyName: string) {
  const company = companyName.toLowerCase();

  if (company.includes("practicum") || company.includes("assistant")) {
    return "Assistantship";
  }

  if (company.includes("dicoding") || company.includes("coding camp")) {
    return "Bootcamp / Program";
  }

  if (company.includes("digital talent") || company.includes("alibaba")) {
    return "Course / Training";
  }

  return "Work";
}

function convertSanityExperiences(
  experiences: SanityExperience[],
): ExperienceViewModel[] {
  return experiences.map((experience) => {
    const start = formatMonthYear(experience.startDate);

    const end = experience.isCurrent
      ? "Present"
      : formatMonthYear(experience.endDate);

    const startYear = experience.startDate?.slice(0, 4) ?? "";

    return {
      id: experience._id,

      companyName: experience.companyName,

      title: experience.title,

      type: formatExperienceType(experience.type),

      logo: experience.logo
        ? urlFor(experience.logo)
            .width(300)
            .height(300)
            .fit("max")
            .quality(90)
            .url()
        : "",

      detailLogo: experience.detailLogo
        ? urlFor(experience.detailLogo)
            .width(600)
            .height(600)
            .fit("max")
            .quality(95)
            .url()
        : experience.logo
          ? urlFor(experience.logo)
              .width(600)
              .height(600)
              .fit("max")
              .quality(95)
              .url()
          : "",

      period: `${start}${end ? ` — ${end}` : ""}`,

      timelineLabel: experience.isCurrent ? "Present" : startYear,

      description: experience.description ?? [],

      companyUrl: experience.companyUrl ?? undefined,
    };
  });
}

function getLocalFallback(): ExperienceViewModel[] {
  return [...localExperiences].reverse().map((experience) => {
    const yearMatch = experience.period.match(/\d{4}/);

    return {
      id: `local-${experience.id}`,

      companyName: experience.companyName,

      title: experience.title,

      type: getLocalType(experience.companyName),

      logo: experience.logo,

      detailLogo: experience.detailLogo || experience.logo,

      period: experience.period,

      timelineLabel: experience.period.includes("Present")
        ? "Present"
        : yearMatch?.[0] || "",

      description: experience.description,
    };
  });
}

async function getExperiences(): Promise<ExperienceViewModel[]> {
  try {
    const sanityExperiences =
      await client.fetch<SanityExperience[]>(experiencesQuery);

    if (!sanityExperiences.length) {
      return getLocalFallback();
    }

    return convertSanityExperiences(sanityExperiences);
  } catch (error) {
    console.error("Failed to fetch experiences from Sanity:", error);

    return getLocalFallback();
  }
}

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  if (!experiences.length) {
    return null;
  }

  return <ExperienceSectionClient experiences={experiences} />;
}
