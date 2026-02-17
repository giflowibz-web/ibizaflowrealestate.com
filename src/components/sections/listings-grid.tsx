"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface Property {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  area: string;
  municipality: string;
  price: number;
  price_on_request: boolean;
  status: string;
  bedrooms: number;
  bathrooms: number;
  size_built: number;
  images: string[];
  featured: boolean;
}

const ListingsGrid = () => {
  const { t, lang } = useLang();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties?limit=6&status=available")
      .then((r) => r.json())
      .then((d) => {
        setProperties(d.data || d.properties || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getTitle = (p: Property) =>
    lang === "en" ? p.title_en || p.title_es : p.title_es || p.title_en;

  const getAddress = (p: Property) =>
    [p.area, p.municipality || "Ibiza"].filter(Boolean).join(", ");

  const getPrice = (p: Property) =>
    p.price_on_request
      ? lang === "en" ? "Price on request" : "Precio a consultar"
      : p.price
      ? `€${p.price.toLocaleString()}`
      : "";

  return (
    <section id="propiedades" className="bg-white py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-[6%]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
            {t.listings.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-black">
            {t.listings.title}
          </h2>
          <p className="text-[#666] text-lg font-body mt-4 max-w-2xl mx-auto">
            {t.listings.subtitle}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#999] font-body">{t.common.loading}</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-[#999] font-body">{t.listings.no_properties}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/propiedades/${property.slug || property.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F0F0F0]">
                  {property.images?.[0] ? (
                    <Image
                      src={property.images[0]}
                      alt={getTitle(property)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E8E4DC] flex items-center justify-center">
                      <span className="text-[#999] text-xs uppercase tracking-widest">Ibiza Flow</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  {property.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-[#002FA7] text-white text-[10px] uppercase tracking-[0.15em] font-bold">
                        {t.listings.exclusive}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-5 pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-serif text-black group-hover:text-[#002FA7] transition-colors duration-300">
                        {getTitle(property)}
                      </h3>
                      <p className="text-[#888] text-[13px] font-body mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {getAddress(property)}
                      </p>
                    </div>
                    <p className="text-black font-serif text-lg whitespace-nowrap">{getPrice(property)}</p>
                  </div>

                  <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[#E5E5E5]">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1.5 text-[#666] text-[13px] font-body">
                        <Bed className="w-4 h-4 text-[#002FA7]" />
                        {property.bedrooms} {t.listings.beds}
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1.5 text-[#666] text-[13px] font-body">
                        <Bath className="w-4 h-4 text-[#002FA7]" />
                        {property.bathrooms} {t.listings.baths}
                      </div>
                    )}
                    {property.size_built && (
                      <div className="flex items-center gap-1.5 text-[#666] text-[13px] font-body">
                        <Maximize className="w-4 h-4 text-[#002FA7]" />
                        {property.size_built} {t.listings.sqm}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <a
            href="/propiedades"
            className="inline-flex items-center justify-center px-12 py-4 border-2 border-black text-black text-[13px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all duration-300"
          >
            {t.listings.view_all}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ListingsGrid;
