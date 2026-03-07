"use client";

import React from "react";
import type { WidgetInstance } from "@/types";
import { Image, Type, User, Grid3X3, LayoutGrid, Columns2, Layers } from "lucide-react";

const WIDGET_ITEMS: { type: WidgetInstance["type"]; label: string; icon: React.ElementType }[] = [
    { type: "hero-image", label: "Image Widget", icon: Image },
    { type: "text", label: "Text Widget", icon: Type },
    { type: "hero", label: "Artist Profile", icon: User },
    { type: "image-card", label: "Gallery Grid", icon: Grid3X3 },
];

const TEMPLATE_ITEMS = [
    { id: "grid", label: "Grid", icon: LayoutGrid, active: true },
    { id: "split", label: "Split", icon: Columns2, active: false },
    { id: "stack", label: "Stack", icon: Layers, active: false },
];

interface EditorLeftPanelProps {
    onAddWidget: (type: WidgetInstance["type"]) => void;
    activeWidgetType?: WidgetInstance["type"] | null;
}

export function EditorLeftPanel({ onAddWidget, activeWidgetType }: EditorLeftPanelProps) {
    return (
        <aside className="w-[260px] min-w-[260px] bg-white border-r border-warm-border flex flex-col h-full overflow-y-auto">
            {/* Widgets Section */}
            <div className="pt-5 pb-2 flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-center justify-between px-4">
                    <h3 className="text-sm font-semibold text-text-primary">Widgets</h3>
                </div>

                {/* Widget List */}
                <div className="flex flex-col gap-1 px-2">
                    {WIDGET_ITEMS.map((item) => {
                        const isActive = activeWidgetType === item.type;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.type}
                                type="button"
                                onClick={() => onAddWidget(item.type)}
                                className={`flex items-center gap-2.5 px-3 h-10 rounded-lg transition-all text-left
                                    ${isActive
                                        ? "bg-rose-tint text-text-primary"
                                        : "hover:bg-warm-surface text-text-secondary"
                                    }`}
                            >
                                <Icon className={`w-[18px] h-[18px] ${isActive ? "text-crimson" : "text-text-muted"}`} />
                                <span className={`text-[13px] ${isActive ? "font-medium text-text-primary" : "font-normal"}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-warm-border mx-4" />

            {/* Templates Section */}
            <div className="pt-5 pb-4 px-4 flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-text-primary">Templates</h3>
                <div className="grid grid-cols-3 gap-2">
                    {TEMPLATE_ITEMS.map((tpl) => {
                        const Icon = tpl.icon;
                        return (
                            <button
                                key={tpl.id}
                                type="button"
                                className={`flex flex-col items-center justify-center gap-1 h-[72px] rounded-lg border transition-all
                                    ${tpl.active
                                        ? "bg-rose-tint border-sakura/60 text-crimson"
                                        : "bg-warm-surface border-warm-border text-text-muted hover:bg-warm-border/50"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-[10px] font-semibold">{tpl.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
