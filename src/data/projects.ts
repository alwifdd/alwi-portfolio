// src/data/projects.ts

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  studyCaseLink: string;
  githubLink?: string;
  demoLink?: string;
  mockupType: "mobile" | "desktop";
  screenshots: string[];
  bgColor: string;
  patternBg: string;
}

export const projects: ProjectItem[] = [
  {
    id: 4,
    name: "Brain Tumor MRI Classification",
    description:
      "A deep learning project for classifying brain MRI images into Glioma, Meningioma, Pituitary, and No Tumor by comparing ResNet50, EfficientNetB0, and MobileNetV2, with Grad-CAM visualization for model interpretability.",
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "ResNet50",
      "EfficientNetB0",
      "MobileNetV2",
      "Grad-CAM",
      "Streamlit",
    ],
    studyCaseLink: "/projects/brain-tumor-mri-classification",
    mockupType: "desktop",
    screenshots: ["/images/projects/braintumor.png"],
    bgColor: "#4e7af7",
    patternBg:
      "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L0,100 L100,100 L100,0 C75,25 25,25 0,0 Z' fill='rgba(255,255,255,0.2)' /%3E%3C/svg%3E",
  },
  {
    id: 1,
    name: "Jurusanku-Temukan Jurusan Berbasis MBTI",
    description:
      "A data-driven web application to help high school students in Indonesia find the right university major using an MBTI test and Machine Learning.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "TensorFlow.js",
      "NextAuth.js",
      "Vercel",
    ],
    studyCaseLink: "/projects/jurusanku-mbti",
    demoLink: "https://jurusanku.vercel.app",
    mockupType: "mobile",
    screenshots: [
      "/images/projects/jurusankuMobile.png",
      "/images/projects/jurusankuDesktop.png",
    ],
    bgColor: "#f7b24e",
    patternBg:
      "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L0,100 L100,100 L100,0 C75,25 25,25 0,0 Z' fill='rgba(255,255,255,0.2)' /%3E%3C/svg%3E",
  },
  {
    id: 2,
    name: "Bandung House Price Estimator",
    description:
      "A machine learning study to predict Bandung house prices, comparing Random Forest and CatBoost models. The tuned Random Forest achieved the best performance with an R-squared score of 82.33%, deployed as an interactive Streamlit web app.",
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "CatBoost",
      "Seaborn",
      "Streamlit",
    ],
    studyCaseLink: "/projects/bandung-house-price-estimator",
    demoLink: "https://rfhousepredict.streamlit.app/",
    mockupType: "desktop",
    screenshots: ["/images/projects/Ml.png", "/images/projects/MLm.png"],
    bgColor: "#A259FF",
    patternBg:
      "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L0,100 L100,100 L100,0 C75,25 25,25 0,0 Z' fill='rgba(255,255,255,0.2)' /%3E%3C/svg%3E",
  },
  {
    id: 3,
    name: "Story Verse",
    description: "loremipsum",
    technologies: ["JavaScript", "HTML", "CSS"],
    studyCaseLink: "/projects/story-verse",
    demoLink: "https://alwifdd.github.io/storyverse-awi/",
    mockupType: "desktop",
    screenshots: [
      "/images/projects/portfolio-desktop-1.png",
      "/images/projects/portfolio-mobile-1.png",
    ],
    bgColor: "#4e7af7",
    patternBg:
      "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L0,100 L100,100 L100,0 C75,25 25,25 0,0 Z' fill='rgba(255,255,255,0.2)' /%3E%3C/svg%3E",
  },
];
