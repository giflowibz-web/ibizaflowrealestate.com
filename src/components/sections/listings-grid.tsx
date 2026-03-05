"use client";

import React, { useEffect, useState } from "react";
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

function formatPrice(p: number | null | undefined) {
  if (!p) return null;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(p);
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
    [p.area, p.municipality || "Ibiza"].filter(Boolean).join(", ");

  const getPrice = (p: Property) =>
    p.price_on_request
      ? lang === "en" ? "Price on request" : "Precio a consultar"
      : formatPrice(p.price) ?? "";

  if (loading) {
    return (
      <section id="propiedades" className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ aspectRatio: "4/3", background: "#F0EDE8" }} />
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

        {/* Grid igual que propiedades */}
        {properties.length === 0 ? (
          <div className="text-center py-20 text-[#999] text-sm">{t.listings.no_properties}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/propiedades/${property.slug || property.id}`}
                style={{ textDecoration: "none", display: "block", position: "relative", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement | null;
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Image */}
                {property.images?.[0] ? (
                  <img
                    src={property.images[0]}
                    alt={getTitle(property)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#555", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase" }}>Ibiza Flow</span>
                  </div>
                )}

                {/* Dark gradient at bottom */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 70%)",
                  pointerEvents: "none",
                }} />

                {/* FOR SALE badge top-left */}
                <span style={{
                  position: "absolute", top: 18, left: 18,
                  background: "rgba(0,0,0,0.22)",
                  color: "#fff",
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  backdropFilter: "blur(6px)",
                }}>
                  {lang === "en" ? "FOR SALE" : "EN VENTA"}
                </span>

                {/* Info overlay bottom */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px 24px 20px",
                }}>
                  {/* Price */}
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.4rem, 2vw, 2rem)",
                    fontWeight: 400,
                    color: "#fff",
                    margin: "0 0 4px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}>
                    {getPrice(property)}
                  </p>

                  {/* Location */}
                  <p style={{
                    fontSize: "0.72rem",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.75)",
                    margin: "0 0 14px",
                    letterSpacing: "0.04em",
                  }}>
                    {getLocation(property)}
                  </p>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                    {(property.bedrooms ?? 0) > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.85)", fontSize: "0.68rem", fontWeight: 300, letterSpacing: "0.06em" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9V19M21 9V19M3 13H21M3 9C3 9 5 7 12 7C19 7 21 9 21 9"/><rect x="7" y="9" width="4" height="4" rx="0.5"/></svg>
                        {property.bedrooms} {lang === "en" ? "beds" : "hab"}
                      </span>
                    )}
                    {(property.bathrooms ?? 0) > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.85)", fontSize: "0.68rem", fontWeight: 300, letterSpacing: "0.06em" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12H20V16C20 18.2 18.2 20 16 20H8C5.8 20 4 18.2 4 16V12Z"/><path d="M4 12V7C4 5.9 4.9 5 6 5H9C10.1 5 11 5.9 11 7V12"/><circle cx="7" cy="5" r="0.5" fill="currentColor"/></svg>
                        {property.bathrooms} ba
                      </span>
                    )}
                    {property.size_built && Number(property.size_built) > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.85)", fontSize: "0.68rem", fontWeight: 300, letterSpacing: "0.06em" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9H21M9 3V21"/></svg>
                        {property.size_built} m²
                      </span>
                    )}
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
