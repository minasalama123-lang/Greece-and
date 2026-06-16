import type { CatalogImage, Product } from "@/lib/catalog/types";

/**
 * Seed catalog: products.
 *
 * Each product references a category via `categorySlug` and a subcategory via
 * `subcategorySlug` (both must exist in categories.ts). The first image in
 * `images` is treated as the cover. `isFeatured` / `isNew` drive the home page
 * rails. Keep `slug` globally unique — it is the product URL (/products/[slug]).
 *
 * Images live under /public/images/<category>/. Because next/image renders
 * these with `fill`, the width/height below are advisory (used by the type and
 * any future fixed-size rendering), not layout-critical.
 */

const img = (
  src: string,
  alt: string,
  width = 1200,
  height = 1200,
): CatalogImage => ({ src, alt, width, height });

const LR = "/images/living-room";
const BR = "/images/bedroom";
const DN = "/images/dining";

export const products: Product[] = [
  // ----------------------------- LIVING ROOM -----------------------------
  {
    slug: "belgrave-sofa",
    name: "Belgrave 3-Seater Sofa",
    categorySlug: "living-room",
    subcategorySlug: "sofas",
    summary: "A clean-lined three-seater, offered in four house fabrics.",
    description:
      "The Belgrave is our signature seat — a generous three-seater with a tailored, low-slung silhouette and feather-wrapped foam cushions that keep their shape. Choose from four house colourways to suit the room; each is upholstered over a kiln-dried hardwood frame for a lifetime of daily use.",
    images: [
      img(`${LR}/belgrave-navy.webp`, "Belgrave three-seater sofa in navy blue fabric", 1280, 1280),
      img(`${LR}/belgrave-sage.webp`, "Belgrave three-seater sofa in sage green fabric", 1600, 1600),
      img(`${LR}/belgrave-beige.webp`, "Belgrave three-seater sofa in beige fabric", 1280, 1280),
      img(`${LR}/belgrave-grey.webp`, "Belgrave three-seater sofa in grey fabric", 1280, 1280),
    ],
    materials: [
      { name: "Performance weave fabric", description: "Four house colourways: navy, sage, beige, grey." },
      { name: "Kiln-dried hardwood frame" },
      { name: "Feather-wrapped foam cushioning" },
    ],
    dimensions: { width: 240, depth: 98, height: 80, seatHeight: 45, unit: "cm" },
    collection: "Signature",
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "palermo-sofa",
    name: "Palermo Curved Sofa",
    categorySlug: "living-room",
    subcategorySlug: "sofas",
    summary: "A softly rounded sofa with a continuous, sculptural shell.",
    description:
      "Palermo trades hard edges for one continuous curve. Its shell is upholstered in a deep charcoal bouclé and raised on discreet timber feet, so the whole piece reads as a single sculptural gesture. A single bolster keeps the line uninterrupted.",
    images: [
      img(`${LR}/palermo-1.webp`, "Palermo curved sofa in charcoal bouclé, angled view", 1080, 1080),
      img(`${LR}/palermo-2.webp`, "Palermo curved sofa, alternate angle", 1080, 1080),
      img(`${LR}/palermo-3.webp`, "Palermo curved sofa, side profile", 1080, 1080),
    ],
    materials: [{ name: "Charcoal bouclé" }, { name: "Solid timber feet" }],
    dimensions: { width: 250, depth: 100, height: 75, seatHeight: 43, unit: "cm" },
    collection: "Atelier",
    isFeatured: true,
  },
  {
    slug: "cloud-boucle-sofa",
    name: "Cloud Bouclé Sofa",
    categorySlug: "living-room",
    subcategorySlug: "sofas",
    summary: "A deep, pillowy sofa wrapped in textured ivory bouclé.",
    description:
      "Cloud is exactly as it sounds — an extra-deep seat layered with soft scatter cushions and finished in a nubby ivory bouclé. Built for long, unhurried afternoons, it sits low on a recessed plinth so the upholstery appears to float.",
    images: [
      img(`${LR}/cloud-boucle-1.webp`, "Cloud sofa in ivory bouclé, front view", 900, 900),
      img(`${LR}/cloud-boucle-2.webp`, "Cloud sofa in ivory bouclé, detail", 900, 900),
    ],
    materials: [{ name: "Ivory bouclé" }, { name: "Recessed timber plinth" }],
    dimensions: { width: 230, depth: 110, height: 72, seatHeight: 42, unit: "cm" },
    collection: "Atelier",
    isNew: true,
  },
  {
    slug: "aria-modular-sectional",
    name: "Aria Modular Sectional",
    categorySlug: "living-room",
    subcategorySlug: "sofas",
    summary: "A configurable corner sectional for larger, open rooms.",
    description:
      "Aria is built from modules, so it adapts to the room rather than the other way around. Shown here as an L-configuration in a soft sand weave, it can be specified longer, shorter, or mirrored. Loose back cushions and a low timber base keep it relaxed and contemporary.",
    images: [
      img(`${LR}/aria-sectional-1.webp`, "Aria modular sectional sofa in sand fabric", 1200, 800),
      img(`${LR}/aria-sectional-2.png`, "Aria modular sectional, full configuration", 1248, 832),
    ],
    materials: [
      { name: "Sand performance weave" },
      { name: "Solid timber base" },
    ],
    dimensions: { width: 360, depth: 280, height: 78, seatHeight: 44, unit: "cm" },
    collection: "Signature",
    isFeatured: true,
  },
  {
    slug: "linen-lounge-armchair",
    name: "Linen Lounge Armchair",
    categorySlug: "living-room",
    subcategorySlug: "armchairs",
    summary: "A relaxed, square-armed armchair in natural linen.",
    description:
      "A comfortable, square-armed lounge chair upholstered in a natural linen-blend, raised on slim oak feet. Deep enough to sink into, restrained enough to pair with any sofa in the collection.",
    images: [
      img(`${LR}/linen-armchair.webp`, "Linen lounge armchair in natural beige", 1080, 1080),
    ],
    materials: [{ name: "Natural linen-blend" }, { name: "Solid oak feet" }],
    dimensions: { width: 95, depth: 90, height: 78, seatHeight: 44, unit: "cm" },
  },
  {
    slug: "oslo-armchair",
    name: "Oslo Armchair",
    categorySlug: "living-room",
    subcategorySlug: "armchairs",
    summary: "A rounded accent chair on exposed solid-oak legs.",
    description:
      "Oslo pairs a softly curved upholstered shell with exposed, angled oak legs — a quiet nod to mid-century craft. Light in the room and comfortable for hours, it reads equally well at a desk or beside the fire.",
    images: [
      img(`${LR}/oslo-armchair.webp`, "Oslo rounded armchair in pale grey on oak legs", 1080, 1080),
    ],
    materials: [{ name: "Pale grey weave" }, { name: "Solid oak legs" }],
    dimensions: { width: 70, depth: 72, height: 74, seatHeight: 43, unit: "cm" },
    isNew: true,
  },
  {
    slug: "walnut-coffee-table",
    name: "Walnut Coffee Table",
    categorySlug: "living-room",
    subcategorySlug: "coffee-tables",
    summary: "A solid walnut table with concealed storage on a slim steel base.",
    description:
      "A substantial walnut top with a hand-finished grain, set on a slim blackened-steel frame. Two soft-close drawers keep the surface clear, making it as practical as it is handsome at the centre of the room.",
    images: [
      img(`${LR}/walnut-coffee-table.jpg`, "Solid walnut coffee table in a styled living room", 736, 981),
    ],
    materials: [{ name: "Solid American walnut" }, { name: "Blackened steel frame" }],
    dimensions: { width: 120, depth: 70, height: 38, unit: "cm" },
    collection: "Monolith",
    isFeatured: true,
  },
  {
    slug: "reclaimed-oak-coffee-table",
    name: "Reclaimed Oak Coffee Table",
    categorySlug: "living-room",
    subcategorySlug: "coffee-tables",
    summary: "A rustic, plank-top table with a lower display shelf.",
    description:
      "Built from reclaimed oak planks with all their character left intact, this table brings warmth and history to a room. A lower shelf adds display or storage, and the chunky, pegged joinery is made to be handed down.",
    images: [
      img(`${LR}/reclaimed-coffee-table.jpg`, "Reclaimed oak coffee table with a lower shelf", 768, 1024),
    ],
    materials: [{ name: "Reclaimed oak", description: "Knots and grain left natural." }],
    dimensions: { width: 130, depth: 65, height: 42, unit: "cm" },
  },
  {
    slug: "step-coffee-table",
    name: "Step Coffee Table",
    categorySlug: "living-room",
    subcategorySlug: "coffee-tables",
    summary: "A two-tier walnut table with offset, interlocking volumes.",
    description:
      "Step is a small piece of sculpture for the centre of the room — two offset walnut volumes that interlock to create open display niches. Compact enough for apartments, distinctive enough to anchor the space.",
    images: [
      img(`${LR}/step-coffee-table.jpg`, "Two-tier interlocking walnut coffee table", 1024, 729),
    ],
    materials: [{ name: "Walnut veneer over engineered core" }],
    dimensions: { width: 110, depth: 60, height: 40, unit: "cm" },
  },
  {
    slug: "oak-media-console",
    name: "Oak Media Console",
    categorySlug: "living-room",
    subcategorySlug: "tv-units",
    summary: "A low oak media unit with push-to-open drawers and cable routing.",
    description:
      "A long, low console in natural oak with a fluted front and push-to-open drawers. A rear channel routes cables out of sight, and the slim steel sled base lifts it gently off the floor.",
    images: [
      img(`${LR}/oak-media-console.webp`, "Low natural oak media console beneath a television", 1080, 1080),
    ],
    materials: [{ name: "Natural oak" }, { name: "Powder-coated steel base" }],
    dimensions: { width: 200, depth: 42, height: 45, unit: "cm" },
    isNew: true,
  },

  // ------------------------------- BEDROOM -------------------------------
  {
    slug: "cloud-upholstered-bed",
    name: "Cloud Upholstered Bed",
    categorySlug: "bedroom",
    subcategorySlug: "beds",
    summary: "A soft, low platform bed with a rounded wrapped headboard.",
    description:
      "Cloud floats on a low upholstered plinth, its softly rounded headboard wrapped in a tactile cream fabric. Designed to anchor a bedroom in calm, it pairs a quiet silhouette with a frame engineered for years of nightly use.",
    images: [
      img(`${BR}/cloud-bed-1.jpg`, "Cream upholstered platform bed styled in a calm bedroom", 736, 736),
      img(`${BR}/cloud-bed-2.jpg`, "Cloud upholstered bed in a warm parquet-floored room", 720, 1280),
    ],
    materials: [{ name: "Cream upholstery weave" }, { name: "Solid timber frame" }],
    dimensions: { width: 180, depth: 215, height: 100, unit: "cm" },
    collection: "Nocturne",
    isFeatured: true,
    isNew: true,
  },
  {
    slug: "hugo-bed",
    name: "Hugo Bed",
    categorySlug: "bedroom",
    subcategorySlug: "beds",
    summary: "A tall, gently winged headboard in soft beige fabric.",
    description:
      "Hugo brings a quiet grandeur to the bedroom with a tall, gently winged headboard upholstered in a soft beige weave. The fully upholstered base finishes the piece cleanly to the floor.",
    images: [
      img(`${BR}/hugo-bed.webp`, "Hugo bed with a tall winged beige upholstered headboard", 1800, 1200),
    ],
    materials: [{ name: "Beige upholstery weave" }, { name: "Engineered hardwood frame" }],
    dimensions: { width: 180, depth: 220, height: 120, unit: "cm" },
    collection: "Nocturne",
  },
  {
    slug: "lora-bed",
    name: "Lora Bed",
    categorySlug: "bedroom",
    subcategorySlug: "beds",
    summary: "A low, channel-stitched bed with a clean horizontal headboard.",
    description:
      "Lora keeps things low and horizontal, with a neatly channel-stitched headboard and an upholstered base. A contemporary, understated choice for rooms where the bed should recede rather than dominate.",
    images: [
      img(`${BR}/lora-bed.webp`, "Lora low bed with a channel-stitched upholstered headboard", 1800, 1200),
    ],
    materials: [{ name: "Neutral upholstery weave" }, { name: "Engineered hardwood frame" }],
    dimensions: { width: 180, depth: 215, height: 95, unit: "cm" },
    collection: "Nocturne",
  },
  {
    slug: "nord-twin-beds",
    name: "Nord Twin Beds",
    categorySlug: "bedroom",
    subcategorySlug: "beds",
    summary: "A pair of solid-oak single beds for guest and children's rooms.",
    description:
      "Honest, solid-oak single beds with a simple panelled headboard — ideal for guest rooms, children's rooms, or a shared space. Sold as a pair or individually, finished in a natural oil that lets the grain show.",
    images: [
      img(`${BR}/twin-beds.jpg`, "A pair of solid oak twin beds in a bright bedroom", 683, 1024),
    ],
    materials: [{ name: "Solid oak", description: "Natural oil finish." }],
    dimensions: { width: 100, depth: 200, height: 90, unit: "cm" },
  },

  // ------------------------------- DINING --------------------------------
  {
    slug: "oak-dining-table",
    name: "Oak Dining Table",
    categorySlug: "dining",
    subcategorySlug: "dining-tables",
    summary: "A solid light-oak table with a chunky, modern leg.",
    description:
      "A generous solid light-oak table with a thick top and a substantial squared leg. Finished to highlight the natural grain, it seats eight comfortably and is built to host for decades. Shown with our upholstered dining chairs.",
    images: [
      img(`${DN}/oak-dining-table.jpg`, "Solid light oak dining table with cream upholstered chairs", 600, 800),
    ],
    materials: [{ name: "Solid light oak" }],
    dimensions: { width: 220, depth: 100, height: 75, unit: "cm" },
    collection: "Monolith",
    isFeatured: true,
  },
  {
    slug: "forge-dining-table",
    name: "Forge Dining Table",
    categorySlug: "dining",
    subcategorySlug: "dining-tables",
    summary: "A reclaimed-oak top on a blackened-steel industrial frame.",
    description:
      "Forge sets a warm reclaimed-oak top on a clean, blackened-steel loop base — an industrial counterpoint that suits open-plan living. The contrast of soft timber and hard steel gives it real presence.",
    images: [
      img(`${DN}/forge-dining-table.jpg`, "Reclaimed oak dining table on a blackened steel frame", 634, 897),
    ],
    materials: [{ name: "Reclaimed oak top" }, { name: "Blackened steel base" }],
    dimensions: { width: 240, depth: 100, height: 75, unit: "cm" },
  },
];
