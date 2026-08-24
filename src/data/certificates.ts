// src/data/certificates.ts
// PASTE SELURUH KODE DI BAWAH INI KE DALAM FILE certificates.ts ANDA
export interface CertificateItem {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  image: string; // Path ke gambar SERTIFIKAT FULL RESOLUSI
  credentialUrl?: string; // Link kredensial online (opsional)
}

export const certificates: CertificateItem[] = [
  // Contoh Sertifikat Dicoding (12 item)
  {
    id: 1, // Pastikan ID unik
    name: "Graduate From Dicoding",
    issuer: "Dicoding",
    issueDate: "Jul 2025",
    image: "/images/certificates/Graduate.png", // PASTIKAN FILE INI ADA di public/images/certificates/
    // Jika tidak ada credentialUrl, hapus baris di bawah
    // credentialUrl: "https://www.dicoding.com/certificates/98XWEL270XM3",
  },
  {
    id: 2, // Pastikan ID unik
    name: "ACA Cloud Certification",
    issuer: "Alibaba Cloud", // UBAH: Lebih spesifik "Alibaba Cloud"
    issueDate: "Nov 2024",
    image: "/images/certificates/Alibaba.png", // PASTIKAN FILE INI ADA
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=IACA01241100176713L",
  },
  {
    id: 3, // Pastikan ID unik
    name: "English Biscom", // UBAH: Perbaiki typo Communication
    issuer: "TBI Bandung",
    issueDate: "Jul 2025",
    image: "/images/certificates/english.png", // PASTIKAN FILE INI ADA (perhatikan huruf besar E)
    // Jika tidak ada credentialUrl, hapus baris di bawah
    // credentialUrl: "LINK_KOSONG", // Hapus jika tidak ada
  },
  {
    id: 4, // Pastikan ID unik
    name: "Asisten",
    issuer: "Mata Kuliah Unggulan Gunadarma",
    issueDate: "Dec 2024", // UBAH: Tambahkan spasi sebelum Dec
    image: "/images/certificates/Asisten.png", // PASTIKAN FILE INI ADA (perhatikan huruf besar A)
    // Jika tidak ada credentialUrl, hapus baris di bawah
  },
  {
    id: 5, // Pastikan ID unik
    name: "Narasumber FGD", // UBAH: Perbaiki spasi setelah Jantung
    issuer: "Mata Kuliah Unggulan Gunadarma",
    issueDate: "Apr 2025", // UBAH: Tambahkan spasi sebelum Apr
    image: "/images/certificates/narsum.png", // PASTIKAN FILE INI ADA (perhatikan huruf besar N)
    // Jika tidak ada credentialUrl, hapus baris di bawah
  },
  {
    id: 6, // Pastikan ID unik
    name: " Apac GDC 2025",
    issuer: "Google Developer",
    issueDate: "Jun 2025", // UBAH: Tambahkan spasi sebelum Aug
    image: "/images/certificates/h2s.png",
    // Jika tidak ada credentialUrl, hapus baris di bawah
  },
  {
    id: 7, // Pastikan ID unik
    name: "Sertifikat Microcredential",
    issuer: "Komdigi",
    issueDate: "Aug 2024", // UBAH: Tambahkan spasi sebelum Aug
    image: "/images/certificates/komdigi.png", // PASTIKAN FILE INI ADA (perhatikan huruf besar K)
    // Jika tidak ada credentialUrl, hapus baris di bawah
  },
  {
    id: 8,
    name: "Basic Programming",
    issuer: "Dicoding",
    issueDate: "Feb 2025",
    image: "/images/certificates/d1.png",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVE3D73PN9",
  },
  {
    id: 9,
    name: "Programming Logic",
    issuer: "Dicoding",
    issueDate: "Feb 2025",
    image: "/images/certificates/d3.png",
    credentialUrl: "https://www.dicoding.com/certificates/98XWEL270XM3",
  },
  {
    id: 10,
    name: "Basic Git and Github",
    issuer: "Dicoding",
    issueDate: "Feb 2025",
    image: "/images/certificates/d3.png",
    credentialUrl: "https://www.dicoding.com/certificates/53XEDOY3VPRN",
  },

  {
    id: 11,
    name: "Basic Web Programming",
    issuer: "Dicoding",
    issueDate: "Feb 2025",
    image: "/images/certificates/d4.png",
    credentialUrl: "https://www.dicoding.com/certificates/NVP75NO3WXR0",
  },
  {
    id: 12,
    name: "Basic JavaScript",
    issuer: "Dicoding",
    issueDate: "Mar 2025",
    image: "/images/certificates/d5.png",
    credentialUrl: "https://www.dicoding.com/certificates/07Z63QED2ZQR",
  },
  {
    id: 13,
    name: "Build Front-End Web",
    issuer: "Dicoding",
    issueDate: "Mar 2025",
    image: "/images/certificates/d6.png",
    credentialUrl: "https://www.dicoding.com/certificates/07Z63M5YYZQR",
  },

  // Contoh Sertifikat Alibaba Cloud (11 item)
  {
    id: 14,
    name: "	Fundamental Front-End Web",
    issuer: "Dicoding",
    issueDate: "Apr 2025",
    image: "/images/certificates/d7.png",
    credentialUrl: "https://www.dicoding.com/certificates/4EXGV2J7DXRL",
  },
  {
    id: 15,
    name: "Intermediate Web Development",
    issuer: "Dicoding",
    issueDate: "Jun 2025",
    image: "/images/certificates/d8.png",
    credentialUrl: "https://www.dicoding.com/certificates/07Z6JK4O2XQR",
  },
  {
    id: 16,
    name: "Back-End With JavaScript",
    issuer: "Dicoding",
    issueDate: "May 2025",
    image: "/images/certificates/d9.png",
    credentialUrl: "https://www.dicoding.com/certificates/EYX4GWK45ZDL",
  },
  {
    id: 17,
    name: "Financial Literacy 101",
    issuer: "Dicoding",
    issueDate: "Apr 2025",
    image: "/images/certificates/d10.png",
    credentialUrl: "https://www.dicoding.com/certificates/1OP82OJJVPQK",
  },
  {
    id: 18,
    name: "Operate and Manage a Cloud Server（Exam)",
    issuer: "Alibaba Cloud",
    issueDate: "Aug 2024",
    image: "/images/certificates/cloudserver.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFC03240800132621",
  },
  {
    id: 19,
    name: "Using ECS to Construct a Dynamic Website (exam)",
    issuer: "Alibaba Cloud",
    issueDate: "Aug 2024",
    image: "/images/certificates/ecsweb.png",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFW125202410300002349",
  },
  {
    id: 20,
    name: "Operate and Manage Object Storage on the Cloud（Exam）",
    issuer: "Alibaba Cloud",
    issueDate: "Agu 2024",
    image: "/images/certificates/objectstorage.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFC05240800134378",
  },
  {
    id: 21,
    name: "Using OSS to Publish a Static Website (Free Exam)",
    issuer: "Alibaba Cloud",
    issueDate: "Aug 2024",
    image: "/images/certificates/oss.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFW240240800134379",
  },
  {
    id: 22,
    name: "MySQL for Beginners - Basic Queries (Free Exam)",
    issuer: "Alibaba Cloud",
    issueDate: "Aug 2024",
    image: "/images/certificates/alisql.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFW239240800134380",
  },
  {
    id: 23,
    name: "Manage and Operate MySQL Database (Free Exam)",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/mom.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFW238240900136722",
  },
  {
    id: 24,
    name: "Operate and Manage a Relational Database on the Cloud（Exam）",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/omr.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFC04240900136725",
  },

  {
    id: 25,
    name: "Network Series Courses (Free Exam)",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/network.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFC05240800134378",
  },
  {
    id: 26,
    name: "Alibaba Cloud Network Solution (Exam)",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/acn.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFC51240900136767",
  },

  {
    id: 27,
    name: "Internetworking with VPC（Exam）",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/vpc.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFC20240900136780",
  },

  {
    id: 28,
    name: "Handle Large Traffic with Load Balancer（Exam）",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/hlc.jpg",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFC06240900146770",
  },

  {
    id: 29,
    name: "Process Images in OSS by using IMG",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/pio.png",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFW336241000165583",
  },

  {
    id: 30,
    name: "OSS Fundamentals",
    issuer: "Alibaba Cloud",
    issueDate: "Sep 2024",
    image: "/images/certificates/ossfund.png",
    credentialUrl:
      "https://edu.alibabacloud.com/clouder/Certificate/search?type=1&num=ACFW266241000165589",
  },

  {
    id: 27,
    name: "Lsp MIcrotic",
    issuer: "SMKN 1 Nganjuk",
    issueDate: "Apr 2021",
    image: "/images/certificates/lsp.png",
  },

  {
    id: 28,
    name: "Yoiso Web",
    issuer: "Intern SMK",
    issueDate: "Jan-Jun 2021",
    image: "/images/certificates/yoiso.png",
  },
  {
    id: 29,
    name: "Miji Miji Food",
    issuer: "Intern SMK",
    issueDate: "Jun-Dec2021",
    image: "/images/certificates/miji.png",
  },
];
