// src/components/Footer.tsx
"use client"; // Penting karena menggunakan usePathname atau interaksi

import React from "react";
// Hapus Image, karena tidak pakai file gambar ikon lagi
// import Image from 'next/image';
// Hapus Link jika tidak ada link internal di footer ini
// import Link from 'next/link';

import styles from "../styles/Footer.module.css";
import { socialLinks } from "../data/socials"; // Impor data sosial media

// UBAH: Impor ikon spesifik dari react-icons/fa
import {
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";

const Footer: React.FC = () => {
  // Fungsi untuk mendapatkan komponen ikon berdasarkan nama
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "Email":
        return <FaEnvelope />;
      case "LinkedIn":
        return <FaLinkedinIn />;
      case "Instagram":
        return <FaInstagram />;
      case "GitHub":
        return <FaGithub />;
      default:
        return null;
    }
  };

  return (
    <footer className={styles.footerSection}>
      <div className="container">
        <h2 className={styles.footerHeadline}>Lets Build Something Together</h2>
        <p className={styles.footerSubtitle}>
          Reach out and tell me about your idea :D
        </p>

        <div className={styles.socialIcons}>
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconLink}
              title={link.name}
            >
              {getSocialIcon(link.name)}{" "}
              {/* UBAH: Render komponen ikon di sini */}
            </a>
          ))}
        </div>

        <p className={styles.creditsText}>Made by Moh Alwi Fuad 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
