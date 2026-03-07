"use client";

import React from "react";
import type { WidgetInstance, BaseConfig } from "@/types";
import { DEFAULT_BASE_CONFIG } from "@/types";
import { X } from "lucide-react";

// Field definitions per widget type
const FIELD_DEFS: Record<
    WidgetInstance["type"],
    { key: string; label: string; type: "text" | "textarea" | "url" }[]
> = {
    hero: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    "hero-image": [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "image", label: "Image URL", type: "url" },
    ],
    text: [
        { key: "text", label: "Text", type: "textarea" },
    ],
    "image-card": [
        { key: "title", label: "Title", type: "text" },
        { key: "image", label: "Image URL", type: "url" },
        { key: "description", label: "Description", type: "text" },
    ],
};

const WIDGET_TYPE_LABELS: Record<WidgetInstance["type"], string> = {
    hero: "Artist Profile",
    "hero-image": "Image Widget",
    text: "Text Widget",
    "image-card": "Gallery Grid",
};

interface EditorRightPanelProps {
    widget: WidgetInstance;
    /** Called on every change — live updates, Figma-style */
    onUpdateProps: (newProps: Record<string, any>) => void;
    onClose: () => void;
}

// Toggle switch
function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[11px] text-text-muted font-medium">{label}</span>
            <button
                type="button"
                onClick={() => onChange(!value)}
                className={`relative w-8 h-[18px] rounded-full transition-colors ${value ? "bg-crimson" : "bg-warm-border"}`}
            >
                <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-[16px]" : "translate-x-[2px]"}`} />
            </button>
        </div>
    );
}

export function EditorRightPanel({ widget, onUpdateProps, onClose }: EditorRightPanelProps) {
    const fields = FIELD_DEFS[widget.type] || [];
    const currentProps = widget.props as Record<string, any>;
    const padded = widget.layout.padded !== false;
    const base: BaseConfig = { ...DEFAULT_BASE_CONFIG, ...(widget.baseConfig ?? {}) };

    // Close on Escape
    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Helper: update a content field (live push)
    const updateField = (key: string, value: string) => {
        onUpdateProps({
            ...currentProps,
            [key]: value,
        });
    };

    // Helper: update a base config property (live push)
    const updateBase = (key: keyof BaseConfig, value: any) => {
        const newBase = { ...base, [key]: value };
        onUpdateProps({
            ...currentProps,
            __base_config: newBase,
        });
    };

    // Helper: update padded (live push)
    const updatePadded = (value: boolean) => {
        onUpdateProps({
            ...currentProps,
            __layout_padded: value,
        });
    };

    const inputCls = "w-full px-3 py-2 text-xs bg-warm-surface border border-warm-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-crimson/20 focus:border-crimson/40 transition-all";
    const sectionLabelCls = "text-[11px] text-text-muted font-semibold uppercase tracking-wider";

    return (
        <aside className="w-[280px] min-w-[280px] bg-white border-l border-warm-border flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-5 pb-4">
                <h3 className="text-sm font-semibold text-text-primary">Widget Settings</h3>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-text-muted hover:text-text-primary transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Widget Type */}
            <div className="px-4 pb-4 flex flex-col gap-2">
                <span className={sectionLabelCls}>Widget Type</span>
                <div className="flex items-center gap-2 px-3 h-9 bg-warm-surface rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-crimson" />
                    <span className="text-xs font-medium text-text-primary">
                        {WIDGET_TYPE_LABELS[widget.type]}
                    </span>
                </div>
            </div>

            <div className="h-px bg-warm-border" />

            {/* Content Fields — live update on every keystroke */}
            <div className="px-4 py-4 flex flex-col gap-3">
                <span className={sectionLabelCls}>Content</span>
                {fields.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <span className="text-[10px] text-text-muted font-medium">{field.label}</span>
                        {field.type === "textarea" ? (
                            <textarea
                                value={currentProps[field.key] ?? ""}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                className={`${inputCls} resize-none`}
                                rows={3}
                                placeholder={`Enter ${field.label.toLowerCase()}...`}
                            />
                        ) : (
                            <input
                                type="text"
                                value={currentProps[field.key] ?? ""}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                className={inputCls}
                                placeholder={`Enter ${field.label.toLowerCase()}...`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="h-px bg-warm-border" />

            {/* Appearance — live */}
            <div className="px-4 py-4 flex flex-col gap-3">
                <span className={sectionLabelCls}>Appearance</span>

                {/* Corner Radius */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-muted font-medium">Corner Radius</span>
                    <input
                        type="number"
                        min={0}
                        max={32}
                        value={base.borderRadius ?? 12}
                        onChange={(e) => updateBase("borderRadius", Number(e.target.value))}
                        className="w-12 h-7 text-center text-xs bg-warm-surface border border-warm-border rounded-md text-text-primary"
                    />
                </div>

                {/* Opacity */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-muted font-medium">Opacity</span>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={base.opacity ?? 100}
                            onChange={(e) => updateBase("opacity", Number(e.target.value))}
                            className="w-20 h-1 bg-warm-border rounded-full appearance-none cursor-pointer"
                        />
                        <span className="text-[10px] text-text-muted w-7 text-right">{base.opacity ?? 100}%</span>
                    </div>
                </div>

                {/* Drop Shadow Toggle */}
                <Toggle
                    value={base.shadow !== "none" && base.shadow !== undefined}
                    onChange={(v) => updateBase("shadow", v ? "md" : "none")}
                    label="Drop Shadow"
                />

                {/* Background Color */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-muted font-medium">Background</span>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="color"
                            value={base.backgroundColor || "#ffffff"}
                            onChange={(e) => updateBase("backgroundColor", e.target.value)}
                            className="w-6 h-6 rounded-md border border-warm-border cursor-pointer p-0"
                        />
                        <input
                            type="text"
                            value={base.backgroundColor ?? ""}
                            onChange={(e) => updateBase("backgroundColor", e.target.value)}
                            className="w-[72px] h-7 text-[10px] text-center bg-warm-surface border border-warm-border rounded-md text-text-primary"
                            placeholder="#hex"
                        />
                    </div>
                </div>
            </div>

            <div className="h-px bg-warm-border" />

            {/* Spacing — live */}
            <div className="px-4 py-4 flex flex-col gap-3">
                <span className={sectionLabelCls}>Spacing</span>
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-muted font-medium">Padding</span>
                    <input
                        type="number"
                        min={0}
                        max={48}
                        value={base.padding ?? 12}
                        onChange={(e) => updateBase("padding", Number(e.target.value))}
                        className="w-12 h-7 text-center text-xs bg-warm-surface border border-warm-border rounded-md text-text-primary"
                    />
                </div>
                <Toggle value={padded} onChange={updatePadded} label="Padded Container" />
            </div>
        </aside>
    );
}
