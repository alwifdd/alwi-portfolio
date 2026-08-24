// Lokasi: app/(subpages)/layout.tsx

export default function SubPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Langsung render children tanpa wrapper apa pun
  return <>{children}</>;
}
