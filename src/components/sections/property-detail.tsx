"use client";

import { useState } from "react";

type Property = {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  price: string | number;
  price_rent?: string | number | null;
  currency?: string;
  price_on_request?: boolean;
  listing_type?: string;
  property_type?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  size_built?: string | number | null;
  size_plot?: string | number | null;
  year_built?: number | null;
  area?: string;
  municipality?: string;
  island?: string;
  country?: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  images?: string[];
  features?: string[];
  mls_id?: string;
  lot_size?: string;
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
  status?: string;
};

function formatPrice(price: string | number, currency = "EUR", on_request = false): string {
  if (on_request) return "Precio a consultar";
  const n = typeof price === "string" ? parseFloat(price) : price;
  if (!n || isNaN(n)) return "Precio a consultar";
  return new Intl.NumberFormat("es-ES", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}

function locationString(p: Property): string {
  return [p.area, p.municipality, p.island, p.country].filter(Boolean).join(", ");
}

export default function PropertyDetail({ property: p }: { property: Property }) {
  const images = p.images?.length ? p.images : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
  ];
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const price = formatPrice(p.price, p.currency || "EUR", p.price_on_request);
  const location = locationString(p);

  const infoBasica = [
    p.contact_email && { label: "Contacto", value: p.contact_email },
    p.status && { label: "Estado", value: p.status === "available" ? "Disponible" : p.status },
    p.listing_type && { label: "Tipo", value: p.listing_type === "sale" ? "Venta" : "Alquiler" },
    p.lot_size && { label: "Tamaño del lote", value: p.lot_size },
    p.mls_id && { label: "Referencia MLS", value: p.mls_id },
    p.property_type && { label: "Tipo de propiedad", value: p.property_type },
  ].filter(Boolean) as { label: string; value: string }[];

  const caracteristicas = [
    p.architectural_style && { label: "Estilo arquitectónico", value: p.architectural_style },
    p.view && { label: "Vistas", value: p.view },
    p.stories && { label: "Plantas", value: String(p.stories) },
    p.pool && { label: "Piscina", value: p.pool },
    p.parking && { label: "Estacionamiento", value: p.parking },
    p.heating && { label: "Calefacción", value: p.heating },
    p.cooling && { label: "Aire acondicionado", value: p.cooling },
    p.laundry && { label: "Lavandería", value: p.laundry },
    p.fireplace && { label: "Chimenea", value: p.fireplace },
    p.appliances && { label: "Electrodomésticos", value: p.appliances },
  ].filter(Boolean) as { label: string; value: string }[];

  const hasMap = p.latitude && p.longitude;

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", background: "#fff", color: "#1a1a1a" }}>

      {/* ── HERO GALERÍA ── */}
      <div style={{ position: "relative", background: "#0a0a0a" }}>
        {/* Imagen principal */}
        <div style={{ position: "relative", width: "100%", height: "90vh", overflow: "hidden" }}>
          <img
            src={images[activeImg]}
            alt={p.title_es}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Overlay gradiente inferior */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)" }} />

          {/* Título + precio sobre la foto */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 60px 48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
              <div>
                {location && (
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 10px", fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
                    {location}
                  </p>
                )}
                <h1 style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, margin: 0, lineHeight: 1.05, letterSpacing: "-0.5px" }}>
                  {p.title_es}
                </h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 6px", fontFamily: "system-ui, sans-serif" }}>
                  {p.listing_type === "rent" ? "Alquiler" : "Precio"}
                </p>
                <p style={{ color: "#fff", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, margin: 0, letterSpacing: "1px" }}>
                  {price}
                </p>
              </div>
            </div>
          </div>

          {/* Flechas navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: "48px", height: "48px", borderRadius: "50%", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
              >‹</button>
              <button
                onClick={() => setActiveImg(i => (i + 1) % images.length)}
                style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: "48px", height: "48px", borderRadius: "50%", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
              >›</button>
            </>
          )}

          {/* Contador fotos */}
          <div style={{ position: "absolute", bottom: "20px", right: "60px", color: "rgba(255,255,255,0.55)", fontSize: "12px", letterSpacing: "2px", fontFamily: "system-ui, sans-serif" }}>
            {activeImg + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div style={{ display: "flex", gap: "4px", padding: "4px", background: "#0a0a0a" }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{ flex: 1, height: "80px", overflow: "hidden", border: "none", padding: 0, cursor: "pointer", opacity: activeImg === i ? 1 : 0.45, transition: "opacity 0.2s", outline: activeImg === i ? "2px solid #c9a96e" : "none", outlineOffset: "-2px" }}
              >
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: "#f5f2ed", borderBottom: "1px solid #e8e3db" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 60px", display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "center" }}>
          {p.bedrooms != null && (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "36px", fontWeight: 300, margin: "0 0 4px", color: "#1a1a1a" }}>{p.bedrooms}</p>
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", margin: 0, fontFamily: "system-ui, sans-serif" }}>Dormitorios</p>
            </div>
          )}
          {p.bathrooms != null && (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "36px", fontWeight: 300, margin: "0 0 4px", color: "#1a1a1a" }}>{p.bathrooms}</p>
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", margin: 0, fontFamily: "system-ui, sans-serif" }}>Baños</p>
            </div>
          )}
          {p.size_built && Number(p.size_built) > 0 && (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "36px", fontWeight: 300, margin: "0 0 4px", color: "#1a1a1a" }}>{p.size_built}</p>
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", margin: 0, fontFamily: "system-ui, sans-serif" }}>m² construidos</p>
            </div>
          )}
          {p.size_plot && Number(p.size_plot) > 0 && (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "36px", fontWeight: 300, margin: "0 0 4px", color: "#1a1a1a" }}>{p.size_plot}</p>
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", margin: 0, fontFamily: "system-ui, sans-serif" }}>m² parcela</p>
            </div>
          )}
          {p.year_built && (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "36px", fontWeight: 300, margin: "0 0 4px", color: "#1a1a1a" }}>{p.year_built}</p>
              <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", margin: 0, fontFamily: "system-ui, sans-serif" }}>Año</p>
            </div>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
            <button
              onClick={() => setLightbox(0)}
              style={{ background: "transparent", border: "1px solid #1a1a1a", color: "#1a1a1a", padding: "10px 24px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}
            >
              Ver todas las fotos
            </button>
          </div>
        </div>
      </div>

      {/* ── CUERPO PRINCIPAL ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "80px 60px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "80px", alignItems: "start" }}>

        {/* COLUMNA IZQUIERDA */}
        <div>

          {/* DESCRIPCIÓN */}
          <section style={{ marginBottom: "72px" }}>
            <h2 style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#888", fontFamily: "system-ui, sans-serif", fontWeight: 400, margin: "0 0 24px" }}>Descripción</h2>
            <p style={{ fontSize: "18px", fontWeight: 300, lineHeight: 1.9, color: "#333", margin: 0 }}>
              {p.description_es}
            </p>
          </section>

          {/* INFORMACIÓN BÁSICA */}
          {infoBasica.length > 0 && (
            <section style={{ marginBottom: "72px" }}>
              <h2 style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#888", fontFamily: "system-ui, sans-serif", fontWeight: 400, margin: "0 0 32px" }}>Información Básica</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                {infoBasica.map((item, i) => (
                  <div key={i} style={{ padding: "18px 0", borderBottom: "1px solid #ede9e3", borderRight: i % 2 === 0 ? "1px solid #ede9e3" : "none", paddingRight: i % 2 === 0 ? "32px" : "0", paddingLeft: i % 2 === 1 ? "32px" : "0" }}>
                    <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#aaa", margin: "0 0 6px", fontFamily: "system-ui, sans-serif" }}>{item.label}</p>
                    <p style={{ fontSize: "15px", fontWeight: 300, margin: 0, color: "#1a1a1a" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CARACTERÍSTICAS */}
          {caracteristicas.length > 0 && (
            <section style={{ marginBottom: "72px" }}>
              <h2 style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#888", fontFamily: "system-ui, sans-serif", fontWeight: 400, margin: "0 0 32px" }}>Características y Comodidades</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                {caracteristicas.map((item, i) => (
                  <div key={i} style={{ padding: "18px 0", borderBottom: "1px solid #ede9e3", borderRight: i % 2 === 0 ? "1px solid #ede9e3" : "none", paddingRight: i % 2 === 0 ? "32px" : "0", paddingLeft: i % 2 === 1 ? "32px" : "0" }}>
                    <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#aaa", margin: "0 0 6px", fontFamily: "system-ui, sans-serif" }}>{item.label}</p>
                    <p style={{ fontSize: "15px", fontWeight: 300, margin: 0, color: "#1a1a1a" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* MAPA */}
          <section style={{ marginBottom: "72px" }}>
            <h2 style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#888", fontFamily: "system-ui, sans-serif", fontWeight: 400, margin: "0 0 24px" }}>Ubicación</h2>
            {hasMap ? (
              <iframe
                src={`https://maps.google.com/maps?q=${p.latitude},${p.longitude}&z=15&output=embed`}
                style={{ width: "100%", height: "420px", border: "none", display: "block" }}
                loading="lazy"
              />
            ) : (
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent([p.area, p.municipality, p.island, p.country].filter(Boolean).join(", "))}&z=13&output=embed`}
                style={{ width: "100%", height: "420px", border: "none", display: "block" }}
                loading="lazy"
              />
            )}
          </section>

          {/* GALERÍA COMPLETA */}
          {images.length > 1 && (
            <section>
              <h2 style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#888", fontFamily: "system-ui, sans-serif", fontWeight: 400, margin: "0 0 24px" }}>Galería</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(i)}
                    style={{ border: "none", padding: 0, cursor: "pointer", overflow: "hidden", aspectRatio: "4/3", display: "block" }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s", }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* COLUMNA DERECHA — FORMULARIO STICKY */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div style={{ border: "1px solid #e8e3db", padding: "48px 40px" }}>
            <h3 style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#888", fontFamily: "system-ui, sans-serif", fontWeight: 400, margin: "0 0 8px" }}>Solicitar información</h3>
            <p style={{ fontSize: "22px", fontWeight: 300, margin: "0 0 36px", color: "#1a1a1a", lineHeight: 1.3 }}>{p.title_es}</p>
            <p style={{ fontSize: "24px", fontWeight: 300, margin: "0 0 36px", color: "#8b6f47", letterSpacing: "0.5px" }}>{price}</p>

            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", fontFamily: "system-ui, sans-serif" }}>Mensaje enviado</p>
                <p style={{ fontSize: "13px", color: "#aaa", marginTop: "12px", fontFamily: "system-ui, sans-serif" }}>Nos pondremos en contacto pronto</p>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSent(true); }}
                style={{ display: "flex", flexDirection: "column", gap: "0" }}
              >
                {[
                  { key: "name", label: "Nombre", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: "Teléfono", type: "tel" },
                ].map(field => (
                  <div key={field.key} style={{ borderBottom: "1px solid #d0cbc3", marginBottom: "28px" }}>
                    <label style={{ display: "block", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#aaa", fontFamily: "system-ui, sans-serif", marginBottom: "6px" }}>{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{ width: "100%", border: "none", outline: "none", padding: "0 0 8px", fontSize: "15px", fontWeight: 300, background: "transparent", fontFamily: "inherit", color: "#1a1a1a" }}
                    />
                  </div>
                ))}
                <div style={{ borderBottom: "1px solid #d0cbc3", marginBottom: "36px" }}>
                  <label style={{ display: "block", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#aaa", fontFamily: "system-ui, sans-serif", marginBottom: "6px" }}>Mensaje</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ width: "100%", border: "none", outline: "none", padding: "0 0 8px", fontSize: "15px", fontWeight: 300, background: "transparent", resize: "none", fontFamily: "inherit", color: "#1a1a1a" }}
                    defaultValue={`Me interesa la propiedad: ${p.title_es}`}
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: "#1a1a1a", color: "#fff", border: "none", padding: "16px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#8b6f47")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#1a1a1a")}
                >
                  Enviar consulta
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + images.length) % images.length : null); }}
            style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: "56px", height: "56px", borderRadius: "50%", cursor: "pointer", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >‹</button>
          <img
            src={images[lightbox]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % images.length : null); }}
            style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: "56px", height: "56px", borderRadius: "50%", cursor: "pointer", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >›</button>
          <button
            onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: "24px", right: "24px", background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "32px", cursor: "pointer", lineHeight: 1 }}
          >×</button>
          <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "2px", fontFamily: "system-ui, sans-serif" }}>
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
