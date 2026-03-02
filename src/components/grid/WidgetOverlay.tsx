"use client";

import React from "react";

interface WidgetOverlayProps {
    widgetId: string;
    onDelete: () => void;
    onToggleConfig: (buttonRect: DOMRect) => void;
    isConfigOpen: boolean;
}

export function WidgetOverlay({ widgetId, onDelete, onToggleConfig, isConfigOpen }: WidgetOverlayProps) {
    return (
        <div className="absolute top-1 right-1 flex items-center gap-1 z-20 pointer-events-auto">
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    onToggleConfig(rect);
                }}
                className={`p-1 rounded text-[10px] transition-all ${isConfigOpen
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "bg-zinc-200/80 text-zinc-500 hover:bg-zinc-300 hover:text-zinc-700"
                    }`}
                title="Edit config"
            >
                ⚙
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="p-1 bg-red-100/80 text-red-500 hover:bg-red-200 hover:text-red-600 rounded text-[10px] transition-all"
                title="Delete widget"
            >
                🗑
            </button>
        </div>
    );
}
