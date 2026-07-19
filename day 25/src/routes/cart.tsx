import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/pages/CartPage";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Lumière" },
      { name: "description", content: "Review your cart and checkout at Lumière." },
      { property: "og:title", content: "Your Cart — Lumière" },
      { property: "og:description", content: "Review your cart and checkout." },
    ],
  }),
  component: CartPage,
});
