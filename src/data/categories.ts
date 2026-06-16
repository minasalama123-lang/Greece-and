import type { Category } from "@/lib/catalog/types";

/**
 * Seed catalog: categories.
 *
 * Edit this file to add/rename categories. Each category's `slug` is the URL
 * segment (/categories/[slug]) and is referenced by products via
 * `categorySlug`. Keep slugs lowercase and hyphenated.
 *
 * Images are served from /public/images (local, optimized by next/image).
 * Covers reuse a strong styled scene from within each category.
 */
export const categories: Category[] = [
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "Where the day softens",
    description:
      "Sofas, armchairs, tables and media pieces conceived as the quiet centre of a home — generous proportions, honest materials, and lines that age gracefully.",
    cover: {
      src: "/images/living-room/walnut-coffee-table.jpg",
      alt: "A warm living room with a solid walnut coffee table and a linen sofa",
      width: 736,
      height: 981,
    },
    order: 1,
    subcategories: [
      { slug: "sofas", name: "Sofas" },
      { slug: "armchairs", name: "Armchairs" },
      { slug: "coffee-tables", name: "Coffee Tables" },
      { slug: "tv-units", name: "TV Units" },
    ],
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Stillness, made tangible",
    description:
      "Upholstered beds designed for rest — wrapped headboards, soft tactile fabrics, and frames built to anchor a room without crowding it.",
    cover: {
      src: "/images/bedroom/cloud-bed-1.jpg",
      alt: "A serene bedroom with a cream upholstered platform bed",
      width: 736,
      height: 736,
    },
    order: 2,
    subcategories: [{ slug: "beds", name: "Beds" }],
  },
  {
    slug: "dining",
    name: "Dining",
    tagline: "Gathering, elevated",
    description:
      "Tables built for long evenings — solid hardwood tops, hand-finished surfaces, and proportions that invite everyone to stay a while longer.",
    cover: {
      src: "/images/dining/oak-dining-table.jpg",
      alt: "A solid oak dining table set with upholstered chairs",
      width: 600,
      height: 800,
    },
    order: 3,
    subcategories: [{ slug: "dining-tables", name: "Dining Tables" }],
  },
];
