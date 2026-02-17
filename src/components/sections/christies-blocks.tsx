"use client";

import React from 'react';
import { useLang } from '@/lib/i18n';

const ChristiesBlocks: React.FC = () => {
  const { t } = useLang();

  const services = [
    { title: t.christies.buy_title, desc: t.christies.buy_desc },
    { title: t.christies.sell_title, desc: t.christies.sell_desc },
    { title: t.christies.invest_title, desc: t.christies.invest_desc },
    { title: t.christies.manage_title, desc: t.christies.manage_desc },
  ];

  return (
    <section id="servicios" className="bg-[#F7F5F2] section-spacing">
      <div className="container">
        <div className="mb-16 md:mb-24">
          <span className="text-accent-caps block mb-4">{t.christies.tag}</span>
          <h2 className="text-section-title text-foreground">{t.christies.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-border">
          {services.map((service, index) => (
            <div
              key={index}
              className="border-b md:border-b-0 md:border-r border-border last:border-r-0 p-8 lg:p-10 flex flex-col group hover:bg-white transition-colors duration-300"
            >
              <div className="mb-auto">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mb-6 block">
                  0{index + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-5 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border/50">
                <a
                  href="#contacto"
                  className="text-[11px] uppercase tracking-[0.18em] font-bold text-foreground group-hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  {t.christies.cta}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChristiesBlocks;
