"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

/**
 * Site header. Transparent over the hero at the top of the page, then fades to
 * a solid bar once scrolled. Collapses to a slide-in panel on mobile.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The header is only transparent over a *dark* hero on the home page. On every
  // other page the top of the page is the light bone background, so the header
  // must use its dark-on-light treatment even before scrolling — otherwise the
  // light wordmark and nav vanish against the cream background.
  const overHero = pathname === "/" && !scrolled && !menuOpen;

  // The admin area has its own chrome; never show the public header there.
  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-luxe",
        scrolled || menuOpen
          ? "bg-bone/95 backdrop-blur supports-[backdrop-filter]:bg-bone/80"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label={`${siteConfig.name} — home`}>
          {/* Light wordmark only while transparent over the dark home hero;
              dark everywhere else so it stays legible on the bone background. */}
          <Logo light={overHero} />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "font-sans text-xs uppercase tracking-luxe transition-colors duration-300 hover:text-brass",
                    isActive(item.href)
                      ? "text-brass"
                      : overHero
                        ? "text-bone"
                        : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={cn("md:hidden p-2", overHero ? "text-bone" : "text-ink")}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden border-t border-sand transition-[max-height] duration-500 ease-luxe",
          menuOpen ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav aria-label="Mobile" className="bg-bone">
          <ul className="flex flex-col px-6 py-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href} className="border-b border-sand/60 last:border-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block py-4 font-sans text-sm uppercase tracking-luxe",
                    isActive(item.href) ? "text-brass" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
