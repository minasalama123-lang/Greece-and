import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Real delivered projects — photographs from completed client installs, living
 * under /public/images/delivered. Shared by the home page and the About page so
 * the gallery has a single source of truth.
 */
export const deliveredProjects = [
  {
    src: "/images/delivered/marble-dining-set.jpg",
    alt: "A round marble-top dining table with cream upholstered chairs, delivered and styled in a client's open-plan kitchen",
  },
  {
    src: "/images/delivered/living-marble-tables.jpg",
    alt: "A cream modular sofa with two round marble coffee tables and a live-edge wooden bench in an open-plan living and dining space",
  },
  {
    src: "/images/delivered/grey-modular-sectional.jpg",
    alt: "A large grey modular sectional sofa with a chaise, styled over a jute rug in a bright living room",
  },
  {
    src: "/images/delivered/walnut-dining-bench.jpg",
    alt: "A live-edge walnut dining table with a matching bench and cane chairs, overlooking a pool",
  },
  {
    src: "/images/delivered/marble-round-velvet-dining.jpg",
    alt: "A round marble dining table with grey velvet chairs and a leather cabinet against wood-panelled walls",
  },
  {
    src: "/images/delivered/walnut-vanity-bedroom.jpg",
    alt: "A long floating walnut dressing table with an arched mirror, upholstered stool and bouclé lounge chair in a marble-floored bedroom",
  },
];

interface DeliveredWorkProps {
  /** Anchor id, so the navbar can link straight to this section. */
  id?: string;
  /** Extra classes on the section wrapper (e.g. a background). */
  className?: string;
}

/** Gallery of completed client projects. */
export function DeliveredWork({ id, className }: DeliveredWorkProps) {
  return (
    // scroll-mt clears the fixed header when navigated to via the anchor.
    <section id={id} className={cn("scroll-mt-24", className)}>
      <Container className="py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Delivered Work"
            title="Pieces already in clients' homes"
            description="A selection of completed projects — designed, made, and installed for real spaces."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {deliveredProjects.map((item, i) => (
            <Reveal key={item.src} as="div" delay={(i % 3) * 80}>
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-700 ease-luxe hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
