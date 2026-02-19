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
  const [activeIdx, setActiveIdx] = useState(0);

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

  function openLightbox(img: string) {
    const idx = images.indexOf(img);
    setActiveIdx(idx >= 0 ? idx : 0);
    setActiveImg(img);
  }

  function lightboxPrev(e: React.MouseEvent) {
    e.stopPropagation();
    const idx = (activeIdx - 1 + images.length) % images.length;
    setActiveIdx(idx);
    setActiveImg(images[idx]);
  }

  function lightboxNext(e: React.MouseEvent) {
    e.stopPropagation();
    const idx = (activeIdx + 1) % images.length;
    setActiveIdx(idx);
    setActiveImg(images[idx]);
  }

  return (
    <>
      {/* ─── LIGHTBOX ─── */}
      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.97)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveImg(null)}
            style={{ position: "absolute", top: 28, right: 36, background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", fontWeight: 200, lineHeight: 1 }}
          >×</button>
          <button onClick={lightboxPrev} style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 52, height: 52, fontSize: 26, cursor: "pointer" }}>‹</button>
          <img src={activeImg} alt="" style={{ maxWidth: "88vw", maxHeight: "86vh", objectFit: "contain" }} />
          <button onClick={lightboxNext} style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 52, height: 52, fontSize: 26, cursor: "pointer" }}>›</button>
          <span style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.15em" }}>{activeIdx + 1} / {images.length}</span>
        </div>
      )}

      {/* ─── HERO BANNER fullscreen ─── */}
      <section
        onClick={() => mainImage && openLightbox(mainImage)}
        style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, background: "#0A0A0A", overflow: "hidden", cursor: mainImage ? "pointer" : "default" }}
      >
        {mainImage && (
          <img
            src={mainImage}
            alt={p.title_es}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        )}
        {/* Overlay gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)" }} />

        {/* Badge estado */}
        <div style={{ position: "absolute", top: 100, left: 52, background: "#002FA7", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", padding: "7px 18px" }}>
          {listingLabel}
        </div>

        {/* Ver galería */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); openLightbox(mainImage); }}
            style={{ position: "absolute", top: 100, right: 52, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", padding: "9px 22px", cursor: "pointer" }}
          >
            Ver {images.length} fotos
          </button>
        )}

        {/* Título + Precio bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 52px 64px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            {location && (
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 16px" }}>
                {location}
              </p>
            )}
            <h1 style={{ color: "#fff", fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 200, letterSpacing: "-0.025em", margin: 0, lineHeight: 1.02, maxWidth: 720 }}>
              {p.title_es}
            </h1>
          </div>
          {price && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 48 }}>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>Precio</p>
              <p style={{ color: "#fff", fontSize: "clamp(1.5rem, 2.5vw, 2.3rem)", fontWeight: 200, margin: 0, letterSpacing: "-0.01em" }}>{price}</p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      {stats.length > 0 && (
        <section style={{ background: "#fff", borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map((d, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "22px 52px", borderRight: i < stats.length - 1 ? "1px solid #e8e8e8" : "none" }}>
              <span style={{ color: "#0A0A0A", fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 200, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {d.value}
              </span>
              <span style={{ color: "#002FA7", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 8 }}>
                {d.label}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* ─── DESCRIPCIÓN + FORMULARIO (lado a lado, full width) ─── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 440px", alignItems: "stretch" }}>
        {/* Descripción */}
        <div style={{ padding: "88px 72px 88px 52px", background: "#fff" }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Descripción de la propiedad</p>
          {p.title_es && (
            <h2 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 200, color: "#0A0A0A", margin: "0 0 32px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {p.title_es}
            </h2>
          )}
          {p.description_es && (
            <p style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", fontWeight: 300, lineHeight: 2, color: "#333", margin: 0 }}>
              {p.description_es}
            </p>
          )}
        </div>

        {/* Formulario fondo negro */}
        <div style={{ background: "#0A0A0A", padding: "72px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 10px" }}>Contacte con nosotros</p>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 200, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Solicitar información
          </h3>
          <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.45)", margin: "0 0 36px", lineHeight: 1.6 }}>
            Un agente exclusivo se pondrá en contacto con usted en menos de 24 horas.
          </p>

          {price && (
            <div style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "14px 20px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Precio</span>
              <span style={{ fontSize: "1rem", fontWeight: 300, color: "#fff" }}>{price}</span>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Nombre completo", type: "text", id: "nm" },
              { label: "Correo electrónico", type: "email", id: "em" },
              { label: "Teléfono", type: "tel", id: "ph" },
            ].map((field) => (
              <div key={field.id} style={{ marginBottom: 24 }}>
                <label htmlFor={field.id} style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.18)", padding: "10px 0", fontSize: 14, fontWeight: 300, color: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 32 }}>
              <label htmlFor="msgc" style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Mensaje</label>
              <textarea
                id="msgc"
                rows={3}
                defaultValue={`Me interesa: ${p.title_es}`}
                style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.18)", padding: "10px 0", fontSize: 14, fontWeight: 300, color: "#fff", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
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
      </section>

      {/* ─── CONTENIDO: Info Básica + Características ─── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 52px" }}>

        {/* Información Básica */}
        {basicInfo.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 32px" }}>Información Básica</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #e8e8e8" }}>
              {basicInfo.map((item, i) => (
                <div key={i} style={{ padding: "22px 28px", borderBottom: i < basicInfo.length - 2 ? "1px solid #e8e8e8" : "none", borderRight: i % 2 === 0 ? "1px solid #e8e8e8" : "none" }}>
                  <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", margin: "0 0 8px" }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 300, color: "#0A0A0A", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ height: 1, background: "#e8e8e8", marginBottom: 72 }} />

        {/* Características */}
        {hasFeatures && (
          <section style={{ marginBottom: 72 }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 36px" }}>Características y Comodidades</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px" }}>
              <div>
                {areaFeatures.length > 0 && (
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 20px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Área y Lote</p>
                    {areaFeatures.map((f, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f2f2f2" }}>
                        <span style={{ fontSize: 13, color: "#777", fontWeight: 300 }}>{f.label}</span>
                        <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{f.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {priceRent && (
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 20px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Financiero</p>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                      <span style={{ fontSize: 13, color: "#777", fontWeight: 300 }}>Precio de arrendamiento</span>
                      <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{priceRent}/mes</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {interiorFeatures.length > 0 && (
                  <div style={{ marginBottom: 40 }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 20px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Interior y Exterior</p>
                    {interiorFeatures.map((f, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f2f2f2" }}>
                        <span style={{ fontSize: 13, color: "#777", fontWeight: 300 }}>{f.label}</span>
                        <span style={{ fontSize: 13, color: "#0A0A0A", fontWeight: 400 }}>{String(f.value)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.features && p.features.length > 0 && (
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#0A0A0A", margin: "0 0 20px", paddingBottom: 14, borderBottom: "1px solid #e0e0e0" }}>Extras</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", paddingTop: 8 }}>
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
          <>
            <div style={{ height: 1, background: "#e8e8e8", marginBottom: 72 }} />
            <section style={{ marginBottom: 72 }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 28px" }}>Ubicación</p>
              <div style={{ width: "100%", height: 480, overflow: "hidden", border: "1px solid #e8e8e8" }}>
                <iframe src={mapSrc} width="100%" height="480" style={{ border: 0, display: "block" }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </section>
          </>
        )}
      </main>

      {/* ─── GALERÍA FULLWIDTH ─── */}
      {galleryImages.length > 0 && (
        <section style={{ background: "#0A0A0A", padding: "80px 52px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#002FA7", margin: "0 0 36px" }}>Galería</p>
            {/* Primera fila: 1 foto grande */}
            {galleryImages[0] && (
              <div
                onClick={() => openLightbox(galleryImages[0])}
                style={{ width: "100%", height: 560, overflow: "hidden", cursor: "pointer", marginBottom: 4 }}
              >
                <img
                  src={galleryImages[0]}
                  alt={`${p.title_es} 2`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
              </div>
            )}
            {/* Resto en grid 3 columnas */}
            {galleryImages.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, marginTop: 4 }}>
                {galleryImages.slice(1).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(img)}
                    style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}
                  >
                    <img
                      src={img}
                      alt={`${p.title_es} ${i + 3}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
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
        @media (max-width: 900px) {
          section[style*="gridTemplateColumns: 1fr 440px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
