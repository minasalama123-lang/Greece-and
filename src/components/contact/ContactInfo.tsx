import { siteConfig } from "@/config/site";

/** Business contact details: address, phone, email, WhatsApp, hours. */
export function ContactInfo() {
  const { contact } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

  return (
    <div className="space-y-8">
      <Block label="Visit">
        <address className="not-italic">
          {contact.address.line1}
          <br />
          {contact.address.line2}, {contact.address.city}
          <br />
          {contact.address.country}
        </address>
      </Block>

      <Block label="Speak with us">
        <p>
          <a href={telHref} className="text-ink hover:text-brass">
            {contact.phone}
          </a>
        </p>
        <p>
          <a
            href={`mailto:${contact.email}`}
            className="text-ink hover:text-brass"
          >
            {contact.email}
          </a>
        </p>
        <p>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink hover:text-brass"
          >
            Message on WhatsApp
          </a>
        </p>
      </Block>

      <Block label="Hours">
        <p>{contact.hours}</p>
      </Block>
    </div>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 font-sans text-xs uppercase tracking-luxe text-brass">
        {label}
      </h2>
      <div className="space-y-1 font-sans text-base leading-relaxed text-clay">
        {children}
      </div>
    </div>
  );
}
