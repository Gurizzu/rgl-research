"use client";

import React from "react";
import GridCanvasResponsive from "@/components/grid/GridCanvasResponsive";
import { SectionToolbar } from "@/components/grid/SectionToolbar";
import { TopNav } from "@/components/ui/TopNav";
import { fetchSections } from "@/data";
import type { Section, WidgetInstance } from "@/types";

// Default props for each widget type
const DEFAULT_WIDGET_PROPS: Record<WidgetInstance["type"], Record<string, any>> = {
  hero: { title: "New Hero", subtitle: "Subtitle here" },
  "hero-image": { title: "New Hero", subtitle: "Subtitle", image: "https://placehold.co/800x400" },
  text: { text: "Enter your text here." },
  "image-card": { title: "New Project", image: "https://placehold.co/400x300", description: "Description" },
};

export default function Home() {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [sections, setSections] = React.useState<Section[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSections()
      .then(setSections)
      .finally(() => setLoading(false));
  }, []);

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

  const handleAddWidget = (sectionId: string, type: WidgetInstance["type"]) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const newWidget = {
          id: `${type}-${Date.now()}`,
          type,
          props: { ...DEFAULT_WIDGET_PROPS[type] },
          layout: { x: 0, y: Infinity, w: 8, h: 3 },
        } as WidgetInstance;

        return { ...section, widgets: [...section.widgets, newWidget] };
      })
    );
  };

  const handleDeleteWidget = (sectionId: string, widgetId: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return { ...section, widgets: section.widgets.filter((w) => w.id !== widgetId) };
      })
    );
  };

  const handleUpdateWidgetProps = (sectionId: string, widgetId: string, newProps: Record<string, any>) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          widgets: section.widgets.map((w) => {
            if (w.id !== widgetId) return w;

            // Handle special conventions from WidgetConfigPanel
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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-zinc-400 text-sm animate-pulse">Loading sections...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900 pb-20">
      <TopNav isEditMode={isEditMode} setIsEditMode={setIsEditMode} onApplyTemplate={setSections} />

      <div
        className={`flex flex-col px-4 sm:px-6 md:px-8 transition-all duration-300 ease-in-out ${isEditMode
          ? "pt-12 sm:pt-14 gap-8 md:gap-12"
          : "pt-4 sm:pt-6 md:pt-8 gap-0"
          }`}
      >
        {sections.map((section) => (
          <section
            key={section.id}
            className={`relative ${isEditMode ? "outline-2 outline-dashed outline-zinc-200 rounded-xl" : ""
              }`}
          >
            {isEditMode && (
              <SectionToolbar
                title={section.title}
                description={section.description}
                onAddWidget={(type) => handleAddWidget(section.id, type)}
                onDeleteSection={() => handleDeleteSection(section.id)}
              />
            )}

            <div className="relative">
              <GridCanvasResponsive
                widgets={section.widgets}
                isEditMode={isEditMode}
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
            className="w-full py-3 border-2 border-dashed border-zinc-200 rounded-xl text-xs font-medium text-zinc-400 hover:border-zinc-300 hover:text-zinc-500 hover:bg-zinc-50 transition-all"
          >
            + Add Section
          </button>
        )}
      </div>
    </main>
  );
}
