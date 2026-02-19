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
  const [activeImg, setActiveImg] = useState<string | null>(null);

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
    { label: "Contacto", value: p.contact_email },
    { label: "Estado", value: listingLabel },
    { label: "Tamaño del lote", value: p.lot_size },
    { label: "Referencia MLS", value: p.mls_id },
    { label: "Tipo de propiedad", value: p.property_type },
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

  const hasFeatures = areaFeatures.length > 0 || interiorFeatures.length > 0 || priceRent || (p.features && p.features.length > 0);

  const mapSrc = p.latitude && p.longitude
    ? `https://maps.google.com/maps?q=${p.latitude},${p.longitude}&z=15&output=embed`
    : location
    ? `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=13&output=embed`
    : null;

  return (
    <>
      {/* LIGHTBOX */}
      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.96)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveImg(null)}
            style={{
              position: "absolute", top: 24, right: 32,
              background: "none", border: "none", color: "#fff",
              fontSize: 36, cursor: "pointer", fontWeight: 200,
            }}
          >×</button>
          <img src={activeImg} alt="" style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain" }} />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); const idx = images.indexOf(activeImg); setActiveImg(images[(idx - 1 + images.length) % images.length]); }}
                style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", width: 48, height: 48, fontSize: 22, cursor: "pointer" }}
              >‹</button>
              <button
                onClick={(e) => { e.stopPropagation(); const idx = images.indexOf(activeImg); setActiveImg(images[(idx + 1) % images.length]); }}
                style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", width: 48, height: 48, fontSize: 22, cursor: "pointer" }}
              >›</button>
            </>
          )}
        </div>
      )}

      {/* HERO BANNER — una sola foto fullscreen */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 520, background: "#0A0A0A", overflow: "hidden" }}>
        {mainImage && (
          <img
            src={mainImage}
            alt={p.title_es}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        )}
        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)" }} />

        {/* Badge */}
        <div style={{ position: "absolute", top: 96, left: 48, background: "#002FA7", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 16px" }}>
          {listingLabel}
        </div>

        {/* Ver todas las fotos */}
        {images.length > 1 && (
          <button
            onClick={() => setActiveImg(mainImage)}
            style={{ position: "absolute", top: 96, right: 48, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 20px", cursor: "pointer" }}
          >
            Ver todas las fotos ({images.length})
          </button>
        )}

        {/* Título + Precio */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 48px 56px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            {location && (
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}>
                {location}
              </p>
            )}
            <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05, maxWidth: 680 }}>
              {p.title_es}
            </h1>
          </div>
          {price && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 40 }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 6px" }}>Precio</p>
              <p style={{ color: "#fff", fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 200, margin: 0 }}>{price}</p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)" }} />
        </div>
      </section>

      {/* STATS BAR */}
      {stats.length > 0 && (
        <section style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "center" }}>
          {stats.map((d, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "36px 52px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <span style={{ color: "#fff", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 200, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {d.value}
              </span>
              <span style={{ color: "#002FA7", fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 8 }}>
                {d.label}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ maxWidth: 1320, margin: "0 auto", padding: "88px 48px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 80, alignItems: "start" }}>

        {/* COLUMNA IZQUIERDA */}
        <div>

          {/* Descripción */}
          {p.description_es && (
            <section style={{ marginBottom: 64 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 24px" }}>Descripción</p>
              <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.1rem)", fontWeight: 300, lineHeight: 1.9, color: "#1a1a1a", margin: 0, maxWidth: 680 }}>
                {p.description_es}
              </p>
            </section>
          )}

          <div style={{ height: 1, background: "#e8e8e8", marginBottom: 64 }} />

          {/* Información Básica */}
          {basicInfo.length > 0 && (
            <section style={{ marginBottom: 64 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Información Básica</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #e8e8e8" }}>
                {basicInfo.map((item, i) => (
                  <div key={i} style={{ padding: "20px 24px", borderBottom: i < basicInfo.length - 2 ? "1px solid #e8e8e8" : "none", borderRight: i % 2 === 0 ? "1px solid #e8e8e8" : "none" }}>
                    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", margin: "0 0 6px" }}>{item.label}</p>
                    <p style={{ fontSize: 14, fontWeight: 300, color: "#0A0A0A", margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div style={{ height: 1, background: "#e8e8e8", marginBottom: 64 }} />

          {/* Características */}
          {hasFeatures && (
            <section style={{ marginBottom: 64 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Características y Comodidades</p>

              {areaFeatures.length > 0 && (
                <div style={{ marginBottom: 36 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 12, borderBottom: "1px solid #e8e8e8" }}>Área y Lote</p>
                  {areaFeatures.map((f, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 13, color: "#666", fontWeight: 300 }}>{f.label}</span>
                      <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{f.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {interiorFeatures.length > 0 && (
                <div style={{ marginBottom: 36 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 12, borderBottom: "1px solid #e8e8e8" }}>Interior y Exterior</p>
                  {interiorFeatures.map((f, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 13, color: "#666", fontWeight: 300 }}>{f.label}</span>
                      <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{String(f.value)}</span>
                    </div>
                  ))}
                </div>
              )}

              {priceRent && (
                <div style={{ marginBottom: 36 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 12, borderBottom: "1px solid #e8e8e8" }}>Financiero</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0" }}>
                    <span style={{ fontSize: 13, color: "#666", fontWeight: 300 }}>Precio de arrendamiento</span>
                    <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{priceRent}/mes</span>
                  </div>
                </div>
              )}

              {p.features && p.features.length > 0 && (
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 16px", paddingBottom: 12, borderBottom: "1px solid #e8e8e8" }}>Extras</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", paddingTop: 8 }}>
                    {p.features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 4, height: 4, background: "#002FA7", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#333", fontWeight: 300 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Mapa */}
          {mapSrc && (
            <section style={{ marginBottom: 64 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 24px" }}>Ubicación</p>
              <div style={{ width: "100%", height: 420, border: "1px solid #e8e8e8", overflow: "hidden" }}>
                <iframe src={mapSrc} width="100%" height="420" style={{ border: 0, display: "block" }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </section>
          )}

          {/* Galería */}
          {galleryImages.length > 0 && (
            <section>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 24px" }}>Galería</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImg(img)}
                    style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}
                  >
                    <img
                      src={img}
                      alt={`${p.title_es} ${i + 2}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* COLUMNA DERECHA — FORMULARIO STICKY */}
        <aside style={{ position: "sticky", top: 100 }}>
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", padding: "40px 36px" }}>
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 8px" }}>Solicitar información</p>
            <h3 style={{ fontSize: "1rem", fontWeight: 300, color: "#0A0A0A", margin: "0 0 28px", lineHeight: 1.4 }}>{p.title_es}</h3>

            {price && (
              <div style={{ background: "#0A0A0A", padding: "14px 20px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Precio</span>
                <span style={{ fontSize: "0.95rem", fontWeight: 300, color: "#fff" }}>{price}</span>
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "Nombre completo", type: "text", id: "name" },
                { label: "Correo electrónico", type: "email", id: "email" },
                { label: "Teléfono", type: "tel", id: "phone" },
              ].map((field) => (
                <div key={field.id} style={{ marginBottom: 22 }}>
                  <label htmlFor={field.id} style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>
                    {field.label}
                  </label>
                  <input id={field.id} type={field.type} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #d8d8d8", padding: "8px 0", fontSize: 14, fontWeight: 300, color: "#0A0A0A", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}

              <div style={{ marginBottom: 28 }}>
                <label htmlFor="msg" style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>Mensaje</label>
                <textarea id="msg" rows={4} defaultValue={`Hola, me interesa: ${p.title_es}`} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #d8d8d8", padding: "8px 0", fontSize: 14, fontWeight: 300, color: "#0A0A0A", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>

              <button
                type="submit"
                style={{ width: "100%", background: "#002FA7", color: "#fff", border: "none", padding: "15px 32px", fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#001f7a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#002FA7"; }}
              >
                Enviar solicitud
              </button>
            </form>

            <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid #e8e8e8", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, background: "#0A0A0A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 300 }}>IB</span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 400, color: "#0A0A0A" }}>Ibiza Luxury Estates</p>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: "#999", fontWeight: 300 }}>Agente exclusivo</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <style>{`
        @media (max-width: 900px) {
          main { grid-template-columns: 1fr !important; padding: 48px 24px !important; gap: 48px !important; }
          aside { position: static !important; }
        }
      `}</style>
    </>
  );
}
