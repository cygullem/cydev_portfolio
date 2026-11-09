/** Bump when replacing files under `public/projects/` at the same path. */
const PROJECT_ASSET_VERSION = "7";

export function projectAsset(path: string) {
  return `${path}?v=${PROJECT_ASSET_VERSION}`;
}

/** Small responsive URL for cursor trail (avoids decoding full-size PNGs). */
const TRAIL_COVER_WIDTH = 384;

export function trailCoverUrl(cover: string) {
  const path = cover.split("?")[0];
  return `/_next/image?url=${encodeURIComponent(path)}&w=${TRAIL_COVER_WIDTH}&q=75`;
}

const SPOTLIGHT_COVER_WIDTH = 320;

/** Hero spotlight wheel — small decode; path only (optimizer rejects `?v=` in `url`). */
export function spotlightCoverUrl(cover: string) {
  const path = cover.split("?")[0];
  return `/_next/image?url=${encodeURIComponent(path)}&w=${SPOTLIGHT_COVER_WIDTH}&q=82`;
}
