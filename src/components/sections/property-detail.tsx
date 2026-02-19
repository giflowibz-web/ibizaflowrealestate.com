"use client";

import { useState, useEffect, useRef } from "react";

type Property = {
  id: string;
  slug: string;
  title_es: string;
  description_es: string;
  price: number | null;
  price_rent: number | null;
  currency: string;
  price_on_request: boolean;
  status: string;
  listing_type: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size_built: number | null;
  size_plot: number | null;
  year_built: number | null;
  area: string;
  municipality: string;
  island: string;
  country: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  images: string[];
  features: string[];
  contact_email: string;
  mls_id: string;
  lot_size: string;
  architectural_style: string;
  view: string;
  stories: number | null;
  pool: string;
  parking: string;
  heating: string;
  cooling: string;
  laundry: string;
  fireplace: string;
  appliances: string;
  virtual_tour_url: string;
};

function formatPrice(price: number | null | undefined, currency: string) {
  if (!price) return "";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const serif = "'Cormorant Garamond', 'Garamond', Georgia, serif";

export default function PropertyDetail({ property }: { property: Property }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mainPhoto, setMainPhoto] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const images = Array.isArray(property.images) && property.images.length > 0
    ? property.images
    : [];

  const priceDisplay = property.price_on_request
    ? "Precio bajo consulta"
    : property.listing_type === "rent" && property.price_rent
    ? `${formatPrice(property.price_rent, property.currency)}/mes`
    : formatPrice(property.price, property.currency);

  const location = [property.area, property.municipality, property.island, property.country]
    .filter(Boolean).join(", ");

  const basicInfo = [
    property.contact_email ? { label: "Dirección de correo electrónico", value: property.contact_email } : null,
    { label: "Estado de la propiedad", value: property.listing_type === "rent" ? "En alquiler" : "En venta" },
    property.lot_size ? { label: "Tamaño del lote", value: property.lot_size }
      : (property.size_plot && property.size_plot > 0) ? { label: "Tamaño del lote", value: `${property.size_plot} m²` } : null,
    property.mls_id ? { label: "Identificación de la MLS", value: property.mls_id } : null,
    { label: "Tipo de propiedad", value: property.property_type === "land" ? "Terreno" : property.property_type === "commercial" ? "Comercial" : "Residencial" },
  ].filter(Boolean) as { label: string; value: string }[];

  const areaItems = [
    property.architectural_style ? { label: "Estilos arquitectónicos", value: property.architectural_style } : null,
    property.view ? { label: "Vistas", value: property.view } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const interiorItems = [
    property.stories ? { label: "Plantas", value: String(property.stories) } : null,
    property.pool ? { label: "Piscina", value: property.pool } : null,
    property.parking ? { label: "Aparcamiento", value: property.parking } : null,
    property.heating ? { label: "Calefacción", value: property.heating } : null,
    property.cooling ? { label: "Aire acondicionado", value: property.cooling } : null,
    property.laundry ? { label: "Lavandería", value: property.laundry } : null,
    property.fireplace ? { label: "Chimenea", value: property.fireplace } : null,
    property.appliances ? { label: "Electrodomésticos", value: property.appliances } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const financialItems = [
    property.listing_type === "rent" && property.price_rent
      ? { label: "Precio de arrendamiento", value: `${formatPrice(property.price_rent, property.currency)}/mes` }
      : property.price
      ? { label: "Precio de venta", value: formatPrice(property.price, property.currency) }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const hasAmenities = areaItems.length > 0 || interiorItems.length > 0 || financialItems.length > 0;

  const mapQuery = property.latitude && property.longitude
    ? `${property.latitude},${property.longitude}`
    : encodeURIComponent(location || "Ibiza, Spain");

  const thumbnails = images.slice(1, 5);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: serif }}>

      {/* ─── HERO ───────────────────────────────────────────────── */}
      <div style={{ paddingTop: 80 }}>

        {/* Title + Price */}
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "40px 48px 24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
        }}>
          <div>
            <p style={{
              fontFamily: sans,
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#aaa",
              marginBottom: 12,
              margin: "0 0 12px",
            }}>
              {location}
            </p>
            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(2rem, 3.8vw, 4rem)",
              fontWeight: 300,
              color: "#111",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.01em",
            }}>
              {property.title_es}
            </h1>
          </div>
          {priceDisplay && (
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{
                fontFamily: serif,
                fontSize: "clamp(1.5rem, 2.5vw, 2.4rem)",
                fontWeight: 300,
                color: "#111",
                margin: 0,
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}>
                {priceDisplay}
              </p>
            </div>
          )}
        </div>

        {/* Gallery grid: 1 big left + 4 thumbnails right */}
        {images.length > 0 && (
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 4,
              height: "clamp(380px, 52vw, 680px)",
            }}>
              {/* Main big photo */}
              <div
                style={{
                  gridColumn: 1,
                  gridRow: "1 / 3",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#e8e8e8",
                  position: "relative",
                }}
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              >
                <img
                  key={images[mainPhoto]}
                  src={images[mainPhoto]}
                  alt={property.title_es}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={() => setImgErrors(p => ({ ...p, [mainPhoto]: true }))}
                />
                {/* View all overlay */}
                {images.length > 5 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(0); setLightboxOpen(true); }}
                    style={{
                      position: "absolute",
                      bottom: 20,
                      right: 20,
                      fontFamily: sans,
                      fontSize: 10,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: "rgba(0,0,0,0.55)",
                      border: "none",
                      padding: "10px 18px",
                      cursor: "pointer",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Ver todas — {images.length} fotos
                  </button>
                )}
              </div>

              {/* 4 thumbnails */}
              {[0, 1, 2, 3].map((i) => {
                const imgIdx = i + 1;
                return (
                  <div
                    key={i}
                    style={{
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#e8e8e8",
                      position: "relative",
                    }}
                    onClick={() => { setLightboxIndex(imgIdx); setLightboxOpen(true); }}
                  >
                    {images[imgIdx] && !imgErrors[imgIdx] ? (
                      <>
                        <img
                          src={images[imgIdx]}
                          alt={`${property.title_es} ${imgIdx + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          onError={() => setImgErrors(p => ({ ...p, [imgIdx]: true }))}
                        />
                        {i === 3 && images.length > 5 && (
                          <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.42)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <span style={{
                              fontFamily: sans,
                              fontSize: 11,
                              letterSpacing: "0.28em",
                              textTransform: "uppercase",
                              color: "#fff",
                            }}>
                              +{images.length - 5} más
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#ddd" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ─── MAIN CONTENT ───────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 48px 100px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: 80,
          alignItems: "start",
        }}>

          {/* LEFT */}
          <div>

            {/* Stats */}
            <div style={{
              display: "flex",
              gap: 56,
              paddingBottom: 44,
              borderBottom: "1px solid #ebebeb",
              marginBottom: 56,
            }}>
              {(property.bedrooms ?? 0) > 0 && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 42, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>{property.bedrooms}</p>
                  <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa", marginTop: 10, margin: "10px 0 0" }}>Dormitorios</p>
                </div>
              )}
              {(property.bathrooms ?? 0) > 0 && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 42, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>{property.bathrooms}</p>
                  <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa", marginTop: 10, margin: "10px 0 0" }}>Baños</p>
                </div>
              )}
              {property.size_built && property.size_built > 0 && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 42, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>
                    {property.size_built}
                    <span style={{ fontSize: 18, marginLeft: 3 }}>m²</span>
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa", marginTop: 10, margin: "10px 0 0" }}>Construidos</p>
                </div>
              )}
              {property.size_plot && property.size_plot > 0 && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 42, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>
                    {property.size_plot}
                    <span style={{ fontSize: 18, marginLeft: 3 }}>m²</span>
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa", marginTop: 10, margin: "10px 0 0" }}>Parcela</p>
                </div>
              )}
              {property.year_built && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 42, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>{property.year_built}</p>
                  <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa", marginTop: 10, margin: "10px 0 0" }}>Año</p>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description_es && (
              <div style={{ marginBottom: 60 }}>
                <p style={{
                  fontFamily: serif,
                  fontSize: 19,
                  fontWeight: 300,
                  color: "#555",
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  {property.description_es}
                </p>
              </div>
            )}

            {/* ── INFORMACIÓN BÁSICA */}
            <section style={{ marginBottom: 56 }}>
              <h2 style={sectionHeadingStyle}>Información Básica</h2>
              <div>
                {basicInfo.map((item, idx) => (
                  <InfoRow key={idx} label={item.label} value={item.value} />
                ))}
              </div>
            </section>

            {/* ── CARACTERÍSTICAS Y COMODIDADES */}
            {hasAmenities && (
              <section style={{ marginBottom: 56 }}>
                <h2 style={sectionHeadingStyle}>Características y Comodidades</h2>

                {areaItems.length > 0 && (
                  <div style={{ marginBottom: 36 }}>
                    <h3 style={subHeadingStyle}>Área y lote</h3>
                    {areaItems.map((item, idx) => <InfoRow key={idx} label={item.label} value={item.value} />)}
                  </div>
                )}

                {interiorItems.length > 0 && (
                  <div style={{ marginBottom: 36 }}>
                    <h3 style={subHeadingStyle}>Interior y exterior</h3>
                    {interiorItems.map((item, idx) => <InfoRow key={idx} label={item.label} value={item.value} />)}
                  </div>
                )}

                {financialItems.length > 0 && (
                  <div style={{ marginBottom: 36 }}>
                    <h3 style={subHeadingStyle}>Financiero</h3>
                    {financialItems.map((item, idx) => <InfoRow key={idx} label={item.label} value={item.value} />)}
                  </div>
                )}
              </section>
            )}

            {/* ── MAPA */}
            <section style={{ marginBottom: 56 }}>
              <h2 style={sectionHeadingStyle}>Ubicación</h2>
              <div style={{ width: "100%", height: 420, background: "#f0f0f0", overflow: "hidden" }}>
                <iframe
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  title="Mapa de ubicación"
                />
              </div>
              {location && (
                <p style={{ fontFamily: sans, fontSize: 11, color: "#aaa", marginTop: 12, letterSpacing: "0.1em" }}>
                  {location}
                </p>
              )}
            </section>

            {/* ── GALERÍA COMPLETA */}
            {images.length > 1 && (
              <section>
                <h2 style={sectionHeadingStyle}>Galería</h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 4,
                }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        aspectRatio: "4/3",
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "#e8e8e8",
                      }}
                      onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                    >
                      <img
                        src={img}
                        alt={`Foto ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT — sticky form */}
          <div>
            <div style={{ position: "sticky", top: 108 }}>
              <div style={{
                border: "1px solid #e4e4e4",
                padding: "36px 32px",
                background: "#fff",
              }}>
                <p style={{
                  fontFamily: sans,
                  fontSize: 9,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#bbb",
                  margin: "0 0 8px",
                }}>
                  Solicitar información
                </p>
                {priceDisplay && (
                  <p style={{
                    fontFamily: serif,
                    fontSize: 28,
                    fontWeight: 300,
                    color: "#111",
                    margin: "0 0 32px",
                    letterSpacing: "-0.01em",
                  }}>
                    {priceDisplay}
                  </p>
                )}

                {submitted ? (
                  <p style={{ fontFamily: sans, fontSize: 13, color: "#666", padding: "20px 0" }}>
                    Gracias por su interés. Nos pondremos en contacto pronto.
                  </p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                      {[
                        { name: "name", placeholder: "Nombre completo", type: "text" },
                        { name: "email", placeholder: "Correo electrónico", type: "email" },
                        { name: "phone", placeholder: "Teléfono", type: "tel" },
                      ].map((f) => (
                        <input
                          key={f.name}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={formData[f.name as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                          style={{
                            fontFamily: sans,
                            fontSize: 13,
                            color: "#111",
                            border: "none",
                            borderBottom: "1px solid #ddd",
                            padding: "4px 0 12px",
                            outline: "none",
                            background: "transparent",
                            width: "100%",
                          }}
                        />
                      ))}
                      <textarea
                        placeholder="Mensaje"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          fontFamily: sans,
                          fontSize: 13,
                          color: "#111",
                          border: "none",
                          borderBottom: "1px solid #ddd",
                          padding: "4px 0 12px",
                          outline: "none",
                          background: "transparent",
                          width: "100%",
                          resize: "none",
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          fontFamily: sans,
                          fontSize: 10,
                          letterSpacing: "0.38em",
                          textTransform: "uppercase",
                          background: "#111",
                          color: "#fff",
                          border: "none",
                          padding: "18px",
                          cursor: "pointer",
                          width: "100%",
                          marginTop: 4,
                        }}
                      >
                        Enviar consulta
                      </button>
                    </div>
                  </form>
                )}

                <div style={{
                  marginTop: 32,
                  paddingTop: 28,
                  borderTop: "1px solid #f0f0f0",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "#bbb", margin: "0 0 6px" }}>
                    O llámenos directamente
                  </p>
                  <a
                    href="tel:+34971000000"
                    style={{ fontFamily: sans, fontSize: 15, fontWeight: 400, color: "#333", textDecoration: "none", letterSpacing: "0.05em" }}
                  >
                    +34 971 000 000
                  </a>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginTop: 4 }}>
                <button
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.share) {
                      navigator.share({ title: property.title_es, url: window.location.href });
                    } else {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                  style={actionBtnStyle}
                >
                  Compartir
                </button>
                <button onClick={() => window.print()} style={actionBtnStyle}>
                  Imprimir
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── LIGHTBOX ───────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.96)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "absolute",
              top: 28,
              right: 36,
              fontFamily: sans,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            Cerrar ✕
          </button>
          <button
            style={{
              position: "absolute",
              left: 28,
              fontSize: 52,
              color: "rgba(255,255,255,0.4)",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1,
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((p) => (p - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <div
            style={{ width: "80vw", height: "82vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          </div>
          <button
            style={{
              position: "absolute",
              right: 28,
              fontSize: 52,
              color: "rgba(255,255,255,0.4)",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1,
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((p) => (p + 1) % images.length);
            }}
          >
            ›
          </button>
          <p style={{
            position: "absolute",
            bottom: 28,
            fontFamily: sans,
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.3)",
            margin: 0,
          }}>
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── helpers ── */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "15px 0",
      borderBottom: "1px solid #f2f2f2",
      gap: 24,
    }}>
      <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 13, color: "#999", flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 13, color: "#111", textAlign: "right" }}>{value}</span>
    </div>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 9,
  letterSpacing: "0.4em",
  textTransform: "uppercase",
  color: "#bbb",
  fontWeight: 400,
  marginBottom: 28,
  margin: "0 0 28px",
};

const subHeadingStyle: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#444",
  fontWeight: 500,
  marginBottom: 8,
  margin: "0 0 8px",
};

const actionBtnStyle: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 9,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "#888",
  background: "none",
  border: "1px solid #e4e4e4",
  padding: "14px",
  cursor: "pointer",
  width: "100%",
};
