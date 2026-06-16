import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/catalog";

// next/image renders a plain <img> in tests so we can assert on alt/src.
vi.mock("next/image", () => ({
  // Strip Next-only props so React doesn't warn about unknown DOM attributes.
  default: ({ fill, priority, sizes, ...rest }: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...(rest as Record<string, string>)} />;
  },
}));

// next/link renders a plain anchor.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const product: Product = {
  slug: "aria-linen-sofa",
  name: "Aria Linen Sofa",
  categorySlug: "living-room",
  subcategorySlug: "sofas",
  summary: "A low, generous three-seater.",
  description: "Long description.",
  images: [
    { src: "/a.jpg", alt: "Aria sofa front", width: 1400, height: 1750 },
  ],
  materials: [{ name: "Linen" }],
  dimensions: { width: 240, depth: 98, height: 78, unit: "cm" },
  collection: "Atelier I",
  isNew: true,
};

describe("ProductCard", () => {
  it("renders the product name, summary and collection", () => {
    render(<ProductCard product={product} />);
    expect(
      screen.getByRole("heading", { name: "Aria Linen Sofa" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A low, generous three-seater.")).toBeInTheDocument();
    expect(screen.getByText("Atelier I")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/products/aria-linen-sofa",
    );
  });

  it("uses meaningful alt text from the data", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByAltText("Aria sofa front")).toBeInTheDocument();
  });

  it('shows a "New" badge for new pieces', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("omits the New badge when the product is not new", () => {
    render(<ProductCard product={{ ...product, isNew: false }} />);
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });
});
