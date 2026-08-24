// src/app/certificates/layout.tsx
// Ini adalah layout LOKAL untuk rute /certificates
// TIDAK ada 'use client'; Tidak ada impor Header/Footer.

export default function CertificatesPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>
      {" "}
      {/* UBAH: Kembali ke warna dasar */}
      {children}
    </div>
  );
}
