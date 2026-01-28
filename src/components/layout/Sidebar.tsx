"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
    Book,
    Grid,
    Home,
    Image as ImageIcon,
    Layout,
    Menu,
    Settings,
    User,
    X,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile hamburger button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden h-10 w-10"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "pb-12 h-screen w-16 border-r flex flex-col bg-white z-50",
                "fixed md:relative",
                "transition-transform duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                className
            )}>
            <div className="space-y-4 py-4 flex flex-col items-center">
                <div className="px-3 py-2">
                    {/* Logo or Brand Icon */}
                    <div className="h-8 w-8 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-900 font-bold">
                        R
                    </div>
                </div>
                <Separator className="w-10" />
                <div className="px-3 py-2 w-full flex flex-col gap-2 items-center">
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Home</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Home</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <Grid className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <ImageIcon className="h-5 w-5" />
                                    <span className="sr-only">Media</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Media</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <Layout className="h-5 w-5" />
                                    <span className="sr-only">Layouts</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Layouts</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <Book className="h-5 w-5" />
                                    <span className="sr-only">Documentation</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Documentation</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="mt-auto py-4 flex flex-col items-center gap-2">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10">
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Profile</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Profile</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        </>
    )
}
