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

/* ── ICONOS SVG MINIMALISTAS ── */
const IconBed = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="15" width="24" height="11" rx="1" stroke="#0A0A0A" strokeWidth="1.2" />
    <rect x="4" y="10" width="10" height="7" rx="1" stroke="#0A0A0A" strokeWidth="1.2" />
    <rect x="18" y="10" width="10" height="7" rx="1" stroke="#0A0A0A" strokeWidth="1.2" />
    <line x1="4" y1="26" x2="4" y2="29" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="28" y1="26" x2="28" y2="29" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconBath = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M6 16h20v5a7 7 0 01-7 7H13a7 7 0 01-7-7v-5z" stroke="#0A0A0A" strokeWidth="1.2" />
    <path d="M9 16V9a3.5 3.5 0 017 0v1" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="13" y1="28" x2="11" y2="31" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="19" y1="28" x2="21" y2="31" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconArea = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="4" width="24" height="24" rx="1" stroke="#0A0A0A" strokeWidth="1.2" />
    <path d="M4 11h5M4 19h5M11 4v5M19 4v5" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconPlot = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <polygon points="16,3 29,12 29,26 3,26 3,12" stroke="#0A0A0A" strokeWidth="1.2" fill="none" />
  </svg>
);

const IconYear = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="7" width="24" height="21" rx="1.5" stroke="#0A0A0A" strokeWidth="1.2" />
    <line x1="4" y1="13" x2="28" y2="13" stroke="#0A0A0A" strokeWidth="1.2" />
    <line x1="10" y1="4" x2="10" y2="10" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="22" y1="4" x2="22" y2="10" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="16" cy="21" r="2" fill="#0A0A0A" />
  </svg>
);

export default function PropertyDetail({ property: p }: { property: Property }) {
  const images = p.images?.filter(Boolean) ?? [];
  const mainImage = images[0] ?? "";
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const price = p.price_on_request
    ? "Precio bajo consulta"
    : formatPrice(p.price, p.currency ?? "EUR");
  const priceRent = formatPrice(p.price_rent, p.currency ?? "EUR");
  const location = [p.area, p.municipality, p.island, p.country].filter(Boolean).join(", ");
  const listingLabel = p.listing_type === "rent" ? "En Alquiler" : "En Venta";

  /* stats con iconos — van DENTRO de descripción */
  const stats = [
    { label: "Habitaciones", value: p.bedrooms != null ? String(p.bedrooms) : null, icon: <IconBed /> },
    { label: "Baños", value: p.bathrooms != null ? String(p.bathrooms) : null, icon: <IconBath /> },
    { label: "Construidos", value: p.size_built ? `${p.size_built} m²` : null, icon: <IconArea /> },
    { label: "Parcela", value: p.size_plot && Number(p.size_plot) > 0 ? `${p.size_plot} m²` : null, icon: <IconPlot /> },
    { label: "Año", value: p.year_built ? String(p.year_built) : null, icon: <IconYear /> },
  ].filter((d) => d.value);

  const basicInfo = [
    { label: "Estado", value: listingLabel },
    { label: "Referencia MLS", value: p.mls_id },
    { label: "Tipo de propiedad", value: p.property_type },
    { label: "Tamaño del lote", value: p.lot_size },
    { label: "Año de construcción", value: p.year_built },
    { label: "Contacto", value: p.contact_email },
  ].filter((d) => d.value);

  const areaFeatures = [
    { label: "Estilo arquitectónico", value: p.architectural_style },
    { label: "Vistas", value: p.view },
    { label: "Tamaño del lote", value: p.lot_size },
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
  ].filter((d) => d.value);

  const mapSrc = p.latitude && p.longitude
    ? `https://maps.google.com/maps?q=${p.latitude},${p.longitude}&z=15&output=embed`
    : location
    ? `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=13&output=embed`
    : null;

  return (
    <>
      {/* ── LIGHTBOX ────────────────────────────────────────────────────── */}
      {activeIdx !== null && (
        <div
          onClick={() => setActiveIdx(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={() => setActiveIdx(null)} style={{ position: "absolute", top: 28, right: 36, background: "none", border: "none", color: "#fff", fontSize: 44, cursor: "pointer", fontWeight: 200, lineHeight: 1 }}>×</button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIdx((activeIdx - 1 + images.length) % images.length); }}
            style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", width: 52, height: 52, fontSize: 28, cursor: "pointer" }}
          >‹</button>
          <img src={images[activeIdx]} alt="" style={{ maxWidth: "88vw", maxHeight: "86vh", objectFit: "contain" }} />
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIdx((activeIdx + 1) % images.length); }}
            style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", width: 52, height: 52, fontSize: 28, cursor: "pointer" }}
          >›</button>
          <span style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.22em" }}>
            {activeIdx + 1} / {images.length}
          </span>
        </div>
      )}

      {/* ── HERO BANNER 100vh — una sola foto ───────────────────────────── */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 620, background: "#0A0A0A", overflow: "hidden" }}>
        {mainImage && (
          <img
            src={mainImage}
            alt={p.title_es}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        )}
        {/* overlay gradiente suave */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.84) 100%)" }} />

        {/* Badge + botón fotos */}
        <div style={{ position: "absolute", top: 100, left: 52, right: 52, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ background: "#002FA7", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", padding: "6px 16px" }}>
            {listingLabel}
          </div>
          {images.length > 1 && (
            <button
              onClick={() => setActiveIdx(0)}
              style={{ background: "rgba(0,0,0,0.28)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", padding: "8px 20px", cursor: "pointer" }}
            >
              Ver {images.length} fotos
            </button>
          )}
        </div>

        {/* Título + Precio abajo */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 52px 72px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            {location && (
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", margin: "0 0 16px" }}>
                {location}
              </p>
            )}
            <h1 style={{ color: "#fff", fontSize: "clamp(2.2rem, 4.5vw, 4.4rem)", fontWeight: 200, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.0, maxWidth: 820 }}>
              {p.title_es}
            </h1>
          </div>
          {price && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 52 }}>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 7px" }}>Precio</p>
              <p style={{ color: "#fff", fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)", fontWeight: 200, margin: 0, letterSpacing: "-0.02em" }}>{price}</p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }} />
        </div>
      </section>

      {/* ── BARRA DE NAVEGACIÓN DE SECCIONES — texto como Aaron ─────────── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", display: "flex", justifyContent: "center", position: "sticky", top: 68, zIndex: 40 }}>
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
              padding: "16px 30px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0A0A0A",
              textDecoration: "none",
              borderRight: i < arr.length - 1 ? "1px solid #e8e8e8" : "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#002FA7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0A0A0A"; }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* ── LAYOUT 2 COLUMNAS ─────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", alignItems: "start", background: "#fff" }}>

        {/* ── COLUMNA IZQUIERDA ──────────────────────────────────────────── */}
        <div>

          {/* ── Descripción + iconos stats ─────────────────────────────── */}
          <section id="descripcion" style={{ padding: "80px 64px 64px 64px", borderBottom: "1px solid #f0f0f0" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 24px" }}>
              Descripción de la propiedad
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 200, color: "#0A0A0A", margin: "0 0 36px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              {p.title_es}
            </h2>

            {/* ICONOS con números — debajo del título de descripción */}
            {stats.length > 0 && (
              <div style={{ display: "flex", gap: 0, marginBottom: 40, borderTop: "1px solid #ececec", borderBottom: "1px solid #ececec" }}>
                {stats.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "18px 28px",
                      borderRight: i < stats.length - 1 ? "1px solid #ececec" : "none",
                    }}
                  >
                    <div style={{ opacity: 0.65, flexShrink: 0 }}>{d.icon}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: "1rem", fontWeight: 300, color: "#0A0A0A", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{d.value}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#002FA7" }}>{d.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {p.description_es && (
              <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 2, color: "#444", margin: 0 }}>
                {p.description_es}
              </p>
            )}
          </section>

          {/* ── Información Básica ──────────────────────────────────────── */}
          {basicInfo.length > 0 && (
            <section id="info-basica" style={{ padding: "60px 64px", borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>
                Información Básica
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #ececec" }}>
                {basicInfo.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "18px 22px",
                      borderBottom: i < basicInfo.length - 2 ? "1px solid #ececec" : "none",
                      borderRight: i % 2 === 0 ? "1px solid #ececec" : "none",
                    }}
                  >
                    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", margin: "0 0 6px" }}>{item.label}</p>
                    <p style={{ fontSize: 13, fontWeight: 300, color: "#0A0A0A", margin: 0 }}>{String(item.value)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Características y Comodidades ──────────────────────────── */}
          {(areaFeatures.length > 0 || interiorFeatures.length > 0 || priceRent || (p.features && p.features.length > 0)) && (
            <section id="caracteristicas" style={{ padding: "60px 64px", borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 32px" }}>
                Características y Comodidades
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 64px" }}>
                <div>
                  {areaFeatures.length > 0 && (
                    <div style={{ marginBottom: 36 }}>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 14px", paddingBottom: 12, borderBottom: "1px solid #e4e4e4" }}>Área y Lote</p>
                      {areaFeatures.map((f, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f4f4f4" }}>
                          <span style={{ fontSize: 13, color: "#888", fontWeight: 300 }}>{f.label}</span>
                          <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {priceRent && (
                    <div>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 14px", paddingBottom: 12, borderBottom: "1px solid #e4e4e4" }}>Financiero</p>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                        <span style={{ fontSize: 13, color: "#888", fontWeight: 300 }}>Precio de arrendamiento</span>
                        <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{priceRent}/mes</span>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {interiorFeatures.length > 0 && (
                    <div style={{ marginBottom: 36 }}>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 14px", paddingBottom: 12, borderBottom: "1px solid #e4e4e4" }}>Interior y Exterior</p>
                      {interiorFeatures.map((f, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f4f4f4" }}>
                          <span style={{ fontSize: 13, color: "#888", fontWeight: 300 }}>{f.label}</span>
                          <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{String(f.value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {p.features && p.features.length > 0 && (
                    <div>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 14px", paddingBottom: 12, borderBottom: "1px solid #e4e4e4" }}>Extras</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 14px", paddingTop: 4 }}>
                        {p.features.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ width: 4, height: 4, background: "#002FA7", borderRadius: "50%", flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: "#333", fontWeight: 300 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ── Mapa ─────────────────────────────────────────────────────── */}
          {mapSrc && (
            <section style={{ padding: "60px 64px 80px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 24px" }}>Ubicación</p>
              <div style={{ width: "100%", height: 440, overflow: "hidden", border: "1px solid #ececec" }}>
                <iframe src={mapSrc} width="100%" height="440" style={{ border: 0, display: "block" }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </section>
          )}
        </div>

        {/* ── COLUMNA DERECHA — formulario sticky negro ──────────────────── */}
        <div
          id="contacto"
          style={{
            position: "sticky",
            top: 117, /* navbar 68px + subnav 49px */
            height: "calc(100vh - 117px)",
            background: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "32px 32px",
            overflowY: "auto",
          }}
        >
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 8px" }}>
            Póngase en contacto
          </p>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 200, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Solicitar información
          </h3>
          <p style={{ fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.35)", margin: "0 0 24px", lineHeight: 1.7 }}>
            Un agente exclusivo se pondrá en contacto con usted en menos de 24 horas.
          </p>

          {price && (
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", padding: "11px 15px", marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Precio</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 300, color: "#fff" }}>{price}</span>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Nombre completo", type: "text", id: "nm" },
              { label: "Correo electrónico", type: "email", id: "em" },
              { label: "Teléfono", type: "tel", id: "ph" },
            ].map((field) => (
              <div key={field.id} style={{ marginBottom: 18 }}>
                <label htmlFor={field.id} style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 7 }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.11)", padding: "8px 0", fontSize: 13, fontWeight: 300, color: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label htmlFor="msgc" style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 7 }}>Mensaje</label>
              <textarea
                id="msgc"
                rows={3}
                defaultValue={`Me interesa: ${p.title_es}`}
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.11)", padding: "8px 0", fontSize: 13, fontWeight: 300, color: "#fff", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
            <button
              type="submit"
              style={{ width: "100%", background: "#002FA7", color: "#fff", border: "none", padding: "13px 0", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0037c4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#002FA7"; }}
            >
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>

      {/* ── GALERÍA FULLWIDTH negra ──────────────────────────────────────── */}
      {images.length > 0 && (
        <section style={{ background: "#0A0A0A", padding: "80px 52px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 32px" }}>Galería</p>
            {images[0] && (
              <div onClick={() => setActiveIdx(0)} style={{ width: "100%", height: 620, overflow: "hidden", cursor: "pointer", marginBottom: 4 }}>
                <img
                  src={images[0]}
                  alt={p.title_es}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.9s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
              </div>
            )}
            {images.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {images.slice(1).map((img, i) => (
                  <div key={i} onClick={() => setActiveIdx(i + 1)} style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}>
                    <img
                      src={img}
                      alt={`${p.title_es} ${i + 2}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.9s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
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
