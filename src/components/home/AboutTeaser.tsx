import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/** Two-column craftsmanship teaser linking to the About page. */
export function AboutTeaser() {
  return (
    <Container as="section" className="py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src="https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=1200&q=80"
            alt="A craftsperson hand-finishing a wooden furniture joint"
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="font-sans text-xs uppercase tracking-luxe text-brass">
            The Atelier
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-ink md:text-4xl">
            Made slowly, by hand, to be kept
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-clay">
            Every piece begins with the material — solid timber, full-grain
            leather, honed stone — and a maker who knows how to listen to it. We
            work in small batches, finishing by hand, because the details you
            cannot quite name are the ones you feel for a lifetime.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="ghost" className="px-0">
              Discover our craft →
            </Button>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
