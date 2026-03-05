import React from "react";
import Image from "next/image";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ServiceForm from "@/components/service-form";

export default function BarcosPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative w-full" style={{ height: "60vh", minHeight: 400 }}>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/shutterstock_132171413-resized-1772721652084.jpg"
          alt="Alquiler de barcos en Ibiza"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/60 mb-3">Yates · Veleros · Catamaranes</span>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            Alquiler de Barcos
          </h1>
        </div>
      </div>

      {/* Content + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Info */}
        <div className="bg-white px-10 py-16 lg:px-16 lg:py-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#888] mb-6">Ibiza desde el mar</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#0A0A0A] font-light leading-tight mb-8">
            Navega por las aguas<br />cristalinas del Mediterráneo
          </h2>
          <div className="space-y-4 text-[14px] text-[#555] leading-relaxed">
            <p>Descubre Ibiza desde una perspectiva única a bordo de una embarcación de lujo. Ofrecemos una selección exclusiva de yates, veleros y catamaranes para todos los gustos y ocasiones.</p>
            <p>Nuestras embarcaciones están equipadas con todo lo necesario para una experiencia perfecta: equipo de snorkel, paddle surf, música, catering a bordo y tripulación profesional.</p>
            <p>Explora calas secretas, practica deportes acuáticos o simplemente relájate bajo el sol ibicenco. Disponible por días, medios días o semanas completas.</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {["Yates de motor", "Veleros clásicos", "Catamaranes", "Barcos de pesca"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[12px] text-[#333] uppercase tracking-[0.15em]">
                <span className="w-4 h-px bg-[#002FA7]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <ServiceForm service="barcos" showDate />
      </div>

      <Footer />
    </>
  );
}
