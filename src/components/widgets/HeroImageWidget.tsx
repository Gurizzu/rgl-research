export default function HeroImageWidget({
    title,
    subtitle,
    image,
}: {
    title: string;
    subtitle?: string;
    image: string;
}) {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
            {/* Background Image */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xs sm:text-sm md:text-base text-white/80 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
