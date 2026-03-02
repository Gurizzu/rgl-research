"use client";

import React from "react";
import { Switch } from "./switch";
import { Label } from "./label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./sheet";
import { templates } from "@/data/templates";
import type { Section } from "@/types";

interface TopNavProps {
    isEditMode: boolean;
    setIsEditMode: (val: boolean) => void;
    onApplyTemplate?: (sections: Section[]) => void;
}

export function TopNav({ isEditMode, setIsEditMode, onApplyTemplate }: TopNavProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 w-full h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-6 md:px-8">
            <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-pink-300 tracking-tight">Kato<span className="text-red-400">Gumi</span></span>
            </div>

            <div className="flex items-center gap-3">
                {/* Template Drawer */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            className="px-3 py-1.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-lg border border-zinc-200 transition-colors"
                        >
                            Templates
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[360px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Templates</SheetTitle>
                            <p className="text-xs text-zinc-400 mt-1">
                                Choose a template to get started quickly
                            </p>
                        </SheetHeader>

                        <div className="mt-6 space-y-3">
                            {templates.map((tpl) => (
                                <button
                                    key={tpl.id}
                                    type="button"
                                    onClick={() => {
                                        // Deep clone to avoid reference issues
                                        const cloned = JSON.parse(JSON.stringify(tpl.sections)) as Section[];
                                        onApplyTemplate?.(cloned);
                                        setOpen(false);
                                    }}
                                    className="w-full text-left p-4 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all group"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{tpl.preview}</span>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-zinc-800 group-hover:text-zinc-900">
                                                {tpl.name}
                                            </h3>
                                            <p className="text-[11px] text-zinc-400 mt-0.5">
                                                {tpl.description}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                                                    {tpl.sections.length} sections
                                                </span>
                                                <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                                                    {tpl.sections.reduce((acc, s) => acc + s.widgets.length, 0)} widgets
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Edit Mode Toggle */}
                <div className="flex items-center space-x-2">
                    <Switch
                        id="edit-mode"
                        checked={isEditMode}
                        onCheckedChange={setIsEditMode}
                    />
                    <Label htmlFor="edit-mode" className="cursor-pointer font-medium text-sm text-zinc-600">
                        Edit Mode
                    </Label>
                </div>
            </div>
        </nav>
    );
}
