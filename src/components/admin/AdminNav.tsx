"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/visitors", label: "Visitors" },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(link.href) ? "page" : undefined}
          className={cn(
            "rounded px-3 py-2 font-sans text-sm transition-colors",
            isActive(link.href)
              ? "bg-ink text-bone"
              : "text-ink hover:bg-sand/60",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
