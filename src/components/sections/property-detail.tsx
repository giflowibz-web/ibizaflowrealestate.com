"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { useLang } from "@/lib/i18n";
import { type Property as SupabaseProperty } from "@/lib/supabase";

// Legacy local property type (fallback)
interface LocalProperty {
  id: string;
  slug: string;
  title: string;
  address: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  sqm: number;
  lotSqm?: number;
  yearBuilt?: number;
  description: string;
  features: string[];
  images: string[];
}

type AnyProperty = SupabaseProperty | LocalProperty;

function isSupabase(p: AnyProperty): p is SupabaseProperty {
  return "title_es" in p;
}

export function PropertyDetail({ property }: { property: AnyProperty }) {
  const { t, lang } = useLang();
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const images: string[] = isSupabase(property)
    ? property.images || []
    : property.images || [];

  const title = isSupabase(property)
    ? lang === "en"
      ? property.title_en || property.title_es
      : property.title_es || property.title_en
    : (property as LocalProperty).title;

  const description = isSupabase(property)
    ? lang === "en"
      ? property.description_en || property.description_es
      : property.description_es || property.description_en
    : (property as LocalProperty).description;

  const address = isSupabase(property)
    ? [property.area, property.municipality].filter(Boolean).join(", ")
    : (property as LocalProperty).address;

  const price = isSupabase(property)
    ? property.price_on_request
      ? lang === "en" ? "Price on request" : "Precio a consultar"
      : property.price ? `€${property.price.toLocaleString()}` : ""
    : (property as LocalProperty).price;

  const beds = isSupabase(property) ? property.bedrooms : (property as LocalProperty).beds;
  const baths = isSupabase(property) ? property.bathrooms : (property as LocalProperty).baths;
  const sqm = isSupabase(property) ? property.size_built : (property as LocalProperty).sqm;
  const lotSqm = isSupabase(property) ? property.size_plot : (property as LocalProperty).lotSqm;
  const yearBuilt = isSupabase(property) ? property.year_built : (property as LocalProperty).yearBuilt;
  const features: string[] = isSupabase(property) ? (property.features || []) : (property as LocalProperty).features;
  const status = property.status;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <Navbar />

      {/* Hero Gallery */}
      <section className="relative h-[70vh] md:h-[85vh] bg-black">
        {images[currentImage] ? (
          <Image
            src={images[currentImage]}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 px-[6%] pb-10 flex items-end justify-between">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#002FA7] text-white text-[11px] uppercase tracking-[0.2em] font-bold mb-4">
              {status}
            </span>
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1]">
              {title}
            </h1>
            <p className="text-white/70 text-lg md:text-xl mt-3 font-body flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {address}
            </p>
          </div>

          {images.length > 1 && (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={prevImage}
                className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowGallery(true)}
                className="ml-4 px-6 py-3 border border-white/30 text-white text-[13px] uppercase tracking-[0.15em] font-bold hover:bg-white/10 transition-colors"
              >
                {lang === "en" ? "Gallery" : "Galería"} ({images.length})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Price & Stats Bar */}
      <section className="bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-[6%] py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold mb-1">
              {lang === "en" ? "Price" : "Precio"}
            </p>
            <p className="text-white text-3xl md:text-4xl font-serif">{price}</p>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            {beds && (
              <div className="flex items-center gap-3">
                <Bed className="w-5 h-5 text-[#002FA7]" />
                <div>
                  <p className="text-white text-xl font-bold">{beds}</p>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider">{t.property.beds}</p>
                </div>
              </div>
            )}
            {baths && (
              <div className="flex items-center gap-3">
                <Bath className="w-5 h-5 text-[#002FA7]" />
                <div>
                  <p className="text-white text-xl font-bold">{baths}</p>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider">{t.property.baths}</p>
                </div>
              </div>
            )}
            {sqm && (
              <div className="flex items-center gap-3">
                <Maximize className="w-5 h-5 text-[#002FA7]" />
                <div>
                  <p className="text-white text-xl font-bold">{sqm} m²</p>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider">{t.property.sqm}</p>
                </div>
              </div>
            )}
            {lotSqm && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#002FA7]" />
                <div>
                  <p className="text-white text-xl font-bold">{lotSqm.toLocaleString()} m²</p>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider">
                    {lang === "en" ? "Plot" : "Parcela"}
                  </p>
                </div>
              </div>
            )}
            {yearBuilt && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#002FA7]" />
                <div>
                  <p className="text-white text-xl font-bold">{yearBuilt}</p>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider">
                    {lang === "en" ? "Year Built" : "Año"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description & Features */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            <div className="lg:col-span-3">
              <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
                {t.property.description}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-8 text-black">
                {lang === "en" ? "About this property" : "Sobre esta propiedad"}
              </h2>
              <p className="text-[#333] text-[17px] leading-[1.9] font-body whitespace-pre-line">
                {description}
              </p>
            </div>

            {features.length > 0 && (
              <div className="lg:col-span-2">
                <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
                  {t.property.features}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-8 text-black">
                  {lang === "en" ? "Highlights" : "Destacadas"}
                </h2>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#333] text-[15px] font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#002FA7] mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      {images.length > 1 && (
        <section className="bg-[#F5F5F5] py-20 md:py-32">
          <div className="max-w-[1400px] mx-auto px-[6%]">
            <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
              {lang === "en" ? "Gallery" : "Galería"}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-12 text-black">
              {lang === "en" ? "Property images" : "Imágenes de la propiedad"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                  onClick={() => { setCurrentImage(i); setShowGallery(true); }}
                >
                  <Image
                    src={img}
                    alt={`${title} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-black py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-[6%] text-center">
          <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
            {lang === "en" ? "Interested?" : "¿Interesado?"}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 mb-6 text-white">
            {lang === "en" ? "Request a private viewing" : "Solicita una visita privada"}
          </h2>
          <p className="text-white/60 text-lg font-body max-w-2xl mx-auto mb-10">
            {lang === "en"
              ? "Our team of experts will accompany you on an exclusive visit to this property. Contact us to schedule your appointment."
              : "Nuestro equipo de expertos te acompañará en una visita exclusiva a esta propiedad. Contáctanos para agendar tu cita."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+34971000000"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#002FA7] text-white text-[14px] uppercase tracking-[0.15em] font-bold hover:bg-[#001f73] transition-colors"
            >
              {lang === "en" ? "Call Now" : "Llamar Ahora"}
            </a>
            <a
              href="mailto:info@ibizaflow.com"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-[14px] uppercase tracking-[0.15em] font-bold hover:bg-white/10 transition-colors"
            >
              {t.property.submit}
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Fullscreen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white hover:text-[#002FA7] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative w-full h-full max-w-[90vw] max-h-[85vh] mx-auto">
            <Image
              src={images[currentImage]}
              alt={`${title} ${currentImage + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              unoptimized
            />
          </div>
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body tracking-wider">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
