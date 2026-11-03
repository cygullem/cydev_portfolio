/** Bump when replacing files under `public/projects/` at the same path. */
const PROJECT_ASSET_VERSION = "2";

export function projectAsset(path: string) {
  return `${path}?v=${PROJECT_ASSET_VERSION}`;
}
