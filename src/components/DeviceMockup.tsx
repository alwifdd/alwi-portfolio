// src/components/DeviceMockup.tsx
"use client"; // Penting: Menggunakan hooks dan interaksi UI

import React from "react";
import Image from "next/image";
import Slider from "react-slick"; // Impor slider
import "slick-carousel/slick/slick.css"; // Impor basic slick CSS
import "slick-carousel/slick/slick-theme.css"; // Impor slick theme CSS
import styles from "../styles/DeviceMockup.module.css"; // Kita akan buat file CSS ini

interface DeviceMockupProps {
  type: "mobile" | "desktop";
  screenshots: string[];
}

const DeviceMockup: React.FC<DeviceMockupProps> = ({ type, screenshots }) => {
  const sliderSettings = {
    dots: true, // Tampilkan dot indikator
    infinite: true, // Geser terus menerus
    speed: 500, // Kecepatan transisi
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Otomatis geser
    autoplaySpeed: 3000, // Kecepatan otomatis geser
    arrows: false, // Sembunyikan panah navigasi
  };

  const isMobile = type === "mobile";

  return (
    <div
      className={`${styles.deviceMockup} ${
        isMobile ? styles.mobile : styles.desktop
      }`}
    >
      <div className={styles.deviceFrame}>
        {isMobile ? (
          // Frame HP
          <Image
            src="/images/mockups/mobile-frame.png"
            alt="Mobile Frame"
            width={300}
            height={600}
            className={styles.frameImage}
          />
        ) : (
          // Frame Laptop
          <Image
            src="/images/mockups/desktop-frame.png"
            alt="Desktop Frame"
            width={800}
            height={500}
            className={styles.frameImage}
          />
        )}
        <div className={styles.screenContent}>
          {screenshots.length > 0 ? (
            <Slider {...sliderSettings}>
              {screenshots.map((screenshot, index) => (
                <div key={index} className={styles.screenshotSlide}>
                  <Image
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    fill // Isi area parent
                    style={{ objectFit: isMobile ? "cover" : "contain" }} // Cover untuk mobile (vertikal), contain untuk desktop
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className={styles.placeholderScreen}>
              No screenshots available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceMockup;
