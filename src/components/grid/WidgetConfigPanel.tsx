"use client";

import React from "react";
import ReactDOM from "react-dom";
import type { WidgetInstance, BaseConfig } from "@/types";
import { DEFAULT_BASE_CONFIG } from "@/types";

interface WidgetConfigPanelProps {
    widget: WidgetInstance;
    onUpdateProps: (newProps: Record<string, any>) => void;
    onClose: () => void;
    buttonRect: DOMRect;
}

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

const SHADOW_OPTIONS = [
    { value: "none", label: "None" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
] as const;

const BORDER_OPTIONS = [
    { value: "none", label: "None" },
    { value: "subtle", label: "Subtle" },
    { value: "solid", label: "Solid" },
] as const;

// Toggle switch component
function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 font-medium">{label}</span>
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

export function WidgetConfigPanel({ widget, onUpdateProps, onClose, buttonRect }: WidgetConfigPanelProps) {
    const fields = FIELD_DEFS[widget.type] || [];
    const currentProps = widget.props as Record<string, any>;

    // Local draft state
    const [draft, setDraft] = React.useState<Record<string, any>>({ ...currentProps });
    const [draftPadded, setDraftPadded] = React.useState(widget.layout.padded !== false);
    const [draftBase, setDraftBase] = React.useState<BaseConfig>({
        ...DEFAULT_BASE_CONFIG,
        ...(widget.baseConfig ?? {}),
    });
    const [baseOpen, setBaseOpen] = React.useState(false);

    // Sync draft when widget changes
    React.useEffect(() => {
        setDraft({ ...(widget.props as Record<string, any>) });
        setDraftPadded(widget.layout.padded !== false);
        setDraftBase({ ...DEFAULT_BASE_CONFIG, ...(widget.baseConfig ?? {}) });
    }, [widget]);

    // Position absolute next to the ⚙ button — computed once on mount, anchored in document
    const [position, setPosition] = React.useState({ top: 0, left: 0, width: 320 });

    React.useLayoutEffect(() => {
        const panelWidth = Math.min(320, window.innerWidth - 32);
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const isRightHalf = buttonCenterX > window.innerWidth / 2;

        setPosition({
            top: buttonRect.top + window.scrollY,
            left: isRightHalf
                ? Math.max(8, buttonRect.left - panelWidth - 8)
                : buttonRect.right + 8,
            width: panelWidth,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Close on Escape only
    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, [onClose]);

    const handleSave = () => {
        onUpdateProps({
            ...draft,
            __layout_padded: draftPadded,
            __base_config: draftBase,
        });
        onClose();
    };

    const updateBase = (key: keyof BaseConfig, value: any) => {
        setDraftBase((prev) => ({ ...prev, [key]: value }));
    };

    const inputCls = "w-full px-3 py-2 text-xs bg-warm-surface border border-warm-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-crimson/20 focus:border-crimson/40 transition-all";
    const labelCls = "block text-[10px] text-text-muted font-medium uppercase tracking-wider mb-1";

    const panel = (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-[9998]" onClick={onClose} />

            {/* Panel */}
            <div
                className="absolute z-[9999] bg-white/95 backdrop-blur-xl border border-warm-border rounded-xl shadow-2xl shadow-black/10 max-h-[80vh] overflow-y-auto"
                style={{ top: position.top, left: position.left, width: position.width }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-warm-border sticky top-0 bg-white/95 backdrop-blur-xl rounded-t-xl z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-crimson" />
                        <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wide">
                            {widget.type}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-text-muted hover:text-text-primary transition-colors text-sm leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Widget-specific Fields */}
                <div className="p-4 space-y-3">
                    {fields.map((field) => (
                        <div key={field.key}>
                            <label className={labelCls}>{field.label}</label>
                            {field.type === "textarea" ? (
                                <textarea
                                    value={draft[field.key] ?? ""}
                                    onChange={(e) => setDraft((d) => ({ ...d, [field.key]: e.target.value }))}
                                    className={`${inputCls} resize-none`}
                                    rows={3}
                                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={draft[field.key] ?? ""}
                                    onChange={(e) => setDraft((d) => ({ ...d, [field.key]: e.target.value }))}
                                    className={inputCls}
                                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                                />
                            )}
                        </div>
                    ))}

                    {/* Padded toggle */}
                    <div className="pt-2 border-t border-warm-border">
                        <Toggle value={draftPadded} onChange={setDraftPadded} label="Padded" />
                    </div>
                </div>

                {/* Base Config — Collapsible */}
                <div className="border-t border-warm-border">
                    <button
                        type="button"
                        onClick={() => setBaseOpen(!baseOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-warm-surface transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-sakura" />
                            <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wide">
                                Base Config
                            </span>
                        </div>
                        <span className={`text-text-muted text-[10px] transition-transform ${baseOpen ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </button>

                    {baseOpen && (
                        <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-1 duration-150">

                            {/* Background Color */}
                            <div>
                                <label className={labelCls}>Background Color</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={draftBase.backgroundColor || "#f4f4f5"}
                                        onChange={(e) => updateBase("backgroundColor", e.target.value)}
                                        className="w-8 h-8 rounded-lg border border-warm-border cursor-pointer p-0.5"
                                    />
                                    <input
                                        type="text"
                                        value={draftBase.backgroundColor ?? ""}
                                        onChange={(e) => updateBase("backgroundColor", e.target.value)}
                                        className={`${inputCls} flex-1`}
                                        placeholder="transparent, #hex, rgba..."
                                    />
                                </div>
                            </div>

                            {/* Text Color */}
                            <div>
                                <label className={labelCls}>Text Color</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={draftBase.textColor || "#27272a"}
                                        onChange={(e) => updateBase("textColor", e.target.value)}
                                        className="w-8 h-8 rounded-lg border border-warm-border cursor-pointer p-0.5"
                                    />
                                    <input
                                        type="text"
                                        value={draftBase.textColor ?? ""}
                                        onChange={(e) => updateBase("textColor", e.target.value)}
                                        className={`${inputCls} flex-1`}
                                        placeholder="#hex, rgb..."
                                    />
                                </div>
                            </div>

                            {/* Padding */}
                            <div>
                                <label className={labelCls}>Padding ({draftBase.padding}px)</label>
                                <input
                                    type="range"
                                    min={0}
                                    max={48}
                                    step={2}
                                    value={draftBase.padding ?? 12}
                                    onChange={(e) => updateBase("padding", Number(e.target.value))}
                                    className="w-full h-1.5 bg-warm-border rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Border Radius */}
                            <div>
                                <label className={labelCls}>Border Radius ({draftBase.borderRadius}px)</label>
                                <input
                                    type="range"
                                    min={0}
                                    max={32}
                                    step={2}
                                    value={draftBase.borderRadius ?? 12}
                                    onChange={(e) => updateBase("borderRadius", Number(e.target.value))}
                                    className="w-full h-1.5 bg-warm-border rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Opacity */}
                            <div>
                                <label className={labelCls}>Opacity ({draftBase.opacity}%)</label>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={5}
                                    value={draftBase.opacity ?? 100}
                                    onChange={(e) => updateBase("opacity", Number(e.target.value))}
                                    className="w-full h-1.5 bg-warm-border rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Shadow */}
                            <div>
                                <label className={labelCls}>Shadow</label>
                                <div className="flex gap-1">
                                    {SHADOW_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => updateBase("shadow", opt.value)}
                                            className={`flex-1 py-1.5 text-[10px] font-medium rounded-md border transition-all ${draftBase.shadow === opt.value
                                                ? "bg-rose-tint border-crimson/30 text-crimson"
                                                : "bg-warm-surface border-warm-border text-text-muted hover:bg-warm-border"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Border */}
                            <div>
                                <label className={labelCls}>Border</label>
                                <div className="flex gap-1">
                                    {BORDER_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => updateBase("border", opt.value)}
                                            className={`flex-1 py-1.5 text-[10px] font-medium rounded-md border transition-all ${draftBase.border === opt.value
                                                ? "bg-blue-50 border-blue-200 text-blue-600"
                                                : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:bg-zinc-100"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Overflow */}
                            <Toggle
                                value={draftBase.overflow === "hidden"}
                                onChange={(v) => updateBase("overflow", v ? "hidden" : "visible")}
                                label="Clip Overflow"
                            />
                        </div>
                    )}
                </div>

                {/* Footer with Save */}
                <div className="px-4 py-3 border-t border-warm-border flex justify-end gap-2 sticky bottom-0 bg-white/95 backdrop-blur-xl rounded-b-xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1.5 text-[11px] font-medium text-text-muted hover:text-text-primary rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-1.5 text-[11px] font-medium btn-crimson-gradient text-white rounded-md shadow-sm hover:opacity-90 transition-all"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );

    return ReactDOM.createPortal(panel, document.body);
}
