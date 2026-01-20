export default function TextWidget({ text }: { text: string }) {
  return (
    <div className="flex h-full items-center">
      <p className="text-lg text-zinc-300">{text}</p>
    </div>
  );
}
