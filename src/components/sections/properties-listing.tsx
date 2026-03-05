"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

type Property = {
  id: string;
  slug: string;
  title_es: string;
  title_en?: string;
  area?: string;
  municipality?: string;
  island?: string;
  price?: number | null;
  price_rent?: number | null;
  price_on_request?: boolean;
  currency?: string;
  status?: string;
  listing_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  size_built?: number | null;
  size_plot?: number | null;
  images?: string[];
  featured?: boolean;
  property_type?: string;
  features?: string[];
};

const AREAS = ["Ibiza Town", "Santa Eulalia", "San José", "San Antonio", "North Ibiza", "Es Canar"];
const BEDROOMS_OPTIONS = ["1+", "2+", "3+", "4+", "5+"];

function formatPrice(p: number | null | undefined, currency = "EUR", isRent = false, perMonth = "/month") {
  if (!p) return null;
  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(p);
  return isRent ? `${formatted}${perMonth}` : formatted;
}

export default function PropertiesListingPage({
  properties,
  listingType,
}: {
  properties: Property[];
  listingType: "sale" | "rent";
}) {
  const isRent = listingType === "rent";
  const { t } = useLang();
  const lp = t.listing_page;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc" | "featured">("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...properties];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title_es?.toLowerCase().includes(q) ||
          p.title_en?.toLowerCase().includes(q) ||
          p.area?.toLowerCase().includes(q) ||
          p.municipality?.toLowerCase().includes(q)
      );
    }

    if (selectedType) {
      list = list.filter(
        (p) => p.property_type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    if (selectedArea) {
      list = list.filter(
        (p) =>
          p.area?.toLowerCase().includes(selectedArea.toLowerCase()) ||
          p.municipality?.toLowerCase().includes(selectedArea.toLowerCase())
      );
    }

    if (minBedrooms > 0) {
      list = list.filter((p) => (p.bedrooms ?? 0) >= minBedrooms);
    }

    if (maxPrice > 0) {
      list = list.filter((p) => {
        const price = isRent ? p.price_rent : p.price;
        return price ? price <= maxPrice : p.price_on_request;
      });
    }

    list.sort((a, b) => {
      if (sortBy === "featured") {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === "price_asc") {
        const pa = isRent ? (a.price_rent ?? 0) : (a.price ?? 0);
        const pb = isRent ? (b.price_rent ?? 0) : (b.price ?? 0);
        return pa - pb;
      }
      if (sortBy === "price_desc") {
        const pa = isRent ? (a.price_rent ?? 0) : (a.price ?? 0);
        const pb = isRent ? (b.price_rent ?? 0) : (b.price ?? 0);
        return pb - pa;
      }
      return 0;
    });

    return list;
  }, [properties, searchQuery, selectedType, selectedArea, minBedrooms, maxPrice, sortBy, isRent]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedArea("");
    setMinBedrooms(0);
    setMaxPrice(0);
    setSortBy("featured");
  };

  const hasActiveFilters = searchQuery || selectedType || selectedArea || minBedrooms > 0 || maxPrice > 0;

    return (
      <>
        {/* ── HERO HEADER WITH VIDEO ── */}
        <div
          style={{
            position: "relative",
            height: "60vh",
            minHeight: 420,
            overflow: "hidden",
          }}
        >
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingBottom: 60,
              paddingLeft: "6%",
              paddingRight: "6%",
              paddingTop: 140,
              maxWidth: 1400,
              margin: "0 auto",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#002FA7",
                margin: "0 0 20px",
              }}
            >
              {isRent ? lp.tag_rent : lp.tag_sale}
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 6vw, 6rem)",
                fontWeight: 300,
                color: "#fff",
                margin: 0,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
              }}
            >
              {isRent ? (
                <>{lp.title_rent}<br /><em>{lp.title_rent_em}</em></>
              ) : (
                <>{lp.title_sale}<br /><em>{lp.title_sale_em}</em></>
              )}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                marginTop: 32,
              }}
            >
              <div style={{ width: 40, height: 1, background: "#002FA7" }} />
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                {filtered.length} {filtered.length === 1 ? lp.available_one : lp.available_many}
              </p>
            </div>
          </div>
        </div>

      {/* ── FILTERS BAR ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e5e5",
          position: "sticky",
          top: 68,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 6%",
            display: "flex",
            alignItems: "center",
            gap: 0,
            height: 60,
          }}
        >
          {/* Search */}
          <div style={{ flex: 1, borderRight: "1px solid #e5e5e5", height: "100%", display: "flex", alignItems: "center" }}>
            <input
              type="text"
                placeholder={lp.search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "#0A0A0A",
                letterSpacing: "0.02em",
                padding: "0 20px",
              }}
            />
          </div>

          {/* Type filter */}
          <div style={{ borderRight: "1px solid #e5e5e5", height: "100%", display: "flex", alignItems: "center" }}>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: selectedType ? "#002FA7" : "#888",
                padding: "0 20px",
                cursor: "pointer",
                height: "100%",
              }}
            >
                <option value="">{lp.type_label}</option>
                {lp.property_types.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
            </select>
          </div>

          {/* Area filter */}
          <div style={{ borderRight: "1px solid #e5e5e5", height: "100%", display: "flex", alignItems: "center" }}>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: selectedArea ? "#002FA7" : "#888",
                padding: "0 20px",
                cursor: "pointer",
                height: "100%",
              }}
            >
                <option value="">{lp.area_label}</option>
              {AREAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div style={{ borderRight: "1px solid #e5e5e5", height: "100%", display: "flex", alignItems: "center" }}>
            <select
              value={minBedrooms === 0 ? "" : `${minBedrooms}+`}
              onChange={(e) => setMinBedrooms(e.target.value ? parseInt(e.target.value) : 0)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: minBedrooms > 0 ? "#002FA7" : "#888",
                padding: "0 20px",
                cursor: "pointer",
                height: "100%",
              }}
            >
                <option value="">{lp.bedrooms_label}</option>
                {BEDROOMS_OPTIONS.map((b) => (
                  <option key={b} value={parseInt(b)}>{b} {lp.beds_suffix}</option>
                ))}
            </select>
          </div>

          {/* Sort */}
          <div style={{ borderRight: "1px solid #e5e5e5", height: "100%", display: "flex", alignItems: "center" }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                padding: "0 20px",
                cursor: "pointer",
                height: "100%",
              }}
            >
                <option value="featured">{lp.sort_featured}</option>
                <option value="price_asc">{lp.sort_price_asc}</option>
                <option value="price_desc">{lp.sort_price_desc}</option>
                <option value="newest">{lp.sort_newest}</option>
            </select>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#002FA7",
                cursor: "pointer",
                padding: "0 20px",
                height: "100%",
                whiteSpace: "nowrap",
              }}
            >
              {lp.clear}
            </button>
          )}
        </div>
      </div>

        {/* ── GRID ── */}
          <div style={{ background: "#fff", minHeight: "60vh" }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "120px 6%", color: "#999" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 300, color: "#222", margin: "0 0 16px", letterSpacing: "-0.03em" }}>
                  {lp.no_results}
                </p>
                <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
                  {lp.no_results_sub}
                </p>
                {hasActiveFilters && (
                  <button onClick={resetFilters} style={{ marginTop: 24, background: "#002FA7", color: "#fff", border: "none", padding: "12px 32px", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                    {lp.clear_filters}
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", padding: "8px", background: "#fff" }}>
                {filtered.map((property) => {
                  const price = property.price_on_request
                    ? lp.price_on_request
                    : formatPrice(
                        isRent ? property.price_rent : property.price,
                        property.currency ?? "EUR",
                        isRent,
                        lp.per_month,
                      ) ?? lp.price_on_request;

                  const location = [property.area, property.municipality ?? "Ibiza"]
                    .filter(Boolean)
                    .join(", ");

                  const title = property.title_en || property.title_es;
                  const href = `/propiedades/${property.slug || property.id}`;
                  const typeLabel = lp.property_types.find(pt => pt.value.toLowerCase() === property.property_type?.toLowerCase())?.label ?? property.property_type;

                    return (
                      <Link
                        key={property.id}
                        href={href}
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
                            alt={title}
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
                            {isRent ? lp.tag_rent : lp.tag_sale}
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
                            {price}
                          </p>

                          {/* Location */}
                          <p style={{
                            fontSize: "0.72rem",
                            fontWeight: 300,
                            color: "rgba(255,255,255,0.75)",
                            margin: "0 0 14px",
                            letterSpacing: "0.04em",
                          }}>
                            {location}
                          </p>

                            {/* Stats — sin bordes, solo texto blanco */}
                            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                              {(property.bedrooms ?? 0) > 0 && (
                                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.68rem", fontWeight: 300, letterSpacing: "0.06em" }}>
                                  {property.bedrooms} {lp.beds_suffix}
                                </span>
                              )}
                              {(property.bathrooms ?? 0) > 0 && (
                                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.68rem", fontWeight: 300, letterSpacing: "0.06em" }}>
                                  {property.bathrooms} {lp.baths_suffix}
                                </span>
                              )}
                              {property.size_built && Number(property.size_built) > 0 && (
                                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.68rem", fontWeight: 300, letterSpacing: "0.06em" }}>
                                  {property.size_built} m²
                                </span>
                              )}
                            </div>
                        </div>
                      </Link>
                    );
                })}
              </div>
            )}
          </div>

        {/* ── CONTACT CTA ── */}
        <div
          style={{
            background: "#fff",
            padding: "100px 6%",
            textAlign: "center",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#002FA7",
              margin: "0 0 20px",
            }}
          >
            {lp.cta_tag}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: "#0A0A0A",
              margin: "0 0 20px",
              letterSpacing: "-0.03em",
            }}
          >
            {isRent ? lp.cta_title_rent : lp.cta_title_sale}
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: "0.85rem",
              fontWeight: 300,
              margin: "0 0 40px",
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.8,
            }}
          >
            {lp.cta_sub}
          </p>
          <Link
            href="/#contacto"
            style={{
              display: "inline-block",
              background: "#002FA7",
              color: "#fff",
              padding: "16px 48px",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {lp.cta_btn}
          </Link>
        </div>
    </>
  );
}
