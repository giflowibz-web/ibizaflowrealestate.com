import React from "react";
import Image from "next/image";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ServiceForm from "@/components/service-form";

export default function JetsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative w-full" style={{ height: "60vh", minHeight: 400 }}>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/jet-privado-1772721650493.jpeg"
          alt="Jets privados en Ibiza"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/60 mb-3">Charter · Vuelos privados</span>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            Jets Privados
          </h1>
        </div>
      </div>

      {/* Content + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Info */}
        <div className="bg-white px-10 py-16 lg:px-16 lg:py-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#888] mb-6">Vuela en privado</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#0A0A0A] font-light leading-tight mb-8">
            La máxima discreción<br />y comodidad en cada vuelo
          </h2>
          <div className="space-y-4 text-[14px] text-[#555] leading-relaxed">
            <p>Viaja a Ibiza o desde Ibiza con total privacidad y comodidad a bordo de nuestra flota de jets privados de alta gama. Sin colas, sin esperas, en tus propios horarios.</p>
            <p>Contamos con acceso a una amplia flota de aeronaves para adaptarnos a tus necesidades, desde ligeros jets ejecutivos hasta grandes aviones para grupos.</p>
            <p>Servicio de catering gourmet, traslados en tierra, gestión de vuelos y atención personalizada 24/7 para que solo te preocupes de disfrutar.</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {["Jets ejecutivos", "Vuelos charter", "Grupos privados", "Servicio 24/7"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[12px] text-[#333] uppercase tracking-[0.15em]">
                <span className="w-4 h-px bg-[#002FA7]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <ServiceForm service="jets" showDate />
      </div>

      <Footer />
    </>
  );
}
