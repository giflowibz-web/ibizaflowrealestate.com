import React from "react";
import Image from "next/image";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ServiceForm from "@/components/service-form";

export default function CochesPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative w-full" style={{ height: "60vh", minHeight: 400 }}>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/shutterstock_1725068512-resized-1772721651186.jpg"
          alt="Coches de lujo en Ibiza"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/60 mb-3">Alquiler · Traslados</span>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            Coches de Lujo
          </h1>
        </div>
      </div>

      {/* Content + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Info */}
        <div className="bg-white px-10 py-16 lg:px-16 lg:py-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#888] mb-6">La flota más exclusiva</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#0A0A0A] font-light leading-tight mb-8">
            Conduce lo mejor<br />de Ibiza
          </h2>
          <div className="space-y-4 text-[14px] text-[#555] leading-relaxed">
            <p>Pon el mejor complemento a tu estancia en Ibiza con nuestra flota de vehículos de lujo. Desde supercars hasta SUVs de alta gama, tenemos el coche perfecto para cada ocasión.</p>
            <p>Ferrari, Lamborghini, McLaren, Porsche, Bentley, Range Rover... Todos nuestros vehículos están en perfecto estado y disponibles con o sin conductor.</p>
            <p>Servicio de entrega y recogida en el aeropuerto, puerto o en tu alojamiento. Disponible por días o semanas con tarifas personalizadas.</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {["Ferrari · Lamborghini", "Porsche · McLaren", "Bentley · Rolls-Royce", "Entrega a domicilio"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[12px] text-[#333] uppercase tracking-[0.15em]">
                <span className="w-4 h-px bg-[#002FA7]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <ServiceForm service="coches" showDate />
      </div>

      <Footer />
    </>
  );
}
