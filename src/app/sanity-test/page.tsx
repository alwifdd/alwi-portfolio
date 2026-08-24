import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";

export default async function SanityTestPage() {
  const projects = await client.fetch(featuredProjectsQuery);

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Sanity Connection Test</h1>

      <pre
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "12px",
          overflow: "auto",
        }}
      >
        {JSON.stringify(projects, null, 2)}
      </pre>
    </main>
  );
}
