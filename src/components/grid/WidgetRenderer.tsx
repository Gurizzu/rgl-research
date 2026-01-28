import type { WidgetInstance } from "@/types/grid";
import HeroWidget from "@/components/widgets/HeroWidget";
import HeroImageWidget from "../widgets/HeroImageWidget";
import ImageCardWidget from "@/components/widgets/ImageCardWidget";
import TextWidget from "@/components/widgets/TextWidget";

export function WidgetRenderer({ widget }: { widget: WidgetInstance }) {
    switch (widget.type) {
        case "hero":
            return <HeroWidget {...widget.props} />;
        case "hero-image":
            return <HeroImageWidget {...widget.props} />;
        case "text":
            return <TextWidget {...widget.props} />;
        case "image-card":
            return <ImageCardWidget {...widget.props} />;
        default:
            return null;
    }
}
