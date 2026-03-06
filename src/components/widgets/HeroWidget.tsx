export default function HeroWidget({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">{title}</h1>
      <p className="text-sm sm:text-base text-text-secondary mt-1">{subtitle}</p>
    </div>
  );
}
