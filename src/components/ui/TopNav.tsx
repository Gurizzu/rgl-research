"use client";

import React from "react";
import Link from "next/link";
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
import { ArrowLeft, ChevronDown, Sparkles } from "lucide-react";

interface TopNavProps {
    isEditMode: boolean;
    setIsEditMode: (val: boolean) => void;
    onApplyTemplate?: (sections: Section[]) => void;
}

export function TopNav({ isEditMode, setIsEditMode, onApplyTemplate }: TopNavProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 w-full h-14 border-b border-warm-border bg-white/90 backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-6 md:px-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-medium hidden sm:inline">Back</span>
                </Link>
                <div className="h-5 w-px bg-warm-border" />
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md btn-crimson-gradient" />
                    <span className="font-bold text-sm text-text-primary">My Art Showcase</span>
                    <span className="text-[10px] px-2 py-0.5 bg-warm-surface text-text-muted rounded-full border border-warm-border font-medium">
                        Draft
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
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
                                        // Deep clone to avoid reference issues
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

                {/* Edit Mode Toggle */}
                <div className="flex items-center space-x-2">
                    <Switch
                        id="edit-mode"
                        checked={isEditMode}
                        onCheckedChange={setIsEditMode}
                    />
                    <Label htmlFor="edit-mode" className="cursor-pointer font-medium text-sm text-text-secondary">
                        Edit Mode
                    </Label>
                </div>

                {/* Publish Button */}
                <button
                    type="button"
                    className="btn-crimson-gradient text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                    <Sparkles className="w-3 h-3" />
                    Publish
                </button>
            </div>
        </nav>
    );
}
