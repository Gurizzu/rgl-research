import type { WidgetConfig } from "@/types/grid";

export const widgets: WidgetConfig[] = [
  {
    id: "hero",
    type: "hero",
    props: {
      title: "Kato",
      subtitle: "Creative Fullstack Developer",
    },
  },
  {
    id: "about",
    type: "text",
    props: {
      text: "Backend-heavy developer with strong visual curiosity.",
    },
  },
  {
    id: "project1",
    type: "image-card",
    props: {
      title: "Portfolio Builder",
      image: "/project.png",
      description: "Next.js + Tailwind + Grid",
    },
  },
];
