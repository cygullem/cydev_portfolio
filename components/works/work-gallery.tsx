import Image from "next/image";

export function WorkGallery({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {images.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={1912}
          height={1100}
          sizes="(max-width: 1024px) 100vw, 360px"
          className="h-auto w-full rounded-lg border border-line bg-surface shadow-[0_12px_32px_-16px_rgba(15,23,42,0.25)]"
        />
      ))}
    </div>
  );
}
