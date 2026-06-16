"use client";

import { useMemo, useState } from "react";
import type { Product, Subcategory } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

interface CategoryProductsProps {
  products: Product[];
  subcategories: Subcategory[];
}

const ALL = "all";

/**
 * Client-side filtered product grid for a category page. Filtering is purely
 * presentational (the full set is already on the page), so it stays instant
 * and requires no extra requests. Filter controls are real buttons in a
 * labelled group for keyboard + screen-reader users.
 */
export function CategoryProducts({
  products,
  subcategories,
}: CategoryProductsProps) {
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () =>
      active === ALL
        ? products
        : products.filter((p) => p.subcategorySlug === active),
    [active, products],
  );

  return (
    <div>
      {subcategories.length > 0 && (
        <div
          role="group"
          aria-label="Filter by type"
          className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-sand pb-5"
        >
          <FilterButton
            label="All"
            isActive={active === ALL}
            onClick={() => setActive(ALL)}
          />
          {subcategories.map((sub) => (
            <FilterButton
              key={sub.slug}
              label={sub.name}
              isActive={active === sub.slug}
              onClick={() => setActive(sub.slug)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-12 font-sans text-base text-clay">
          No pieces in this selection yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        "font-sans text-xs uppercase tracking-luxe transition-colors duration-300 hover:text-brass",
        isActive ? "text-brass" : "text-clay",
      )}
    >
      {label}
    </button>
  );
}
