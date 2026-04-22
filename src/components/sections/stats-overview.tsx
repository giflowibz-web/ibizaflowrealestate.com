"use client";

import React from 'react';
import { useLang } from '@/lib/i18n';

const StatsOverview: React.FC = () => {
  const { t } = useLang();

  const stats = [
      { value: '20+', label: t.stats.years },
      { value: '98%', label: t.stats.clients },
    ];

  return (
    <section className="bg-white py-24 md:py-32 border-t border-[#E5E0D8]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: text */}
          <div>
            <span className="text-[#1847E8] text-[11px] uppercase tracking-[0.3em] font-bold block mb-5">
              Ibiza Flow Real Estate
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] leading-[1.05] mb-8">
              {t.stats.title}
            </h2>
            <p className="font-body text-[#666] text-[15px] leading-relaxed max-w-md">
              {t.stats.subtitle}
            </p>
          </div>

          {/* Right: stats */}
            <div className="grid grid-cols-2 gap-0 border border-[#E5E0D8]">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center py-10 px-4 text-center ${
                  i < stats.length - 1 ? 'border-r border-[#E5E0D8]' : ''
                }`}
              >
                <span className="font-display text-4xl md:text-5xl text-[#0A0A0A] leading-none mb-3">
                  {stat.value}
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-[#999]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
