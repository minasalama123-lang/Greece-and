import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Product } from "@/lib/catalog";

/**
 * SEO helpers — centralize metadata + JSON-LD construction so every page stays
 * consistent and the OG/Twitter tags never drift out of sync.
 */

const baseUrl = siteConfig.url;

/** Build a page <Metadata> object with sane Open Graph / Twitter defaults. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  /** Path beginning with "/" — becomes the canonical URL. */
  path: string;
  image?: string;
}): Metadata {
  const url = new URL(opts.path, baseUrl).toString();
  const image = opts.image ?? siteConfig.ogImage;
  const absoluteImage = image.startsWith("http")
    ? image
    : new URL(image, baseUrl).toString();

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: siteConfig.name,
      images: [{ url: absoluteImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [absoluteImage],
    },
  };
}

/** JSON-LD Organization markup for the site root. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: baseUrl,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.line1,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
  };
}

/** JSON-LD Product markup (no price — this is a catalog, not a store). */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.images.map((i) => i.src),
    category: product.categorySlug,
    brand: { "@type": "Brand", name: siteConfig.name },
    material: product.materials.map((m) => m.name).join(", "),
  };
}
