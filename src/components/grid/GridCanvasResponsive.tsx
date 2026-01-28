"use client";

import { widgetInstances } from "@/configs/widgetInstance";
import React from "react";
import { WidgetRenderer } from "@/components/grid/WidgetRenderer";
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';


const ResponsiveGridLayout = WidthProvider(Responsive);


// Initial layout setup (Desktop / Master)
export const initialLayout = widgetInstances.map((w) => ({
    i: w.id,
    static: false,
    ...w.layout,
}));

// Define breakpoints and columns
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 36, md: 24, sm: 12, xs: 6, xxs: 4 };

// Helper to scale layout
const generateScaledLayouts = (masterLayout: any[], columns: typeof cols) => {
    const layouts: any = {};
    const masterCols = columns.lg;

    Object.keys(columns).forEach((key) => {
        const breakpoint = key as keyof typeof cols;
        const currentCols = columns[breakpoint];
        const ratio = currentCols / masterCols;

        layouts[breakpoint] = masterLayout.map((item) => {
            return {
                ...item,
                x: Math.round(item.x * ratio),
                w: Math.max(1, Math.round(item.w * ratio)), // Ensure at least 1 col width
                // We keep h same or scale it? For now let's keep h same or maybe slightly scale if needed.
                // To preserve aspect ratio roughly, we might need to adjust rowHeight instead of h.
                // But let's stick to simple width scaling for X and W.
            };
        });
    });

    return layouts;
};

const layouts = generateScaledLayouts(initialLayout, cols);

// Row heights per breakpoint to maintain aspect ratio
const rowHeights = { lg: 80, md: 60, sm: 40, xs: 30, xxs: 20 };

export default function GridCanvasResponsive() {
    const [currentBreakpoint, setCurrentBreakpoint] = React.useState<keyof typeof cols>("lg");

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

            isDraggable={true}
            isResizable={true}

            onBreakpointChange={onBreakpointChange}
        >
            {widgetInstances.map((widget) => (
                <div
                    key={widget.id}
                    className="rounded-xl bg-zinc-100 border border-zinc-300 shadow-sm p-2 sm:p-3 md:p-4 text-zinc-800"
                >
                    <WidgetRenderer widget={widget} />
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}