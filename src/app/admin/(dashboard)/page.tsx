import Link from "next/link";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const stats = [
    { label: "Products", value: products.length, href: "/admin/products" },
    { label: "Categories", value: categories.length, href: "/admin/products" },
    { label: "Inquiries", value: "—", href: "/admin/inquiries" },
    { label: "Visitors (30d)", value: "—", href: "/admin/visitors" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-ink">Dashboard</h1>
      <p className="mt-2 font-sans text-base text-clay">
        Manage your catalogue, read inquiries, and watch traffic.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-sand bg-bone p-6 transition-colors hover:border-brass"
          >
            <p className="font-sans text-xs uppercase tracking-luxe text-clay">
              {s.label}
            </p>
            <p className="mt-3 font-serif text-4xl font-light text-ink">
              {s.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-dashed border-sand bg-bone/60 p-6">
        <p className="font-sans text-sm text-clay">
          Inquiries and visitor stats turn on once the database is connected.
          Product management is next.
        </p>
      </div>
    </div>
  );
}
