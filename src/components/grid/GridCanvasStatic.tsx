"use client";

import GridLayout from "react-grid-layout";
import { widgetInstances } from "@/configs/widgetInstance";
import { WidgetRenderer } from "@/components/grid/WidgetRenderer";

// Initial layout setup
export const initialLayout = widgetInstances.map((w) => ({
    i: w.id,
    ...w.layout,
}));

export default function GridCanvasStatic() {

    const handleLayoutChange = (layout: any) => {
        console.log("Layout baru:", layout);
        layout.forEach((item: any) => {
            console.log(`Widget ${item.i}: x=${item.x}, y=${item.y}, w=${item.w}, h=${item.h}`);
        });

        // saveToDatabase(layout); 
    };

    return (
        <GridLayout
            className="layout"
            layout={initialLayout}
            width={1440}
            // --- 2. Pasang callback di sini ---
            onLayoutChange={handleLayoutChange}

            // Catatan: Pastikan prop di bawah ini sesuai dengan dokumentasi RGL.
            // Biasanya RGL mengharapkan props flat (cols={36}), bukan object config.
            // Namun jika Anda menggunakan wrapper custom, biarkan seperti ini.
            gridConfig={{
                cols: 36,
                rowHeight: 80,
                margin: [0, 0],
                containerPadding: [0, 0],
            }}
            dragConfig={{ enabled: true }}
            resizeConfig={{ enabled: true }}
        >
            {widgetInstances.map((widget) => (
                <div
                    key={widget.id}
                    className="rounded-xl bg-zinc-100 border border-zinc-300 shadow-sm p-4 text-zinc-800"
                >
                    <WidgetRenderer widget={widget} />
                </div>
            ))}
        </GridLayout>
    );
}