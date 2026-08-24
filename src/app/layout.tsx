// JANGAN HAPUS FILE INI
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alwi's Portfolio",
  description: "Portfolio by Moh Alwi Fuad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Body langsung merender children, tanpa komponen atau class apapun */}
      <body>{children}</body>
    </html>
  );
}
