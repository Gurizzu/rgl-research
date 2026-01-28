"use client";

import React from "react";
import GridCanvasResponsive from "@/components/grid/GridCanvasResponsive"
import { TopNav } from "@/components/ui/TopNav";

import { sections } from "@/configs/sections";

export default function Home() {
  const [isEditMode, setIsEditMode] = React.useState(false);

  return (
    <main className="min-h-screen bg-white text-zinc-900 pb-20">
      <TopNav isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

      <div className={`flex flex-col px-4 sm:px-6 md:px-8 ${isEditMode ? 'pt-12 sm:pt-14 gap-8 md:gap-12 transition-all duration-300 ease-in-out' : 'pt-4 sm:pt-6 md:pt-8 gap-0 transition-all duration-300 ease-in-out'}`}>
        {sections.map((section) => (
          <section key={section.id} className="relative">
            {isEditMode && (
              <div className="absolute -inset-4 rounded-xl border-2 border-dashed border-zinc-200 pointer-events-none z-0">
                <div className="absolute -top-2 left-4 bg-white px-2">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold select-none">
                    {section.title}
                    {section.description && <span className="font-normal opacity-70 normal-case tracking-normal ml-2 text-zinc-300">— {section.description}</span>}
                  </p>
                </div>
              </div>
            )}
            <div className="relative z-10">
              <GridCanvasResponsive
                widgets={section.widgets}
                isEditMode={isEditMode}
              />
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
