"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CertificatesPage.module.css";
// UBAH SEMUA JALUR DI BAWAH INI
import { certificates, CertificateItem } from "../../../data/certificates";
import CertificateModal from "../../../components/CertificateModal";

const groupCertificatesByIssuer = (certs: CertificateItem[]) => {
  return certs.reduce((acc, cert) => {
    const issuer = cert.issuer;
    if (!acc[issuer]) {
      acc[issuer] = [];
    }
    acc[issuer].push(cert);
    return acc;
  }, {} as Record<string, CertificateItem[]>);
};

const CertificatesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(
    null
  );

  const handleOpenModal = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCert(null);
    document.body.style.overflow = "";
  };

  const groupedCertificates = groupCertificatesByIssuer(certificates);

  return (
    <>
      <header className={styles.certificateHeader}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.backArrow}>&larr;</span>
          <span className={styles.backText}>Take me back home</span>
        </Link>
      </header>

      <main className={styles.certificatesPage}>
        <div className="container">
          <h1 className={styles.pageTitle}>All My Certificates</h1>

          {Object.entries(groupedCertificates).map(([issuer, certs]) => (
            <div key={issuer} className={styles.issuerGroup}>
              <h2 className={styles.issuerTitle}>
                {issuer} ({certs.length} sertif)
              </h2>
              <div className={styles.certificatesGrid}>
                {certs.map((cert) => (
                  <div
                    key={cert.id}
                    className={styles.certificateCard}
                    onClick={() => handleOpenModal(cert)}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={300}
                      height={200}
                      style={{ objectFit: "cover" }}
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
            </div>
          ))}
        </div>

        {showModal && selectedCert && (
          <CertificateModal cert={selectedCert} onClose={handleCloseModal} />
        )}
      </main>
    </>
  );
};

export default CertificatesPage;
