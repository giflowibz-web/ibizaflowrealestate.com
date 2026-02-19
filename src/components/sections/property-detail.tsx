"use client";

import { useState } from "react";

type Property = {
  id: string;
  slug: string;
  title_es: string;
  title_en?: string;
  description_es?: string;
  description_en?: string;
  price?: number | string | null;
  price_rent?: number | string | null;
  price_on_request?: boolean;
  currency?: string;
  status?: string;
  listing_type?: string;
  area?: string;
  municipality?: string;
  island?: string;
  country?: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  bedrooms?: number;
  bathrooms?: number;
  size_built?: number | string | null;
  size_plot?: number | string | null;
  year_built?: number | null;
  property_type?: string;
  images?: string[];
  features?: string[];
  lot_size?: string;
  mls_id?: string;
  contact_email?: string;
  architectural_style?: string;
  view?: string;
  stories?: number | null;
  pool?: string;
  parking?: string;
  heating?: string;
  cooling?: string;
  laundry?: string;
  fireplace?: string;
  appliances?: string;
  featured?: boolean;
};

const PROPERTY_TYPE_ES: Record<string, string> = {
  finca: "Finca",
  villa: "Villa",
  penthouse: "Ático",
  house: "Casa",
  apartment: "Apartamento",
  townhouse: "Casa adosada",
  land: "Terreno",
  commercial: "Comercial",
  office: "Oficina",
};

function formatPrice(p: number | string | null | undefined, currency = "EUR") {
  if (!p) return null;
  const n = typeof p === "string" ? parseFloat(p) : p;
  if (isNaN(n)) return null;
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

const IconBed = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="15" width="24" height="10" rx="1" />
    <rect x="4" y="10" width="10" height="6" rx="1" />
    <rect x="18" y="10" width="10" height="6" rx="1" />
    <line x1="4" y1="25" x2="4" y2="28" strokeLinecap="round" />
    <line x1="28" y1="25" x2="28" y2="28" strokeLinecap="round" />
  </svg>
);

const IconBath = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M6 16h20v4a7 7 0 01-7 7H13a7 7 0 01-7-7v-4z" />
    <path d="M9 16V9a3 3 0 016 0v1" strokeLinecap="round" />
    <line x1="12" y1="27" x2="10" y2="30" strokeLinecap="round" />
    <line x1="20" y1="27" x2="22" y2="30" strokeLinecap="round" />
  </svg>
);

const IconArea = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="4" width="24" height="24" rx="1" />
    <path d="M4 11h4M4 19h4M11 4v4M19 4v4" strokeLinecap="round" />
  </svg>
);

const IconPlot = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
    <polygon points="16,3 29,12 24,28 8,28 3,12" />
  </svg>
);

const IconYear = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="7" width="24" height="21" rx="1.5" />
    <line x1="4" y1="13" x2="28" y2="13" />
    <line x1="10" y1="4" x2="10" y2="10" strokeLinecap="round" />
    <line x1="22" y1="4" x2="22" y2="10" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#002FA7" strokeWidth="1.8">
    <polyline points="2,8 6,12 14,4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PropertyDetail({ property: p }: { property: Property }) {
  const images = p.images?.filter(Boolean) ?? [];
  const mainImage = images[0] ?? "";
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const price = p.price_on_request
    ? "Precio bajo consulta"
    : formatPrice(p.price, p.currency ?? "EUR");
  const priceRent = formatPrice(p.price_rent, p.currency ?? "EUR");
  const location = [p.area, p.municipality, p.island].filter(Boolean).join(", ");
  const country = p.country ?? "";
  const listingLabel = p.listing_type === "rent" ? "En Alquiler" : "En Venta";

  const stats = [
    { label: "Habitaciones", value: p.bedrooms != null ? String(p.bedrooms) : null, icon: <IconBed /> },
    { label: "Baños", value: p.bathrooms != null ? String(p.bathrooms) : null, icon: <IconBath /> },
    { label: "m² construidos", value: p.size_built && Number(p.size_built) > 0 ? `${p.size_built} m²` : null, icon: <IconArea /> },
    { label: "m² terreno", value: p.size_plot && Number(p.size_plot) > 0 ? `${p.size_plot} m²` : null, icon: <IconPlot /> },
    { label: "Año", value: p.year_built ? String(p.year_built) : null, icon: <IconYear /> },
  ].filter((d) => d.value);

    // Estado legible
    const statusLabel = (() => {
      if (p.listing_type === "rent" && p.price_rent) return "En alquiler";
      if (p.listing_type === "sale" && p.price_rent) return "En venta y alquiler";
      if (p.listing_type === "rent") return "En alquiler";
      return "En venta";
    })();

  // helper: returns null for empty/zero/null values
  const val = (v: string | number | null | undefined) => {
    if (v === null || v === undefined) return null;
    if (typeof v === "string" && v.trim() === "") return null;
    if (typeof v === "number" && v === 0) return null;
    return String(v);
  };

      // Información básica — solo los que tienen valor real
      const basicInfo = [
        { label: "Estado", value: statusLabel },
        { label: "Tipo de propiedad", value: p.property_type ? (PROPERTY_TYPE_ES[p.property_type.toLowerCase()] ?? p.property_type.charAt(0).toUpperCase() + p.property_type.slice(1)) : null },
        { label: "Superficie construida", value: p.size_built && Number(p.size_built) > 0 ? `${p.size_built} m²` : null },
        { label: "Tamaño terreno", value: p.size_plot && Number(p.size_plot) > 0 ? `${p.size_plot} m²` : null },
        { label: "Habitaciones", value: p.bedrooms != null ? String(p.bedrooms) : null },
        { label: "Baños", value: p.bathrooms != null ? String(p.bathrooms) : null },
        { label: "Año de construcción", value: p.year_built ? String(p.year_built) : null },
        { label: "Referencia MLS", value: val(p.mls_id) },
        { label: "Zona", value: val(p.area) },
        { label: "Municipio", value: val(p.municipality) },
        { label: "Isla", value: val(p.island) },
        { label: "País", value: val(p.country) },
        { label: "Plantas", value: p.stories ? String(p.stories) : null },
        { label: "Orientación / Vistas", value: val(p.view) },
        { label: "Estilo arquitectónico", value: val(p.architectural_style) },
        { label: "Piscina", value: val(p.pool) },
        { label: "Parking", value: val(p.parking) },
        { label: "Calefacción", value: val(p.heating) },
        { label: "Aire acondicionado", value: val(p.cooling) },
        { label: "Electrodomésticos", value: val(p.appliances) },
      ].filter((d) => d.value);

  const mapSrc =
    p.latitude && p.longitude
      ? `https://maps.google.com/maps?q=${p.latitude},${p.longitude}&z=15&output=embed`
      : location
      ? `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=13&output=embed`
      : null;

  return (
    <>
      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", fontWeight: 200, lineHeight: 1, opacity: 0.6 }}
          >×</button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + images.length) % images.length); }}
            style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", width: 52, height: 52, fontSize: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >‹</button>
          <img src={images[lightboxIdx]} alt="" style={{ maxWidth: "88vw", maxHeight: "86vh", objectFit: "contain" }} />
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % images.length); }}
            style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", width: 52, height: 52, fontSize: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >›</button>
          <span style={{ position: "absolute", bottom: 24, color: "rgba(255,255,255,0.22)", fontSize: 9, letterSpacing: "0.22em" }}>
            {lightboxIdx + 1} / {images.length}
          </span>
        </div>
      )}

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 640, background: "#111", overflow: "hidden" }}>
        {mainImage && (
          <img
            src={mainImage}
            alt={p.title_es}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.72) 100%)" }} />

        {/* ver fotos — pequeño, esquina inferior derecha */}
          {images.length > 1 && (
            <button
              onClick={() => setLightboxIdx(0)}
              style={{
                position: "absolute",
                bottom: 32,
                right: 52,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.55)",
                fontSize: 9,
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)")}
            >
              <span style={{ display: "inline-block", width: 18, height: 1, background: "rgba(255,255,255,0.4)" }} />
              Ver fotos ({images.length})
            </button>
          )}

        {/* título + precio */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 52px 68px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ maxWidth: 820 }}>
            {location && (
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 9, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", margin: "0 0 14px" }}>
                {[location, country].filter(Boolean).join(" — ")}
              </p>
            )}
            <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 4.2rem)", fontWeight: 200, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05 }}>
              {p.title_es}
            </h1>
          </div>
          {price && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 48 }}>
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px" }}>Precio</p>
              <p style={{ color: "#fff", fontSize: "clamp(1.3rem, 2vw, 2rem)", fontWeight: 200, margin: 0, letterSpacing: "-0.02em" }}>{price}</p>
            </div>
          )}
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 7, letterSpacing: "0.26em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)" }} />
        </div>
      </section>

      {/* ══ NAV TABS ══ */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 68, zIndex: 40 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex" }}>
          {[
            { label: "Descripción de la propiedad", href: "#descripcion" },
            { label: "Información básica", href: "#info-basica" },
            { label: "Características y comodidades", href: "#caracteristicas" },
            { label: "Póngase en contacto", href: "#contacto" },
          ].map((item, i, arr) => (
            <a
              key={i}
              href={item.href}
              style={{
                display: "inline-block",
                padding: "15px 28px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                textDecoration: "none",
                borderRight: i < arr.length - 1 ? "1px solid #e5e5e5" : "none",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#002FA7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#0A0A0A")}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ══ LAYOUT PRINCIPAL 2 COLUMNAS ══ */}
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 360px", alignItems: "start", background: "#fff" }}>

        {/* ── COLUMNA IZQUIERDA ── */}
        <div style={{ borderRight: "1px solid #ebebeb" }}>

          {/* ── DESCRIPCIÓN ── */}
          <section id="descripcion" style={{ padding: "64px 64px 48px" }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 12px" }}>
              Descripción de la propiedad
            </p>
            <h2 style={{ fontSize: "clamp(1.45rem, 2.2vw, 2rem)", fontWeight: 200, color: "#0A0A0A", margin: "0 0 36px", letterSpacing: "-0.025em", lineHeight: 1.18 }}>
              {p.title_es}
            </h2>

            {/* ICONOS STATS — fila limpia sin cajas */}
            {stats.length > 0 && (
              <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: 0, marginBottom: 0, paddingBottom: 0, overflowX: "auto" }}>
                {stats.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      paddingRight: 28,
                      marginRight: 28,
                      borderRight: i < stats.length - 1 ? "1px solid #e0e0e0" : "none",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ color: "#002FA7" }}>{d.icon}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 300, color: "#0A0A0A", lineHeight: 1 }}>{d.value}</p>
                      <p style={{ margin: "5px 0 0", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#002FA7" }}>{d.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

              {p.description_es && (
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 40, marginTop: 8 }}>
                  <p style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 2.1, color: "#3a3a3a", margin: 0, letterSpacing: "0.01em" }}>
                    {p.description_es}
                  </p>
                </div>
              )}
          </section>

            {/* ── INFORMACIÓN BÁSICA ── */}
            <section id="info-basica" style={{ padding: "0 64px 64px" }}>
              <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 56 }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 8px" }}>
                    Información Básica
                  </p>
                  <h3 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 200, color: "#0A0A0A", margin: "0 0 44px", letterSpacing: "-0.03em" }}>
                    Detalles de la propiedad
                  </h3>
                  {basicInfo.length > 0 ? (
                    <div>
                      {basicInfo.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            borderBottom: "1px solid #f0f0f0",
                            padding: "0",
                          }}
                        >
                          <div style={{ padding: "20px 0", borderRight: "1px solid #f0f0f0" }}>
                            <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 600, color: "#b0b0b0", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.label}</p>
                          </div>
                          <div style={{ padding: "20px 0 20px 24px" }}>
                            <p style={{ margin: 0, fontSize: "1rem", fontWeight: 400, color: "#0A0A0A", letterSpacing: "0.01em" }}>{String(item.value)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "0.84rem", color: "#aaa", fontWeight: 300 }}>Sin información disponible.</p>
                )}
              </div>
            </section>

          {/* ── CARACTERÍSTICAS Y COMODIDADES ── */}
          <section id="caracteristicas" style={{ padding: "0 64px 64px" }}>
            <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 52 }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 36px" }}>
                Características y Comodidades
              </p>

              {(() => {
                const interiorGroups: { label: string; value: string }[] = [];
                const exteriorGroups: { label: string; value: string }[] = [];
                const otherGroups: { label: string; value: string }[] = [];

                if (p.features && p.features.length > 0) {
                  p.features.forEach(f => interiorGroups.push({ label: f, value: "" }));
                }
                if (val(p.heating)) interiorGroups.push({ label: "Calefacción", value: val(p.heating)! });
                if (val(p.cooling)) interiorGroups.push({ label: "Aire acondicionado", value: val(p.cooling)! });
                if (val(p.laundry)) interiorGroups.push({ label: "Lavandería", value: val(p.laundry)! });
                if (val(p.fireplace)) interiorGroups.push({ label: "Chimenea", value: val(p.fireplace)! });
                if (val(p.appliances)) interiorGroups.push({ label: "Electrodomésticos", value: val(p.appliances)! });

                if (val(p.pool)) exteriorGroups.push({ label: "Piscina", value: val(p.pool)! });
                if (val(p.architectural_style)) exteriorGroups.push({ label: "Estilo arquitectónico", value: val(p.architectural_style)! });
                if (p.size_plot && Number(p.size_plot) > 0) exteriorGroups.push({ label: "Tamaño parcela", value: `${p.size_plot} m²` });

                if (val(p.parking)) otherGroups.push({ label: "Parking", value: val(p.parking)! });
                if (val(p.view)) otherGroups.push({ label: "Vistas", value: val(p.view)! });
                if (val(p.mls_id)) otherGroups.push({ label: "Referencia MLS", value: val(p.mls_id)! });

                const renderGroup = (title: string, items: { label: string; value: string }[]) => (
                  items.length > 0 && (
                    <div key={title} style={{ marginBottom: 40 }}>
                      <h4 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 20px", paddingBottom: 10, borderBottom: "1px solid #ebebeb" }}>
                        {title}
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 24px" }}>
                        {items.map((item, i) => (
                          <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                            {item.value ? (
                              <>
                                <p style={{ margin: "0 0 4px", fontSize: "0.68rem", color: "#999", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</p>
                                <p style={{ margin: 0, fontSize: "0.86rem", color: "#0A0A0A", fontWeight: 400 }}>{item.value}</p>
                              </>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <IconCheck />
                                <p style={{ margin: 0, fontSize: "0.86rem", color: "#333", fontWeight: 300 }}>{item.label}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                );

                const total = interiorGroups.length + exteriorGroups.length + otherGroups.length;
                if (total === 0) return <p style={{ fontSize: "0.84rem", color: "#aaa", fontWeight: 300 }}>No hay características registradas para esta propiedad.</p>;

                return (
                  <>
                    {renderGroup("Características interiores", interiorGroups)}
                    {renderGroup("Características exteriores", exteriorGroups)}
                    {renderGroup("Otros detalles", otherGroups)}
                  </>
                );
              })()}
            </div>
          </section>

          {/* ── MAPA ── */}
          {mapSrc && (
            <section style={{ padding: "0 64px 80px" }}>
              <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 52 }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 24px" }}>Ubicación</p>
                <div style={{ overflow: "hidden", border: "1px solid #ebebeb" }}>
                  <iframe src={mapSrc} width="100%" height="400" style={{ border: 0, display: "block" }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* ── COLUMNA DERECHA — sticky ── */}
        <div
          id="contacto"
          style={{
            position: "sticky",
            top: 117,
            alignSelf: "start",
            padding: "52px 28px 28px 28px",
          }}
        >
          <div style={{ background: "#0A0A0A" }}>
            {/* Header */}
            <div style={{ padding: "26px 26px 0" }}>
              <h3 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#002FA7", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Contacte con nosotros
              </h3>
              <p style={{ fontSize: "0.72rem", fontWeight: 300, color: "rgba(255,255,255,0.3)", margin: "0 0 18px", lineHeight: 1.7 }}>
                Un asesor exclusivo le atenderá en menos de 24h.
              </p>
            </div>

            {/* Precio */}
            {price && (
              <div style={{ margin: "0 26px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                  {p.listing_type === "rent" ? "Alquiler mensual" : "Precio de venta"}
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 300, color: "#fff" }}>
                  {p.listing_type === "rent" && priceRent ? `${priceRent}/mes` : price}
                </span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={(e) => e.preventDefault()} style={{ padding: "0 26px 26px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Nombre completo", type: "text", id: "f-name" },
                { label: "Correo electrónico", type: "email", id: "f-email" },
                { label: "Teléfono", type: "tel", id: "f-phone" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 4 }}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "7px 0", fontSize: "0.78rem", fontWeight: 300, color: "#fff", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="f-msg" style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 4 }}>Mensaje</label>
                <textarea
                  id="f-msg"
                  rows={3}
                  defaultValue={`Me interesa: ${p.title_es}`}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "7px 0", fontSize: "0.78rem", fontWeight: 300, color: "#fff", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>
              <button
                type="submit"
                style={{ width: "100%", background: "#002FA7", color: "#fff", border: "none", padding: "13px 0", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", marginTop: 6 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#0038cc")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#002FA7")}
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ══ GALERÍA FULLWIDTH ══ */}
      {images.length > 0 && (
        <section style={{ background: "#0A0A0A", padding: "72px 52px 80px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Galería completa</p>
            {images[0] && (
              <div
                onClick={() => setLightboxIdx(0)}
                style={{ width: "100%", height: 600, overflow: "hidden", cursor: "pointer", marginBottom: 3 }}
              >
                <img
                  src={images[0]}
                  alt={p.title_es}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.9s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
              </div>
            )}
            {images.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
                {images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxIdx(i + 1)}
                    style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}
                  >
                    <img
                      src={img}
                      alt={`${p.title_es} ${i + 2}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.9s ease" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
