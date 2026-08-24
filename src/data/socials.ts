// src/data/socials.ts
export interface SocialLink {
  id: number;
  name: string; // Contoh: "Email", "LinkedIn", "Instagram", "GitHub"
  // icon: string; // HAPUS BARIS INI
  url: string; // URL tujuan
}

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: "Email",
    url: "mailto:alwifdd@gmail.com",
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mohalwifuad/",
  },
  {
    id: 3,
    name: "Instagram",
    url: "https://www.instagram.com/alwise._", 
  },
  {
    id: 4,
    name: "GitHub",
    url: "https://github.com/alwifdd", 
  },
];
