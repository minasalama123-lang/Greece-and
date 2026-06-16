/**
 * Domain types for the furniture catalog.
 *
 * These are intentionally framework-agnostic and contain no Next.js or React
 * concerns, so they remain valid whether the data is sourced from local TS
 * files (today) or a headless CMS / API (later). The UI depends only on these
 * shapes — never on the underlying data source.
 */

/** A single image with the metadata needed for accessible, optimized rendering. */
export interface CatalogImage {
  /** Path under /public or an absolute remote URL allowed in next.config. */
  src: string;
  /** Required, meaningful alt text for accessibility and SEO. */
  alt: string;
  /** Intrinsic dimensions — lets next/image avoid layout shift. */
  width: number;
  height: number;
}

/** A material the piece is made from (shown on the product page). */
export interface Material {
  name: string;
  description?: string;
}

/** Physical dimensions, stored in centimetres (the source of truth). */
export interface Dimensions {
  width: number;
  depth: number;
  height: number;
  /** Optional seat height etc., for chairs/sofas. */
  seatHeight?: number;
  unit: "cm";
}

/**
 * A subcategory / type used to filter within a category
 * (e.g. within "Living Room": Sofas, Armchairs, Coffee Tables).
 */
export interface Subcategory {
  slug: string;
  name: string;
}

/** A top-level furniture category (Living Room, Bedroom, …). */
export interface Category {
  slug: string;
  name: string;
  /** Short evocative line shown under the title. */
  tagline: string;
  description: string;
  cover: CatalogImage;
  subcategories: Subcategory[];
  /** Lower numbers appear first in grids. */
  order: number;
}

/** A furniture piece in the catalog. */
export interface Product {
  slug: string;
  name: string;
  /** FK to Category.slug. */
  categorySlug: string;
  /** FK to Subcategory.slug within the category. */
  subcategorySlug: string;
  /** One-line summary for cards and meta descriptions. */
  summary: string;
  /** Full prose description for the detail page. */
  description: string;
  /** Gallery — first image is treated as the primary/cover. */
  images: CatalogImage[];
  materials: Material[];
  dimensions: Dimensions;
  /** Optional designer / collection attribution. */
  collection?: string;
  /** Curated flags used for the home page rails. */
  isFeatured?: boolean;
  isNew?: boolean;
}

/** A category enriched with its product count — convenient for grids. */
export interface CategoryWithCount extends Category {
  productCount: number;
}
