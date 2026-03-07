import { Trash2, Settings } from "lucide-react";
import React from "react";

interface WidgetOverlayProps {
    widgetId: string;
    isConfigOpen: boolean;
    onToggleConfig: () => void;
    onDelete: () => void;
}

export function WidgetOverlay({ widgetId, isConfigOpen, onToggleConfig, onDelete }: WidgetOverlayProps) {
    return (
        <div className="absolute top-1 right-1 flex gap-1 z-10">
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleConfig();
                }}
                className={`p-1.5 rounded-md border transition-all
                    ${isConfigOpen
                        ? "bg-rose-tint border-crimson/30 text-crimson shadow-sm"
                        : "bg-white/90 backdrop-blur-sm border-warm-border text-text-muted hover:text-text-primary hover:bg-white"
                    }`}
            >
                <Settings className="w-3.5 h-3.5" />
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="p-1.5 rounded-md border bg-white/90 backdrop-blur-sm border-warm-border text-text-muted hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}
