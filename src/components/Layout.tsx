// Lokasi: src/components/Layout.tsx
"use client";
import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Pastikan komponen ini ditambahkan */}
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
