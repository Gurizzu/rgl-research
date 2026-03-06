export default function ImageCardWidget({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description?: string;
}) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="relative flex-1 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-warm-surface" />
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-text-primary">{title}</h3>
        <p className="text-xs sm:text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
