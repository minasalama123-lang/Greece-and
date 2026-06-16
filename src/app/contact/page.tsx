import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/catalog/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapEmbed } from "@/components/contact/MapEmbed";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Inquire about a piece, arrange an atelier visit, or ask about bespoke commissions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Begin a conversation"
        description="Tell us about the piece or the space you have in mind. We respond to every inquiry personally."
      />

      <Container className="pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            {/* useSearchParams requires a Suspense boundary in Next 15. */}
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>
          <ContactInfo />
        </div>

        <div className="mt-20">
          <MapEmbed />
        </div>
      </Container>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-12 w-full animate-pulse bg-sand/60" />
      ))}
    </div>
  );
}
