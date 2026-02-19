"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Property = {
  id: string;
  slug: string;
  title_es?: string;
  title_en?: string;
  description_es?: string;
  description_en?: string;
  area?: string;
  municipality?: string;
  island?: string;
  price?: string | number;
  price_on_request?: boolean;
  status?: string;
  listing_type?: string;
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  size_built?: string | number;
  size_plot?: string | number;
  year_built?: number;
  features?: string[];
  images?: string[];
  latitude?: number | null;
  longitude?: number | null;
};

export function PropertyDetail({ property }: { property: Property }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const images: string[] = property.images || [];
  const title = property.title_es || property.title_en || "";
  const description = property.description_es || property.description_en || "";
  const location = [property.area, property.municipality].filter(Boolean).join(", ");
  const priceNum = typeof property.price === "string" ? parseFloat(property.price) : property.price;
  const price = property.price_on_request
    ? "Precio a consultar"
    : priceNum
    ? `€${priceNum.toLocaleString("es-ES")}`
    : "";
  const features: string[] = property.features || [];

  const next = () => setCurrentImage((p) => (p + 1) % images.length);
  const prev = () => setCurrentImage((p) => (p - 1 + images.length) % images.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!showModal) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal, images.length]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ── STICKY BAR ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid #e5e5e5",
        transition: "opacity 0.4s, transform 0.4s",
        opacity: scrolled ? 1 : 0,
        transform: scrolled ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: scrolled ? "auto" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="/" style={{ color: "#999", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>← Inicio</a>
            <span style={{ width: 1, height: 16, background: "#e5e5e5", display: "inline-block" }} />
            <span style={{ color: "#000", fontWeight: 300, fontSize: 13, letterSpacing: "0.05em" }}>{title}</span>
          </div>
          <span style={{ color: "#000", fontWeight: 300, fontSize: 14, letterSpacing: "0.05em" }}>{price}</span>
        </div>
      </div>

      {/* ── HERO FULLSCREEN ── */}
      <div style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden", background: "#111" }}>
        {images[currentImage] && (
          <Image
            src={images[currentImage]}
            alt={title}
            fill
            priority
            unoptimized
            style={{ objectFit: "cover", opacity: 0.9 }}
            sizes="100vw"
          />
        )}
        {/* gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.25) 100%)" }} />

        {/* top nav */}
        <div style={{ position: "absolute", top: 32, left: 40, display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>← Volver</a>
          {property.status === "available" && (
            <span style={{ padding: "4px 12px", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Disponible
            </span>
          )}
        </div>

        {/* bottom: title + price */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 56px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ maxWidth: 700 }}>
            {location && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>
                {location}
              </p>
            )}
            <h1 style={{ color: "#fff", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 200, lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0 }}>
              {title}
            </h1>
          </div>
          {price && (
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>Precio</p>
              <p style={{ color: "#fff", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 200, letterSpacing: "0.02em" }}>{price}</p>
            </div>
          )}
        </div>

        {/* image counter */}
        {images.length > 1 && (
          <>
            <button onClick={prev} style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>‹</button>
            <button onClick={next} style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>›</button>
            <button
              onClick={() => setShowModal(true)}
              style={{ position: "absolute", bottom: 56, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", background: "transparent", border: "none", cursor: "pointer" }}
            >
              Ver todas las fotos ({images.length})
            </button>
          </>
        )}
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 40px", display: "flex", flexWrap: "wrap", gap: 48 }}>
          {!!property.bedrooms && (
            <div>
              <p style={{ fontSize: 22, fontWeight: 200, color: "#000", margin: 0, letterSpacing: "-0.01em" }}>{property.bedrooms}</p>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "4px 0 0" }}>Habitaciones</p>
            </div>
          )}
          {!!property.bathrooms && (
            <div>
              <p style={{ fontSize: 22, fontWeight: 200, color: "#000", margin: 0, letterSpacing: "-0.01em" }}>{property.bathrooms}</p>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "4px 0 0" }}>Baños</p>
            </div>
          )}
          {!!property.size_built && (
            <div>
              <p style={{ fontSize: 22, fontWeight: 200, color: "#000", margin: 0, letterSpacing: "-0.01em" }}>{property.size_built} m²</p>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "4px 0 0" }}>Construido</p>
            </div>
          )}
          {!!property.size_plot && Number(property.size_plot) > 0 && (
            <div>
              <p style={{ fontSize: 22, fontWeight: 200, color: "#000", margin: 0, letterSpacing: "-0.01em" }}>{Number(property.size_plot).toLocaleString("es-ES")} m²</p>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "4px 0 0" }}>Parcela</p>
            </div>
          )}
          {!!property.year_built && (
            <div>
              <p style={{ fontSize: 22, fontWeight: 200, color: "#000", margin: 0 }}>{property.year_built}</p>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "4px 0 0" }}>Año</p>
            </div>
          )}
          {property.listing_type && (
            <div>
              <p style={{ fontSize: 22, fontWeight: 200, color: "#000", margin: 0 }}>{property.listing_type === "sale" ? "Venta" : "Alquiler"}</p>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: "4px 0 0" }}>Tipo</p>
            </div>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 80 }}>

        {/* LEFT */}
        <div>
          {/* Description */}
          <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 24 }}>Sobre la propiedad</p>
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.9, color: "#444", margin: 0 }}>{description}</p>

          {/* Features */}
          {features.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 32 }}>Características</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                {features.map((f, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ccc", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 300, color: "#555" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          {location && (
            <div style={{ marginTop: 64 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 24 }}>Ubicación</p>
              <div style={{ width: "100%", height: 320, background: "#f5f5f5", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 20, margin: "0 0 8px", color: "#ccc" }}>◎</p>
                  <p style={{ fontSize: 13, fontWeight: 300, color: "#999", margin: 0 }}>{location}</p>
                  {property.island && <p style={{ fontSize: 11, color: "#bbb", margin: "4px 0 0", letterSpacing: "0.1em" }}>{property.island}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: contact */}
        <div style={{ position: "sticky", top: 90, alignSelf: "start" }}>
          <div style={{ border: "1px solid #e5e5e5", padding: 36 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", margin: "0 0 8px" }}>Contacto</p>
            <h3 style={{ fontSize: 22, fontWeight: 200, color: "#000", margin: "0 0 32px", letterSpacing: "-0.01em" }}>Solicitar visita privada</h3>
            <ContactForm propertyTitle={title} />
          </div>
        </div>
      </div>

      {/* ── GALLERY GRID ── */}
      {images.length > 1 && (
        <div style={{ background: "#fafafa", padding: "80px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 32 }}>Galería</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
              {images.map((src, i) => (
                <div
                  key={i}
                  onClick={() => { setCurrentImage(i); setShowModal(true); }}
                  style={{
                    position: "relative",
                    aspectRatio: i === 0 ? "16/9" : "4/3",
                    gridColumn: i === 0 ? "span 2" : "span 1",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#eee",
                  }}
                >
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    unoptimized
                    style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 28, cursor: "pointer", lineHeight: 1 }}>×</button>
          <button onClick={prev} style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 20 }}>‹</button>
          <div style={{ position: "relative", width: "85vw", height: "80vh" }}>
            <Image
              src={images[currentImage]}
              alt={`${title} ${currentImage + 1}`}
              fill
              unoptimized
              style={{ objectFit: "contain" }}
              sizes="85vw"
            />
          </div>
          <button onClick={next} style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 20 }}>›</button>
          <p style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.3em" }}>
            {currentImage + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}

function ContactForm({ propertyTitle }: { propertyTitle: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, property: propertyTitle, source: "property_page" }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ padding: "32px 0", textAlign: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 200, color: "#000", margin: "0 0 8px" }}>Mensaje enviado</p>
        <p style={{ fontSize: 13, fontWeight: 300, color: "#999", margin: 0 }}>Nos pondremos en contacto pronto.</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderBottom: "1px solid #e0e0e0",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    background: "transparent",
    padding: "12px 0",
    fontSize: 13,
    fontWeight: 300,
    color: "#000",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input type="text" placeholder="Nombre completo" required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
      <input type="email" placeholder="Correo electrónico" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
      <input type="tel" placeholder="Teléfono" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} />
      <textarea
        placeholder="Mensaje (opcional)"
        rows={3}
        value={form.message}
        onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
        style={{ ...inputStyle, resize: "none" }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{ marginTop: 8, padding: "14px", background: "#000", color: "#fff", border: "none", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1 }}
      >
        {loading ? "Enviando..." : "Enviar consulta"}
      </button>
      <a
        href="tel:+34600000000"
        style={{ display: "block", padding: "14px", border: "1px solid #e5e5e5", color: "#000", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", textAlign: "center", textDecoration: "none" }}
      >
        Llamar
      </a>
    </form>
  );
}
