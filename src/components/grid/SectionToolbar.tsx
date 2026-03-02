"use client";

import React from "react";
import type { WidgetInstance } from "@/types";

const WIDGET_TYPES: { value: WidgetInstance["type"]; label: string }[] = [
    { value: "hero", label: "Hero" },
    { value: "hero-image", label: "Hero Image" },
    { value: "text", label: "Text" },
    { value: "image-card", label: "Image Card" },
];

interface SectionToolbarProps {
    title: string;
    description?: string;
    onAddWidget: (type: WidgetInstance["type"]) => void;
    onDeleteSection: () => void;
}

export function SectionToolbar({ title, description, onAddWidget, onDeleteSection }: SectionToolbarProps) {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    return (
        <div className="flex items-center justify-between mb-2 pointer-events-auto">
            <div className="flex items-center gap-2">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold select-none">
                    {title}
                    {description && (
                        <span className="font-normal opacity-70 normal-case tracking-normal ml-2 text-zinc-300">
                            — {description}
                        </span>
                    )}
                </p>
            </div>

            <div className="flex items-center gap-1">
                {/* Add Widget Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="px-2 py-1 text-[10px] font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-md border border-zinc-200 transition-colors"
                    >
                        + Widget
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 min-w-[140px] py-1">
                            {WIDGET_TYPES.map((wt) => (
                                <button
                                    key={wt.value}
                                    type="button"
                                    onClick={() => {
                                        onAddWidget(wt.value);
                                        setDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                                >
                                    {wt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Delete Section */}
                <button
                    type="button"
                    onClick={onDeleteSection}
                    className="px-2 py-1 text-[10px] font-medium bg-red-50 hover:bg-red-100 text-red-500 rounded-md border border-red-200 transition-colors"
                >
                    🗑 Section
                </button>
            </div>
        </div>
    );
}
