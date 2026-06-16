/**
 * Public catalog API — the single import surface for the rest of the app.
 *
 * UI code should import from "@/lib/catalog" only, never from "@/data/*" or
 * "./repository" directly. This indirection is the seam that lets the data
 * source change (CMS, API, database) without rewriting any pages or
 * components.
 */
export * from "./types";
export {
  getCategories,
  getCategoriesWithCounts,
  getCategoryBySlug,
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getNewProducts,
  getActiveSubcategories,
} from "./repository";

import type { Dimensions, Product } from "./types";

/** Format dimensions as "W × D × H cm" for display. */
export function formatDimensions(d: Dimensions): string {
  return `${d.width} × ${d.depth} × ${d.height} ${d.unit}`;
}

/** The cover image of a product (first image), used by cards and OG tags. */
export function getCoverImage(product: Product) {
  return product.images[0];
}
