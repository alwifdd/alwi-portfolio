import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "tko911pw",
  dataset: "production",
  apiVersion: "2026-08-24",
  useCdn: true,
  perspective: "published",
});
