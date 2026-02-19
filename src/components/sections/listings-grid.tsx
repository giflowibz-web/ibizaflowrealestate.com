"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin, ArrowRight } from "lucide-react";
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
  property_type: string;
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

  if (loading) {
    return (
      <section id="propiedades" className="bg-[#F9F8F6] py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-[#E8E4DC]" />
                <div className="pt-5 space-y-3">
                  <div className="h-5 bg-[#E8E4DC] rounded w-3/4" />
                  <div className="h-4 bg-[#E8E4DC] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="propiedades" className="bg-[#F9F8F6] py-28 md:py-36">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-[#002FA7] text-[11px] uppercase tracking-[0.3em] font-bold block mb-4">
              {t.listings.tag}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-none">
              {t.listings.title}
            </h2>
          </div>
          <p className="text-[#888] text-[14px] font-body leading-relaxed max-w-xs md:text-right">
            {t.listings.subtitle}
          </p>
        </div>

        {/* Grid */}
        {properties.length === 0 ? (
          <div className="text-center py-20 text-[#999] font-body">{t.listings.no_properties}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E0D8]">
            {properties.map((property, index) => (
              <Link
                key={property.id}
                href={`/propiedades/${property.slug || property.id}`}
                className="group block bg-white"
              >
                {/* Image */}
                <div className="relative overflow-hidden"
                  style={{ paddingBottom: index === 0 ? '75%' : '65%' }}
                >
                  <div className="absolute inset-0">
                    {property.images?.[0] ? (
                      <Image
                        src={property.images[0]}
                        alt={getTitle(property)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E8E4DC] flex items-center justify-center">
                        <span className="text-[#C5BDB0] text-[10px] uppercase tracking-[0.3em]">Ibiza Flow</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {property.featured && (
                      <span className="inline-block px-3 py-1 bg-[#002FA7] text-white text-[9px] uppercase tracking-[0.2em] font-bold">
                        {t.listings.exclusive}
                      </span>
                    )}
                    {property.property_type && (
                      <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-[9px] uppercase tracking-[0.2em] font-bold">
                        {property.property_type}
                      </span>
                    )}
                  </div>

                  {/* Price overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white font-display text-xl">{getPrice(property)}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-[1.2rem] text-[#0A0A0A] group-hover:text-[#002FA7] transition-colors duration-300 leading-tight mb-1.5 truncate">
                        {getTitle(property)}
                      </h3>
                      <p className="text-[#999] text-[12px] font-body flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{getAddress(property)}</span>
                      </p>
                    </div>
                    <p className="text-[#0A0A0A] font-display text-lg whitespace-nowrap flex-shrink-0">{getPrice(property)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1.5 text-[#666] text-[12px] font-body">
                          <Bed className="w-3.5 h-3.5 text-[#002FA7]" />
                          {property.bedrooms}
                        </div>
                      )}
                      {property.bathrooms > 0 && (
                        <div className="flex items-center gap-1.5 text-[#666] text-[12px] font-body">
                          <Bath className="w-3.5 h-3.5 text-[#002FA7]" />
                          {property.bathrooms}
                        </div>
                      )}
                      {property.size_built > 0 && (
                        <div className="flex items-center gap-1.5 text-[#666] text-[12px] font-body">
                          <Maximize2 className="w-3.5 h-3.5 text-[#002FA7]" />
                          {property.size_built} m²
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#002FA7] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link
            href="/propiedades"
            className="group inline-flex items-center gap-3 border border-[#0A0A0A] px-12 py-4 text-[12px] uppercase tracking-[0.25em] font-bold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-400 font-body"
          >
            {t.listings.view_all}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ListingsGrid;
