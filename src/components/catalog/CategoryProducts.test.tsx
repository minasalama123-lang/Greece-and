import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoryProducts } from "./CategoryProducts";
import type { Product, Subcategory } from "@/lib/catalog";

vi.mock("next/image", () => ({
  // Strip Next-only props so React doesn't warn about unknown DOM attributes.
  default: ({ fill, priority, sizes, ...rest }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...(rest as Record<string, string>)} />
  ),
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

function makeProduct(slug: string, subcategorySlug: string): Product {
  return {
    slug,
    name: slug,
    categorySlug: "living-room",
    subcategorySlug,
    summary: "summary",
    description: "desc",
    images: [{ src: "/x.jpg", alt: `${slug} image`, width: 100, height: 100 }],
    materials: [{ name: "Oak" }],
    dimensions: { width: 1, depth: 1, height: 1, unit: "cm" },
  };
}

const products = [
  makeProduct("sofa-one", "sofas"),
  makeProduct("sofa-two", "sofas"),
  makeProduct("chair-one", "armchairs"),
];

const subcategories: Subcategory[] = [
  { slug: "sofas", name: "Sofas" },
  { slug: "armchairs", name: "Armchairs" },
];

describe("CategoryProducts", () => {
  it("shows all products initially", () => {
    render(
      <CategoryProducts products={products} subcategories={subcategories} />,
    );
    expect(screen.getByRole("heading", { name: "sofa-one" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "chair-one" })).toBeInTheDocument();
  });

  it("filters products when a subcategory is selected", async () => {
    const user = userEvent.setup();
    render(
      <CategoryProducts products={products} subcategories={subcategories} />,
    );

    await user.click(screen.getByRole("button", { name: "Armchairs" }));

    expect(screen.getByRole("heading", { name: "chair-one" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "sofa-one" }),
    ).not.toBeInTheDocument();
  });

  it("marks the active filter with aria-pressed", async () => {
    const user = userEvent.setup();
    render(
      <CategoryProducts products={products} subcategories={subcategories} />,
    );
    const sofas = screen.getByRole("button", { name: "Sofas" });
    await user.click(sofas);
    expect(sofas).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("restores the full list when All is reselected", async () => {
    const user = userEvent.setup();
    render(
      <CategoryProducts products={products} subcategories={subcategories} />,
    );
    await user.click(screen.getByRole("button", { name: "Armchairs" }));
    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByRole("heading", { name: "sofa-one" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "sofa-two" })).toBeInTheDocument();
  });

  it("renders no filter bar when there are no subcategories", () => {
    render(<CategoryProducts products={products} subcategories={[]} />);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });
});
