"use client";

import React, { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { properties, type Property } from "@/data/properties";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { ChevronLeft, ChevronRight, X, Bed, Bath, Maximize, MapPin, Calendar } from "lucide-react";

function PropertyDetail({ property }: { property: Property }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <>
      <Navbar />

      {/* Hero Gallery */}
      <section className="relative h-[70vh] md:h-[85vh] bg-black">
        <Image
          src={property.images[currentImage]}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        {/* Gallery Controls */}
        <div className="absolute bottom-0 left-0 right-0 px-[6%] pb-10 flex items-end justify-between">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#002FA7] text-white text-[11px] uppercase tracking-[0.2em] font-bold mb-4">
              {property.status}
            </span>
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1]">
              {property.title}
            </h1>
            <p className="text-white/70 text-lg md:text-xl mt-3 font-body flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {property.address}
            </p>
          </div>

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
              Ver Galeria ({property.images.length})
            </button>
          </div>
        </div>

        {/* Mobile gallery dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {property.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentImage ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Price & Stats Bar */}
      <section className="bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-[6%] py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold mb-1">
              Precio
            </p>
            <p className="text-white text-3xl md:text-4xl font-serif">
              {property.price}
            </p>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-[#002FA7]" />
              <div>
                <p className="text-white text-xl font-bold">{property.beds}</p>
                <p className="text-white/50 text-[12px] uppercase tracking-wider">Habitaciones</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bath className="w-5 h-5 text-[#002FA7]" />
              <div>
                <p className="text-white text-xl font-bold">{property.baths}</p>
                <p className="text-white/50 text-[12px] uppercase tracking-wider">Banos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Maximize className="w-5 h-5 text-[#002FA7]" />
              <div>
                <p className="text-white text-xl font-bold">{property.sqm} m&sup2;</p>
                <p className="text-white/50 text-[12px] uppercase tracking-wider">Superficie</p>
              </div>
            </div>
            {property.lotSqm && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#002FA7]" />
                <div>
                  <p className="text-white text-xl font-bold">{property.lotSqm.toLocaleString()} m&sup2;</p>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider">Parcela</p>
                </div>
              </div>
            )}
            {property.yearBuilt && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#002FA7]" />
                <div>
                  <p className="text-white text-xl font-bold">{property.yearBuilt}</p>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider">Ano</p>
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
            {/* Description */}
            <div className="lg:col-span-3">
              <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
                Descripcion
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-8 text-black">
                Sobre esta propiedad
              </h2>
              <p className="text-[#333] text-[17px] leading-[1.9] font-body">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="lg:col-span-2">
              <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
                Caracteristicas
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-8 text-black">
                Destacadas
              </h2>
              <ul className="space-y-4">
                {property.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#333] text-[15px] font-body"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002FA7] mt-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="bg-[#F5F5F5] py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-[6%]">
          <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
            Galeria
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-4 mb-12 text-black">
            Imagenes de la propiedad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                onClick={() => {
                  setCurrentImage(i);
                  setShowGallery(true);
                }}
              >
                <Image
                  src={img}
                  alt={`${property.title} - Imagen ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-black py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-[6%] text-center">
          <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
            Interesado?
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 mb-6 text-white">
            Solicita una visita privada
          </h2>
          <p className="text-white/60 text-lg font-body max-w-2xl mx-auto mb-10">
            Nuestro equipo de expertos te acompanara en una visita exclusiva a esta propiedad.
            Contactanos para agendar tu cita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+34971000000"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#002FA7] text-white text-[14px] uppercase tracking-[0.15em] font-bold hover:bg-[#001f73] transition-colors"
            >
              Llamar Ahora
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-[14px] uppercase tracking-[0.15em] font-bold hover:bg-white/10 transition-colors"
            >
              Enviar Consulta
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
              src={property.images[currentImage]}
              alt={`${property.title} - Imagen ${currentImage + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body tracking-wider">
            {currentImage + 1} / {property.images.length}
          </div>
        </div>
      )}
    </>
  );
}

export default function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}
