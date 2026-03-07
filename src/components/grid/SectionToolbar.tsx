import { Trash2 } from "lucide-react";

interface SectionToolbarProps {
    title: string;
    description: string;
    onDeleteSection: () => void;
}

export function SectionToolbar({ title, description, onDeleteSection }: SectionToolbarProps) {
    return (
        <div className="flex items-center gap-3 mb-2 px-2 py-2">
            {/* Section info */}
            <div className="flex-1 min-w-0">
                <h2 className="text-xs font-bold text-text-primary">{title}</h2>
                <p className="text-[10px] text-text-muted">{description}</p>
            </div>

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
