"use client";

import React from "react";
import { MoveRight } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534008897995-27a23e859048?w=1200&q=80')`,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backgroundBlendMode: 'overlay'
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex items-center justify-center py-24 md:py-32 px-[6%]">
        <div className="w-full max-w-[680px] bg-[#0A0A0A] p-10 md:p-16 text-center">
          <div className="flex flex-col items-center space-y-6">
            <span className="text-accent-caps text-[10px] tracking-[0.3em]">Unete</span>

            <h2 className="font-display text-white text-3xl md:text-[42px] leading-tight tracking-wide uppercase">
              Lista Exclusiva
            </h2>

            <p className="text-[#A3A3A3] font-body text-sm leading-relaxed max-w-[500px]">
              Recibe acceso anticipado a propiedades exclusivas, actualizaciones del mercado inmobiliario de Ibiza y contenido VIP directamente en tu correo.
            </p>

            <form className="w-full mt-8 space-y-8 text-left">
              <div className="relative group">
                <label className="block text-white text-[11px] font-body uppercase tracking-[0.1em] mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-white font-body focus:outline-none focus:border-[#002FA7] transition-colors duration-300"
                />
              </div>

              <div className="relative group">
                <label className="block text-white text-[11px] font-body uppercase tracking-[0.1em] mb-1">
                  Telefono *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-white font-body focus:outline-none focus:border-[#002FA7] transition-colors duration-300"
                />
              </div>

              <div className="relative group">
                <label className="block text-white text-[11px] font-body uppercase tracking-[0.1em] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-[#333333] py-2 text-white font-body focus:outline-none focus:border-[#002FA7] transition-colors duration-300"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="relative flex items-center h-5">
                  <input
                    id="consent"
                    type="checkbox"
                    className="w-4 h-4 rounded-none bg-transparent border-[#333333] text-accent focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                </div>
                <label htmlFor="consent" className="text-[10px] text-[#737373] leading-relaxed font-body">
                  Acepto ser contactado por Ibiza Flow Real Estate por telefono, email y mensaje para servicios inmobiliarios. Puedes darte de baja en cualquier momento.{" "}
                  <a href="#" className="underline hover:text-white transition-colors">Politica de Privacidad</a>.
                </label>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="group relative flex items-center justify-center gap-4 bg-[#002FA7] text-white px-10 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-125"
                >
                  ENVIAR
                  <MoveRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
