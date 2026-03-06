"use client";

import React from "react";
import Link from "next/link";
import { Search, Heart, Eye, Sparkles } from "lucide-react";

const FILTERS = ["All", "Photography", "Illustrations", "Digital Art", "Portraits"] as const;

const ARTWORK_DATA = [
  {
    id: 1,
    title: "Sakura Dreams",
    artist: "Yui Arakawa",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80",
    likes: "1.2K",
    views: "4.5K",
    height: 320,
    category: "Illustrations",
  },
  {
    id: 2,
    title: "Lavender Mist",
    artist: "Rina Hayashi",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
    likes: "890",
    views: "3.2K",
    height: 240,
    category: "Photography",
  },
  {
    id: 3,
    title: "Calm Horizons",
    artist: "Hana Araki",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    likes: "2.1K",
    views: "8.7K",
    height: 280,
    category: "Photography",
  },
  {
    id: 4,
    title: "Botanical Study",
    artist: "Rio Takamori",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    likes: "670",
    views: "2.1K",
    height: 360,
    category: "Illustrations",
  },
  {
    id: 5,
    title: "Amber Glow",
    artist: "Manabu Fujita",
    image: "https://images.unsplash.com/photo-1518173946687-a96a35df1951?w=600&q=80",
    likes: "1.5K",
    views: "5.8K",
    height: 260,
    category: "Digital Art",
  },
  {
    id: 6,
    title: "Verdant Flow",
    artist: "Aki Kubota",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    likes: "940",
    views: "3.4K",
    height: 300,
    category: "Photography",
  },
  {
    id: 7,
    title: "Rose Whisper",
    artist: "Sakura Ito",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
    likes: "1.8K",
    views: "6.2K",
    height: 280,
    category: "Portraits",
  },
  {
    id: 8,
    title: "Forest Light",
    artist: "Takumi Mori",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    likes: "2.3K",
    views: "9.1K",
    height: 340,
    category: "Digital Art",
  },
];

function ArtworkCard({ artwork }: { artwork: (typeof ARTWORK_DATA)[number] }) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-sm border border-warm-border hover:shadow-lg hover:shadow-crimson/5 transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden" style={{ height: artwork.height }}>
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <p className="text-white font-semibold text-sm">{artwork.title}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-5 h-5 rounded-full bg-crimson flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">
                    {artwork.artist.charAt(0)}
                  </span>
                </div>
                <span className="text-white/80 text-xs">{artwork.artist}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-white/80 text-xs">
                <Heart className="w-3 h-3" />
                {artwork.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom info (always visible) */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-crimson to-sakura flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">
              {artwork.artist.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary leading-tight">{artwork.title}</p>
            <p className="text-[10px] text-text-muted">{artwork.artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <span className="flex items-center gap-0.5 text-[10px]">
            <Heart className="w-3 h-3" />
            {artwork.likes}
          </span>
          <span className="flex items-center gap-0.5 text-[10px]">
            <Eye className="w-3 h-3" />
            {artwork.views}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GalleryHome() {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState("Trending");

  const filteredArtworks =
    activeFilter === "All"
      ? ARTWORK_DATA
      : ARTWORK_DATA.filter((a) => a.category === activeFilter);

  // Split into columns for masonry layout
  const columns = [[], [], [], []] as (typeof ARTWORK_DATA)[];
  filteredArtworks.forEach((artwork, i) => {
    columns[i % 4].push(artwork);
  });

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
            <span className="text-sm font-medium text-crimson">Explore</span>
            <Link href="/portfolio" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Illustrators
            </Link>
            <span className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
              Collections
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-warm-surface rounded-full px-4 py-2 border border-warm-border">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search artworks..."
              className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none w-40 md:w-56"
            />
          </div>
          <Link
            href="/editor"
            className="btn-crimson-gradient text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Create Showcase
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="bg-rose-tint rounded-full px-4 py-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-crimson" />
            <span className="text-xs font-semibold text-crimson">Featured Showcases</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight max-w-2xl mx-auto">
          Discover Beautiful Artworks
        </h1>
        <p className="text-text-secondary text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
          Create stunning gallery showcases to present your art. Compose, arrange, and share your visual story.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link
            href="/editor"
            className="btn-crimson-gradient text-white font-semibold px-7 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Start Creating
          </Link>
          <button
            type="button"
            className="border border-warm-border text-text-secondary font-semibold px-7 py-3 rounded-full hover:bg-warm-surface transition-colors text-sm"
          >
            Browse Gallery
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 md:px-12 py-10 md:py-12">
        {/* Filter Row */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeFilter === filter
                    ? "bg-text-primary text-white"
                    : "bg-white border border-warm-border text-text-secondary hover:bg-warm-surface"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-secondary">
            <span>Sort by:</span>
            <button
              type="button"
              onClick={() => setSortBy(sortBy === "Trending" ? "Newest" : "Trending")}
              className="font-semibold text-text-primary hover:text-crimson transition-colors"
            >
              {sortBy} ▾
            </button>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
