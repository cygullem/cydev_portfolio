import type { ImgHTMLAttributes } from "react";

export function LogoIcon({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand mark SVG, small static asset
    <img
      src="/logo.svg"
      alt=""
      width={28}
      height={44}
      decoding="async"
      className={className}
      {...props}
    />
  );
}
