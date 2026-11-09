/** Bump when replacing files under `public/projects/` at the same path. */
const PROJECT_ASSET_VERSION = "2";

export function projectAsset(path: string) {
  return `${path}?v=${PROJECT_ASSET_VERSION}`;
}

/** Small responsive URL for cursor trail (avoids decoding full-size PNGs). */
const TRAIL_COVER_WIDTH = 384;

export function trailCoverUrl(cover: string) {
  const src = projectAsset(cover.split("?")[0]);
  return `/_next/image?url=${encodeURIComponent(src)}&w=${TRAIL_COVER_WIDTH}&q=75`;
}
