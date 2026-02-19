"use client";

import React from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const InquiryCTA = () => {
  const { t } = useLang();

  return (
    <section id="contacto" className="relative w-full overflow-hidden">
      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Left: Image */}
        <div className="relative min-h-[400px] lg:min-h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1468413253725-0d5181091126?w=1200&q=80"
            alt="Ibiza luxury sunset"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right: Content */}
        <div className="bg-[#0A0A0A] flex items-center justify-center px-10 py-20 lg:px-16 lg:py-24">
          <div className="max-w-md w-full">
            <span className="text-[#002FA7] text-[11px] uppercase tracking-[0.3em] font-bold block mb-6">
              {t.cta.tag}
            </span>

            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
              {t.cta.title}
            </h2>

            <p className="font-body text-white/50 text-[14px] leading-relaxed mb-10">
              {t.cta.subtitle}
            </p>

            {/* Contact options */}
            <div className="space-y-4 mb-10">
              <a
                href="tel:+34600000000"
                className="group flex items-center gap-4 p-4 border border-white/10 hover:border-[#002FA7] transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-[#002FA7]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#002FA7] transition-colors duration-300">
                  <Phone className="w-4 h-4 text-[#002FA7] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-body mb-0.5">
                    {t.cta.phone}
                  </p>
                  <p className="text-white text-[14px] font-body">+34 600 000 000</p>
                </div>
              </a>

              <a
                href="mailto:info@ibizaflowrealestate.com"
                className="group flex items-center gap-4 p-4 border border-white/10 hover:border-[#002FA7] transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-[#002FA7]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#002FA7] transition-colors duration-300">
                  <Mail className="w-4 h-4 text-[#002FA7] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-body mb-0.5">
                    Email
                  </p>
                  <p className="text-white text-[14px] font-body">info@ibizaflowrealestate.com</p>
                </div>
              </a>
            </div>

            <a
              href="mailto:info@ibizaflowrealestate.com"
              className="group inline-flex items-center gap-3 bg-[#002FA7] text-white px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#0038c8] transition-colors duration-300 font-body"
            >
              {t.cta.submit}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryCTA;
