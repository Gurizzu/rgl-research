import type { Section } from "@/types";
import rawSections from "./sections.json";

// Simulated API delay (ms)
const SIMULATED_DELAY = 500;

/**
 * Simulate fetching sections from an API.
 * Replace this with a real fetch() call when your API is ready.
 *
 * Example real usage:
 *   export async function fetchSections(): Promise<Section[]> {
 *     const res = await fetch("https://api.example.com/sections");
 *     if (!res.ok) throw new Error("Failed to fetch sections");
 *     return res.json();
 *   }
 */
export async function fetchSections(): Promise<Section[]> {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
    return rawSections as Section[];
}
