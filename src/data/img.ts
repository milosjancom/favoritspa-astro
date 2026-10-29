// LIGHT_IMAGES=1 builds one image size per picture, for the hosted preview (file-count limit).
export const LIGHT = !!process.env.LIGHT_IMAGES;
export const W = (ws: number[]) => (LIGHT ? [1920] : ws);
// Spread into <Image>: full srcset normally; in the light preview build one fixed width, so each picture makes one file.
export const WP = (ws: number[]) => (LIGHT ? { width: 1920 } : { widths: ws });
