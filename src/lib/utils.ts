/**
 * Tiny class-name combiner. Filters falsy values and joins with spaces.
 * Avoids pulling in clsx/tailwind-merge for a project this size.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
