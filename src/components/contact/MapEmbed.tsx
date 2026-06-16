import { siteConfig } from "@/config/site";

/**
 * Embedded location map. Uses Google Maps' keyless embed (no API key, no
 * secret to manage) wrapped in a titled iframe with lazy loading. The embed
 * origin is allow-listed in the CSP `frame-src` directive.
 */
export function MapEmbed() {
  const { address } = siteConfig.contact;
  return (
    <div className="aspect-[16/9] w-full overflow-hidden border border-sand bg-sand md:aspect-[21/9]">
      <iframe
        title={`Map showing ${siteConfig.name} in ${address.city}`}
        src={siteConfig.contact.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    </div>
  );
}
