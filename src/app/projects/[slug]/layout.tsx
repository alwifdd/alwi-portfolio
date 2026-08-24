// src/app/(subpages)/projects/[slug]/layout.tsx

// Layout ini hanya perlu merender "children" tanpa tag html/body tambahan.
export default function ProjectStudyCaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
