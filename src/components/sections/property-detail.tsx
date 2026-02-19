"use client";

import { useState } from "react";

type Property = {
  id: string;
  slug: string;
  title_es: string;
  description_es: string;
  price: string;
  price_rent: string | null;
  currency: string;
  price_on_request: boolean;
  status: string;
  listing_type: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size_built: string;
  size_plot: string;
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

function formatPrice(price: string | null | undefined, currency: string) {
  if (!price) return "";
  const num = parseInt(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(num);
}

const sans = "'Helvetica Neue', Arial, sans-serif";
const serif = "'Cormorant Garamond', 'Garamond', Georgia, serif";

export default function PropertyDetail({ property }: { property: Property }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const images = property.images?.length ? property.images : [];

  const priceDisplay = property.price_on_request
    ? "Precio bajo consulta"
    : property.listing_type === "rent" && property.price_rent
    ? `${formatPrice(property.price_rent, property.currency)}/mes`
    : formatPrice(property.price, property.currency);

  const location = [property.area, property.municipality, property.island, property.country]
    .filter(Boolean).join(", ");

  const basicInfo = [
    property.contact_email ? { label: "Dirección de correo electrónico", value: property.contact_email } : null,
    {
      label: "Estado de la propiedad",
      value: property.listing_type === "rent" ? "En alquiler" : "En venta",
    },
    property.lot_size ? { label: "Tamaño del lote", value: property.lot_size } :
    (property.size_plot && property.size_plot !== "0") ? { label: "Tamaño del lote", value: `${property.size_plot} m²` } : null,
    property.mls_id ? { label: "Identificación de la MLS", value: property.mls_id } : null,
    {
      label: "Tipo de propiedad",
      value: property.property_type === "land" ? "Terreno" : property.property_type === "commercial" ? "Comercial" : "Residencial",
    },
  ].filter(Boolean) as { label: string; value: string }[];

  const areaItems = [
    property.architectural_style ? { label: "Estilos arquitectónicos", value: property.architectural_style } : null,
    property.view ? { label: "Ver descripción", value: property.view } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const interiorItems = [
    property.stories ? { label: "Historias", value: String(property.stories) } : null,
    property.pool ? { label: "Piscina", value: property.pool } : null,
    property.parking ? { label: "Estacionamiento", value: property.parking } : null,
    property.heating ? { label: "Tipo de calor", value: property.heating } : null,
    property.cooling ? { label: "Aire acondicionado", value: property.cooling } : null,
    property.laundry ? { label: "Cuarto de lavado", value: property.laundry } : null,
    property.fireplace ? { label: "Chimenea", value: property.fireplace } : null,
    property.appliances ? { label: "Electrodomésticos", value: property.appliances } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const financialItems = [
    property.listing_type === "rent" && property.price_rent
      ? { label: "Precio de arrendamiento", value: `${formatPrice(property.price_rent, property.currency)}/mes` }
      : property.listing_type === "sale" && property.price
      ? { label: "Precio de venta", value: formatPrice(property.price, property.currency) }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const hasAmenities = areaItems.length > 0 || interiorItems.length > 0 || financialItems.length > 0;

  const mapQuery = property.latitude && property.longitude
    ? `${property.latitude},${property.longitude}`
    : encodeURIComponent(location || "Ibiza, Spain");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: serif }}>

      {/* ── HERO GALLERY ─────────────────────────────────────── */}
      <div style={{ paddingTop: "72px" }}>

        {/* Title row */}
        <div style={{
          maxWidth: 1380,
          margin: "0 auto",
          padding: "32px 40px 20px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
        }}>
          <div>
            <p style={{
              fontFamily: sans,
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: 10,
            }}>
              {location}
            </p>
            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              color: "#111",
              lineHeight: 1.08,
              margin: 0,
            }}>
              {property.title_es}
            </h1>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{
              fontFamily: serif,
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
              fontWeight: 300,
              color: "#111",
              whiteSpace: "nowrap",
            }}>
              {priceDisplay}
            </p>
          </div>
        </div>

        {/* Photo grid — 1 big left + 4 right */}
        {images.length > 0 && (
          <div style={{
            maxWidth: 1380,
            margin: "0 auto",
            padding: "0 40px",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 3,
              height: "clamp(400px, 55vw, 660px)",
            }}>
              {/* Big photo */}
              <div
                style={{
                  gridColumn: "1",
                  gridRow: "1 / 3",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#f0f0f0",
                }}
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              >
                <img
                  src={images[0]}
                  alt={property.title_es}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* 4 thumbnails right */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#f0f0f0",
                  }}
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                >
                  {images[i] ? (
                    <>
                      <img
                        src={images[i]}
                        alt={`${property.title_es} ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.7s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      {i === 4 && images.length > 5 && (
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.45)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <span style={{ fontFamily: sans, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff" }}>
                            +{images.length - 5} fotos
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#e8e8e8" }} />
                  )}
                </div>
              ))}
            </div>

            {/* View all photos button */}
            {images.length > 5 && (
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <button
                  onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                  style={{
                    fontFamily: sans,
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#555",
                    background: "none",
                    border: "1px solid #ddd",
                    padding: "8px 20px",
                    cursor: "pointer",
                  }}
                >
                  Ver todas las fotos ({images.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "52px 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 72, alignItems: "start" }}>

          {/* LEFT COLUMN */}
          <div>

            {/* Stats bar */}
            <div style={{
              display: "flex",
              gap: 48,
              paddingBottom: 40,
              borderBottom: "1px solid #ebebeb",
              marginBottom: 52,
            }}>
              {property.bedrooms > 0 && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 38, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>{property.bedrooms}</p>
                  <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999", marginTop: 8 }}>Habitaciones</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 38, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>{property.bathrooms}</p>
                  <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999", marginTop: 8 }}>Baños</p>
                </div>
              )}
              {property.size_built && property.size_built !== "0" && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 38, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>
                    {property.size_built}<span style={{ fontSize: 16, marginLeft: 3 }}>m²</span>
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999", marginTop: 8 }}>Construidos</p>
                </div>
              )}
              {property.size_plot && property.size_plot !== "0" && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 38, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>
                    {property.size_plot}<span style={{ fontSize: 16, marginLeft: 3 }}>m²</span>
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999", marginTop: 8 }}>Parcela</p>
                </div>
              )}
              {property.year_built && (
                <div>
                  <p style={{ fontFamily: serif, fontSize: 38, fontWeight: 300, color: "#111", lineHeight: 1, margin: 0 }}>{property.year_built}</p>
                  <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#999", marginTop: 8 }}>Año</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 56 }}>
              <p style={{
                fontFamily: serif,
                fontSize: 18,
                fontWeight: 300,
                color: "#444",
                lineHeight: 1.9,
                margin: 0,
              }}>
                {property.description_es}
              </p>
            </div>

            {/* INFORMACIÓN BÁSICA */}
            <section style={{ marginBottom: 52 }}>
              <h2 style={{
                fontFamily: sans,
                fontSize: 10,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#aaa",
                marginBottom: 24,
                fontWeight: 400,
              }}>
                Información Básica
              </h2>
              <div>
                {basicInfo.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "14px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}>
                    <span style={{ fontFamily: sans, fontSize: 13, color: "#888" }}>{item.label}</span>
                    <span style={{ fontFamily: sans, fontSize: 13, color: "#111", textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* CARACTERÍSTICAS Y COMODIDADES */}
            {hasAmenities && (
              <section style={{ marginBottom: 52 }}>
                <h2 style={{
                  fontFamily: sans,
                  fontSize: 10,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#aaa",
                  marginBottom: 28,
                  fontWeight: 400,
                }}>
                  Características y Comodidades
                </h2>

                {areaItems.length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{
                      fontFamily: sans,
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#333",
                      fontWeight: 500,
                      marginBottom: 12,
                    }}>
                      Área y lote
                    </h3>
                    {areaItems.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "13px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}>
                        <span style={{ fontFamily: sans, fontSize: 13, color: "#888" }}>{item.label}</span>
                        <span style={{ fontFamily: sans, fontSize: 13, color: "#111", textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {interiorItems.length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{
                      fontFamily: sans,
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#333",
                      fontWeight: 500,
                      marginBottom: 12,
                    }}>
                      Interior y exterior
                    </h3>
                    {interiorItems.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "13px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}>
                        <span style={{ fontFamily: sans, fontSize: 13, color: "#888" }}>{item.label}</span>
                        <span style={{ fontFamily: sans, fontSize: 13, color: "#111", textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {financialItems.length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{
                      fontFamily: sans,
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#333",
                      fontWeight: 500,
                      marginBottom: 12,
                    }}>
                      Financiero
                    </h3>
                    {financialItems.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "13px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}>
                        <span style={{ fontFamily: sans, fontSize: 13, color: "#888" }}>{item.label}</span>
                        <span style={{ fontFamily: sans, fontSize: 13, color: "#111", textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* MAPA */}
            <section style={{ marginBottom: 52 }}>
              <h2 style={{
                fontFamily: sans,
                fontSize: 10,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#aaa",
                marginBottom: 20,
                fontWeight: 400,
              }}>
                Ubicación
              </h2>
              <div style={{ width: "100%", height: 380, overflow: "hidden", background: "#f4f4f4" }}>
                <iframe
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  title="Ubicación"
                />
              </div>
              <p style={{ fontFamily: sans, fontSize: 12, color: "#aaa", marginTop: 10 }}>{location}</p>
            </section>

            {/* GALERÍA COMPLETA */}
            {images.length > 1 && (
              <section>
                <h2 style={{
                  fontFamily: sans,
                  fontSize: 10,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#aaa",
                  marginBottom: 20,
                  fontWeight: 400,
                }}>
                  Galería
                </h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 3,
                }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        position: "relative",
                        aspectRatio: "4/3",
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "#f0f0f0",
                      }}
                      onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                    >
                      <img
                        src={img}
                        alt={`Foto ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.5s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN — sticky sidebar */}
          <div>
            <div style={{ position: "sticky", top: 100 }}>

              {/* Contact form */}
              <div style={{
                border: "1px solid #e8e8e8",
                padding: 32,
                background: "#fff",
              }}>
                <p style={{
                  fontFamily: sans,
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#aaa",
                  marginBottom: 6,
                }}>
                  Solicitar información
                </p>
                <p style={{
                  fontFamily: serif,
                  fontSize: 26,
                  fontWeight: 300,
                  color: "#111",
                  marginBottom: 28,
                }}>
                  {priceDisplay}
                </p>

                {submitted ? (
                  <div style={{ padding: "24px 0", textAlign: "center" }}>
                    <p style={{ fontFamily: sans, fontSize: 13, color: "#666" }}>
                      Gracias por su interés. Nos pondremos en contacto pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                      {[
                        { name: "name", placeholder: "Nombre completo", type: "text" },
                        { name: "email", placeholder: "Correo electrónico", type: "email" },
                        { name: "phone", placeholder: "Teléfono", type: "tel" },
                      ].map((field) => (
                        <input
                          key={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          style={{
                            fontFamily: sans,
                            fontSize: 13,
                            color: "#111",
                            border: "none",
                            borderBottom: "1px solid #ddd",
                            padding: "6px 0 10px",
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
                          padding: "6px 0 10px",
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
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          background: "#111",
                          color: "#fff",
                          border: "none",
                          padding: "16px",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        Enviar consulta
                      </button>
                    </div>
                  </form>
                )}

                <div style={{
                  marginTop: 28,
                  paddingTop: 24,
                  borderTop: "1px solid #f0f0f0",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "#aaa", marginBottom: 6 }}>
                    O llámanos directamente
                  </p>
                  <a
                    href="tel:+34971000000"
                    style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "#333", textDecoration: "none" }}
                  >
                    +34 971 000 000
                  </a>
                </div>
              </div>

              {/* Share / Print */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginTop: 4 }}>
                <button
                  onClick={() => navigator.share?.({ title: property.title_es, url: window.location.href })}
                  style={{
                    fontFamily: sans,
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#777",
                    background: "none",
                    border: "1px solid #e8e8e8",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  Compartir
                </button>
                <button
                  onClick={() => window.print()}
                  style={{
                    fontFamily: sans,
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#777",
                    background: "none",
                    border: "1px solid #e8e8e8",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
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
              top: 24,
              right: 32,
              fontFamily: sans,
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cerrar ✕
          </button>
          <button
            style={{
              position: "absolute",
              left: 24,
              fontSize: 48,
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1,
            }}
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p - 1 + images.length) % images.length); }}
          >
            ‹
          </button>
          <div
            style={{ width: "85vw", height: "85vh", position: "relative" }}
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
              right: 24,
              fontSize: 48,
              color: "rgba(255,255,255,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1,
            }}
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p + 1) % images.length); }}
          >
            ›
          </button>
          <p style={{
            position: "absolute",
            bottom: 24,
            fontFamily: sans,
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.35)",
          }}>
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
