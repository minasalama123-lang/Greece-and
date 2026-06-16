import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Chrome for the authenticated admin area. The middleware guarantees a valid
 * session before any of these pages render, so there is no auth logic here.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand/20 md:grid md:grid-cols-[16rem_1fr]">
      <aside className="flex flex-col gap-8 border-b border-sand bg-bone p-6 md:min-h-screen md:border-b-0 md:border-r">
        <Link href="/admin" aria-label="Admin home">
          <Logo />
        </Link>
        <AdminNav />
        <div className="mt-auto flex flex-col gap-1 border-t border-sand pt-4">
          <Link
            href="/"
            className="rounded px-3 py-2 font-sans text-sm text-clay transition-colors hover:bg-sand/60 hover:text-ink"
          >
            View site →
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <div className="p-6 md:p-10">{children}</div>
    </div>
  );
}
