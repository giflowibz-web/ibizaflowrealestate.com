"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Bed, Bath, Maximize, MapPin } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { useLang } from "@/lib/i18n";
import { type Property as SupabaseProperty } from "@/lib/supabase";

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
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const images: string[] = isSupabase(property) ? property.images || [] : property.images || [];

  const title = isSupabase(property)
    ? lang === "en" ? property.title_en || property.title_es : property.title_es || property.title_en
    : (property as LocalProperty).title;

  const description = isSupabase(property)
    ? lang === "en" ? property.description_en || property.description_es : property.description_es || property.description_en
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

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setStickyVisible(window.scrollY > heroRef.current.offsetHeight * 0.7);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* Sticky stats bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5E0D8] transition-all duration-500 ${
          stickyVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ paddingTop: "64px" }}
      >
        <div className="max-w-[1400px] mx-auto px-[6%] py-4 flex items-center justify-between gap-6">
          <div>
            <p className="text-black font-serif text-lg leading-tight">{title}</p>
            <p className="text-[#888] text-[12px] tracking-wider">{address}</p>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {beds && <span className="text-[13px] text-[#333] font-body"><strong>{beds}</strong> {t.property.beds}</span>}
            {baths && <span className="text-[13px] text-[#333] font-body"><strong>{baths}</strong> {t.property.baths}</span>}
            {sqm && <span className="text-[13px] text-[#333] font-body"><strong>{sqm}</strong> m²</span>}
          </div>
          <p className="text-black font-serif text-xl">{price}</p>
        </div>
      </div>

      {/* Hero — fullscreen image */}
      <section ref={heroRef} className="relative h-screen bg-black">
        {images[currentImage] ? (
          <Image
            src={images[currentImage]}
            alt={title || ""}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Bottom overlay: status + title + price */}
        <div className="absolute bottom-0 left-0 right-0 px-[6%] pb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              {status && (
                <span className="inline-block px-4 py-1.5 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-bold mb-5">
                  {status}
                </span>
              )}
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.05] max-w-3xl">
                {title}
              </h1>
              {address && (
                <p className="text-white/60 text-base mt-4 flex items-center gap-2 font-body">
                  <MapPin className="w-4 h-4" />
                  {address}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[12px] uppercase tracking-[0.2em] mb-1 font-body">
                {lang === "en" ? "Price" : "Precio"}
              </p>
              <p className="text-white text-3xl md:text-4xl font-serif">{price}</p>
            </div>
          </div>
        </div>

        {/* Gallery controls */}
        {images.length > 1 && (
          <div className="absolute right-8 bottom-16 hidden md:flex items-center gap-3">
            <button onClick={prevImage} className="w-11 h-11 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="w-11 h-11 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowGallery(true)}
              className="ml-2 px-5 py-2.5 border border-white/30 text-white text-[12px] uppercase tracking-[0.15em] font-bold hover:bg-white/10 transition-colors"
            >
              {lang === "en" ? "All photos" : "Ver fotos"} ({images.length})
            </button>
          </div>
        )}
      </section>

      {/* Stats bar */}
      <section className="bg-[#F9F7F4] border-b border-[#E5E0D8]">
        <div className="max-w-[1400px] mx-auto px-[6%] py-8 flex flex-wrap gap-10 md:gap-16">
          {beds && (
            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-black text-2xl font-serif">{beds}</p>
                <p className="text-[#888] text-[11px] uppercase tracking-wider font-body">{t.property.beds}</p>
              </div>
            </div>
          )}
          {baths && (
            <div className="flex items-center gap-3">
              <Bath className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-black text-2xl font-serif">{baths}</p>
                <p className="text-[#888] text-[11px] uppercase tracking-wider font-body">{t.property.baths}</p>
              </div>
            </div>
          )}
          {sqm && (
            <div className="flex items-center gap-3">
              <Maximize className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-black text-2xl font-serif">{sqm} m²</p>
                <p className="text-[#888] text-[11px] uppercase tracking-wider font-body">{t.property.sqm}</p>
              </div>
            </div>
          )}
          {lotSqm && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#888]" />
              <div>
                <p className="text-black text-2xl font-serif">{lotSqm.toLocaleString()} m²</p>
                <p className="text-[#888] text-[11px] uppercase tracking-wider font-body">{lang === "en" ? "Plot" : "Parcela"}</p>
              </div>
            </div>
          )}
          {yearBuilt && (
            <div>
              <p className="text-black text-2xl font-serif">{yearBuilt}</p>
              <p className="text-[#888] text-[11px] uppercase tracking-wider font-body">{lang === "en" ? "Year Built" : "Año construcción"}</p>
            </div>
          )}
        </div>
      </section>

      {/* Description + Contact sidebar */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-[6%]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24">

            {/* Left: description + features */}
            <div>
              <p className="text-[#888] text-[11px] uppercase tracking-[0.25em] font-body mb-4">
                {lang === "en" ? "About this property" : "Sobre esta propiedad"}
              </p>
              <p className="text-black text-[17px] leading-[2] font-body whitespace-pre-line text-[#444]">
                {description}
              </p>

              {features.length > 0 && (
                <div className="mt-16">
                  <p className="text-[#888] text-[11px] uppercase tracking-[0.25em] font-body mb-8">
                    {lang === "en" ? "Features & Amenities" : "Características y Servicios"}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 py-3 border-b border-[#F0EDE8]">
                        <span className="w-px h-4 bg-black shrink-0" />
                        <span className="text-[#333] text-[14px] font-body">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: contact form */}
            <div className="lg:sticky lg:top-28 self-start">
              <div className="border border-[#E5E0D8] p-8">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#888] font-body mb-2">
                  {lang === "en" ? "Interested?" : "¿Interesado?"}
                </p>
                <h3 className="font-serif text-2xl text-black mb-6">
                  {lang === "en" ? "Request a private viewing" : "Solicita una visita privada"}
                </h3>
                <ContactForm lang={lang} propertyTitle={title || ""} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      {images.length > 1 && (
        <section className="bg-[#F9F7F4] py-20 md:py-32">
          <div className="max-w-[1400px] mx-auto px-[6%]">
            <p className="text-[#888] text-[11px] uppercase tracking-[0.25em] font-body mb-12">
              {lang === "en" ? "Gallery" : "Galería"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden cursor-pointer group ${i === 0 ? "col-span-2 row-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}
                  onClick={() => { setCurrentImage(i); setShowGallery(true); }}
                >
                  <Image
                    src={img}
                    alt={`${title} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Fullscreen gallery modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white hover:opacity-60 transition-opacity"
          >
            <X className="w-7 h-7" />
          </button>
          <button onClick={prevImage} className="absolute left-4 md:left-8 z-10 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
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
          <button onClick={nextImage} className="absolute right-4 md:right-8 z-10 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-body tracking-widest">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

function ContactForm({ lang, propertyTitle }: { lang: string; propertyTitle: string }) {
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
      <div className="text-center py-8">
        <p className="font-serif text-xl text-black mb-2">
          {lang === "en" ? "Message sent" : "Mensaje enviado"}
        </p>
        <p className="text-[#888] text-sm font-body">
          {lang === "en" ? "We'll be in touch shortly." : "Nos pondremos en contacto pronto."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder={lang === "en" ? "Full name" : "Nombre completo"}
        required
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className="w-full border-b border-[#E5E0D8] bg-transparent py-3 text-[14px] font-body text-black placeholder-[#aaa] focus:outline-none focus:border-black transition-colors"
      />
      <input
        type="email"
        placeholder={lang === "en" ? "Email address" : "Correo electrónico"}
        required
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="w-full border-b border-[#E5E0D8] bg-transparent py-3 text-[14px] font-body text-black placeholder-[#aaa] focus:outline-none focus:border-black transition-colors"
      />
      <input
        type="tel"
        placeholder={lang === "en" ? "Phone number" : "Teléfono"}
        value={form.phone}
        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        className="w-full border-b border-[#E5E0D8] bg-transparent py-3 text-[14px] font-body text-black placeholder-[#aaa] focus:outline-none focus:border-black transition-colors"
      />
      <textarea
        placeholder={lang === "en" ? "Message" : "Mensaje"}
        rows={3}
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        className="w-full border-b border-[#E5E0D8] bg-transparent py-3 text-[14px] font-body text-black placeholder-[#aaa] focus:outline-none focus:border-black transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-black text-white text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-[#222] transition-colors disabled:opacity-50 mt-2"
      >
        {loading
          ? (lang === "en" ? "Sending..." : "Enviando...")
          : (lang === "en" ? "Send enquiry" : "Enviar consulta")}
      </button>
      <a
        href="tel:+34971000000"
        className="block w-full py-4 border border-[#E5E0D8] text-black text-[12px] uppercase tracking-[0.2em] font-bold text-center hover:border-black transition-colors"
      >
        {lang === "en" ? "Or call us" : "O llámanos"}
      </a>
    </form>
  );
}
