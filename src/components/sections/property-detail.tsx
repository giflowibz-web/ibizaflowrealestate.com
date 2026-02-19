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
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="4" y="15" width="24" height="10" rx="1" />
    <rect x="4" y="10" width="10" height="6" rx="1" />
    <rect x="18" y="10" width="10" height="6" rx="1" />
    <line x1="4" y1="25" x2="4" y2="28" strokeLinecap="round" />
    <line x1="28" y1="25" x2="28" y2="28" strokeLinecap="round" />
  </svg>
);

const IconBath = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 16h20v4a7 7 0 01-7 7H13a7 7 0 01-7-7v-4z" />
    <path d="M9 16V9a3 3 0 016 0v1" strokeLinecap="round" />
    <line x1="12" y1="27" x2="10" y2="30" strokeLinecap="round" />
    <line x1="20" y1="27" x2="22" y2="30" strokeLinecap="round" />
  </svg>
);

const IconArea = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="4" y="4" width="24" height="24" rx="1" />
    <path d="M4 11h4M4 19h4M11 4v4M19 4v4" strokeLinecap="round" />
  </svg>
);

const IconPlot = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3">
    <polygon points="16,3 29,12 24,28 8,28 3,12" />
  </svg>
);

const IconYear = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="4" y="7" width="24" height="21" rx="1.5" />
    <line x1="4" y1="13" x2="28" y2="13" />
    <line x1="10" y1="4" x2="10" y2="10" strokeLinecap="round" />
    <line x1="22" y1="4" x2="22" y2="10" strokeLinecap="round" />
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
    { label: "Construidos", value: p.size_built ? `${p.size_built} m²` : null, icon: <IconArea /> },
    { label: "Parcela", value: p.size_plot && Number(p.size_plot) > 0 ? `${p.size_plot} m²` : null, icon: <IconPlot /> },
    { label: "Año", value: p.year_built ? String(p.year_built) : null, icon: <IconYear /> },
  ].filter((d) => d.value);

  const basicInfo = [
    { label: "Estado", value: listingLabel },
    { label: "Tipo", value: p.property_type },
    { label: "Referencia MLS", value: p.mls_id },
    { label: "Tamaño del lote", value: p.lot_size },
    { label: "Año de construcción", value: p.year_built },
    { label: "Contacto", value: p.contact_email },
  ].filter((d) => d.value);

  const interiorFeatures = [
    { label: "Plantas", value: p.stories },
    { label: "Piscina", value: p.pool },
    { label: "Estacionamiento", value: p.parking },
    { label: "Calefacción", value: p.heating },
    { label: "Aire acondicionado", value: p.cooling },
    { label: "Lavandería", value: p.laundry },
    { label: "Chimenea", value: p.fireplace },
    { label: "Electrodomésticos", value: p.appliances },
    { label: "Vistas", value: p.view },
    { label: "Estilo arquitectónico", value: p.architectural_style },
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
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", fontWeight: 200, lineHeight: 1, opacity: 0.7 }}
          >×</button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + images.length) % images.length); }}
            style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 48, height: 48, fontSize: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >‹</button>
          <img src={images[lightboxIdx]} alt="" style={{ maxWidth: "86vw", maxHeight: "84vh", objectFit: "contain" }} />
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % images.length); }}
            style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 48, height: 48, fontSize: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >›</button>
          <span style={{ position: "absolute", bottom: 24, color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.2em" }}>
            {lightboxIdx + 1} / {images.length}
          </span>
        </div>
      )}

      {/* ══ HERO — foto única fullscreen ══ */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 640, background: "#111", overflow: "hidden" }}>
        {mainImage && (
          <img
            src={mainImage}
            alt={p.title_es}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        )}
        {/* gradiente overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%)" }} />

        {/* top bar: badge + fotos */}
        <div style={{ position: "absolute", top: 96, left: 52, right: 52, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ background: "#002FA7", color: "#fff", fontSize: 8, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", padding: "6px 14px" }}>
            {listingLabel}
          </span>
          {images.length > 1 && (
            <button
              onClick={() => setLightboxIdx(0)}
              style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "8px 18px", cursor: "pointer" }}
            >
              Ver todas las fotos ({images.length})
            </button>
          )}
        </div>

        {/* bottom: ubicación + título + precio */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 52px 68px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ maxWidth: 800 }}>
            {location && (
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", margin: "0 0 14px" }}>
                {[location, country].filter(Boolean).join(" — ")}
              </p>
            )}
            <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 4.2rem)", fontWeight: 200, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05 }}>
              {p.title_es}
            </h1>
          </div>
          {price && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 48 }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px" }}>Precio</p>
              <p style={{ color: "#fff", fontSize: "clamp(1.3rem, 2vw, 2rem)", fontWeight: 200, margin: 0, letterSpacing: "-0.02em" }}>{price}</p>
            </div>
          )}
        </div>

        {/* scroll line */}
        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 7, letterSpacing: "0.26em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </section>

      {/* ══ NAV TABS — como Aaron: texto de secciones ══ */}
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
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.18em",
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

      {/* ══ LAYOUT PRINCIPAL: 2 COLUMNAS ══ */}
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: 0, alignItems: "start", background: "#fff", padding: "0 0 0 0" }}>

        {/* ── COLUMNA IZQUIERDA ── */}
        <div style={{ borderRight: "1px solid #ebebeb" }}>

          {/* SECCIÓN: Descripción */}
          <section id="descripcion" style={{ padding: "72px 60px 56px" }}>
            <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 20px" }}>
              Descripción de la propiedad
            </p>
            <h2 style={{ fontSize: "clamp(1.4rem, 2vw, 1.85rem)", fontWeight: 200, color: "#0A0A0A", margin: "0 0 32px", letterSpacing: "-0.025em", lineHeight: 1.2 }}>
              {p.title_es}
            </h2>

            {/* ICONOS STATS — debajo del título de descripción, como Aaron */}
            {stats.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid #ebebeb", borderLeft: "1px solid #ebebeb", marginBottom: 40 }}>
                {stats.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: "16px 24px",
                      borderRight: "1px solid #ebebeb",
                      borderBottom: "1px solid #ebebeb",
                      color: "#0A0A0A",
                    }}
                  >
                    <div style={{ color: "#0A0A0A", opacity: 0.55, flexShrink: 0 }}>{d.icon}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.92rem", fontWeight: 300, color: "#0A0A0A", lineHeight: 1 }}>{d.value}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 7, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#002FA7" }}>{d.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {p.description_es && (
              <p style={{ fontSize: "0.9375rem", fontWeight: 300, lineHeight: 1.95, color: "#4a4a4a", margin: 0 }}>
                {p.description_es}
              </p>
            )}
          </section>

          {/* SECCIÓN: Información Básica */}
          {basicInfo.length > 0 && (
            <section id="info-basica" style={{ padding: "0 60px 56px" }}>
              <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 48 }}>
                <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>
                  Información Básica
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #ebebeb" }}>
                  {basicInfo.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "16px 20px",
                        borderBottom: i < basicInfo.length - 2 ? "1px solid #ebebeb" : "none",
                        borderRight: i % 2 === 0 ? "1px solid #ebebeb" : "none",
                        background: i % 4 < 2 ? "#fafafa" : "#fff",
                      }}
                    >
                      <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", margin: "0 0 6px" }}>{item.label}</p>
                      <p style={{ fontSize: "0.8125rem", fontWeight: 300, color: "#0A0A0A", margin: 0 }}>{String(item.value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* SECCIÓN: Características */}
          {(interiorFeatures.length > 0 || (p.features && p.features.length > 0)) && (
            <section id="caracteristicas" style={{ padding: "0 60px 56px" }}>
              <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 48 }}>
                <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>
                  Características y Comodidades
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 48px" }}>
                  {/* Características del inmueble */}
                  <div>
                    {interiorFeatures.length > 0 && (
                      <>
                        <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 12px", paddingBottom: 12, borderBottom: "1px solid #ebebeb" }}>
                          Detalles del inmueble
                        </p>
                        {interiorFeatures.map((f, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                            <span style={{ fontSize: "0.8125rem", color: "#888", fontWeight: 300 }}>{f.label}</span>
                            <span style={{ fontSize: "0.8125rem", color: "#0A0A0A", fontWeight: 400 }}>{String(f.value)}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  {/* Extras / amenities */}
                  <div>
                    {p.features && p.features.length > 0 && (
                      <>
                        <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 12px", paddingBottom: 12, borderBottom: "1px solid #ebebeb" }}>
                          Extras y servicios
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                          {p.features.map((f, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #f5f5f5" }}>
                              <div style={{ width: 4, height: 4, background: "#002FA7", borderRadius: "50%", flexShrink: 0 }} />
                              <span style={{ fontSize: "0.8125rem", color: "#333", fontWeight: 300 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECCIÓN: Mapa */}
          {mapSrc && (
            <section style={{ padding: "0 60px 80px" }}>
              <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 48 }}>
                <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 24px" }}>Ubicación</p>
                <div style={{ overflow: "hidden", border: "1px solid #ebebeb" }}>
                  <iframe src={mapSrc} width="100%" height="400" style={{ border: 0, display: "block" }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* ── COLUMNA DERECHA — sticky contact ── */}
        <div
          id="contacto"
          style={{
            position: "sticky",
            top: 117,
            alignSelf: "start",
            padding: "40px 28px 28px 24px",
          }}
        >
          {/* Tarjeta negra */}
          <div style={{ background: "#0A0A0A", marginTop: 32 }}>
            {/* Header */}
            <div style={{ padding: "28px 24px 0" }}>
                <h3 style={{ fontSize: "2.1rem", fontWeight: 700, color: "#002FA7", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Contacte con nosotros
                </h3>
              <p style={{ fontSize: 8, fontWeight: 300, color: "rgba(255,255,255,0.35)", margin: "0 0 16px", lineHeight: 1.6 }}>
                Un asesor exclusivo le atenderá en menos de 24h.
              </p>
            </div>

            {/* Precio */}
            {price && (
              <div style={{ margin: "0 24px 14px", border: "1px solid rgba(255,255,255,0.06)", padding: "7px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
                  {p.listing_type === "rent" ? "Alquiler" : "Precio"}
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 300, color: "#fff" }}>
                  {p.listing_type === "rent" && priceRent ? `${priceRent}/mes` : price}
                </span>
              </div>
            )}

            {/* Formulario */}
              <form onSubmit={(e) => e.preventDefault()} style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Nombre completo", type: "text", id: "f-name" },
                { label: "Correo electrónico", type: "email", id: "f-email" },
                { label: "Teléfono", type: "tel", id: "f-phone" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} style={{ display: "block", fontSize: 7, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 3 }}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "5px 0", fontSize: "0.7rem", fontWeight: 300, color: "#fff", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="f-msg" style={{ display: "block", fontSize: 7, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 3 }}>Mensaje</label>
                <textarea
                  id="f-msg"
                  rows={2}
                  defaultValue={`Me interesa: ${p.title_es}`}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "5px 0", fontSize: "0.7rem", fontWeight: 300, color: "#fff", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>
              <button
                type="submit"
                style={{ width: "100%", background: "#002FA7", color: "#fff", border: "none", padding: "10px 0", fontSize: 8, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", marginTop: 4 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#0038cc")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#002FA7")}
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ══ GALERÍA FULLWIDTH — fondo negro ══ */}
      {images.length > 0 && (
        <section style={{ background: "#0A0A0A", padding: "72px 52px 80px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Galería completa</p>
            {/* Primera foto — grande */}
            {images[0] && (
              <div
                onClick={() => setLightboxIdx(0)}
                style={{ width: "100%", height: 580, overflow: "hidden", cursor: "pointer", marginBottom: 3 }}
              >
                <img
                  src={images[0]}
                  alt={p.title_es}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
              </div>
            )}
            {/* Resto grid 3 col */}
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
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease" }}
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
