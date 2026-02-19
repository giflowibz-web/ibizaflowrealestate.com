"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Bed, Bath, Maximize, MapPin } from "lucide-react";
import Link from "next/link";
import { type Property } from "@/lib/supabase";

export function PropertyDetail({ property }: { property: Property }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const images: string[] = property.images || [];
  const title = property.title_es || property.title_en || "";
  const description = property.description_es || property.description_en || "";
  const location = [property.area, property.municipality].filter(Boolean).join(", ");
  const price = property.price_on_request
    ? "Precio a consultar"
    : property.price
    ? `€${property.price.toLocaleString("es-ES")}`
    : "";
  const beds = property.bedrooms;
  const baths = property.bathrooms;
  const sqm = property.size_built;
  const plot = property.size_plot;
  const features: string[] = property.features || [];

  const next = () => setCurrentImage((p) => (p + 1) % images.length);
  const prev = () => setCurrentImage((p) => (p - 1 + images.length) % images.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* ── STICKY HEADER ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/propiedades" className="text-neutral-400 text-xs tracking-widest uppercase hover:text-black transition-colors">
              ← Propiedades
            </Link>
            <span className="w-px h-4 bg-neutral-200" />
            <span className="text-black font-light text-sm tracking-wide">{title}</span>
          </div>
          <span className="text-black text-sm font-light tracking-wide">{price}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-neutral-900">
        {images[currentImage] ? (
          <Image
            src={images[currentImage]}
            alt={title}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}

        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

        {/* top-left: back + status */}
        <div className="absolute top-8 left-8 flex items-center gap-4">
          <Link
            href="/propiedades"
            className="text-white/70 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
          >
            ← Volver
          </Link>
          {property.status && (
            <span className="px-3 py-1 border border-white/40 text-white text-[10px] tracking-[0.3em] uppercase">
              {property.status === "available" ? "Disponible" : property.status}
            </span>
          )}
        </div>

        {/* bottom: title + price */}
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-14 flex items-end justify-between">
          <div className="max-w-2xl">
            {location && (
              <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            )}
            <h1 className="text-white text-4xl md:text-6xl font-extralight leading-[1.1] tracking-tight">
              {title}
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-1">Precio</p>
            <p className="text-white text-3xl font-extralight">{price}</p>
          </div>
        </div>

        {/* image nav */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowGallery(true)}
              className="absolute bottom-14 right-10 text-white/60 text-[10px] tracking-[0.25em] uppercase hover:text-white transition-colors hidden md:block"
            >
              Ver todas las fotos ({images.length})
            </button>
          </>
        )}
      </div>

      {/* ── STATS BAR ── */}
      <div className="border-b border-neutral-100 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-10 py-8 flex flex-wrap gap-12">
          {!!beds && (
            <div className="flex items-center gap-3">
              <Bed className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-black text-xl font-extralight">{beds}</p>
                <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase">Habitaciones</p>
              </div>
            </div>
          )}
          {!!baths && (
            <div className="flex items-center gap-3">
              <Bath className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-black text-xl font-extralight">{baths}</p>
                <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase">Baños</p>
              </div>
            </div>
          )}
          {!!sqm && (
            <div className="flex items-center gap-3">
              <Maximize className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-black text-xl font-extralight">{sqm} m²</p>
                <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase">Construido</p>
              </div>
            </div>
          )}
          {!!plot && plot > 0 && (
            <div>
              <p className="text-black text-xl font-extralight">{plot.toLocaleString("es-ES")} m²</p>
              <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase">Parcela</p>
            </div>
          )}
          {!!property.year_built && (
            <div>
              <p className="text-black text-xl font-extralight">{property.year_built}</p>
              <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase">Año</p>
            </div>
          )}
        </div>
      </div>

      {/* ── BODY: description + contact ── */}
      <div className="max-w-screen-xl mx-auto px-10 py-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20">
        {/* left */}
        <div>
          <p className="text-neutral-400 text-[10px] tracking-[0.3em] uppercase mb-6">Sobre la propiedad</p>
          <p className="text-neutral-700 text-lg font-light leading-[1.9]">{description}</p>

          {features.length > 0 && (
            <div className="mt-16">
              <p className="text-neutral-400 text-[10px] tracking-[0.3em] uppercase mb-8">Características</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {features.map((f, i) => (
                  <div key={i} className="py-3 border-b border-neutral-100 flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                    <span className="text-neutral-600 text-sm font-light">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map placeholder */}
          {location && (
            <div className="mt-16">
              <p className="text-neutral-400 text-[10px] tracking-[0.3em] uppercase mb-6">Ubicación</p>
              <div className="w-full h-72 bg-neutral-100 flex items-center justify-center border border-neutral-200">
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-neutral-300 mx-auto mb-2" />
                  <p className="text-neutral-400 text-sm font-light">{location}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* right: contact */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="border border-neutral-200 p-8">
            <p className="text-neutral-400 text-[10px] tracking-[0.3em] uppercase mb-2">Contacto</p>
            <h3 className="text-black text-2xl font-extralight mb-8">Solicitar visita privada</h3>
            <ContactForm propertyTitle={title} />
          </div>
        </div>
      </div>

      {/* ── GALLERY GRID ── */}
      {images.length > 1 && (
        <div className="bg-neutral-50 py-20">
          <div className="max-w-screen-xl mx-auto px-10">
            <p className="text-neutral-400 text-[10px] tracking-[0.3em] uppercase mb-10">Galería</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden cursor-pointer group ${
                    i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                  onClick={() => { setCurrentImage(i); setShowGallery(true); }}
                >
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── GALLERY MODAL ── */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="relative w-[85vw] h-[80vh]">
            <Image
              src={images[currentImage]}
              alt={`${title} ${currentImage + 1}`}
              fill
              unoptimized
              className="object-contain"
              sizes="85vw"
            />
          </div>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em]">
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
      <div className="py-8 text-center">
        <p className="text-black text-lg font-extralight">Mensaje enviado</p>
        <p className="text-neutral-400 text-sm mt-1">Nos pondremos en contacto pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { key: "name", label: "Nombre completo", type: "text", required: true },
        { key: "email", label: "Correo electrónico", type: "email", required: true },
        { key: "phone", label: "Teléfono", type: "tel", required: false },
      ].map(({ key, label, type, required }) => (
        <input
          key={key}
          type={type}
          placeholder={label}
          required={required}
          value={form[key as keyof typeof form]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="w-full border-b border-neutral-200 bg-transparent py-3 text-sm font-light text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
        />
      ))}
      <textarea
        placeholder="Mensaje (opcional)"
        rows={3}
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        className="w-full border-b border-neutral-200 bg-transparent py-3 text-sm font-light text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-black text-white text-[11px] tracking-[0.3em] uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50 mt-2"
      >
        {loading ? "Enviando..." : "Enviar consulta"}
      </button>
      <a
        href="tel:+34600000000"
        className="block w-full py-4 border border-neutral-200 text-black text-[11px] tracking-[0.3em] uppercase text-center hover:border-black transition-colors"
      >
        Llamar
      </a>
    </form>
  );
}
