"use client";

import { useState } from "react";

type Property = {
  id: string;
  slug: string;
  title_es: string;
  description_es: string;
  price: number;
  currency: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  plot_sqm: number;
  location_city: string;
  location_country: string;
  location_address: string;
  images: string[];
  features: string[];
  property_type: string;
  year_built: number;
  latitude: number;
  longitude: number;
  mls_id?: string;
  lot_size?: string;
  email?: string;
  architectural_style?: string;
  views?: string;
  stories?: number;
  pool?: string;
  parking?: string;
  heat_type?: string;
  ac_type?: string;
  laundry?: string;
  fireplace?: string;
  appliances?: string;
  lease_price?: string;
};

export default function PropertyDetail({ property }: { property: Property }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const images: string[] = Array.isArray(property.images) ? property.images : [];
  const heroImage = images[0] || "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80";

  const price = typeof property.price === "number"
    ? property.price.toLocaleString("es-ES")
    : property.price;

  const statusLabel: Record<string, string> = {
    for_sale: "En Venta",
    for_rent: "En Alquiler",
    sold: "Vendida",
    rented: "Alquilada",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ fontFamily: "var(--font-body)", background: "#fff", color: "#0A0A0A" }}>

      {/* ── HERO BANNER: fullscreen, una sola foto ── */}
      <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <img
          src={heroImage}
          alt={property.title_es}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* overlay gradiente sutil */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)"
        }} />

        {/* Texto sobre el hero */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 6% 5%",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end"
        }}>
          <div>
            <p style={{
              color: "rgba(255,255,255,0.65)", fontSize: "0.7rem",
              letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem", margin: "0 0 0.75rem"
            }}>
              {property.location_city}, {property.location_country}
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff",
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)", lineHeight: 1.1,
              margin: 0, maxWidth: "600px"
            }}>
              {property.title_es}
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{
              color: "rgba(255,255,255,0.65)", fontSize: "0.65rem",
              letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 0.4rem"
            }}>
              {statusLabel[property.status] || property.status}
            </p>
            <p style={{
              fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)", margin: 0
            }}>
              {price} {property.currency}
            </p>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
        }}>
          <div style={{ width: "1px", height: "50px", background: "rgba(255,255,255,0.25)", overflow: "hidden", position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "35%",
              background: "rgba(255,255,255,0.75)",
              animation: "scrollLine 2s ease-in-out infinite"
            }} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR — fondo negro corporativo ── */}
      <section style={{ background: "#0A0A0A", padding: "2.75rem 6%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "2rem",
          maxWidth: "1200px", margin: "0 auto",
          textAlign: "center"
        }}>
          {[
            { label: "Dormitorios", value: property.bedrooms },
            { label: "Baños", value: property.bathrooms },
            { label: "Superficie", value: `${property.area_sqm} m²` },
            { label: "Parcela", value: property.plot_sqm ? `${property.plot_sqm} m²` : "—" },
            { label: "Año", value: property.year_built || "—" },
          ].map((s) => (
            <div key={s.label}>
              <p style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "2rem", color: "#fff", margin: "0 0 0.3rem"
              }}>
                {s.value}
              </p>
              <p style={{
                fontSize: "0.6rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#002FA7", margin: 0
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT — 2 columnas ── */}
      <section style={{ padding: "6rem 6%", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "6rem",
          alignItems: "start"
        }}>

          {/* COLUMNA IZQUIERDA */}
          <div>

            {/* Descripción */}
            <div style={{ marginBottom: "5rem" }}>
              <p style={labelStyle}>Descripción</p>
              <p style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "1.1rem", lineHeight: 1.85, color: "#0A0A0A"
              }}>
                {property.description_es}
              </p>
            </div>

            {/* Información Básica */}
            <div style={{ marginBottom: "5rem" }}>
              <p style={sectionTitleStyle}>Información Básica</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 3rem" }}>
                {[
                  { label: "Dirección", value: property.location_address },
                  { label: "Estado de la propiedad", value: statusLabel[property.status] || property.status },
                  { label: "Tipo de propiedad", value: property.property_type },
                  { label: "Identificación de la MLS", value: property.mls_id || "—" },
                  { label: "Tamaño del lote", value: property.lot_size || (property.plot_sqm ? `${property.plot_sqm} m²` : "—") },
                  { label: "Dirección de correo electrónico", value: property.email || "info@luxuryproperty.es" },
                ].map((item) => (
                  <div key={item.label} style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "1rem" }}>
                    <p style={fieldLabelStyle}>{item.label}</p>
                    <p style={fieldValueStyle}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Características y Comodidades */}
            <div style={{ marginBottom: "5rem" }}>
              <p style={sectionTitleStyle}>Características y Comodidades</p>

              {/* Área y lote */}
              {(property.architectural_style || property.views) && (
                <div style={{ marginBottom: "2.5rem" }}>
                  <p style={subSectionStyle}>Área y lote</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 3rem" }}>
                    {property.architectural_style && (
                      <div style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "0.75rem" }}>
                        <p style={fieldLabelStyle}>Estilos arquitectónicos</p>
                        <p style={fieldValueStyle}>{property.architectural_style}</p>
                      </div>
                    )}
                    {property.views && (
                      <div style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "0.75rem" }}>
                        <p style={fieldLabelStyle}>Ver descripción</p>
                        <p style={fieldValueStyle}>{property.views}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Interior y exterior */}
              <div style={{ marginBottom: "2.5rem" }}>
                <p style={subSectionStyle}>Interior y exterior</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 3rem" }}>
                  {[
                    { label: "Historias", value: property.stories },
                    { label: "Piscina", value: property.pool },
                    { label: "Estacionamiento", value: property.parking },
                    { label: "Tipo de calor", value: property.heat_type },
                    { label: "Aire acondicionado", value: property.ac_type },
                    { label: "Cuarto de lavado", value: property.laundry },
                    { label: "Chimenea", value: property.fireplace },
                    { label: "Electrodomésticos", value: property.appliances },
                  ].filter(i => i.value).map((item) => (
                    <div key={item.label} style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "0.75rem" }}>
                      <p style={fieldLabelStyle}>{item.label}</p>
                      <p style={fieldValueStyle}>{String(item.value)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financiero */}
              {property.lease_price && (
                <div>
                  <p style={subSectionStyle}>Financiero</p>
                  <div style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "0.75rem", maxWidth: "50%" }}>
                    <p style={fieldLabelStyle}>Precio de arrendamiento</p>
                    <p style={fieldValueStyle}>{property.lease_price}</p>
                  </div>
                </div>
              )}

              {/* Features pills */}
              {property.features && property.features.length > 0 && (
                <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {property.features.map((f: string) => (
                    <span key={f} style={{
                      border: "1px solid #E0E0E0",
                      padding: "0.35rem 0.9rem",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6B6B6B"
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Mapa */}
            {property.latitude && property.longitude && (
              <div style={{ marginBottom: "5rem" }}>
                <p style={sectionTitleStyle}>Ubicación</p>
                <div style={{ width: "100%", height: "380px", overflow: "hidden" }}>
                  <iframe
                    title="mapa"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(1) contrast(1.05)" }}
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                  />
                </div>
              </div>
            )}

            {/* Galería completa */}
            {images.length > 1 && (
              <div>
                <p style={sectionTitleStyle}>Galería</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px" }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "zoom-in", background: "#F5F5F5" }}
                    >
                      <img
                        src={img}
                        alt={`Foto ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: formulario sticky */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <div style={{ border: "1px solid #E0E0E0", padding: "2.5rem" }}>
              <p style={{ ...labelStyle, marginBottom: "0.5rem" }}>Contactar</p>
              <p style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "1.35rem", marginBottom: "2rem", lineHeight: 1.3, color: "#0A0A0A"
              }}>
                {property.title_es}
              </p>

              {sent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#002FA7" }}>
                    Mensaje enviado
                  </p>
                  <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#6B6B6B" }}>
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    { name: "name", label: "Nombre completo", type: "text", required: true },
                    { name: "email", label: "Correo electrónico", type: "email", required: true },
                    { name: "phone", label: "Teléfono", type: "tel", required: false },
                  ].map((f) => (
                    <div key={f.name} style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "0.4rem" }}>
                      <input
                        type={f.type}
                        placeholder={f.label}
                        required={f.required}
                        value={formData[f.name as keyof typeof formData]}
                        onChange={e => setFormData(p => ({ ...p, [f.name]: e.target.value }))}
                        style={{
                          background: "transparent", border: "none", outline: "none",
                          width: "100%", fontSize: "0.85rem", color: "#0A0A0A",
                          padding: "0.25rem 0", fontFamily: "inherit"
                        }}
                      />
                    </div>
                  ))}
                  <div style={{ borderBottom: "1px solid #E0E0E0", paddingBottom: "0.4rem" }}>
                    <textarea
                      placeholder="Mensaje"
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      style={{
                        background: "transparent", border: "none", outline: "none",
                        width: "100%", fontSize: "0.85rem", color: "#0A0A0A",
                        padding: "0.25rem 0", fontFamily: "inherit", resize: "none"
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      background: "#002FA7", color: "#fff", border: "none",
                      padding: "1rem", cursor: "pointer", fontFamily: "inherit",
                      fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      transition: "background 0.3s ease"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#0A0A0A")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#002FA7")}
                  >
                    Solicitar información
                  </button>
                </form>
              )}

              <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #E0E0E0", textAlign: "center" }}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B6B", margin: "0 0 0.4rem" }}>
                  Precio
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "1.4rem", color: "#0A0A0A", margin: 0 }}>
                  {price} {property.currency}
                </p>
                <p style={{ fontSize: "0.65rem", color: "#6B6B6B", marginTop: "0.25rem" }}>
                  {statusLabel[property.status] || property.status}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.96)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, cursor: "zoom-out"
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null && i > 0 ? i - 1 : images.length - 1); }}
            style={{ position: "absolute", left: "2rem", background: "none", border: "none", color: "#fff", fontSize: "1.75rem", cursor: "pointer", opacity: 0.7 }}
          >
            ←
          </button>
          <img
            src={images[lightboxIndex]}
            alt=""
            style={{ maxHeight: "88vh", maxWidth: "88vw", objectFit: "contain" }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null && i < images.length - 1 ? i + 1 : 0); }}
            style={{ position: "absolute", right: "2rem", background: "none", border: "none", color: "#fff", fontSize: "1.75rem", cursor: "pointer", opacity: 0.7 }}
          >
            →
          </button>
          <button
            onClick={() => setLightboxIndex(null)}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "#fff", fontSize: "1.25rem", cursor: "pointer", opacity: 0.7 }}
          >
            ✕
          </button>
          <p style={{ position: "absolute", bottom: "1.5rem", color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}

      <style>{`
        @keyframes scrollLine {
          0%   { top: -35%; }
          100% { top: 135%; }
        }
      `}</style>
    </div>
  );
}

/* ── Shared style objects ── */
const labelStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#002FA7",
  marginBottom: "1.5rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#002FA7",
  marginBottom: "2rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid #E0E0E0",
};

const subSectionStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#0A0A0A",
  fontWeight: 600,
  marginBottom: "1rem",
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#6B6B6B",
  marginBottom: "0.3rem",
  margin: "0 0 0.3rem",
};

const fieldValueStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  margin: 0,
  color: "#0A0A0A",
};
