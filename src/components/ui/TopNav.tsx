"use client";

import React from "react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./sheet";
import { templates } from "@/data/templates";
import type { Section } from "@/types";
import { ArrowLeft, Eye, Pencil } from "lucide-react";

interface TopNavProps {
    isEditMode: boolean;
    setIsEditMode: (val: boolean) => void;
    onApplyTemplate?: (sections: Section[]) => void;
}

export function TopNav({ isEditMode, setIsEditMode, onApplyTemplate }: TopNavProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 w-full h-[52px] border-b border-warm-border bg-white z-50 flex items-center justify-between px-5">
            {/* Left side */}
            <div className="flex items-center gap-4 h-full">
                <Link
                    href="/"
                    className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg bg-warm-surface text-text-secondary hover:text-text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-medium">Back</span>
                </Link>

                <span className="text-[15px] font-semibold text-text-primary">My Art Showcase</span>

                <span className="text-[11px] font-semibold text-crimson bg-rose-tint px-2.5 py-0.5 rounded-full">
                    Draft
                </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5 h-full">
                {/* Template Drawer */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            className="px-3 py-1.5 text-xs font-medium bg-warm-surface hover:bg-warm-border text-text-secondary rounded-lg border border-warm-border transition-colors"
                        >
                            Templates
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[360px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Templates</SheetTitle>
                            <p className="text-xs text-text-muted mt-1">
                                Choose a template to get started quickly
                            </p>
                        </SheetHeader>

                        <div className="mt-6 space-y-3">
                            {templates.map((tpl) => (
                                <button
                                    key={tpl.id}
                                    type="button"
                                    onClick={() => {
                                        const cloned = JSON.parse(JSON.stringify(tpl.sections)) as Section[];
                                        onApplyTemplate?.(cloned);
                                        setOpen(false);
                                    }}
                                    className="w-full text-left p-4 rounded-xl border border-warm-border hover:border-crimson/30 hover:bg-rose-tint/30 transition-all group"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{tpl.preview}</span>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-text-primary group-hover:text-crimson transition-colors">
                                                {tpl.name}
                                            </h3>
                                            <p className="text-[11px] text-text-muted mt-0.5">
                                                {tpl.description}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] px-1.5 py-0.5 bg-warm-surface text-text-muted rounded">
                                                    {tpl.sections.length} sections
                                                </span>
                                                <span className="text-[10px] px-1.5 py-0.5 bg-warm-surface text-text-muted rounded">
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

                {/* Preview / Edit Toggle */}
                <button
                    type="button"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`flex items-center gap-1.5 px-4 h-[34px] rounded-full border text-xs font-medium transition-all
                        ${isEditMode
                            ? "border-warm-border text-text-secondary hover:bg-warm-surface"
                            : "border-crimson/30 bg-rose-tint text-crimson"
                        }`}
                >
                    {isEditMode ? (
                        <>
                            <Eye className="w-3.5 h-3.5" />
                            Preview
                        </>
                    ) : (
                        <>
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                        </>
                    )}
                </button>

                {/* Publish Button */}
                <button
                    type="button"
                    className="btn-crimson-gradient text-white text-xs font-semibold px-5 h-[34px] rounded-full hover:opacity-90 transition-opacity"
                >
                    Publish
                </button>
            </div>
        </nav>
    );
}
