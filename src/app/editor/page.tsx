"use client";

import React from "react";
import GridCanvasResponsive from "@/components/grid/GridCanvasResponsive";
import { SectionToolbar } from "@/components/grid/SectionToolbar";
import { TopNav } from "@/components/ui/TopNav";
import { EditorLeftPanel } from "@/components/editor/EditorLeftPanel";
import { EditorRightPanel } from "@/components/editor/EditorRightPanel";
import { fetchSections } from "@/data";
import type { Section, WidgetInstance } from "@/types";
import { Plus } from "lucide-react";

// Default props for each widget type
const DEFAULT_WIDGET_PROPS: Record<WidgetInstance["type"], Record<string, any>> = {
    hero: { title: "New Hero", subtitle: "Subtitle here" },
    "hero-image": { title: "New Hero", subtitle: "Subtitle", image: "https://placehold.co/800x400" },
    text: { text: "Enter your text here." },
    "image-card": { title: "New Project", image: "https://placehold.co/400x300", description: "Description" },
};

export default function EditorPage() {
    const [isEditMode, setIsEditMode] = React.useState(true);
    const [sections, setSections] = React.useState<Section[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedWidgetId, setSelectedWidgetId] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchSections()
            .then(setSections)
            .finally(() => setLoading(false));
    }, []);

    // When switching to preview mode, deselect widget
    const handleToggleEditMode = (value: boolean) => {
        setIsEditMode(value);
        if (!value) setSelectedWidgetId(null);
    };

    // Find which section owns the selected widget
    const selectedWidget = React.useMemo(() => {
        if (!selectedWidgetId) return null;
        for (const section of sections) {
            const widget = section.widgets.find((w) => w.id === selectedWidgetId);
            if (widget) return { widget, sectionId: section.id };
        }
        return null;
    }, [selectedWidgetId, sections]);

    // Get the widget type of the selected widget for left panel highlight
    const activeWidgetType = selectedWidget?.widget.type ?? null;

    // === Section handlers ===

    const handleAddSection = () => {
        const newSection: Section = {
            id: `section-${Date.now()}`,
            title: "New Section",
            description: "New section description",
            widgets: [],
        };
        setSections((prev) => [...prev, newSection]);
    };

    const handleDeleteSection = (sectionId: string) => {
        setSections((prev) => prev.filter((s) => s.id !== sectionId));
    };

    // === Widget handlers ===

    const handleAddWidget = (type: WidgetInstance["type"]) => {
        const newWidgetId = `${type}-${Date.now()}`;

        setSections((prev) => {
            // If no sections exist, create one first
            let updated = prev;
            if (prev.length === 0) {
                updated = [{
                    id: `section-${Date.now()}`,
                    title: "New Section",
                    description: "New section description",
                    widgets: [],
                }];
            }

            const targetSectionId = updated[updated.length - 1].id; // Add to last section

            return updated.map((section) => {
                if (section.id !== targetSectionId) return section;

                const newWidget = {
                    id: newWidgetId,
                    type,
                    props: { ...DEFAULT_WIDGET_PROPS[type] },
                    layout: { x: 0, y: Infinity, w: 8, h: 3 },
                } as WidgetInstance;

                return { ...section, widgets: [...section.widgets, newWidget] };
            });
        });

        setSelectedWidgetId(newWidgetId);
    };

    const handleDeleteWidget = (sectionId: string, widgetId: string) => {
        if (selectedWidgetId === widgetId) setSelectedWidgetId(null);
        setSections((prev) =>
            prev.map((section) => {
                if (section.id !== sectionId) return section;
                return { ...section, widgets: section.widgets.filter((w) => w.id !== widgetId) };
            })
        );
    };

    // Live update handler — called on every change from right panel
    const handleUpdateWidgetProps = (sectionId: string, widgetId: string, newProps: Record<string, any>) => {
        setSections((prev) =>
            prev.map((section) => {
                if (section.id !== sectionId) return section;
                return {
                    ...section,
                    widgets: section.widgets.map((w) => {
                        if (w.id !== widgetId) return w;

                        const { __layout_padded, __base_config, ...restProps } = newProps;
                        const updatedWidget = { ...w, props: restProps as any };

                        if (__layout_padded !== undefined) {
                            updatedWidget.layout = { ...w.layout, padded: __layout_padded };
                        }

                        if (__base_config !== undefined) {
                            (updatedWidget as any).baseConfig = __base_config;
                        }

                        return updatedWidget;
                    }),
                };
            })
        );
    };

    // === Render ===

    if (loading) {
        return (
            <main className="min-h-screen bg-warm-bg flex items-center justify-center">
                <p className="text-text-muted text-sm animate-pulse">Loading sections...</p>
            </main>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-warm-bg text-text-primary overflow-hidden">
            <TopNav isEditMode={isEditMode} setIsEditMode={handleToggleEditMode} onApplyTemplate={setSections} />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel — only in edit mode */}
                {isEditMode && (
                    <EditorLeftPanel
                        onAddWidget={handleAddWidget}
                        activeWidgetType={activeWidgetType}
                    />
                )}

                {/* Canvas Area */}
                <div
                    className={`flex-1 overflow-y-auto transition-all ${isEditMode ? "bg-[#F2EFF0]" : "bg-warm-bg"}`}
                    onClick={() => isEditMode && setSelectedWidgetId(null)}
                >
                    <div className={`${isEditMode ? "p-6" : "px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-20"}`}>
                        {/* White canvas card in edit mode */}
                        <div className={`${isEditMode
                            ? "bg-white rounded-xl border border-warm-border shadow-sm shadow-black/5 p-6 min-h-[600px]"
                            : ""
                            }`}>
                            {sections.map((section) => (
                                <section
                                    key={section.id}
                                    className={`relative ${isEditMode ? "mb-6" : ""}`}
                                >
                                    {isEditMode && (
                                        <SectionToolbar
                                            title={section.title}
                                            description={section.description ?? ""}
                                            onDeleteSection={() => handleDeleteSection(section.id)}
                                        />
                                    )}

                                    <div className="relative">
                                        <GridCanvasResponsive
                                            widgets={section.widgets}
                                            isEditMode={isEditMode}
                                            selectedWidgetId={selectedWidgetId}
                                            onSelectWidget={setSelectedWidgetId}
                                            onDeleteWidget={(widgetId) => handleDeleteWidget(section.id, widgetId)}
                                            onUpdateWidgetProps={(widgetId, newProps) =>
                                                handleUpdateWidgetProps(section.id, widgetId, newProps)
                                            }
                                        />
                                    </div>
                                </section>
                            ))}

                            {isEditMode && (
                                <button
                                    type="button"
                                    onClick={handleAddSection}
                                    className="w-full py-3 border-2 border-dashed border-warm-border rounded-xl text-xs font-medium text-text-muted hover:border-crimson/30 hover:text-crimson hover:bg-rose-tint/50 transition-all flex items-center justify-center gap-1.5"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Section
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel — only when widget is selected in edit mode */}
                {isEditMode && selectedWidget && (
                    <EditorRightPanel
                        widget={selectedWidget.widget}
                        onUpdateProps={(newProps) =>
                            handleUpdateWidgetProps(selectedWidget.sectionId, selectedWidget.widget.id, newProps)
                        }
                        onClose={() => setSelectedWidgetId(null)}
                    />
                )}
            </div>
        </div>
    );
}
