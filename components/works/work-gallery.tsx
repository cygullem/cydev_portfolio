import Image from "next/image";

function ScreenFrame({
  src,
  caption,
  priority,
}: {
  src?: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(145deg,#e8e8ec_0%,#f4f4f6_45%,#dfe2ea_100%)] p-4 sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/60 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 size-32 rounded-full bg-white/40 blur-xl" />
        {src ? (
          <Image
            src={src}
            alt=""
            width={1912}
            height={1100}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="relative h-auto w-full rounded-lg border border-line/80 bg-surface object-contain shadow-[0_20px_50px_-28px_rgba(15,23,42,0.28)]"
          />
        ) : (
          <div
            aria-hidden
            className="relative flex aspect-16/10 w-full items-center justify-center rounded-lg border border-dashed border-line bg-surface/80"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Mockup coming soon
            </p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="font-mono text-xs italic text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

type WorkGalleryProps = {
  images: string[];
  captions?: string[];
};

export function WorkGallery({ images, captions }: WorkGalleryProps) {
  const slots =
    images.length > 0
      ? images.map((src, i) => ({ src, caption: captions?.[i] }))
      : [{ src: undefined, caption: undefined }, { src: undefined, caption: undefined }];

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {slots.map((slot, i) => (
        <ScreenFrame
          key={slot.src ?? `placeholder-${i}`}
          src={slot.src}
          caption={slot.caption}
          priority={i === 0 && Boolean(slot.src)}
        />
      ))}
    </div>
  );
}
