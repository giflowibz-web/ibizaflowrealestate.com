"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "real-estate",
    title: "Inmobiliaria",
    subtitle: "Compra · Venta · Alquiler",
    description: "Propiedades exclusivas en Ibiza. Asesoramiento personalizado para encontrar tu hogar ideal o la inversión perfecta.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/shutterstock_156056504-resized-1772721652442.jpg",
    href: "/propiedades",
    wide: true,
  },
  {
    id: "barcos",
    title: "Alquiler de Barcos",
    subtitle: "Yates · Veleros · Catamaranes",
    description: "Navega por las aguas cristalinas de Ibiza a bordo de una embarcación de lujo. Experiencias únicas en el Mediterráneo.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/shutterstock_132171413-resized-1772721652084.jpg",
    href: "/servicios/barcos",
    wide: false,
  },
  {
    id: "jets",
    title: "Jets Privados",
    subtitle: "Charter · Vuelos privados",
    description: "Viaja en privado con total comodidad. Flota de jets de alta gama para tus desplazamientos con la máxima discreción.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/jet-privado-1772721650493.jpeg",
    href: "/servicios/jets",
    wide: false,
  },
  {
    id: "coches",
    title: "Coches de Lujo",
    subtitle: "Alquiler · Traslados",
    description: "La flota más exclusiva de vehículos de lujo en Ibiza. Ferrari, Lamborghini, McLaren y más para tu estancia perfecta.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/shutterstock_1725068512-resized-1772721651186.jpg",
    href: "/servicios/coches",
    wide: false,
  },
];

const Services = () => {
  return (
    <section id="servicios" className="bg-white py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#888] font-medium block mb-4">
              Lo que ofrecemos
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#0A0A0A] leading-none font-light">
              Servicios
            </h2>
          </div>
        </div>

        {/* Servicio principal — ancho completo */}
        <Link href={services[0].href} className="group block mb-4 relative overflow-hidden bg-[#F0EDE8]" style={{ aspectRatio: "16/7" }}>
          <Image
            src={services[0].image}
            alt={services[0].title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/70 mb-3">{services[0].subtitle}</p>
            <h3 className="font-display text-3xl md:text-5xl font-light leading-none mb-4">{services[0].title}</h3>
            <p className="text-sm text-white/80 max-w-md leading-relaxed">{services[0].description}</p>
            <div className="mt-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-medium">
              Descubrir
              <span className="block w-8 h-px bg-white transition-all duration-300 group-hover:w-14" />
            </div>
          </div>
        </Link>

        {/* 3 servicios en grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.slice(1).map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group block relative overflow-hidden bg-[#F0EDE8]"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/70 mb-2">{service.subtitle}</p>
                <h3 className="font-display text-2xl md:text-3xl font-light leading-none mb-3">{service.title}</h3>
                <div className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-medium">
                  Solicitar
                  <span className="block w-6 h-px bg-white transition-all duration-300 group-hover:w-10" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
