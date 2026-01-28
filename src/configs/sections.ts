import { Section } from "@/types/grid";

export const sections: Section[] = [
    {
        id: "hero-section",
        title: "Hero Section",
        description: "Main introduction area",
        widgets: [
            {
                id: "hero",
                type: "hero",
                props: {
                    title: "Kato",
                    subtitle: "Creative Backend Developer",
                },
                layout: { x: 4, y: 0, w: 4, h: 3 },
            },
            {
                id: "about",
                type: "text",
                props: {
                    text: "Backend-heavy developer with strong visual curiosity.",
                },
                layout: { x: 0, y: 0, w: 4, h: 3 },
            },
        ]
    },
    {
        id: "gallery-section",
        title: "Gallery & Projects",
        description: "Visual showcase of work",
        widgets: [
            {
                id: "hero-image",
                type: "hero-image",
                props: {
                    title: "Kato",
                    subtitle: "Creative Backend Developer",
                    image: "https://cdn.katogumi.art/kato/images/2025/12/02/202512021418-ae70140b5e114926aa9aaeb1f5b7599d.jpg",
                },
                layout: { x: 0, y: 0, w: 24, h: 7 },
            },
            {
                id: "project1",
                type: "image-card",
                props: {
                    title: "Portfolio Builder",
                    image: "/project.png",
                    description: "Next.js + Tailwind + Grid",
                },
                layout: { x: 9, y: 7, w: 15, h: 3 },
            },
        ]
    }
];
