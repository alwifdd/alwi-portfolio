export const featuredProjectsQuery = `
  *[
    _type == "project" &&
    featured == true
  ]
  | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    category,
    year,
    role,
    duration,
    thumbnail,
    cardBackgroundColor,
    technologies,
    githubUrl,
    demoUrl,
    featured,
    order
  }
`;

export const projectBySlugQuery = `
  *[
    _type == "project" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    category,
    year,
    role,
    duration,
    thumbnail,
    cardBackgroundColor,
    technologies,
    githubUrl,
    demoUrl,
    featured,
    order,
    studyCase
  }
`;
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
