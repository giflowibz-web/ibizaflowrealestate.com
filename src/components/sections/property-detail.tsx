"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Property = {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
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

const sans = "var(--font-geist-sans), 'Helvetica Neue', Arial, sans-serif";
const serif = "'Cormorant Garamond', 'Garamond', Georgia, serif";

export default function PropertyDetail({ property }: { property: Property }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const images = property.images || [];

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const priceDisplay = property.price_on_request
    ? "Precio bajo consulta"
    : property.listing_type === "rent" && property.price_rent
    ? `${formatPrice(property.price_rent, property.currency)}/mes`
    : formatPrice(property.price, property.currency);

  const location = [property.area, property.municipality, property.island, property.country]
    .filter(Boolean)
    .join(", ");

  const basicInfo = [
    { label: "Dirección de correo electrónico", value: property.contact_email },
    {
      label: "Estado de la propiedad",
      value: property.listing_type === "rent" ? "En alquiler" : property.listing_type === "sale" ? "En venta" : "Disponible",
    },
    {
      label: "Tamaño del lote",
      value: property.lot_size || (property.size_plot && property.size_plot !== "0" ? `${property.size_plot} m²` : null),
    },
    { label: "Identificación de la MLS", value: property.mls_id },
    {
      label: "Tipo de propiedad",
      value: { villa: "Residencial", apartment: "Residencial", finca: "Residencial", penthouse: "Residencial", house: "Residencial", land: "Terreno", commercial: "Comercial" }[property.property_type] || "Residencial",
    },
  ].filter((i) => i.value) as { label: string; value: string }[];

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

  const mapQuery = property.latitude && property.longitude
    ? `${property.latitude},${property.longitude}`
    : encodeURIComponent(location);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: serif }}>

      {/* ── GALERÍA ─────────────────────────────────────────────── */}
      <div className="w-full bg-white pt-20">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">

          {/* Título + precio */}
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-gray-400 mb-1.5" style={{ fontFamily: sans }}>
                {location}
              </p>
              <h1 className="text-[2.6rem] md:text-[3.4rem] font-extralight text-gray-900 leading-[1.1]">
                {property.title_es}
              </h1>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-[2rem] font-extralight text-gray-900">{priceDisplay}</p>
            </div>
          </div>

          {/* Grid fotos: 1 grande + 4 pequeñas */}
          {images.length > 0 && (
            <div className="grid grid-cols-4 grid-rows-2 gap-[3px] h-[540px] md:h-[640px]">
              <div
                className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group"
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              >
                <Image
                  src={images[0]}
                  alt={property.title_es}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  priority
                />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                >
                  {images[i] ? (
                    <Image
                      src={images[i]}
                      alt={`${property.title_es} ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                  {i === 4 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: sans }}>
                        +{images.length - 5} fotos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Precio móvil */}
          <div className="md:hidden mt-4">
            <p className="text-2xl font-extralight text-gray-900">{priceDisplay}</p>
          </div>
        </div>
      </div>

      {/* ── CONTENIDO ───────────────────────────────────────────── */}
      <div className="max-w-[1380px] mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">

          {/* COLUMNA IZQUIERDA */}
          <div>

            {/* Stats */}
            <div className="flex gap-10 pb-10 border-b border-gray-100 mb-12">
              {property.bedrooms > 0 && (
                <div>
                  <p className="text-[2rem] font-extralight text-gray-900 leading-none">{property.bedrooms}</p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-1.5" style={{ fontFamily: sans }}>Habitaciones</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div>
                  <p className="text-[2rem] font-extralight text-gray-900 leading-none">{property.bathrooms}</p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-1.5" style={{ fontFamily: sans }}>Baños</p>
                </div>
              )}
              {property.size_built && property.size_built !== "0" && (
                <div>
                  <p className="text-[2rem] font-extralight text-gray-900 leading-none">{property.size_built}<span className="text-base ml-1">m²</span></p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-1.5" style={{ fontFamily: sans }}>Construidos</p>
                </div>
              )}
              {property.size_plot && property.size_plot !== "0" && (
                <div>
                  <p className="text-[2rem] font-extralight text-gray-900 leading-none">{property.size_plot}<span className="text-base ml-1">m²</span></p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-1.5" style={{ fontFamily: sans }}>Parcela</p>
                </div>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-14">
              <p className="text-[1.1rem] font-extralight text-gray-600 leading-[1.85]">
                {property.description_es}
              </p>
            </div>

            {/* ── INFORMACIÓN BÁSICA ── */}
            <section className="mb-14">
              <h2 className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-7" style={{ fontFamily: sans }}>
                Información Básica
              </h2>
              <div className="divide-y divide-gray-100">
                {basicInfo.map((item) => (
                  <div key={item.label} className="flex justify-between items-start py-[14px]">
                    <span className="text-[13px] text-gray-500 leading-relaxed" style={{ fontFamily: sans }}>{item.label}</span>
                    <span className="text-[13px] text-gray-900 text-right max-w-[52%] leading-relaxed" style={{ fontFamily: sans }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── CARACTERÍSTICAS Y COMODIDADES ── */}
            {(areaItems.length > 0 || interiorItems.length > 0 || financialItems.length > 0) && (
              <section className="mb-14">
                <h2 className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-8" style={{ fontFamily: sans }}>
                  Características y Comodidades
                </h2>

                {areaItems.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-[11px] tracking-[0.22em] uppercase text-gray-800 font-medium mb-4" style={{ fontFamily: sans }}>
                      Área y lote
                    </h3>
                    <div className="divide-y divide-gray-100">
                      {areaItems.map((item) => (
                        <div key={item.label} className="flex justify-between items-start py-[13px]">
                          <span className="text-[13px] text-gray-500" style={{ fontFamily: sans }}>{item.label}</span>
                          <span className="text-[13px] text-gray-900 text-right max-w-[52%]" style={{ fontFamily: sans }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {interiorItems.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-[11px] tracking-[0.22em] uppercase text-gray-800 font-medium mb-4" style={{ fontFamily: sans }}>
                      Interior y exterior
                    </h3>
                    <div className="divide-y divide-gray-100">
                      {interiorItems.map((item) => (
                        <div key={item.label} className="flex justify-between items-start py-[13px]">
                          <span className="text-[13px] text-gray-500" style={{ fontFamily: sans }}>{item.label}</span>
                          <span className="text-[13px] text-gray-900 text-right max-w-[52%]" style={{ fontFamily: sans }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {financialItems.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-[11px] tracking-[0.22em] uppercase text-gray-800 font-medium mb-4" style={{ fontFamily: sans }}>
                      Financiero
                    </h3>
                    <div className="divide-y divide-gray-100">
                      {financialItems.map((item) => (
                        <div key={item.label} className="flex justify-between items-start py-[13px]">
                          <span className="text-[13px] text-gray-500" style={{ fontFamily: sans }}>{item.label}</span>
                          <span className="text-[13px] text-gray-900 text-right max-w-[52%]" style={{ fontFamily: sans }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* ── MAPA ── */}
            <section className="mb-14">
              <h2 className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-6" style={{ fontFamily: sans }}>
                Ubicación
              </h2>
              <div className="w-full h-[360px] overflow-hidden bg-gray-100">
                <iframe
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la propiedad"
                />
              </div>
              <p className="mt-3 text-[12px] text-gray-400" style={{ fontFamily: sans }}>{location}</p>
            </section>

            {/* ── GALERÍA COMPLETA ── */}
            {images.length > 1 && (
              <section>
                <h2 className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-6" style={{ fontFamily: sans }}>
                  Galería
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px]">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                      onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                    >
                      <Image
                        src={img}
                        alt={`Foto ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* COLUMNA DERECHA — Formulario sticky */}
          <div>
            <div className="sticky top-24">
              <div className="border border-gray-200 p-8">
                <p className="text-[10px] tracking-[0.32em] uppercase text-gray-400 mb-1" style={{ fontFamily: sans }}>
                  Solicitar información
                </p>
                <p className="text-[1.6rem] font-extralight text-gray-900 mb-8">{priceDisplay}</p>

                {submitted ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-gray-600" style={{ fontFamily: sans }}>Gracias por su interés. Nos pondremos en contacto pronto.</p>
                  </div>
                ) : (
                  <form
                    className="space-y-7"
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  >
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
                        className="w-full border-0 border-b border-gray-200 pb-2.5 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-800 bg-transparent transition-colors"
                        style={{ fontFamily: sans }}
                      />
                    ))}
                    <textarea
                      placeholder="Mensaje"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border-0 border-b border-gray-200 pb-2.5 text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-800 bg-transparent transition-colors resize-none"
                      style={{ fontFamily: sans }}
                    />
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white text-[10px] tracking-[0.35em] uppercase py-4 hover:bg-gray-700 transition-colors"
                      style={{ fontFamily: sans }}
                    >
                      Enviar consulta
                    </button>
                  </form>
                )}

                <div className="mt-8 pt-7 border-t border-gray-100 text-center">
                  <p className="text-[11px] text-gray-400 mb-2" style={{ fontFamily: sans }}>O llámanos directamente</p>
                  <a href="tel:+34971000000" className="text-[13px] font-light text-gray-800 hover:text-gray-500 transition-colors" style={{ fontFamily: sans }}>
                    +34 971 000 000
                  </a>
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="border border-gray-200 py-3 text-[10px] tracking-[0.25em] uppercase text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
                  style={{ fontFamily: sans }}
                  onClick={() => navigator.share?.({ title: property.title_es, url: window.location.href })}
                >
                  Compartir
                </button>
                <button
                  className="border border-gray-200 py-3 text-[10px] tracking-[0.25em] uppercase text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
                  style={{ fontFamily: sans }}
                  onClick={() => window.print()}
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/96 z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-8 text-white/70 text-[11px] tracking-[0.3em] uppercase hover:text-white transition-colors"
            style={{ fontFamily: sans }}
          >
            Cerrar ✕
          </button>
          <button
            className="absolute left-6 text-white/60 text-4xl hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p - 1 + images.length) % images.length); }}
          >
            ‹
          </button>
          <div
            className="relative w-[88vw] h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={images[lightboxIndex]} alt="" fill className="object-contain" />
          </div>
          <button
            className="absolute right-6 text-white/60 text-4xl hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((p) => (p + 1) % images.length); }}
          >
            ›
          </button>
          <p className="absolute bottom-6 text-white/40 text-[11px] tracking-widest" style={{ fontFamily: sans }}>
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
