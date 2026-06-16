import { cn } from "@/lib/utils";

/** Centered max-width wrapper with consistent responsive gutters. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-content px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}
