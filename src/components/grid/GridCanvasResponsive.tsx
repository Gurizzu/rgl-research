"use client";

import React, { useMemo } from "react";
import { WidgetRenderer } from "@/components/grid/WidgetRenderer";
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import { WidgetInstance } from "@/types/grid";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Define breakpoints and columns
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 24, md: 24, sm: 12, xs: 6, xxs: 4 };

// Helper to scale layout
const generateScaledLayouts = (masterLayout: any[], columns: typeof cols) => {
    const layouts: any = {};
    const masterCols = columns.lg;

    // Sort master layout by Y then X to ensure correct order when compacting
    const sortedMaster = [...masterLayout].sort((a, b) => {
        if (a.y === b.y) return a.x - b.x;
        return a.y - b.y;
    });

    Object.keys(columns).forEach((key) => {
        const breakpoint = key as keyof typeof cols;
        const currentCols = columns[breakpoint];

        // Ensure we don't overwrite the master layout if the loop reaches 'lg' (though usually we handle it separately)
        if (breakpoint === 'lg') return;

        // For mobile/small screens (less than 10 cols), force a pure vertical stack
        if (currentCols < 10) {
            layouts[breakpoint] = sortedMaster.map((item, index) => {
                return {
                    ...item,
                    x: 0,
                    y: index * 10, // Naive stacking, RGL will compact this up
                    w: currentCols, // Full width
                    // h: item.h // Keep original height or auto? Keep original.
                };
            });
            return;
        }

        const ratio = currentCols / masterCols;

        layouts[breakpoint] = sortedMaster.map((item) => {
            return {
                ...item,
                x: Math.round(item.x * ratio),
                w: Math.max(1, Math.round(item.w * ratio)),
            };
        });
    });

    // Explicitly add the master layout
    layouts.lg = sortedMaster;

    return layouts;
};

// Row heights per breakpoint to maintain aspect ratio
const rowHeights = { lg: 80, md: 60, sm: 40, xs: 30, xxs: 20 };

interface GridCanvasProps {
    isEditMode?: boolean;
    widgets: WidgetInstance[];
}

export default function GridCanvasResponsive({ isEditMode = false, widgets }: GridCanvasProps) {
    const [currentBreakpoint, setCurrentBreakpoint] = React.useState<keyof typeof cols>("lg");

    // Memoize layouts based on widgets prop
    const layouts = useMemo(() => {
        const initialLayout = widgets.map((w) => ({
            i: w.id,
            static: false,
            ...w.layout,
        }));
        return generateScaledLayouts(initialLayout, cols);
    }, [widgets]);

    const onBreakpointChange = (newBreakpoint: any, newCols: any) => {
        console.log("Breakpoint changed to:", newBreakpoint, "cols:", newCols);
        setCurrentBreakpoint(newBreakpoint);
    };

    const handleLayoutChange = (layout: any) => {
        console.log("Layout baru:", layout);
        layout.forEach((item: any) => {
            console.log(`Widget ${item.i}: x=${item.x}, y=${item.y}, w=${item.w}, h=${item.h}`);
        });

        // saveToDatabase(layout); 
    };

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={breakpoints}
            onLayoutChange={handleLayoutChange}

            cols={cols}
            rowHeight={rowHeights[currentBreakpoint]} // Dynamic row height
            margin={[10, 10]} // Margin antar widget [x, y]
            containerPadding={[0, 0]} // Padding di dalam container

            isDraggable={isEditMode}
            isResizable={isEditMode}

            onBreakpointChange={onBreakpointChange}
        >
            {widgets.map((widget) => (
                <div
                    key={widget.id}
                    className={`rounded-xl bg-zinc-100 border border-zinc-300 shadow-sm p-2 sm:p-3 md:p-4 text-zinc-800 ${!isEditMode ? 'pointer-events-auto' : ''}`}
                >
                    <WidgetRenderer widget={widget} />
                    {isEditMode && (
                        <div className="absolute top-2 right-2 p-1 bg-zinc-200 rounded text-xs opacity-50 hover:opacity-100 cursor-grab">
                            Example Handle
                        </div>
                    )}
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}