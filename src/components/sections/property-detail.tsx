"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Property {
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
  area: string;
  municipality: string;
  island: string;
  country: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number;
  bathrooms: number;
  size_built: string;
  size_plot: string;
  year_built: number | null;
  property_type: string;
  listing_type: string;
  status: string;
  features: string[];
  images: string[];
  ref: string | null;
  virtual_tour_url: string;
}

function formatPrice(price: string, currency: string) {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function PropertyDetail({ property: p }: { property: Property }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const images = p.images?.length ? p.images : ["/placeholder.jpg"];
  const location = [p.area, p.municipality, p.island].filter(Boolean).join(", ");
  const priceLabel = p.price_on_request
    ? "Precio a consultar"
    : formatPrice(p.price, p.currency);

  const stats = [
    p.bedrooms ? { label: "Dormitorios", value: String(p.bedrooms) } : null,
    p.bathrooms ? { label: "Baños", value: String(p.bathrooms) } : null,
    p.size_built && p.size_built !== "0" ? { label: "Superficie", value: `${p.size_built} m²` } : null,
    p.size_plot && p.size_plot !== "0" ? { label: "Parcela", value: `${p.size_plot} m²` } : null,
    p.year_built ? { label: "Año", value: String(p.year_built) } : null,
    p.property_type ? { label: "Tipo", value: p.property_type.charAt(0).toUpperCase() + p.property_type.slice(1) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  function prevLightbox() {
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  }
  function nextLightbox() {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  }

  return (
    <div className="bg-white min-h-screen">
      {/* GALLERY — fullscreen masonry style */}
      <div className="grid grid-cols-4 grid-rows-2 h-[70vh] gap-1 pt-20">
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden"
          onClick={() => setLightboxIndex(0)}
        >
          {images[0] && (
            <Image
              src={images[0]}
              alt={p.title_es}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          )}
        </div>
        {/* Side images */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative cursor-pointer overflow-hidden bg-neutral-100"
            onClick={() => setLightboxIndex(i)}
          >
            {images[i] ? (
              <Image
                src={images[i]}
                alt={`${p.title_es} ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200" />
            )}
            {i === 4 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-sm tracking-widest uppercase font-light">
                  +{images.length - 5} fotos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* HEADER — title, location, price */}
      <div className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-2 font-light">
              {location}
            </p>
            <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 tracking-tight leading-tight">
              {p.title_es}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-1 font-light">Precio</p>
            <p className="text-3xl font-extralight text-neutral-900 tracking-tight">{priceLabel}</p>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      {stats.length > 0 && (
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-8 py-6 flex flex-wrap gap-8 md:gap-16">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1 font-light">{s.label}</span>
                <span className="text-xl font-extralight text-neutral-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BODY — 2 columns */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* LEFT — description + features + map */}
        <div className="lg:col-span-2 space-y-16">
          {/* Description */}
          <div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-6 font-light">Descripción</h2>
            <p className="text-neutral-600 font-light leading-relaxed text-lg">{p.description_es}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-200" />

          {/* Details grid */}
          <div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-8 font-light">Detalles</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8">
              {[
                { label: "Tipo de propiedad", value: p.property_type },
                { label: "Estado", value: p.listing_type === "sale" ? "En venta" : "En alquiler" },
                { label: "Dormitorios", value: p.bedrooms ? `${p.bedrooms}` : "—" },
                { label: "Baños", value: p.bathrooms ? `${p.bathrooms}` : "—" },
                { label: "Superficie construida", value: p.size_built && p.size_built !== "0" ? `${p.size_built} m²` : "—" },
                { label: "Superficie parcela", value: p.size_plot && p.size_plot !== "0" ? `${p.size_plot} m²` : "—" },
                { label: "Año de construcción", value: p.year_built ? `${p.year_built}` : "—" },
                { label: "Municipio", value: p.municipality || "—" },
                { label: "Isla", value: p.island || "—" },
                p.ref ? { label: "Referencia", value: p.ref } : null,
              ].filter(Boolean).map((item) => (
                <div key={item!.label} className="border-b border-neutral-100 pb-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1 font-light">{item!.label}</p>
                  <p className="text-sm font-light text-neutral-800 capitalize">{item!.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {p.features && p.features.length > 0 && (
            <>
              <div className="border-t border-neutral-200" />
              <div>
                <h2 className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-8 font-light">Características</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm font-light text-neutral-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-neutral-400 rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Map */}
          <div className="border-t border-neutral-200 pt-16">
            <h2 className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-6 font-light">Ubicación</h2>
            <p className="text-sm font-light text-neutral-500 mb-4">{location}</p>
            {p.latitude && p.longitude ? (
              <div className="w-full h-72 rounded overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${p.latitude},${p.longitude}&z=14&output=embed`}
                />
              </div>
            ) : (
              <div className="w-full h-72 bg-neutral-100 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location + ", España")}&z=13&output=embed`}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — contact form sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 border border-neutral-200 p-8">
            <p className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-1 font-light">Solicitar información</p>
            <h3 className="text-xl font-extralight text-neutral-900 mb-8">{p.title_es}</h3>

            <div className="space-y-4">
              {[
                { id: "name", label: "Nombre", type: "text", placeholder: "Su nombre" },
                { id: "email", label: "Email", type: "email", placeholder: "correo@ejemplo.com" },
                { id: "phone", label: "Teléfono", type: "tel", placeholder: "+34 600 000 000" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1 font-light">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full border-b border-neutral-200 py-2 text-sm font-light text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 bg-transparent transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1 font-light">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  placeholder="Me interesa esta propiedad..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-b border-neutral-200 py-2 text-sm font-light text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 bg-transparent transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-neutral-900 text-white text-xs tracking-[0.25em] uppercase py-4 font-light hover:bg-neutral-700 transition-colors mt-4">
                Enviar consulta
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1 font-light">Contacto directo</p>
              <a href="tel:+34971000000" className="text-sm font-light text-neutral-700 hover:text-neutral-900">
                +34 971 000 000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <X size={28} />
          </button>
          <button
            onClick={prevLightbox}
            className="absolute left-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={nextLightbox}
            className="absolute right-16 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight size={40} />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto px-20 py-12">
            <Image
              src={images[lightboxIndex]}
              alt={p.title_es}
              fill
              className="object-contain"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest font-light">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
