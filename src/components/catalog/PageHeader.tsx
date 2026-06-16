import { Container } from "@/components/ui/Container";

/**
 * Tall page header used on interior pages (categories, about, contact). Sits
 * below the fixed header — note the top padding to clear it.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Container as="header" className="pb-12 pt-36 md:pt-44">
      {eyebrow && (
        <p className="mb-4 font-sans text-xs uppercase tracking-luxe text-brass">
          {eyebrow}
        </p>
      )}
      <h1 className="max-w-3xl font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-clay">
          {description}
        </p>
      )}
    </Container>
  );
}
