// src/components/DocumentationSection.tsx
"use client"; // Penting karena menggunakan useState

import React, { useState } from "react";
import Image from "next/image";
//import Link from "next/link"; // Jika nanti ada halaman "See All Dokumentasi"
import styles from "../styles/DocumentationSection.module.css";
import { documentation, DocumentationItem } from "../data/documentation"; // Impor data dokumentasi
// UBAH BARIS IMPOR INI: PASTIKAN INI MENGIMPOR MODAL BARU ANDA
import DocumentationModal from "./DocumentationModal"; // Ini akan mengimpor modal khusus dokumentasi Anda

const DocumentationSection: React.FC = () => {
  // State untuk mengelola modal
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentationItem | null>(
    null
  );

  const handleOpenModal = (doc: DocumentationItem) => {
    setSelectedDoc(doc);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Nonaktifkan scroll body saat modal terbuka
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoc(null);
    document.body.style.overflow = ""; // Aktifkan kembali scroll body
  };

  // Tampilkan 6 item dokumentasi pertama di halaman utama
  const displayedDocumentation = documentation.slice(0, 6);

  return (
    <section className={styles.documentationSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>My Documentation</h2>

        {documentation.length > 0 ? (
          <div className={styles.documentationGrid}>
            {displayedDocumentation.map((doc) => (
              <div
                key={doc.id}
                className={styles.documentationCard}
                onClick={() => handleOpenModal(doc)} // Klik untuk membuka modal
              >
                <Image
                  src={doc.image}
                  alt={doc.title}
                  width={350} // Ukuran thumbnail
                  height={250} // Rasio aspek umum foto
                  style={{ objectFit: "cover" }}
                  quality={80}
                  className={styles.documentationThumbnail}
                />
                <div className={styles.cardInfo}>
                  <p className={styles.documentationTitle}>{doc.title}</p>
                  <p className={styles.documentationMeta}>
                    {doc.category} - {doc.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noDocumentation}>
            No documentation to display yet.
          </p>
        )}

        {/* Jika nanti ada halaman "See All Dokumentasi", tambahkan Link di sini */}
        {/* <Link href="/documentation" className={`${styles.seeAllButton} btn`}>
          See All My Documentation
        </Link> */}
      </div>

      {/* Komponen Modal */}
      {showModal && selectedDoc && (
        <DocumentationModal // UBAH BARIS INI: PASTIKAN INI MENGGUNAKAN MODAL BARU
          doc={selectedDoc} // Langsung passing objek 'doc' tanpa pemetaan
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default DocumentationSection;
