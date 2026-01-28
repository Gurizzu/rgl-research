export default function TextWidget({ text }: { text: string }) {
  return (
    <div className="flex h-full items-center">
      {/* @xs: Jika lebar WIDGET > 320px 
         @md: Jika lebar WIDGET > 768px 
      */}
      <p className="text-xs @[10rem]:text-sm @[20rem]:text-base @[30rem]:text-xl text-black">
        {text}
      </p>
    </div>
  );
}