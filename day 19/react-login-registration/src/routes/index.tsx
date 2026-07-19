import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "React Login & Registration Forms" },
      {
        name: "description",
        content:
          "Premium React authentication UI with login and registration forms, validation, and dark mode.",
      },
      { property: "og:title", content: "React Login & Registration Forms" },
      {
        property: "og:description",
        content:
          "Premium React authentication UI with login and registration forms, validation, and dark mode.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <AuthPage />;
}
