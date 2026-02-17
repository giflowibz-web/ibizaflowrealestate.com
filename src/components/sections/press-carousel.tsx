"use client";

import React from 'react';
import { useLang } from '@/lib/i18n';

const PressCarousel: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="bg-white section-spacing">
      <div className="container">
        <div className="mb-16 md:mb-24">
          <span className="text-accent-caps block mb-4">{t.press.tag}</span>
          <h2 className="text-section-title text-foreground">{t.press.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-x-12 md:gap-y-16">
          {t.press.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border-t border-border pt-10 group cursor-pointer transition-all duration-400"
            >
              <div className="flex flex-col mb-6">
                <span className="font-display text-2xl md:text-3xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.publication}
                </span>
                <time className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
                  {item.date}
                </time>
              </div>
              <h3 className="font-display text-xl md:text-2xl leading-snug text-foreground group-hover:opacity-80 transition-opacity">
                {item.headline}
              </h3>
              <div className="mt-auto pt-8">
                <span className="inline-block text-xs uppercase tracking-widest font-bold text-accent border-b border-transparent group-hover:border-accent transition-all">
                  {t.press.read}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a href="/prensa" className="btn-luxury px-12 py-5 text-sm transition-transform hover:-translate-y-1">
            {t.press.view_all}
          </a>
        </div>
      </div>

      <div className="container mt-32">
        <div className="h-px w-full bg-border/50"></div>
      </div>
    </section>
  );
};

export default PressCarousel;
