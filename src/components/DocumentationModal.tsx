// src/components/DocumentationModal.tsx
"use client"; // Penting karena menggunakan interaksi (onClick)

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/DocumentationModal.module.css"; // BARU: Kita akan buat file CSS ini
import { DocumentationItem } from "../data/documentation"; // Impor interface DocumentationItem

interface DocumentationModalProps {
  doc: DocumentationItem;
  onClose: () => void;
}

const DocumentationModal: React.FC<DocumentationModalProps> = ({
  doc,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Menutup modal saat klik di luar area konten atau tombol ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <button onClick={onClose} className={styles.closeButton}>
          &times; {/* Tanda silang (X) */}
        </button>

        {/* Gambar Dokumentasi */}
        <Image
          src={doc.image}
          alt={doc.title}
          width={900} // Ukuran gambar besar di modal
          height={600}
          style={{ objectFit: "contain" }}
          quality={95}
          className={styles.modalImage}
        />

        <div className={styles.modalDetails}>
          <h3 className={styles.modalTitle}>{doc.title}</h3>{" "}
          {/* Menampilkan judul */}
          <p className={styles.modalMeta}>
            {doc.category} - {doc.date}
          </p>{" "}
          {/* Menampilkan kategori dan tanggal */}
          {doc.description /* Menampilkan deskripsi jika ada */ && (
            <p className={styles.modalDescription}>{doc.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentationModal;
