import { categories as categoryData } from "@/data/categories";
import { products as productData } from "@/data/products";
import type {
  Category,
  CategoryWithCount,
  Product,
  Subcategory,
} from "./types";

/**
 * Local repository implementation.
 *
 * This module is the ONLY place that touches the raw data files. Everything
 * else in the app goes through the public API in ./index.ts. To migrate to a
 * CMS or REST/GraphQL API, reimplement these functions (e.g. as async fetches)
 * and keep the same signatures — the UI does not change.
 *
 * Functions are async by design so a future network-backed source is a
 * drop-in replacement without touching call sites.
 */

const byOrder = (a: Category, b: Category) => a.order - b.order;

function countProducts(categorySlug: string): number {
  return productData.filter((p) => p.categorySlug === categorySlug).length;
}

export async function getCategories(): Promise<Category[]> {
  return [...categoryData].sort(byOrder);
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const cats = await getCategories();
  return cats.map((c) => ({ ...c, productCount: countProducts(c.slug) }));
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  return categoryData.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  return [...productData];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return productData.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  return productData.filter((p) => p.categorySlug === categorySlug);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return productData.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getNewProducts(limit = 4): Promise<Product[]> {
  return productData.filter((p) => p.isNew).slice(0, limit);
}

/**
 * Returns only the subcategories that actually contain at least one product,
 * so filter UIs never show an empty option.
 */
export async function getActiveSubcategories(
  category: Category,
): Promise<Subcategory[]> {
  const present = new Set(
    productData
      .filter((p) => p.categorySlug === category.slug)
      .map((p) => p.subcategorySlug),
  );
  return category.subcategories.filter((s) => present.has(s.slug));
}
