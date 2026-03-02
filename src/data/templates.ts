import type { Section } from "@/types";

export interface Template {
    id: string;
    name: string;
    description: string;
    preview: string; // emoji or icon
    sections: Section[];
}

export const templates: Template[] = [
    {
        id: "katogumi",
        name: "KatoGumi",
        description: "KatoGumi",
        preview: "",
        sections: [
            {
                "id": "hero-section",
                "title": "Hero Section",
                "description": "Main introduction area",
                "widgets": [
                    {
                        "id": "hero-banner",
                        "type": "hero-image",
                        "props": {
                            "title": "Kato",
                            "subtitle": "Creative Backend Developer",
                            "image": "https://cdn.myportfolio.com/f33febb6-e0cb-4216-872f-b5b39bb2d451/37a130a8-af2f-49fe-85d1-b8e893ce7f03.jpg?h=3b45e8de5d024bdc48105ec1e2e0c882"
                        },
                        "layout": {
                            "x": 0,
                            "y": 0,
                            "w": 24,
                            "h": 7,
                            "padded": false
                        }
                    },
                    {
                        "id": "hero-title",
                        "type": "hero",
                        "props": {
                            "title": "Kato",
                            "subtitle": "Creative Backend Developer"
                        },
                        "layout": {
                            "x": 0,
                            "y": 7,
                            "w": 8,
                            "h": 3
                        }
                    },
                    {
                        "id": "hero-bio",
                        "type": "text",
                        "props": {
                            "text": "Backend-heavy developer with strong visual curiosity. Building robust systems by day, exploring creative interfaces by night."
                        },
                        "layout": {
                            "x": 8,
                            "y": 7,
                            "w": 16,
                            "h": 3
                        }
                    }
                ]
            },
            {
                "id": "projects-section",
                "title": "Projects",
                "description": "Featured work and experiments",
                "widgets": [
                    {
                        "id": "project-1",
                        "type": "image-card",
                        "props": {
                            "title": "Portfolio Builder",
                            "image": "https://i.pinimg.com/736x/f4/13/0e/f4130e7198e85f2e108093640e3ab7bf.jpg",
                            "description": "Next.js + Tailwind + Grid"
                        },
                        "layout": {
                            "x": 0,
                            "y": 0,
                            "w": 8,
                            "h": 5
                        }
                    },
                    {
                        "id": "project-2",
                        "type": "image-card",
                        "props": {
                            "title": "API Gateway",
                            "image": "https://i.pinimg.com/736x/a5/c5/16/a5c516e4e1b8c0a06e6e0b8a06d65b3a.jpg",
                            "description": "Go + gRPC + Microservices"
                        },
                        "layout": {
                            "x": 8,
                            "y": 0,
                            "w": 8,
                            "h": 5
                        }
                    },
                    {
                        "id": "project-3",
                        "type": "image-card",
                        "props": {
                            "title": "Data Pipeline",
                            "image": "https://i.pinimg.com/736x/86/d0/48/86d048a7c2d3e2d3b0e8b3f8c7f8e8a0.jpg",
                            "description": "Python + Kafka + Elasticsearch"
                        },
                        "layout": {
                            "x": 16,
                            "y": 0,
                            "w": 8,
                            "h": 5
                        }
                    },
                    {
                        "id": "project-4",
                        "type": "image-card",
                        "props": {
                            "title": "Creative Dashboard",
                            "image": "https://i.pinimg.com/736x/7a/2e/1b/7a2e1b9f5c3d4e6a8b0c2d4e6f8a0b2c.jpg",
                            "description": "React + D3.js + Real-time Analytics"
                        },
                        "layout": {
                            "x": 0,
                            "y": 5,
                            "w": 12,
                            "h": 5
                        }
                    },
                    {
                        "id": "project-5",
                        "type": "image-card",
                        "props": {
                            "title": "Chat Platform",
                            "image": "https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg",
                            "description": "WebSocket + Redis + Vue.js"
                        },
                        "layout": {
                            "x": 12,
                            "y": 5,
                            "w": 12,
                            "h": 5
                        }
                    }
                ]
            },
            {
                "id": "footer-section",
                "title": "Footer",
                "description": "Contact and credits",
                "widgets": [
                    {
                        "id": "footer-text",
                        "type": "text",
                        "props": {
                            "text": "© 2026 Kato — Built with Next.js, React Grid Layout, and a lot of curiosity."
                        },
                        "layout": {
                            "x": 0,
                            "y": 0,
                            "w": 24,
                            "h": 2
                        }
                    }
                ]
            }
        ]
    },
    {
        id: "portfolio-developer",
        name: "Developer Portfolio",
        description: "Hero image, bio, and project showcase",
        preview: "💻",
        sections: [
            {
                id: "hero",
                title: "Hero Section",
                description: "Main introduction area",
                widgets: [
                    {
                        id: "hero-banner",
                        type: "hero-image",
                        props: {
                            title: "Your Name",
                            subtitle: "Full-Stack Developer",
                            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200"
                        },
                        layout: { x: 0, y: 0, w: 24, h: 7, padded: false }
                    }
                ]
            },
            {
                id: "about",
                title: "About",
                description: "Short bio",
                widgets: [
                    {
                        id: "bio-text",
                        type: "text",
                        props: {
                            text: "Passionate developer building modern web experiences. Focused on React, TypeScript, and cloud architecture."
                        },
                        layout: { x: 0, y: 0, w: 24, h: 2 }
                    }
                ]
            },
            {
                id: "projects",
                title: "Projects",
                description: "Featured work",
                widgets: [
                    {
                        id: "project-1",
                        type: "image-card",
                        props: {
                            title: "E-Commerce Platform",
                            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
                            description: "Full-stack marketplace with payment integration"
                        },
                        layout: { x: 0, y: 0, w: 8, h: 4 }
                    },
                    {
                        id: "project-2",
                        type: "image-card",
                        props: {
                            title: "Analytics Dashboard",
                            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
                            description: "Real-time data visualization platform"
                        },
                        layout: { x: 8, y: 0, w: 8, h: 4 }
                    },
                    {
                        id: "project-3",
                        type: "image-card",
                        props: {
                            title: "Mobile App",
                            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
                            description: "Cross-platform fitness tracking app"
                        },
                        layout: { x: 16, y: 0, w: 8, h: 4 }
                    }
                ]
            }
        ]
    },
    {
        id: "photography",
        name: "Photography Portfolio",
        description: "Visual-first layout with large images",
        preview: "📷",
        sections: [
            {
                id: "hero",
                title: "Cover",
                widgets: [
                    {
                        id: "cover-image",
                        type: "hero-image",
                        props: {
                            title: "Photographer Name",
                            subtitle: "Landscape & Portrait Photography",
                            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
                        },
                        layout: { x: 0, y: 0, w: 24, h: 8, padded: false }
                    }
                ]
            },
            {
                id: "gallery",
                title: "Gallery",
                description: "Recent work",
                widgets: [
                    {
                        id: "photo-1",
                        type: "image-card",
                        props: {
                            title: "Mountain Sunrise",
                            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
                            description: "Swiss Alps, 2024"
                        },
                        layout: { x: 0, y: 0, w: 12, h: 5 }
                    },
                    {
                        id: "photo-2",
                        type: "image-card",
                        props: {
                            title: "Ocean Waves",
                            image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600",
                            description: "Pacific Coast, 2024"
                        },
                        layout: { x: 12, y: 0, w: 12, h: 5 }
                    },
                    {
                        id: "photo-3",
                        type: "image-card",
                        props: {
                            title: "City Lights",
                            image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600",
                            description: "Tokyo, 2024"
                        },
                        layout: { x: 0, y: 5, w: 8, h: 4 }
                    },
                    {
                        id: "photo-4",
                        type: "image-card",
                        props: {
                            title: "Forest Path",
                            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
                            description: "Black Forest, 2024"
                        },
                        layout: { x: 8, y: 5, w: 8, h: 4 }
                    },
                    {
                        id: "photo-5",
                        type: "image-card",
                        props: {
                            title: "Desert Dunes",
                            image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600",
                            description: "Sahara, 2024"
                        },
                        layout: { x: 16, y: 5, w: 8, h: 4 }
                    }
                ]
            }
        ]
    },
    {
        id: "minimal-blog",
        name: "Minimal Blog",
        description: "Clean text-focused layout",
        preview: "✍️",
        sections: [
            {
                id: "header",
                title: "Header",
                widgets: [
                    {
                        id: "blog-hero",
                        type: "hero",
                        props: {
                            title: "The Minimal Blog",
                            subtitle: "Thoughts on design, code, and creativity"
                        },
                        layout: { x: 0, y: 0, w: 24, h: 4 }
                    }
                ]
            },
            {
                id: "featured",
                title: "Featured Posts",
                widgets: [
                    {
                        id: "post-1",
                        type: "image-card",
                        props: {
                            title: "Designing for Simplicity",
                            image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600",
                            description: "Why less is more in modern UI design"
                        },
                        layout: { x: 0, y: 0, w: 12, h: 4 }
                    },
                    {
                        id: "post-2",
                        type: "image-card",
                        props: {
                            title: "The Future of Web",
                            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
                            description: "Exploring next-gen web technologies"
                        },
                        layout: { x: 12, y: 0, w: 12, h: 4 }
                    }
                ]
            },
            {
                id: "intro",
                title: "About",
                widgets: [
                    {
                        id: "intro-text",
                        type: "text",
                        props: {
                            text: "Welcome to my corner of the internet. I write about design systems, creative coding, and the intersection of art and technology. Subscribe to get weekly insights."
                        },
                        layout: { x: 0, y: 0, w: 24, h: 2 }
                    }
                ]
            }
        ]
    }
];
