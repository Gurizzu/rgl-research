import { WidgetInstance } from "@/types/grid"

export const widgetInstances: WidgetInstance[] = [
    {
        id: "hero",
        type: "hero",
        props: {
            title: "Kato",
            subtitle: "Creative Fullstack Developer",
        },
        layout: {
            x: 0,
            y: 0,
            w: 12,
            h: 4,
            static: true,
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
            y: 4,
            w: 6,
            h: 3,
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
            x: 0,
            y: 7,
            w: 4,
            h: 3,
        },
    },
]
