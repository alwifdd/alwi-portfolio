// src/components/CertificateModal.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/CertificateModal.module.css";
import { CertificateItem } from "../data/certificates";

interface CertificateModalProps {
  cert: CertificateItem;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  cert,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
          &times;
        </button>

        {/* --- PERUBAHAN DI SINI --- */}
        {/* Hanya render Image jika cert.image memiliki nilai (tidak kosong) */}
        {cert.image && (
          <Image
            src={cert.image}
            alt={cert.name}
            width={900}
            height={600}
            style={{ objectFit: "contain" }}
            quality={95}
            className={styles.modalImage}
          />
        )}

        <div className={styles.modalDetails}>
          <h3 className={styles.modalName}>{cert.name}</h3>
          <p className={styles.modalIssuer}>
            {cert.issuer} - {cert.issueDate}
          </p>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalCredentialLink}
            >
              View Credential
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
