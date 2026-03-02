// === Widget Props ===

export type HeroProps = {
    title: string;
    subtitle: string;
};

export type HeroImageProps = {
    title: string;
    subtitle?: string;
    image: string;
};

export type TextProps = {
    text: string;
};

export type ImageCardProps = {
    title: string;
    image: string;
    description?: string;
};

// === Base Config (universal for all widgets) ===

export type BaseConfig = {
    backgroundColor?: string;   // e.g. "transparent", "#ff0000", "rgba(0,0,0,0.5)"
    textColor?: string;         // e.g. "#ffffff"
    padding?: number;           // px value, 0 = no padding
    borderRadius?: number;      // px value, 0 = sharp corners
    opacity?: number;           // 0-100
    shadow?: "none" | "sm" | "md" | "lg";
    border?: "none" | "subtle" | "solid";
    overflow?: "hidden" | "visible";
};

export const DEFAULT_BASE_CONFIG: BaseConfig = {
    backgroundColor: "",
    textColor: "",
    padding: 12,
    borderRadius: 12,
    opacity: 100,
    shadow: "sm",
    border: "subtle",
    overflow: "hidden",
};

// === Grid / Layout ===

export type GridLayout = {
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
    padded?: boolean;
};

export type WidgetInstance =
    | { id: string; type: "hero"; props: HeroProps; layout: GridLayout; baseConfig?: BaseConfig }
    | { id: string; type: "hero-image"; props: HeroImageProps; layout: GridLayout; baseConfig?: BaseConfig }
    | { id: string; type: "text"; props: TextProps; layout: GridLayout; baseConfig?: BaseConfig }
    | { id: string; type: "image-card"; props: ImageCardProps; layout: GridLayout; baseConfig?: BaseConfig };

// === Section ===

export type Section = {
    id: string;
    title: string;
    description?: string;
    widgets: WidgetInstance[];
};
