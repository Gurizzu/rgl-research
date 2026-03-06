import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { WidgetInstance } from "@/types";
import { Plus, Trash2, ChevronDown } from "lucide-react";

interface SectionToolbarProps {
    title: string;
    description: string;
    onAddWidget: (type: WidgetInstance["type"]) => void;
    onDeleteSection: () => void;
}

const WIDGET_TYPES: { type: WidgetInstance["type"]; label: string; icon: string }[] = [
    { type: "hero", label: "Hero Banner", icon: "🏠" },
    { type: "hero-image", label: "Hero Image", icon: "🖼" },
    { type: "text", label: "Text Block", icon: "📝" },
    { type: "image-card", label: "Image Card", icon: "🃏" },
];

export function SectionToolbar({ title, description, onAddWidget, onDeleteSection }: SectionToolbarProps) {
    return (
        <div className="flex items-center gap-3 mb-2 px-2 py-2">
            {/* Section info */}
            <div className="flex-1 min-w-0">
                <h2 className="text-xs font-bold text-text-primary">{title}</h2>
                <p className="text-[10px] text-text-muted">{description}</p>
            </div>

            {/* Add Widget Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-rose-tint text-crimson rounded-lg border border-crimson/15 hover:bg-crimson hover:text-white transition-all"
                    >
                        <Plus className="w-3 h-3" />
                        Add Widget
                        <ChevronDown className="w-3 h-3" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px]">
                    {WIDGET_TYPES.map((wt) => (
                        <DropdownMenuItem
                            key={wt.type}
                            onClick={() => onAddWidget(wt.type)}
                            className="cursor-pointer text-xs"
                        >
                            <span className="mr-2">{wt.icon}</span>
                            {wt.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Section */}
            <button
                type="button"
                onClick={onDeleteSection}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-text-muted border border-warm-border rounded-lg hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all"
            >
                <Trash2 className="w-3 h-3" />
                Delete
            </button>
        </div>
    );
}
