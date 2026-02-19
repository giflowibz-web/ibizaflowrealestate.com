"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const getLocation = (p: Property) =>
    [p.area, p.municipality || "Ibiza"].filter(Boolean).join(" — ");

  const getPrice = (p: Property) =>
    p.price_on_request
      ? lang === "en"
        ? "Price on request"
        : "Precio a consultar"
      : p.price
      ? `€${p.price.toLocaleString()}`
      : "";

  if (loading) {
    return (
      <section id="propiedades" className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-[#F0EDE8]" />
                <div className="pt-5 space-y-3">
                  <div className="h-4 bg-[#F0EDE8] rounded w-1/3" />
                  <div className="h-6 bg-[#F0EDE8] rounded w-2/3" />
                  <div className="h-4 bg-[#F0EDE8] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="propiedades" className="bg-white py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#888] font-medium block mb-4">
              {t.listings.tag}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#0A0A0A] leading-none font-light">
              {t.listings.title}
            </h2>
          </div>
          <Link
            href="/propiedades"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#0A0A0A] hover:text-[#555] transition-colors font-medium"
          >
            {t.listings.view_all}
            <span className="block w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
          </Link>
        </div>

        {/* Grid 2 columnas estilo Aaron Kirman */}
        {properties.length === 0 ? (
          <div className="text-center py-20 text-[#999] text-sm">{t.listings.no_properties}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {properties.map((property, index) => (
              <Link
                key={property.id}
                href={`/propiedades/${property.slug || property.id}`}
                className="group block"
              >
                {/* Imagen vertical */}
                <div className="relative overflow-hidden bg-[#F0EDE8]"
                  style={{ aspectRatio: index % 3 === 0 ? "3/4" : "4/5" }}
                >
                  {property.images?.[0] ? (
                    <Image
                      src={property.images[0]}
                      alt={getTitle(property)}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#C5BDB0] text-[10px] uppercase tracking-[0.4em]">
                        Ibiza Flow
                      </span>
                    </div>
                  )}

                  {/* Badge exclusivo */}
                  {property.featured && (
                    <div className="absolute top-5 left-5">
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-[#0A0A0A] text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1.5">
                        {t.listings.exclusive}
                      </span>
                    </div>
                  )}

                  {/* Tipo de propiedad */}
                  {property.property_type && (
                    <div className="absolute top-5 right-5">
                      <span className="inline-block bg-black/60 backdrop-blur-sm text-white text-[9px] uppercase tracking-[0.25em] px-3 py-1.5">
                        {property.property_type}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info debajo */}
                <div className="pt-5">
                  {/* Localización */}
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#999] mb-2">
                    {getLocation(property)}
                  </p>

                  {/* Título */}
                  <h3 className="font-display text-xl md:text-2xl text-[#0A0A0A] font-light leading-snug mb-3 group-hover:opacity-60 transition-opacity duration-300">
                    {getTitle(property)}
                  </h3>

                  {/* Separador */}
                  <div className="w-8 h-px bg-[#CCC] mb-3 group-hover:w-16 transition-all duration-500" />

                  {/* Stats + Precio en la misma línea */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 text-[11px] text-[#777] uppercase tracking-[0.2em]">
                      {property.bedrooms > 0 && (
                        <span>{property.bedrooms} {lang === "en" ? "BD" : "HAB"}</span>
                      )}
                      {property.bathrooms > 0 && (
                        <span>{property.bathrooms} {lang === "en" ? "BA" : "BA"}</span>
                      )}
                      {property.size_built > 0 && (
                        <span>{property.size_built} m²</span>
                      )}
                    </div>
                    <p className="font-display text-lg text-[#0A0A0A] font-light">
                      {getPrice(property)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA centrado */}
        <div className="flex justify-center mt-20 pt-8 border-t border-[#E8E4DC]">
          <Link
            href="/propiedades"
            className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-[#0A0A0A] hover:text-[#555] transition-colors font-medium"
          >
            {t.listings.view_all}
            <span className="block w-10 h-px bg-current transition-all duration-300 group-hover:w-16" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ListingsGrid;
