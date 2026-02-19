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

export default function PropertyDetail({ property: p }: { property: Property }) {
  const images = p.images?.filter(Boolean) ?? [];
  const mainImage = images[0] ?? "";
  const galleryImages = images.slice(1);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const price = p.price_on_request
    ? "Precio bajo consulta"
    : formatPrice(p.price, p.currency ?? "EUR");
  const priceRent = formatPrice(p.price_rent, p.currency ?? "EUR");
  const location = [p.area, p.municipality, p.island, p.country].filter(Boolean).join(", ");
  const listingLabel = p.listing_type === "rent" ? "En Alquiler" : "En Venta";

  const stats = [
    { label: "Habitaciones", value: p.bedrooms },
    { label: "Baños", value: p.bathrooms },
    { label: "Superficie", value: p.size_built ? `${p.size_built} m²` : null },
    { label: "Parcela", value: p.size_plot && Number(p.size_plot) > 0 ? `${p.size_plot} m²` : null },
    { label: "Año", value: p.year_built },
  ].filter((d) => d.value != null && d.value !== "");

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
      {/* ─── LIGHTBOX ─── */}
      {activeIdx !== null && (
        <div
          onClick={() => setActiveIdx(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.97)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveIdx(null)}
            style={{ position: "absolute", top: 28, right: 36, background: "none", border: "none", color: "#fff", fontSize: 42, cursor: "pointer", fontWeight: 200, lineHeight: 1 }}
          >×</button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIdx((activeIdx - 1 + images.length) % images.length); }}
            style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 54, height: 54, fontSize: 28, cursor: "pointer" }}
          >‹</button>
          <img src={images[activeIdx]} alt="" style={{ maxWidth: "88vw", maxHeight: "86vh", objectFit: "contain" }} />
          <button
            onClick={(e) => { e.stopPropagation(); setActiveIdx((activeIdx + 1) % images.length); }}
            style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 54, height: 54, fontSize: 28, cursor: "pointer" }}
          >›</button>
          <span style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.2em" }}>
            {activeIdx + 1} / {images.length}
          </span>
        </div>
      )}

      {/* ─── HERO BANNER fullscreen ─── */}
      <section
        style={{ position: "relative", width: "100%", height: "100vh", minHeight: 640, background: "#0A0A0A", overflow: "hidden" }}
      >
        {mainImage && (
          <img
            src={mainImage}
            alt={p.title_es}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.78) 100%)" }} />

        {/* Badge + botón galería */}
        <div style={{ position: "absolute", top: 96, left: 52, right: 52, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ background: "#002FA7", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", padding: "7px 18px" }}>
            {listingLabel}
          </div>
          {images.length > 1 && (
            <button
              onClick={() => setActiveIdx(0)}
              style={{ background: "rgba(0,0,0,0.32)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", padding: "9px 22px", cursor: "pointer" }}
            >
              Ver {images.length} fotos
            </button>
          )}
        </div>

        {/* Título + Precio */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 52px 72px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            {location && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 18px" }}>
                {location}
              </p>
            )}
            <h1 style={{ color: "#fff", fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 200, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.0, maxWidth: 760 }}>
              {p.title_es}
            </h1>
          </div>
          {price && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 52 }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>Precio</p>
              <p style={{ color: "#fff", fontSize: "clamp(1.5rem, 2.5vw, 2.4rem)", fontWeight: 200, margin: 0, letterSpacing: "-0.02em" }}>{price}</p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(255,255,255,0.38), transparent)" }} />
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      {stats.length > 0 && (
        <section style={{ background: "#fff", borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map((d, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 52px", borderRight: i < stats.length - 1 ? "1px solid #e8e8e8" : "none" }}>
              <span style={{ color: "#0A0A0A", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", fontWeight: 200, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {d.value}
              </span>
              <span style={{ color: "#002FA7", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 7 }}>
                {d.label}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* ─── LAYOUT 2 COLUMNAS: contenido izquierda + formulario sticky derecha ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", alignItems: "start", background: "#fff" }}>

        {/* COLUMNA IZQUIERDA */}
        <div>

          {/* Descripción */}
          <section style={{ padding: "88px 72px 72px 64px", borderBottom: "1px solid #f0f0f0" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Descripción de la propiedad</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", fontWeight: 200, color: "#0A0A0A", margin: "0 0 32px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              {p.title_es}
            </h2>
            {p.description_es && (
              <p style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)", fontWeight: 300, lineHeight: 2, color: "#444", margin: 0 }}>
                {p.description_es}
              </p>
            )}
          </section>

          {/* Información Básica */}
          {basicInfo.length > 0 && (
            <section style={{ padding: "64px 72px 64px 64px", borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 32px" }}>Información Básica</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #ececec" }}>
                {basicInfo.map((item, i) => (
                  <div key={i} style={{ padding: "20px 24px", borderBottom: i < basicInfo.length - 2 ? "1px solid #ececec" : "none", borderRight: i % 2 === 0 ? "1px solid #ececec" : "none" }}>
                    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", margin: "0 0 7px" }}>{item.label}</p>
                    <p style={{ fontSize: 13, fontWeight: 300, color: "#0A0A0A", margin: 0 }}>{String(item.value)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Características */}
          {(areaFeatures.length > 0 || interiorFeatures.length > 0 || priceRent || (p.features && p.features.length > 0)) && (
            <section style={{ padding: "64px 72px 64px 64px", borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 36px" }}>Características y Comodidades</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 72px" }}>
                <div>
                  {areaFeatures.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Área y Lote</p>
                      {areaFeatures.map((f, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #f4f4f4" }}>
                          <span style={{ fontSize: 13, color: "#888", fontWeight: 300 }}>{f.label}</span>
                          <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {priceRent && (
                    <div>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Financiero</p>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0" }}>
                        <span style={{ fontSize: 13, color: "#888", fontWeight: 300 }}>Precio de arrendamiento</span>
                        <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{priceRent}/mes</span>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {interiorFeatures.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Interior y Exterior</p>
                      {interiorFeatures.map((f, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #f4f4f4" }}>
                          <span style={{ fontSize: 13, color: "#888", fontWeight: 300 }}>{f.label}</span>
                          <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{String(f.value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {p.features && p.features.length > 0 && (
                    <div>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Extras</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", paddingTop: 4 }}>
                        {p.features.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
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

          {/* Mapa */}
          {mapSrc && (
            <section style={{ padding: "64px 72px 88px 64px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Ubicación</p>
              <div style={{ width: "100%", height: 460, overflow: "hidden", border: "1px solid #ececec" }}>
                <iframe src={mapSrc} width="100%" height="460" style={{ border: 0, display: "block" }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </section>
          )}
        </div>

        {/* COLUMNA DERECHA — formulario STICKY */}
        <div style={{ position: "sticky", top: 0, height: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 48px", overflowY: "auto" }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 10px" }}>Contacte con nosotros</p>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 200, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
            Solicitar información
          </h3>
          <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.4)", margin: "0 0 36px", lineHeight: 1.7 }}>
            Un agente exclusivo se pondrá en contacto con usted en menos de 24 horas.
          </p>

          {price && (
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "14px 20px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Precio</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 300, color: "#fff" }}>{price}</span>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Nombre completo", type: "text", id: "nm" },
              { label: "Correo electrónico", type: "email", id: "em" },
              { label: "Teléfono", type: "tel", id: "ph" },
            ].map((field) => (
              <div key={field.id} style={{ marginBottom: 24 }}>
                <label htmlFor={field.id} style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "10px 0", fontSize: 14, fontWeight: 300, color: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 32 }}>
              <label htmlFor="msgc" style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>Mensaje</label>
              <textarea
                id="msgc"
                rows={3}
                defaultValue={`Me interesa: ${p.title_es}`}
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "10px 0", fontSize: 14, fontWeight: 300, color: "#fff", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              />
            </div>
            <button
              type="submit"
              style={{ width: "100%", background: "#002FA7", color: "#fff", border: "none", padding: "16px 32px", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0037c4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#002FA7"; }}
            >
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>

      {/* ─── GALERÍA FULLWIDTH ─── */}
      {images.length > 0 && (
        <section style={{ background: "#0A0A0A", padding: "88px 52px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 36px" }}>Galería</p>

            {/* Primera foto grande */}
            {images[0] && (
              <div
                onClick={() => setActiveIdx(0)}
                style={{ width: "100%", height: 620, overflow: "hidden", cursor: "pointer", marginBottom: 4 }}
              >
                <img
                  src={images[0]}
                  alt={p.title_es}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
              </div>
            )}

            {/* Resto en grid */}
            {images.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
                {images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIdx(i + 1)}
                    style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}
                  >
                    <img
                      src={img}
                      alt={`${p.title_es} ${i + 2}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease" }}
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

      <style>{`
        @media (max-width: 960px) {
          .prop-grid { grid-template-columns: 1fr !important; }
          .prop-sticky { position: relative !important; height: auto !important; top: auto !important; }
        }
      `}</style>
    </>
  );
}
