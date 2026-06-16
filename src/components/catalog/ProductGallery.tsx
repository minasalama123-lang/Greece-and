"use client";

import { useState } from "react";
import Image from "next/image";
import type { CatalogImage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/**
 * Product image gallery: one large active image with a row of selectable
 * thumbnails. Thumbnails are real buttons so the gallery is fully keyboard
 * operable; the active thumbnail is announced via aria-current.
 *
 * Falls back gracefully to a single image when only one is supplied.
 */
export function ProductGallery({
  images,
  productName,
}: {
  images: CatalogImage[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul
          className="mt-4 grid grid-cols-4 gap-3"
          aria-label={`${productName} image thumbnails`}
        >
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-current={i === activeIndex ? "true" : undefined}
                aria-label={`View image ${i + 1}: ${image.alt}`}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden bg-sand transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                  i === activeIndex
                    ? "ring-1 ring-ink ring-offset-2 ring-offset-bone"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
