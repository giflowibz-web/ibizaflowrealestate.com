"use client";

import React from 'react';
import { useLang } from '@/lib/i18n';

const StatsOverview: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="bg-white section-spacing" aria-labelledby="stats-heading">
      <div className="container">
        <div className="max-w-[900px] mx-auto text-center mb-16 lg:mb-24">
          <span className="text-accent-caps mb-6 block">Ibiza Flow Real Estate</span>
          <h2 id="stats-heading" className="text-section-title font-serif italic mb-8">
            {t.stats.title}
          </h2>
          <p className="font-body text-foreground text-lg lg:text-xl leading-relaxed max-w-[760px] mx-auto opacity-80">
            {t.stats.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[3.75rem] lg:text-[5rem] font-bold font-body leading-none mb-4 tracking-tight">250+</h3>
            <p className="font-serif italic text-xl lg:text-2xl text-foreground">{t.stats.properties}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[3.75rem] lg:text-[5rem] font-bold font-body leading-none mb-4 tracking-tight">15+</h3>
            <p className="font-serif italic text-xl lg:text-2xl text-foreground">{t.stats.years}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[3.75rem] lg:text-[5rem] font-bold font-body leading-none mb-4 tracking-tight">98%</h3>
            <p className="font-serif italic text-xl lg:text-2xl text-foreground">{t.stats.clients}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
