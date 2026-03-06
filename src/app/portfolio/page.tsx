"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Heart, Eye, ExternalLink, Sparkles, Users, Image as ImageIcon, Layers, BarChart3, Twitter, Globe, Palette } from "lucide-react";

const STATS = [
    { label: "Followers", value: "12.4K", icon: Users },
    { label: "Artworks", value: "284", icon: ImageIcon },
    { label: "Showcases", value: "18", icon: Layers },
    { label: "Views", value: "1.2M", icon: BarChart3 },
];

const ARTWORKS = [
    {
        id: 1,
        title: "Cherry Blossom Dreams",
        image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80",
        likes: "2.4K",
        height: 280,
    },
    {
        id: 2,
        title: "Moonlit Garden",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
        likes: "1.8K",
        height: 340,
    },
    {
        id: 3,
        title: "Crimson Sunset",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        likes: "3.1K",
        height: 260,
    },
    {
        id: 4,
        title: "Whispering Petals",
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
        likes: "1.5K",
        height: 320,
    },
    {
        id: 5,
        title: "Golden Hour",
        image: "https://images.unsplash.com/photo-1518173946687-a96a35df1951?w=600&q=80",
        likes: "2.9K",
        height: 300,
    },
    {
        id: 6,
        title: "Ethereal Bloom",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
        likes: "2.0K",
        height: 260,
    },
];

const COLLECTIONS = [
    {
        id: 1,
        title: "Seasonal Illustrations",
        count: 42,
        cover: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80",
    },
    {
        id: 2,
        title: "Nature Studies",
        count: 28,
        cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    },
    {
        id: 3,
        title: "Character Designs",
        count: 36,
        cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
    },
];

const SOCIAL_LINKS = [
    { label: "Twitter", icon: Twitter, url: "#" },
    { label: "Website", icon: Globe, url: "#" },
    { label: "DeviantArt", icon: Palette, url: "#" },
];

const TOOLS = ["Clip Studio Paint", "Procreate", "Photoshop", "Blender"];

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-warm-bg">
            {/* Top Navigation */}
            <nav className="sticky top-0 w-full h-16 border-b border-warm-border bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg btn-crimson-gradient" />
                        <span className="font-bold text-lg text-text-primary tracking-tight">Artfolio</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                            Explore
                        </Link>
                        <span className="text-sm font-medium text-crimson">Illustrators</span>
                        <span className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                            Collections
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium border border-warm-border text-text-secondary rounded-full hover:bg-warm-surface transition-colors"
                    >
                        Sign In
                    </button>
                    <Link
                        href="/editor"
                        className="btn-crimson-gradient text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-1.5"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Create
                    </Link>
                </div>
            </nav>

            {/* Banner Section */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1440&q=80"
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Artist Header */}
            <div className="px-6 md:px-12 -mt-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex items-center gap-5">
                        {/* Avatar */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-warm-surface">
                            <div className="w-full h-full bg-gradient-to-br from-crimson to-sakura flex items-center justify-center">
                                <span className="text-2xl md:text-3xl font-bold text-white">YA</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-text-primary">Yui Arakawa</h1>
                            <p className="text-sm text-text-secondary mt-0.5">Digital Illustrator</p>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                    <MapPin className="w-3 h-3" />
                                    Tokyo, Japan
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] px-2 py-0.5 bg-rose-tint text-crimson rounded-full font-medium border border-crimson/10">
                                        Illustrator
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 bg-warm-surface text-text-muted rounded-full font-medium border border-warm-border">
                                        Anime Style
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="btn-crimson-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                        >
                            View Showcase
                        </button>
                        <button
                            type="button"
                            className="border border-warm-border text-text-secondary text-sm font-medium px-5 py-2.5 rounded-full hover:bg-warm-surface transition-colors"
                        >
                            Commission
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="mt-6 bg-white border-y border-warm-border px-6 md:px-12 py-4">
                <div className="flex items-center gap-8 md:gap-12">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-0.5">
                            <span className="text-lg md:text-xl font-bold text-text-primary">{stat.value}</span>
                            <span className="text-[10px] text-text-muted uppercase tracking-wider font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Artworks */}
            <section className="px-6 md:px-12 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-text-primary">Best Artworks</h2>
                    <button type="button" className="text-xs font-medium text-crimson hover:underline">
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ARTWORKS.map((artwork) => (
                        <div
                            key={artwork.id}
                            className="group relative rounded-xl overflow-hidden bg-white shadow-sm border border-warm-border hover:shadow-lg hover:shadow-crimson/5 transition-all cursor-pointer"
                        >
                            <div className="relative overflow-hidden" style={{ height: artwork.height }}>
                                <img
                                    src={artwork.image}
                                    alt={artwork.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                                        <p className="text-white font-semibold text-sm">{artwork.title}</p>
                                        <span className="flex items-center gap-1 text-white/80 text-xs">
                                            <Heart className="w-3 h-3" />
                                            {artwork.likes}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 flex items-center justify-between">
                                <p className="text-xs font-semibold text-text-primary">{artwork.title}</p>
                                <span className="flex items-center gap-0.5 text-[10px] text-text-muted">
                                    <Heart className="w-3 h-3" />
                                    {artwork.likes}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Collections */}
            <section className="bg-white px-6 md:px-12 py-8 border-t border-warm-border">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-text-primary">Showcases & Collections</h2>
                    <button type="button" className="text-xs font-medium text-crimson hover:underline">
                        View All →
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {COLLECTIONS.map((col) => (
                        <div
                            key={col.id}
                            className="group rounded-xl overflow-hidden border border-warm-border hover:shadow-lg hover:shadow-crimson/5 transition-all cursor-pointer"
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={col.cover}
                                    alt={col.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full">
                                    {col.count} artworks
                                </div>
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="text-sm font-semibold text-text-primary group-hover:text-crimson transition-colors">
                                    {col.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Artist Info */}
            <section className="px-6 md:px-12 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Biography */}
                    <div className="flex-1 bg-white rounded-xl border border-warm-border p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-text-primary mb-3">Biography</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Digital illustrator specializing in anime-inspired artwork. Passionate about
                            creating vibrant, emotionally resonant illustrations that blend traditional
                            Japanese aesthetics with modern digital techniques. Currently accepting
                            commissions for character designs, key visuals, and book covers.
                        </p>
                    </div>

                    {/* Social Links & Tools */}
                    <div className="w-full lg:w-80 bg-white rounded-xl border border-warm-border p-6 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-text-primary mb-3">Social Links</h3>
                            <div className="flex flex-col gap-2">
                                {SOCIAL_LINKS.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-crimson transition-colors"
                                    >
                                        <link.icon className="w-4 h-4" />
                                        {link.label}
                                        <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="border-t border-warm-border pt-4">
                            <h3 className="text-sm font-bold text-text-primary mb-3">Tools Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {TOOLS.map((tool) => (
                                    <span
                                        key={tool}
                                        className="text-[10px] px-2.5 py-1 bg-warm-surface text-text-muted rounded-full border border-warm-border font-medium"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
