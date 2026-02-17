"use client";

import React from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';

const InquiryCTA = () => {
  const { t } = useLang();

  return (
    <section id="contacto" className="relative w-full min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1468413253725-0d5181091126?w=1200&q=80"
          alt="Ibiza sunset luxury"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 luxury-overlay" />
      </div>

      <div className="container relative z-10 text-center max-w-[850px] px-6">
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          <span className="text-[#002FA7] text-sm font-bold uppercase tracking-[0.2em]">
            {t.cta.tag}
          </span>

          <h2 className="text-white text-section-title font-serif leading-tight">
            {t.cta.title}
          </h2>

          <p className="text-white/90 text-lg md:text-xl font-body font-normal leading-relaxed max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>

          <div className="pt-4">
            <a href="mailto:info@ibizaflow.com" className="btn-luxury group inline-flex items-center gap-2">
              {t.cta.submit}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryCTA;
