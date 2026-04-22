"use client";

import React from 'react';
import { useLang } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

const ChristiesBlocks: React.FC = () => {
  const { t } = useLang();

  const services = [
    { num: '01', title: t.christies.buy_title, desc: t.christies.buy_desc, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
    { num: '02', title: t.christies.sell_title, desc: t.christies.sell_desc, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80' },
    { num: '03', title: t.christies.invest_title, desc: t.christies.invest_desc, img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80' },
    { num: '04', title: t.christies.manage_title, desc: t.christies.manage_desc, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  ];

  return (
    <section id="servicios" className="bg-[#0A0A0A] py-28 md:py-36">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span className="text-[#002FA7] text-[11px] uppercase tracking-[0.3em] font-bold block mb-4">
              {t.christies.tag}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-none">
              {t.christies.title}
            </h2>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-[#0A0A0A] overflow-hidden cursor-pointer"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.img})` }}
              />

              <div className="relative p-10 lg:p-12 flex flex-col min-h-[280px]">
                <div className="flex items-start justify-between mb-auto">
                  <span className="text-[#002FA7] text-[11px] uppercase tracking-[0.3em] font-bold">
                    {service.num}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#002FA7] group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <div className="mt-8">
                  <h3 className="font-display text-3xl md:text-4xl text-white mb-4 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body text-white/40 text-[13px] leading-relaxed max-w-sm group-hover:text-white/70 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href="#contacto"
                    className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/40 group-hover:text-[#002FA7] transition-colors inline-flex items-center gap-2 font-body"
                  >
                    {t.christies.cta}
                    <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChristiesBlocks;
