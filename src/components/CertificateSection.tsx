// src/components/CertificateSection.tsx
"use client"; // Penting karena menggunakan useState/useEffect

import React, { useState } from "react"; // Hapus useEffect jika tidak ada auto-play
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/CertificateSection.module.css";
import { certificates, CertificateItem } from "../data/certificates"; // Impor data sertifikat
import CertificateModal from "./CertificateModal"; // BARU: Impor komponen Modal

const CertificateSection: React.FC = () => {
  // State untuk mengelola modal
  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(
    null
  );

  const handleOpenModal = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Nonaktifkan scroll body saat modal terbuka
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCert(null);
    document.body.style.overflow = ""; // Aktifkan kembali scroll body
  };

  // Tampilkan semua sertifikat atau batasi jumlahnya untuk halaman utama
  // Untuk tujuan demo, kita tampilkan 6 sertifikat pertama atau semua jika kurang dari 6
  const displayedCertificates = certificates.slice(0, 6);

  return (
    <section className={styles.certificateSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Certificate</h2>

        {certificates.length > 0 ? (
          <div className={styles.certificatesGrid}>
            {displayedCertificates.map((cert) => (
              <div
                key={cert.id}
                className={styles.certificateCard}
                onClick={() => handleOpenModal(cert)} // Klik untuk membuka modal
              >
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={300} // Ukuran thumbnail
                  height={200} // Rasio aspek umum sertifikat
                  style={{ objectFit: "cover" }} // Menutupi area tanpa distorsi
                  quality={80}
                  className={styles.certificateThumbnail}
                />
                <div className={styles.cardInfo}>
                  <p className={styles.certificateName}>{cert.name}</p>
                  <p className={styles.certificateIssuer}>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noCertificates}>
            No certificates to display yet.
          </p>
        )}

        {/* Link "See All My Certif" */}
        <Link href="/certificates" className={`${styles.seeAllButton} btn`}>
          See All My Certif
        </Link>
      </div>

      {/* Komponen Modal */}
      {showModal && selectedCert && (
        <CertificateModal cert={selectedCert} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default CertificateSection;
