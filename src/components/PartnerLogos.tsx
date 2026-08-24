// src/components/PartnerLogos.tsx
import React from "react";
import Image from "next/image";
import styles from "../styles/PartnerLogos.module.css";
import { partnerLogos } from "../data/partners";

const PartnerLogos: React.FC = () => {
  const repeatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className={styles.partnerLogosSection}>
      <div className="container">
        <div className={styles.marqueeContainer}>
          <div className={styles.logoMarquee}>
            {repeatedLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className={styles.logoItem}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain" }}
                  quality={80}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
