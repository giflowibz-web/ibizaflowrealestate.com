"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

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

const PROPERTY_TYPE_LABELS: Record<string, { es: string; en: string }> = {
  finca:      { es: "Finca",        en: "Finca" },
  villa:      { es: "Villa",        en: "Villa" },
  penthouse:  { es: "Ático",        en: "Penthouse" },
  house:      { es: "Casa",         en: "House" },
  apartment:  { es: "Apartamento",  en: "Apartment" },
  townhouse:  { es: "Casa Adosada", en: "Townhouse" },
  land:       { es: "Terreno",      en: "Land" },
  commercial: { es: "Comercial",    en: "Commercial" },
  office:     { es: "Oficina",      en: "Office" },
  hotel:      { es: "Hotel",        en: "Hotel" },
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

// Design tokens — white/light theme (matches listings grid)
const C = {
  bg:          "#ffffff",
  bgAlt:       "#f7f7f5",
  text:        "#0A0A0A",
  textMid:     "rgba(10,10,10,0.55)",
  textFaint:   "rgba(10,10,10,0.35)",
  border:      "rgba(10,10,10,0.09)",
  borderLight: "rgba(10,10,10,0.05)",
  accent:      "#002FA7",
  navBg:       "#ffffff",
  navBorder:   "rgba(10,10,10,0.1)",
};

// Dark form tokens
const D = {
  bg:        "#0A0A0A",
  border:    "rgba(255,255,255,0.08)",
  borderAct: "rgba(0,47,167,0.5)",
  text:      "#ffffff",
  textMid:   "rgba(255,255,255,0.55)",
  textFaint: "rgba(255,255,255,0.25)",
  accent:    "#002FA7",
};

export default function PropertyDetail({ property: p }: { property: Property }) {
  const { lang } = useLang();
  const isEs = lang === "es";

  const images = p.images?.filter(Boolean) ?? [];
  const mainImage = images[0] ?? "";
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [formFocused, setFormFocused] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const title = isEs ? p.title_es : (p.title_en ?? p.title_es);
  const description = isEs ? p.description_es : (p.description_en ?? p.description_es);

  const price = p.price_on_request
    ? (isEs ? "Precio bajo consulta" : "Price on request")
    : formatPrice(p.price, p.currency ?? "EUR");
  const priceRent = formatPrice(p.price_rent, p.currency ?? "EUR");
  const location = [p.area, p.municipality, p.island].filter(Boolean).join(", ");
  const country = p.country ?? "";

  const listingLabel = isEs
    ? (p.listing_type === "rent" ? "En Alquiler" : "En Venta")
    : (p.listing_type === "rent" ? "For Rent" : "For Sale");

  const propTypeKey = p.property_type?.toLowerCase() ?? "";
  const propTypeLabel = PROPERTY_TYPE_LABELS[propTypeKey]?.[lang] ?? (p.property_type ? p.property_type.charAt(0).toUpperCase() + p.property_type.slice(1) : null);

  const t = {
    bedrooms:     isEs ? "Habitaciones"      : "Bedrooms",
    bathrooms:    isEs ? "Baños"             : "Bathrooms",
    builtArea:    isEs ? "m² construidos"    : "Built area",
    plotArea:     isEs ? "m² terreno"        : "Plot area",
    year:         isEs ? "Año"               : "Year",
    status:       isEs ? "Estado"            : "Status",
    propType:     isEs ? "Tipo de propiedad" : "Property type",
    builtSurface: isEs ? "Superficie construida" : "Built surface",
    plotSize:     isEs ? "Tamaño terreno"    : "Plot size",
    builtYear:    isEs ? "Año de construcción" : "Year built",
    mlsRef:       isEs ? "Referencia MLS"    : "MLS Reference",
    zone:         isEs ? "Zona"              : "Zone",
    municipality: isEs ? "Municipio"         : "Municipality",
    island:       isEs ? "Isla"              : "Island",
    country:      isEs ? "País"              : "Country",
    floors:       isEs ? "Plantas"           : "Floors",
    views:        isEs ? "Orientación / Vistas" : "Orientation / Views",
    archStyle:    isEs ? "Estilo arquitectónico" : "Architectural style",
    pool:         isEs ? "Piscina"           : "Pool",
    parking:      isEs ? "Parking"           : "Parking",
    heating:      isEs ? "Calefacción"       : "Heating",
    ac:           isEs ? "Aire acondicionado" : "Air conditioning",
    appliances:   isEs ? "Electrodomésticos" : "Appliances",
    statusLabel:  p.listing_type === "rent" && p.price_rent
      ? (isEs ? "En alquiler" : "For rent")
      : p.listing_type === "sale" && p.price_rent
      ? (isEs ? "En venta y alquiler" : "For sale & rent")
      : p.listing_type === "rent"
      ? (isEs ? "En alquiler" : "For rent")
      : (isEs ? "En venta" : "For sale"),
    propDesc:     isEs ? "Descripción de la propiedad" : "Property description",
    basicInfo:    isEs ? "Información Básica"          : "Basic Information",
    propDetails:  isEs ? "Detalles de la propiedad"    : "Property details",
    amenities:    isEs ? "Características y Comodidades" : "Features & Amenities",
    includes:     isEs ? "Lo que incluye"              : "What's included",
    interior:     isEs ? "Características interiores"  : "Interior features",
    exterior:     isEs ? "Características exteriores"  : "Exterior features",
    other:        isEs ? "Otros detalles"              : "Other details",
    noFeatures:   isEs ? "No hay características registradas para esta propiedad." : "No features registered for this property.",
    noInfo:       isEs ? "Sin información disponible." : "No information available.",
    location:     isEs ? "Ubicación"                   : "Location",
    whereIs:      isEs ? "Dónde está"                  : "Where it is",
    gallery:      isEs ? "Galería completa"            : "Full gallery",
    allImages:    isEs ? "Todas las imágenes"          : "All images",
    contact:      isEs ? "Contacte con nosotros"       : "Contact us",
    advisor:      isEs ? "Un asesor exclusivo le atenderá en menos de 24h." : "An exclusive advisor will contact you within 24h.",
    salePrice:    isEs ? "Precio de venta"             : "Sale price",
    rentPrice:    isEs ? "Alquiler mensual"            : "Monthly rent",
    fullName:     isEs ? "Nombre completo"             : "Full name",
    email:        isEs ? "Correo electrónico"          : "Email address",
    phone:        isEs ? "Teléfono"                    : "Phone",
    message:      isEs ? "Mensaje"                     : "Message",
    send:         isEs ? "Enviar solicitud"            : "Send request",
    viewPhotos:   isEs ? "Ver fotos"                   : "View photos",
    scroll:       "scroll",
    laundry:      isEs ? "Lavandería"                  : "Laundry",
    fireplace:    isEs ? "Chimenea"                    : "Fireplace",
  };

  const stats = [
    { label: t.bedrooms,  value: p.bedrooms != null ? String(p.bedrooms) : null, icon: <IconBed /> },
    { label: t.bathrooms, value: p.bathrooms != null ? String(p.bathrooms) : null, icon: <IconBath /> },
    { label: t.builtArea, value: p.size_built && Number(p.size_built) > 0 ? `${p.size_built} m²` : null, icon: <IconArea /> },
    { label: t.plotArea,  value: p.size_plot && Number(p.size_plot) > 0 ? `${p.size_plot} m²` : null, icon: <IconPlot /> },
    { label: t.year,      value: p.year_built ? String(p.year_built) : null, icon: <IconYear /> },
  ].filter((d) => d.value);

  // helper: returns null for empty/zero/null values
  const val = (v: string | number | null | undefined) => {
    if (v === null || v === undefined) return null;
    if (typeof v === "string" && v.trim() === "") return null;
    if (typeof v === "number" && v === 0) return null;
    return String(v);
  };

  const basicInfo = [
    { label: t.status,       value: t.statusLabel },
    { label: t.propType,     value: propTypeLabel },
    { label: t.builtSurface, value: p.size_built && Number(p.size_built) > 0 ? `${p.size_built} m²` : null },
    { label: t.plotSize,     value: p.size_plot && Number(p.size_plot) > 0 ? `${p.size_plot} m²` : null },
    { label: t.bedrooms,     value: p.bedrooms != null ? String(p.bedrooms) : null },
    { label: t.bathrooms,    value: p.bathrooms != null ? String(p.bathrooms) : null },
    { label: t.builtYear,    value: p.year_built ? String(p.year_built) : null },
    { label: t.mlsRef,       value: val(p.mls_id) },
    { label: t.zone,         value: val(p.area) },
    { label: t.municipality, value: val(p.municipality) },
    { label: t.island,       value: val(p.island) },
    { label: t.country,      value: val(p.country) },
    { label: t.floors,       value: p.stories ? String(p.stories) : null },
    { label: t.views,        value: val(p.view) },
    { label: t.archStyle,    value: val(p.architectural_style) },
    { label: t.pool,         value: val(p.pool) },
    { label: t.parking,      value: val(p.parking) },
    { label: t.heating,      value: val(p.heating) },
    { label: t.ac,           value: val(p.cooling) },
    { label: t.appliances,   value: val(p.appliances) },
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

          {images.length > 1 && (
            <button
              onClick={() => setLightboxIdx(0)}
              style={{
                position: "absolute", bottom: 32, right: 52,
                background: "none", border: "none", color: "rgba(255,255,255,0.55)",
                fontSize: 9, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase",
                cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)")}
            >
              <span style={{ display: "inline-block", width: 18, height: 1, background: "rgba(255,255,255,0.4)" }} />
              {t.viewPhotos} ({images.length})
            </button>
          )}

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 52px 68px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ maxWidth: 820 }}>
              {location && (
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 9, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", margin: "0 0 14px" }}>
                  {[location, country].filter(Boolean).join(" — ")}
                </p>
              )}
              <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 4.2rem)", fontWeight: 200, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05 }}>
                {title}
              </h1>
            </div>
            {price && (
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 48 }}>
                <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px" }}>{isEs ? "Precio" : "Price"}</p>
                <p style={{ color: "#fff", fontSize: "clamp(1.3rem, 2vw, 2rem)", fontWeight: 200, margin: 0, letterSpacing: "-0.02em" }}>{price}</p>
              </div>
            )}
          </div>

          <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 7, letterSpacing: "0.26em", textTransform: "uppercase" }}>scroll</span>
            <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)" }} />
          </div>
        </section>

        {/* ══ NAV TABS ══ */}
          <nav style={{ background: C.navBg, borderBottom: `1px solid ${C.navBorder}`, position: "sticky", top: 68, zIndex: 40, outline: "none" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex" }}>
            {[
              { label: t.propDesc,  href: "#descripcion" },
              { label: t.basicInfo, href: "#info-basica" },
              { label: t.amenities, href: "#caracteristicas" },
              { label: t.contact,   href: "#contacto" },
            ].map((item, i, arr) => (
              <a
                key={i}
                href={item.href}
                style={{
                  display: "inline-block", padding: "15px 28px",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: C.textMid, textDecoration: "none",
                    borderRight: i < arr.length - 1 ? `1px solid ${C.navBorder}` : "none",
                    whiteSpace: "nowrap",
                    outline: "none",
                  }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.text)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.textMid)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ══ LAYOUT PRINCIPAL 2 COLUMNAS ══ */}
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", alignItems: "start", background: C.bg }}>

          {/* ── COLUMNA IZQUIERDA ── */}
          <div style={{ borderRight: `1px solid ${C.border}` }}>

            {/* ── DESCRIPCIÓN ── */}
            <section id="descripcion" style={{ padding: "64px 64px 48px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.accent, margin: "0 0 16px" }}>
                {t.propDesc}
              </p>
              <h2 style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", fontWeight: 100, color: C.text, margin: "0 0 40px", letterSpacing: "-0.04em", lineHeight: 1.0, fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                {title}
              </h2>

              {/* STATS ICONS */}
              {stats.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0, marginBottom: 0, paddingBottom: 0 }}>
                  {stats.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        paddingRight: 28, marginRight: 28,
                        borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none",
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ color: C.accent }}>{d.icon}</div>
                      <div>
                        <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 300, color: C.text, lineHeight: 1 }}>{d.value}</p>
                        <p style={{ margin: "5px 0 0", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent }}>{d.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {description && (
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 40, marginTop: 8 }}>
                  <p style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 2.1, color: C.textMid, margin: 0, letterSpacing: "0.01em" }}>
                    {description}
                  </p>
                </div>
              )}
            </section>

            {/* ── INFORMACIÓN BÁSICA ── */}
            <section id="info-basica" style={{ padding: "0 64px 64px" }}>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 56 }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.accent, margin: "0 0 16px" }}>
                  {t.basicInfo}
                </p>
                <h3 style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", fontWeight: 100, color: C.text, margin: "0 0 44px", letterSpacing: "-0.04em", lineHeight: 1.0, fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  {t.propDetails}
                </h3>
                {basicInfo.length > 0 ? (
                  <div>
                    {basicInfo.map((item, i) => (
                      <div
                        key={i}
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${C.borderLight}`, padding: "0" }}
                      >
                        <div style={{ padding: "20px 0", borderRight: `1px solid ${C.borderLight}` }}>
                          <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 600, color: C.textFaint, letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.label}</p>
                        </div>
                        <div style={{ padding: "20px 0 20px 24px" }}>
                          <p style={{ margin: 0, fontSize: "1rem", fontWeight: 400, color: C.text, letterSpacing: "0.01em" }}>{String(item.value)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "0.84rem", color: C.textFaint, fontWeight: 300 }}>{t.noInfo}</p>
                )}
              </div>
            </section>

            {/* ── CARACTERÍSTICAS Y COMODIDADES ── */}
            <section id="caracteristicas" style={{ padding: "0 64px 64px" }}>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 52 }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.accent, margin: "0 0 16px" }}>
                  {t.amenities}
                </p>
                <h3 style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", fontWeight: 100, color: C.text, margin: "0 0 44px", letterSpacing: "-0.04em", lineHeight: 1.0, fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  {t.includes}
                </h3>

                {(() => {
                  const interiorGroups: { label: string; value: string }[] = [];
                  const exteriorGroups: { label: string; value: string }[] = [];
                  const otherGroups: { label: string; value: string }[] = [];

                  if (p.features && p.features.length > 0) {
                    p.features.forEach(f => interiorGroups.push({ label: f, value: "" }));
                  }
                  if (val(p.heating))   interiorGroups.push({ label: t.heating,  value: val(p.heating)! });
                  if (val(p.cooling))   interiorGroups.push({ label: t.ac,       value: val(p.cooling)! });
                  if (val(p.laundry))   interiorGroups.push({ label: t.laundry,  value: val(p.laundry)! });
                  if (val(p.fireplace)) interiorGroups.push({ label: t.fireplace,value: val(p.fireplace)! });
                  if (val(p.appliances))interiorGroups.push({ label: t.appliances,value: val(p.appliances)! });

                  if (val(p.pool))               exteriorGroups.push({ label: t.pool,     value: val(p.pool)! });
                  if (val(p.architectural_style)) exteriorGroups.push({ label: t.archStyle,value: val(p.architectural_style)! });
                  if (p.size_plot && Number(p.size_plot) > 0) exteriorGroups.push({ label: t.plotSize, value: `${p.size_plot} m²` });

                  if (val(p.parking)) otherGroups.push({ label: t.parking, value: val(p.parking)! });
                  if (val(p.view))    otherGroups.push({ label: t.views,   value: val(p.view)! });
                  if (val(p.mls_id))  otherGroups.push({ label: t.mlsRef,  value: val(p.mls_id)! });

                  const renderGroup = (groupTitle: string, items: { label: string; value: string }[]) => (
                    items.length > 0 && (
                      <div key={groupTitle} style={{ marginBottom: 40 }}>
                        <h4 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.textFaint, margin: "0 0 20px", paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>
                          {groupTitle}
                        </h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 24px" }}>
                          {items.map((item, i) => (
                            <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                              {item.value ? (
                                <>
                                  <p style={{ margin: "0 0 4px", fontSize: "0.68rem", color: C.textFaint, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</p>
                                  <p style={{ margin: 0, fontSize: "0.86rem", color: C.text, fontWeight: 400 }}>{item.value}</p>
                                </>
                              ) : (
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                  <IconCheck />
                                  <p style={{ margin: 0, fontSize: "0.86rem", color: C.textMid, fontWeight: 300 }}>{item.label}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  );

                  const total = interiorGroups.length + exteriorGroups.length + otherGroups.length;
                  if (total === 0) return <p style={{ fontSize: "0.84rem", color: C.textFaint, fontWeight: 300 }}>{t.noFeatures}</p>;

                  return (
                    <>
                      {renderGroup(t.interior, interiorGroups)}
                      {renderGroup(t.exterior, exteriorGroups)}
                      {renderGroup(t.other, otherGroups)}
                    </>
                  );
                })()}
              </div>
            </section>

            {/* ── MAPA ── */}
            {mapSrc && (
              <section style={{ padding: "0 64px 80px" }}>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 52 }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.accent, margin: "0 0 16px" }}>{t.location}</p>
                  <h3 style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", fontWeight: 100, color: C.text, margin: "0 0 36px", letterSpacing: "-0.04em", lineHeight: 1.0, fontFamily: "'Playfair Display', 'Georgia', serif" }}>{t.whereIs}</h3>
                  <div style={{ overflow: "hidden", border: `1px solid ${C.border}` }}>
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
              position: "sticky", top: 117, alignSelf: "start",
              padding: "40px 24px 24px 24px",
              background: C.bg,
            }}
          >
              {/* Dark premium card */}
              <div style={{ background: D.bg, borderRadius: 2, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.12)" }}>

                {/* Top accent stripe */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${D.accent} 0%, #0038cc 60%, rgba(0,47,167,0.15) 100%)` }} />

                {/* Header */}
                <div style={{ padding: "28px 30px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 24, height: 1, background: D.accent }} />
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: D.accent }}>
                      {isEs ? "Contacto exclusivo" : "Exclusive contact"}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.65rem", fontWeight: 300, color: D.text, margin: "0 0 10px", letterSpacing: "-0.03em", lineHeight: 1.15, fontFamily: "'Playfair Display', serif" }}>
                    {t.contact}
                  </h3>
                  <p style={{ fontSize: "0.72rem", fontWeight: 300, color: D.textFaint, margin: 0, lineHeight: 1.8, letterSpacing: "0.01em" }}>
                    {t.advisor}
                  </p>
                </div>

                {/* Separador */}
                <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${D.border} 20%, ${D.border} 80%, transparent)`, margin: "0 30px" }} />

                {/* Precio */}
                {price && (
                  <div style={{ margin: "18px 30px", background: "rgba(0,47,167,0.07)", border: `1px solid rgba(0,47,167,0.2)`, borderRadius: 2, padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: D.textFaint }}>
                      {p.listing_type === "rent" ? t.rentPrice : t.salePrice}
                    </span>
                    <span style={{ fontSize: "1rem", fontWeight: 300, color: "#fff", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em" }}>
                      {p.listing_type === "rent" && priceRent ? `${priceRent}/${isEs ? "mes" : "mo"}` : price}
                    </span>
                  </div>
                )}

                {/* Formulario */}
                {!formSubmitted ? (
                  <form
                    onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                    style={{ padding: "4px 30px 24px", display: "flex", flexDirection: "column", gap: 10 }}
                  >
                    {[
                      { label: t.fullName, type: "text",  id: "f-name", placeholder: isEs ? "Tu nombre completo" : "Your full name" },
                      { label: t.email,    type: "email", id: "f-email", placeholder: isEs ? "tu@email.com" : "you@email.com" },
                      { label: t.phone,    type: "tel",   id: "f-phone", placeholder: isEs ? "+34 600 000 000" : "+1 000 000 0000" },
                    ].map((field) => (
                      <div key={field.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label
                          htmlFor={field.id}
                          style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: formFocused === field.id ? D.accent : D.textFaint, transition: "color 0.2s" }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          onFocus={() => setFormFocused(field.id)}
                          onBlur={() => setFormFocused(null)}
                          style={{
                            width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${formFocused === field.id ? D.borderAct : D.border}`,
                            borderRadius: 2, padding: "11px 14px", fontSize: "0.85rem", fontWeight: 300, color: D.text,
                            outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
                            letterSpacing: "0.01em",
                          }}
                        />
                      </div>
                    ))}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label
                        htmlFor="f-msg"
                        style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: formFocused === "f-msg" ? D.accent : D.textFaint, transition: "color 0.2s" }}
                      >
                        {t.message}
                      </label>
                      <textarea
                        id="f-msg"
                        rows={3}
                        defaultValue={`${isEs ? "Me interesa" : "I'm interested in"}: ${title}`}
                        onFocus={() => setFormFocused("f-msg")}
                        onBlur={() => setFormFocused(null)}
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${formFocused === "f-msg" ? D.borderAct : D.border}`,
                          borderRadius: 2, padding: "11px 14px", fontSize: "0.85rem", fontWeight: 300, color: D.text,
                          outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit",
                          transition: "border-color 0.2s, background 0.2s", lineHeight: 1.6, letterSpacing: "0.01em",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{ width: "100%", background: D.accent, color: "#fff", border: "none", borderRadius: 2, padding: "15px 0", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", cursor: "pointer", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transition: "background 0.2s, transform 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0038cc"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = D.accent; }}
                    >
                      {t.send}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </form>
                ) : (
                  <div style={{ padding: "40px 30px 44px", textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, background: "rgba(0,47,167,0.12)", border: "1px solid rgba(0,47,167,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2,9 7,14 16,4" />
                      </svg>
                    </div>
                    <p style={{ fontSize: "1.25rem", fontWeight: 300, color: D.text, margin: "0 0 10px", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}>
                      {isEs ? "Mensaje enviado" : "Message sent"}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: D.textFaint, margin: 0, lineHeight: 1.8 }}>
                      {isEs ? "Un asesor le contactará en menos de 24h." : "An advisor will contact you within 24h."}
                    </p>
                  </div>
                )}

                {/* Footer hint */}
                {!formSubmitted && (
                  <div style={{ borderTop: `1px solid ${D.border}`, padding: "14px 30px", display: "flex", alignItems: "center", gap: 9 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span style={{ fontSize: "0.6rem", color: D.textFaint, letterSpacing: "0.08em" }}>
                      {isEs ? "Información confidencial y protegida" : "Confidential & protected information"}
                    </span>
                  </div>
                )}
              </div>
          </div>
        </div>

        {/* ══ GALERÍA FULLWIDTH ══ */}
        {images.length > 0 && (
          <section style={{ background: C.bg, padding: "72px 52px 80px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.accent, margin: "0 0 16px" }}>{t.gallery}</p>
              <h3 style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", fontWeight: 100, color: C.text, margin: "0 0 40px", letterSpacing: "-0.04em", lineHeight: 1.0, fontFamily: "'Playfair Display', 'Georgia', serif" }}>{t.allImages}</h3>
              {images[0] && (
                <div
                  onClick={() => setLightboxIdx(0)}
                  style={{ width: "100%", height: 600, overflow: "hidden", cursor: "pointer", marginBottom: 3 }}
                >
                  <img
                    src={images[0]}
                    alt={title}
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
                        alt={`${title} ${i + 2}`}
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
