"use client";

import React from "react";
import { Switch } from "./switch";
import { Label } from "./label";

interface TopNavProps {
    isEditMode: boolean;
    setIsEditMode: (val: boolean) => void;
}

export function TopNav({ isEditMode, setIsEditMode }: TopNavProps) {
    return (
        <nav className="sticky top-0 w-full h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-6 md:px-8">
            <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-pink-300 tracking-tight">Kato<span className="text-red-400">Gumi</span></span>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="edit-mode"
                        checked={isEditMode}
                        onCheckedChange={setIsEditMode}
                    />
                    <Label htmlFor="edit-mode" className="cursor-pointer font-medium text-sm text-zinc-600">
                        {isEditMode ? "Edit Mode On" : "Live Mode"}
                    </Label>
                </div>
            </div>
        </nav>
    );
}
