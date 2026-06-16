"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public footer on admin routes, which have their own chrome.
 * The Footer (a server component) is passed through as children.
 */
export function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
