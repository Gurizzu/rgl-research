"use client";

import React, { useMemo } from "react";
import { WidgetRenderer } from "@/components/grid/WidgetRenderer";
import { WidgetOverlay } from "@/components/grid/WidgetOverlay";
import { WidgetConfigPanel } from "@/components/grid/WidgetConfigPanel";
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import type { WidgetInstance } from "@/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 24, md: 24, sm: 12, xs: 6, xxs: 4 };

const generateScaledLayouts = (masterLayout: any[], columns: typeof cols) => {
    const layouts: any = {};
    const masterCols = columns.lg;

    const sortedMaster = [...masterLayout].sort((a, b) => {
        if (a.y === b.y) return a.x - b.x;
        return a.y - b.y;
    });

    Object.keys(columns).forEach((key) => {
        const breakpoint = key as keyof typeof cols;
        const currentCols = columns[breakpoint];

        if (breakpoint === 'lg') return;

        if (currentCols < 10) {
            layouts[breakpoint] = sortedMaster.map((item, index) => ({
                ...item,
                x: 0,
                y: index * 10,
                w: currentCols,
            }));
            return;
        }

        const ratio = currentCols / masterCols;
        layouts[breakpoint] = sortedMaster.map((item) => ({
            ...item,
            x: Math.round(item.x * ratio),
            w: Math.max(1, Math.round(item.w * ratio)),
        }));
    });

    layouts.lg = sortedMaster;
    return layouts;
};

const rowHeights = { lg: 80, md: 60, sm: 40, xs: 30, xxs: 20 };

interface GridCanvasProps {
    isEditMode?: boolean;
    widgets: WidgetInstance[];
    onDeleteWidget?: (widgetId: string) => void;
    onUpdateWidgetProps?: (widgetId: string, newProps: Record<string, any>) => void;
}

export default function GridCanvasResponsive({
    isEditMode = false,
    widgets,
    onDeleteWidget,
    onUpdateWidgetProps,
}: GridCanvasProps) {
    const [currentBreakpoint, setCurrentBreakpoint] = React.useState<keyof typeof cols>("lg");
    const [configState, setConfigState] = React.useState<{ widgetId: string; buttonRect: DOMRect } | null>(null);

    const layouts = useMemo(() => {
        const initialLayout = widgets.map((w) => ({
            i: w.id,
            static: false,
            ...w.layout,
        }));
        return generateScaledLayouts(initialLayout, cols);
    }, [widgets]);

    const onBreakpointChange = (newBreakpoint: any) => {
        setCurrentBreakpoint(newBreakpoint);
    };

    const handleLayoutChange = (_layout: any) => {
        // Future: persist layout changes
    };

    return (
        <>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={breakpoints}
                onLayoutChange={handleLayoutChange}
                cols={cols}
                rowHeight={rowHeights[currentBreakpoint]}
                margin={[10, 10]}
                containerPadding={[0, 0]}
                isDraggable={isEditMode}
                isResizable={isEditMode}
                onBreakpointChange={onBreakpointChange}
            >
                {widgets.map((widget) => {
                    const isPadded = widget.layout.padded !== false;
                    const bc = widget.baseConfig;

                    // Build inline styles from baseConfig (opacity handled separately)
                    const baseStyle: React.CSSProperties = {};
                    if (bc) {
                        if (bc.backgroundColor) baseStyle.backgroundColor = bc.backgroundColor;
                        if (bc.textColor) baseStyle.color = bc.textColor;
                        if (bc.padding !== undefined) baseStyle.padding = `${bc.padding}px`;
                        if (bc.borderRadius !== undefined) baseStyle.borderRadius = `${bc.borderRadius}px`;
                        if (bc.overflow) baseStyle.overflow = bc.overflow;
                    }

                    // Content opacity (separate so overlay stays fully visible)
                    const contentOpacity = bc?.opacity !== undefined && bc.opacity < 100 ? bc.opacity / 100 : 1;

                    // Shadow class from baseConfig
                    const shadowMap = { none: "", sm: "shadow-sm", md: "shadow-md", lg: "shadow-lg" };
                    const shadowCls = bc?.shadow ? shadowMap[bc.shadow] : (isPadded ? "shadow-sm" : "");

                    // Border class from baseConfig
                    const borderMap = { none: "", subtle: "border border-zinc-200", solid: "border-2 border-zinc-300" };
                    const borderCls = bc?.border ? borderMap[bc.border] : (isPadded ? "border border-zinc-300" : "");

                    // If no baseConfig, use original classes
                    const hasBaseConfig = !!bc;
                    const className = hasBaseConfig
                        ? `relative ${shadowCls} ${borderCls}`
                        : isPadded
                            ? `relative rounded-xl bg-zinc-100 border border-zinc-300 shadow-sm p-2 sm:p-3 md:p-4 text-zinc-800`
                            : `relative overflow-hidden`;

                    return (
                        <div
                            key={widget.id}
                            className={className}
                            style={hasBaseConfig ? baseStyle : undefined}
                        >
                            {/* Content wrapper with opacity — overlay stays unaffected */}
                            <div className="h-full" style={{ opacity: contentOpacity }}>
                                <WidgetRenderer widget={widget} />
                            </div>

                            {isEditMode && (
                                <WidgetOverlay
                                    widgetId={widget.id}
                                    isConfigOpen={configState?.widgetId === widget.id}
                                    onDelete={() => onDeleteWidget?.(widget.id)}
                                    onToggleConfig={(buttonRect) => {
                                        if (configState?.widgetId === widget.id) {
                                            setConfigState(null);
                                        } else {
                                            setConfigState({ widgetId: widget.id, buttonRect });
                                        }
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </ResponsiveGridLayout>

            {/* Config panel rendered OUTSIDE the grid as a portal */}
            {isEditMode && configState && (() => {
                const widget = widgets.find((w) => w.id === configState.widgetId);
                if (!widget) return null;
                return (
                    <WidgetConfigPanel
                        widget={widget}
                        onUpdateProps={(newProps) => onUpdateWidgetProps?.(widget.id, newProps)}
                        onClose={() => setConfigState(null)}
                        buttonRect={configState.buttonRect}
                    />
                );
            })()}
        </>
    );
}