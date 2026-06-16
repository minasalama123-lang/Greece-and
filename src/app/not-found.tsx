import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-sans text-xs uppercase tracking-luxe text-brass">
        Page not found
      </p>
      <h1 className="mt-4 font-serif text-4xl font-light text-ink md:text-5xl">
        This piece has been moved
      </h1>
      <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-clay">
        The page you were looking for isn’t here. It may have been renamed, or
        the link may be incomplete.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/" variant="primary">
          Return Home
        </Button>
        <Button href="/categories" variant="outline">
          Browse Collections
        </Button>
      </div>
    </Container>
  );
}
