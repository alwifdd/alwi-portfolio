// src/data/experience.ts
export interface ExperienceItem {
  id: number;
  companyName: string;
  logo: string; // Path ke logo untuk timeline
  detailLogo?: string; // Opsional: Path ke logo untuk kotak detail
  period: string;
  title: string;
  description: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    companyName: "YOISO WEB",
    logo: "/images/companies/yoisoweb-logo.png",
    detailLogo: "/images/companies/yoisoweb-logo.png",
    period: "Jan 2021 - Apr 2021",
    title: "Social Media Specialist",
    description: [
      "Managed client Instagram accounts, performing account optimization and product promotions.",
      "Authored 5 articles for the company website utilizing copywriting techniques.",
      "Handled customer service on a client's Shopee account, responding to chats according to established SOPs.",
    ],
  },
  {
    id: 2,
    companyName: "Miji-Miji Food",
    logo: "/images/companies/mijirounded.png",
    detailLogo: "/images/companies/miji.png",
    period: "Apr 2021 - Jul 2021",
    title: "Marketing & Marketplace Specialist",
    description: [
      "Photographed product inventory and created compelling listings for publication on Facebook Marketplace.",
      "Managed the online storefront, including uploading and maintaining product catalogs.",
      "Handled customer inquiries through the marketplace to provide information and support the sales process.",
    ],
  },
  {
    id: 3,
    companyName: "Digital Talent Scholarship | Kominfo & Alibaba Cloud",
    logo: "/images/companies/alibabarounded.png",
    detailLogo: "/images/companies/alibaba.png",
    period: "Aug 2024 - Des 2024",
    title: "Cloud Computing Participant",
    description: [
      "Studied cloud computing fundamentals and network administration, achieving a final score of 91.7.",
      "Gained proficiency in Alibaba Cloud services including ECS, OSS, and RDS.",
      "Achieved Alibaba Cloud Certified Associate (ACA) certification.",
    ],
  },
  {
    id: 4,
    companyName: "Advanced Practicum Assistant DGX",
    logo: "/images/companies/praktikumrounded.png",
    detailLogo: "/images/companies/praktikum.png",
    period: "Sep 2024 - Present",
    title: "Practicum Assistant & Public Relationship",
    description: [
      "Assisted students in using DGX machines during practicum sessions, handling technical issues and programming errors.",
      "Acted as Public Relationship, responsible for creating event proposals, serving as an MC, and conducting research for FGD presentations.",
      "Actively contributed to Focus Group Discussions (FGD) to share insights on algorithms and data science practices.",
    ],
  },
  {
    id: 5,
    companyName: "DBS Foundation Coding Camp",
    logo: "/images/companies/dicodingrounded.png",
    detailLogo: "/images/companies/dicoding.png",
    period: "Feb 2025 - Jul 2025",
    title: "Fullstack Web Developer",
    description: [
      "Selected to participate in the program from a pool of 60,000 applicants nationwide.",
      "Developed a final capstone project: a university major recommendation website using MBTI and Machine Learning, achieving a final score of 91.",
      "Recognized as a distinguished student for high engagement, including top interaction in weekly consultations and active participation in ILT sessions.",
    ],
  },
];
