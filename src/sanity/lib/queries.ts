// src/sanity/lib/queries.ts

// =====================================================
// SELECTED WORK — HOMEPAGE
// =====================================================

export const featuredProjectsQuery = `
  *[
    _type == "project" &&
    visible != false &&
    featured == true
  ]
  | order(order asc, _createdAt desc) {
    _id,
    title,

    "slug": slug.current,

    shortDescription,

    categories,
    year,
    role,
    duration,

    thumbnail,

    cardBackgroundColor,
    "cardColor": cardBackgroundColor.hex,

    technologies,
    "techs": technologies,

    githubUrl,
    demoUrl,

    featured,
    visible,
    order
  }
`;

// =====================================================
// ALL PROJECTS — /projects
// =====================================================

export const allProjectsQuery = `
  *[
    _type == "project" &&
    visible != false
  ]
  | order(order asc, _createdAt desc) {
    _id,
    title,

    "slug": slug.current,

    shortDescription,

    categories,
    year,
    role,
    duration,

    thumbnail,

    cardBackgroundColor,
    "cardColor": cardBackgroundColor.hex,

    technologies,
    "techs": technologies,

    githubUrl,
    demoUrl,

    featured,
    visible,
    order
  }
`;

// =====================================================
// PROJECT DETAIL — /projects/[slug]
// =====================================================

export const projectBySlugQuery = `
  *[
    _type == "project" &&
    slug.current == $slug &&
    visible != false
  ][0] {
    _id,
    title,

    "slug": slug.current,

    shortDescription,

    categories,
    year,
    role,
    duration,

    thumbnail,

    cardBackgroundColor,
    "cardColor": cardBackgroundColor.hex,

    technologies,
    "techs": technologies,

    githubUrl,
    demoUrl,

    featured,
    visible,
    order,

    studyCase
  }
`;

// =====================================================
// EXPERIENCE
// =====================================================

export const experiencesQuery = `
  *[
    _type == "experience" &&
    visible != false
  ]
  | order(
      isCurrent desc,
      endDate desc,
      startDate desc
    ) {
      _id,
      companyName,
      title,
      type,
      logo,
      detailLogo,
      startDate,
      endDate,
      isCurrent,
      description,
      companyUrl
  }
`;
