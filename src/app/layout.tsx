// JANGAN HAPUS FILE INI
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://alwifuad.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Moh Alwi Fuad | Portfolio",
    template: "%s | Moh Alwi Fuad",
  },

  description:
    "Portfolio of Moh Alwi Fuad, showcasing projects and experience in data, artificial intelligence, machine learning, web development, and UI/UX.",

  keywords: [
    "Moh Alwi Fuad",
    "Alwi Fuad",
    "Moh Alwi Fuad Portfolio",
    "Alwi Fuad Portfolio",
    "Data",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "UI UX",
  ],

  authors: [
    {
      name: "Moh Alwi Fuad",
      url: siteUrl,
    },
  ],

  creator: "Moh Alwi Fuad",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Moh Alwi Fuad | Portfolio",
    description:
      "Portfolio of Moh Alwi Fuad, showcasing projects and experience in data, artificial intelligence, machine learning, web development, and UI/UX.",
    siteName: "Moh Alwi Fuad Portfolio",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
