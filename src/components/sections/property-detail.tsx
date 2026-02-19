"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

function formatPrice(price: string, currency: string) {
  const num = parseInt(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(num);
}

function getStatusLabel(listing_type: string) {
  if (listing_type === "rent") return "En alquiler";
  if (listing_type === "sale") return "En venta";
  return "Disponible";
}

function getPropertyTypeLabel(type: string) {
  const map: Record<string, string> = {
    villa: "Residencial",
    apartment: "Residencial",
    finca: "Residencial",
    penthouse: "Residencial",
    house: "Residencial",
    land: "Terreno",
    commercial: "Comercial",
  };
  return map[type] || "Residencial";
}

export default function PropertyDetail({ property }: { property: Property }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const images = property.images || [];
  const mainImages = images.slice(0, 5);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const priceDisplay = property.price_on_request
    ? "Precio bajo consulta"
    : property.listing_type === "rent" && property.price_rent
    ? `${formatPrice(property.price_rent, property.currency)}/mes`
    : formatPrice(property.price, property.currency);

  const basicInfo = [
    { label: "Dirección de correo electrónico", value: property.contact_email || "info@ibizaluxury.com" },
    { label: "Estado de la propiedad", value: getStatusLabel(property.listing_type) },
    { label: "Tamaño del lote", value: property.lot_size || (property.size_plot && property.size_plot !== "0" ? `${property.size_plot} m²` : null) },
    { label: "Identificación de la MLS", value: property.mls_id },
    { label: "Tipo de propiedad", value: getPropertyTypeLabel(property.property_type) },
  ].filter((i) => i.value);

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
      : property.listing_type === "sale"
      ? { label: "Precio de venta", value: formatPrice(property.price, property.currency) }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif" }}>

      {/* GALERÍA PRINCIPAL — estilo Aaron Kirman */}
      <div className="w-full bg-white pt-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">

          {/* Título y precio encima de la galería */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-1" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
                {property.area}{property.municipality ? `, ${property.municipality}` : ""}{property.island ? `, ${property.island}` : ""}
              </p>
              <h1 className="text-3xl md:text-5xl font-extralight text-gray-900 leading-tight">
                {property.title_es}
              </h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-2xl md:text-3xl font-extralight text-gray-900">{priceDisplay}</p>
            </div>
          </div>

          {/* Grid de fotos — 1 grande + 4 pequeñas */}
          {images.length > 0 && (
            <div className="grid grid-cols-4 grid-rows-2 gap-1.5 h-[520px] md:h-[620px]">
              {/* Foto grande izquierda */}
              <div
                className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer"
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              >
                <Image
                  src={mainImages[0] || ""}
                  alt={property.title_es}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              {/* 4 fotos pequeñas derecha */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                >
                  {mainImages[i] ? (
                    <Image
                      src={mainImages[i]}
                      alt={`${property.title_es} ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                  {/* Botón ver todas en última foto */}
                  {i === 4 && images.length > 5 && (
                    <button
                      className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(4); setLightboxOpen(true); }}
                    >
                      Ver todas ({images.length})
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Precio móvil */}
          <div className="md:hidden mt-3">
            <p className="text-2xl font-extralight text-gray-900">{priceDisplay}</p>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* COLUMNA IZQUIERDA — 2/3 */}
          <div className="lg:col-span-2">

            {/* Stats rápidos */}
            <div className="flex gap-8 pb-8 border-b border-gray-200 mb-10">
              {property.bedrooms > 0 && (
                <div>
                  <p className="text-2xl font-extralight text-gray-900">{property.bedrooms}</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Habitaciones</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div>
                  <p className="text-2xl font-extralight text-gray-900">{property.bathrooms}</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Baños</p>
                </div>
              )}
              {property.size_built && property.size_built !== "0" && (
                <div>
                  <p className="text-2xl font-extralight text-gray-900">{property.size_built} <span className="text-base">m²</span></p>
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Construidos</p>
                </div>
              )}
              {property.size_plot && property.size_plot !== "0" && (
                <div>
                  <p className="text-2xl font-extralight text-gray-900">{property.size_plot} <span className="text-base">m²</span></p>
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Parcela</p>
                </div>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-12">
              <p className="text-lg font-extralight text-gray-700 leading-relaxed">{property.description_es}</p>
            </div>

            {/* INFORMACIÓN BÁSICA */}
            <div className="mb-12">
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
                Información Básica
              </h2>
              <div className="divide-y divide-gray-100">
                {basicInfo.map((item) => (
                  <div key={item.label} className="flex justify-between py-4">
                    <span className="text-sm text-gray-500" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.label}</span>
                    <span className="text-sm text-gray-900 text-right max-w-[55%]" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARACTERÍSTICAS Y COMODIDADES */}
            <div className="mb-12">
              <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
                Características y Comodidades
              </h2>

              {areaItems.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-gray-900 mb-4" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Área y lote</h3>
                  <div className="divide-y divide-gray-100">
                    {areaItems.map((item) => (
                      <div key={item.label} className="flex justify-between py-3">
                        <span className="text-sm text-gray-500" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.label}</span>
                        <span className="text-sm text-gray-900 text-right max-w-[55%]" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {interiorItems.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-gray-900 mb-4" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Interior y exterior</h3>
                  <div className="divide-y divide-gray-100">
                    {interiorItems.map((item) => (
                      <div key={item.label} className="flex justify-between py-3">
                        <span className="text-sm text-gray-500" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.label}</span>
                        <span className="text-sm text-gray-900 text-right max-w-[55%]" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {financialItems.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-gray-900 mb-4" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Financiero</h3>
                  <div className="divide-y divide-gray-100">
                    {financialItems.map((item) => (
                      <div key={item.label} className="flex justify-between py-3">
                        <span className="text-sm text-gray-500" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.label}</span>
                        <span className="text-sm text-gray-900 text-right max-w-[55%]" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MAPA */}
            {(property.latitude && property.longitude) ? (
              <div className="mb-12">
                <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Ubicación</h2>
                <div className="w-full h-72 bg-gray-100 overflow-hidden">
                  <iframe
                    src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=14&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-12">
                <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Ubicación</h2>
                <div className="w-full h-72 bg-gray-100 overflow-hidden">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.area}, ${property.municipality}, ${property.island}, Spain`)}&z=13&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* GALERÍA COMPLETA */}
            {images.length > 5 && (
              <div className="mb-12">
                <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Galería</h2>
                <div className="grid grid-cols-3 gap-1.5">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                      onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                    >
                      <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA — Formulario sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="border border-gray-200 p-8">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-1" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Solicitar información</p>
                <p className="text-2xl font-extralight text-gray-900 mb-8">{priceDisplay}</p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {[
                    { name: "name", placeholder: "Nombre completo", type: "text" },
                    { name: "email", placeholder: "Correo electrónico", type: "email" },
                    { name: "phone", placeholder: "Teléfono", type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full border-0 border-b border-gray-300 pb-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 bg-transparent transition-colors"
                        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                      />
                    </div>
                  ))}
                  <div>
                    <textarea
                      placeholder="Mensaje"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border-0 border-b border-gray-300 pb-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 bg-transparent transition-colors resize-none"
                      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white text-xs tracking-[0.3em] uppercase py-4 hover:bg-gray-700 transition-colors"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    Enviar consulta
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>O llámanos directamente</p>
                  <a href="tel:+34971000000" className="text-sm font-light text-gray-900 hover:text-gray-600 transition-colors" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
                    +34 971 000 000
                  </a>
                </div>
              </div>

              {/* Compartir */}
              <div className="mt-4 flex gap-3">
                <button
                  className="flex-1 border border-gray-200 py-3 text-xs tracking-[0.2em] uppercase text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  onClick={() => navigator.share?.({ title: property.title_es, url: window.location.href })}
                >
                  Compartir
                </button>
                <button
                  className="flex-1 border border-gray-200 py-3 text-xs tracking-[0.2em] uppercase text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  onClick={() => window.print()}
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-6 right-6 text-white text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>Cerrar</button>
          <button
            className="absolute left-6 text-white text-2xl"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + images.length) % images.length); }}
          >‹</button>
          <div className="relative w-[85vw] h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[lightboxIndex]} alt="" fill className="object-contain" />
          </div>
          <button
            className="absolute right-6 text-white text-2xl"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % images.length); }}
          >›</button>
          <p className="absolute bottom-6 text-white/50 text-xs" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
