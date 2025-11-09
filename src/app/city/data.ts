export type GalleryItem = {
  id: number;
  galleryName: string;
  name?: string;
};

// Example gallery data with many items; you can replace or extend this
export const cityGalleryData: GalleryItem[] = Array.from({ length: 30 }).map((_, i) => {
  const mod = i % 3;
  const galleryName = mod === 0
    ? "/lowpoly_urban_building.glb"
    : mod === 1
    ? "/lowpoly_urban_garage.glb"
    : "/lowpoly_urban_house.glb";
  return {
    id: i + 1,
    galleryName,
    name: `Gallery Item ${i + 1}`,
  };
});