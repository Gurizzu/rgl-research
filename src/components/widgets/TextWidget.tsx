export default function TextWidget({ text }: { text: string }) {
  return (
    <div className="flex h-full items-center">
      <p className="text-xs @[10rem]:text-sm @[20rem]:text-base @[30rem]:text-xl text-text-primary">
        {text}
      </p>
    </div>
  );
}