"use client";

import GridLayout from "react-grid-layout";
import { widgetInstances } from "@/configs/widgetInstance";
import { WidgetRenderer } from "@/components/grid/WidgetRenderer";


export const gridLayout = widgetInstances.map((w) => ({
    i: w.id,
    ...w.layout,
}))

export default function GridCanvas() {
    return (
        <GridLayout
            className="layout"
            layout={gridLayout}
            width={1440}
            gridConfig={{
                cols: 36,
                rowHeight: 80,
                margin: [0, 0],
                containerPadding: [0, 0],
            }}
            dragConfig={{
                enabled: true,
            }}
            resizeConfig={{
                enabled: true,
            }}
        >
            {widgetInstances.map((widget) => (
                <div key={widget.id} className="rounded-xl bg-zinc-900 p-4">
                    <WidgetRenderer widget={widget} />
                </div>
            ))}
        </GridLayout>
    );
}
