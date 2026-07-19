import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@/pages/ProductsPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumière — Curated Essentials" },
      { name: "description", content: "Shop premium tech and lifestyle essentials at Lumière." },
      { property: "og:title", content: "Lumière — Curated Essentials" },
      { property: "og:description", content: "Shop premium tech and lifestyle essentials." },
    ],
  }),
  component: ProductsPage,
});
