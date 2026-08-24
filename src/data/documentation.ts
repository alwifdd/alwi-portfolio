// src/data/documentation.ts
export interface DocumentationItem {
  id: number;
  title: string; // Contoh: "MC Acara Kampus", "Lomba Web Design", "Workshop Data Science"
  category: string; // Contoh: "MC", "Lomba", "Galeri", "Event"
  date: string; // Contoh: "20 Mei 2024"
  image: string; // Path ke gambar di public/images/documentation
  description?: string; // Deskripsi singkat (opsional)
}

export const documentation: DocumentationItem[] = [
  {
    id: 1,
    title: "MC Forum Group Discussion",
    category: "MC",
    date: "10 May 2025",
    image: "/images/documentation/mc.png", // Ganti dengan path gambar Anda
    description:
      "Served as MC for a Focus Group Discussion, leading the event flow and actively engaging participants with clear and confident communication.",
  },
  {
    id: 2,
    title: "Forum Group Discussion Speaker",
    category: "Speaker",
    date: "19 Apr 2025",
    image: "/images/documentation/fgd.jpeg", // Ganti jika perlu
    description:
      "Participated as one of the speakers in a Forum Group Discussion titled 'Development of a Heart Failure Classification Model Using Support Vector Machine and Firefly Algorithm Optimization'. The event was held as part of the Advanced Practicum Course (DGX) at Gunadarma University and focused on the application of machine learning in medical diagnosis. Contributed to the presentation and discussion alongside other team members.",
  },
  {
    id: 3,
    title: "Sharing Session – ILT Tech Coding Camp",
    category: "ILT",
    date: "28 April 2025",
    image: "/images/documentation/share.png", // Ganti jika perlu
    description:
      "Joined a collaborative sharing session between two classes guided by one instructor during ILT Tech Coding Camp. We discussed our experience building the Storyverse website — from generating map-based recommendations to showcasing implementation examples.",
  },
  {
    id: 4,
    title: "GDoc UG",
    category: "Competition",
    date: "9 Mar 2025",
    image: "/images/documentation/pitching.JPG", // Perbaiki ekstensi dari .jng ke .jpg
    description:
      "Presented our pitch deck during the final presentation session of the GDoc UG competition. The session highlighted our product idea, design process, and implementation plan.",
  },
  {
    id: 5,
    title: "GDoc UG – Closing Photo Session",
    category: "Photo Session",
    date: "9 March 2025",
    image: "/images/documentation/menmen.jpg", // Ganti jika perlu
    description: "Closing the event with a group photo session featuring.",
  },
  {
    id: 6,
    title: "ILT 2 – English Session",
    category: "ILT",
    date: "09 May 2025",
    image: "/images/documentation/english2.png", // Ganti jika perlu
    description:
      "During this ILT English session, I practiced using English to improve my speaking, reading, and writing skills. I also trained in effective communication for presentations.",
  },
  // Tambahkan lebih banyak item dokumentasi Anda di sini
];
