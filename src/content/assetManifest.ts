import { assets } from "./assets";

export function getAsset(assetId?: string) {
  if (!assetId) {
    return undefined;
  }

  return assets.find((asset) => asset.id === assetId);
}
