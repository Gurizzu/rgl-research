import { WidgetInstance } from "@/types/grid"

export const widgetInstances: WidgetInstance[] = [
    {
        id: "hero",
        type: "hero",
        props: {
            title: "Kato",
            subtitle: "Creative Backend Developer",
        },
        layout: {
            x: 4,
            y: 7,
            w: 4,
            h: 3,
            // static: true,
        },
    },
    {
        id: "hero-image",
        type: "hero-image",
        props: {
            title: "Kato",
            subtitle: "Creative Backend Developer",
            image: "https://cdn.katogumi.art/kato/images/2025/12/02/202512021418-ae70140b5e114926aa9aaeb1f5b7599d.jpg",
        },
        layout: {
            x: 0,
            y: 0,
            w: 24,
            h: 7,
            // static: true,
        },
    },
    {
        id: "about",
        type: "text",
        props: {
            text: "Backend-heavy developer with strong visual curiosity.",
        },
        layout: {
            x: 0,
            y: 7,
            w: 4,
            h: 3,
            // static: true,
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
        layout: {
            x: 9,
            y: 7,
            w: 15,
            h: 3,
            // static: true,
        },
    },
]
