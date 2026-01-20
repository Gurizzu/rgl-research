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
        <div className="absolute inset-0 bg-zinc-800" />
        {/* Fallback color if image fails or for placeholder */}
        {image && (
          <div className="flex items-center justify-center w-full h-full bg-zinc-700 text-zinc-500">
            [Image: {image}]
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
