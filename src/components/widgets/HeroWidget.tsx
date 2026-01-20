export default function HeroWidget({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="text-zinc-400">{subtitle}</p>
    </div>
  );
}
