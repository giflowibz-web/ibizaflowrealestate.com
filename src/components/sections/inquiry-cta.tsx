"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';
import { Phone, Mail, Send } from 'lucide-react';

const InquiryCTA = () => {
  const { t } = useLang();
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fields = [
    { id: "cta-name",  label: t.cta.name,  type: "text",  placeholder: "John Smith" },
    { id: "cta-email", label: t.cta.email, type: "email", placeholder: "john@example.com" },
    { id: "cta-phone", label: t.cta.phone, type: "tel",   placeholder: "+34 600 000 000" },
  ];

  return (
    <section id="contacto" className="relative w-full bg-white py-24 px-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 h-px bg-[#002FA7]" />
          <span className="text-[#002FA7] text-[10px] uppercase tracking-[0.35em] font-bold">{t.cta.tag}</span>
          <div className="w-8 h-px bg-[#002FA7]" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-[#0A0A0A] font-light leading-tight mb-4">
          {t.cta.title}
        </h2>
        <p className="text-[#0A0A0A]/40 text-[14px] leading-relaxed max-w-md mx-auto font-body">
          {t.cta.subtitle}
        </p>
      </div>

      {/* Card */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 bg-[#0A0A0A] overflow-hidden shadow-2xl">

        {/* Left: Image */}
        <div className="relative min-h-[380px] lg:min-h-[560px]">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/13048209_1209163009095942_677535093064324347_o-1771512577838.jpg?width=1200&height=800&resize=cover"
            alt="Piscina infinita con vistas a Es Vedrà, Ibiza"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Contact shortcuts on image */}
          <div className="absolute bottom-10 left-10 right-10">
            <div className="w-6 h-px bg-[#002FA7] mb-5" />
            <p className="font-display text-xl text-white font-light leading-tight mb-6">
              &ldquo;Ibiza no es solo un destino,<br />es un estilo de vida.&rdquo;
            </p>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+34600000000" className="group flex items-center gap-3">
                <div className="w-7 h-7 bg-white/10 flex items-center justify-center group-hover:bg-[#002FA7] transition-colors duration-200">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <span className="text-white/60 text-[12px] group-hover:text-white transition-colors">+34 600 000 000</span>
              </a>
              <a href="mailto:info@ibizaflowrealestate.com" className="group flex items-center gap-3">
                <div className="w-7 h-7 bg-white/10 flex items-center justify-center group-hover:bg-[#002FA7] transition-colors duration-200">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <span className="text-white/60 text-[12px] group-hover:text-white transition-colors">info@ibizaflowrealestate.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center px-8 py-12 lg:px-12">
          <div className="w-full max-w-[380px]">

            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-0">
                <p className="font-display text-2xl text-white font-light mb-8">Envíenos un mensaje</p>

                <div className="space-y-1 mb-4">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className={`relative border transition-colors duration-200 ${
                        focused === field.id ? "border-[#002FA7]/60 bg-[#002FA7]/5" : "border-white/8 bg-transparent"
                      }`}
                    >
                      <label htmlFor={field.id} className="block pt-3 px-4 text-[9px] uppercase tracking-[0.22em] font-bold text-white/25">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-transparent px-4 pb-3 pt-1 text-[13px] font-light text-white placeholder:text-white/15 outline-none"
                      />
                    </div>
                  ))}

                  <div className={`relative border transition-colors duration-200 ${
                    focused === "cta-msg" ? "border-[#002FA7]/60 bg-[#002FA7]/5" : "border-white/8 bg-transparent"
                  }`}>
                    <label htmlFor="cta-msg" className="block pt-3 px-4 text-[9px] uppercase tracking-[0.22em] font-bold text-white/25">
                      Mensaje
                    </label>
                    <textarea
                      id="cta-msg"
                      rows={3}
                      placeholder="Cuéntenos sobre su propiedad ideal…"
                      onFocus={() => setFocused("cta-msg")}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent px-4 pb-3 pt-1 text-[13px] font-light text-white placeholder:text-white/15 outline-none resize-none font-body"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group w-full bg-[#002FA7] hover:bg-[#0038cc] text-white px-8 py-4 text-[10px] uppercase tracking-[0.28em] font-bold transition-all duration-300 flex items-center justify-center gap-3 font-body"
                >
                  {t.cta.submit}
                  <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            ) : (
              <div className="border border-white/10 p-10 text-center">
                <div className="w-10 h-10 bg-[#002FA7]/15 border border-[#002FA7]/30 flex items-center justify-center mx-auto mb-6">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#002FA7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,9 7,14 16,4" />
                  </svg>
                </div>
                <p className="font-display text-2xl text-white font-light mb-3">Mensaje enviado</p>
                <p className="text-white/35 text-[12px] leading-relaxed">Un asesor se pondrá en contacto en menos de 24 horas.</p>
              </div>
            )}

          </div>
        </div>
      </div>

    </section>
  );
};

export default InquiryCTA;
