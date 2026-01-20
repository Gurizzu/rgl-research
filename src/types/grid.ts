import { HeroProps, ImageCardProps, TextProps } from "./widget";

export type GridItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
};

export type WidgetType = "hero" | "text" | "image-card";


export type WidgetInstance =
  | {
    id: string
    type: "hero"
    props: HeroProps
    layout: GridLayout
  }
  | {
    id: string
    type: "text"
    props: TextProps
    layout: GridLayout
  }
  | {
    id: string
    type: "image-card"
    props: ImageCardProps
    layout: GridLayout
  }

export type GridLayout = {
  x: number
  y: number
  w: number
  h: number
  static?: boolean
}

