"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const { t, lang } = useLang();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/propiedades?q=${encodeURIComponent(search.trim())}`);
    } else {
      router.push('/propiedades');
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          poster="https://images.unsplash.com/photo-1559827291-72fec5e96f4d?w=1920&q=80"
        >
          <source src="/hero-small.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-5xl w-full">

          {/* Tag */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#002FA7]" />
            <p className="font-body text-[11px] uppercase tracking-[0.4em] text-white/60">
              {t.hero.tag}
            </p>
            <div className="h-px w-8 bg-[#002FA7]" />
          </div>

          {/* Title */}
          <h1
            className="font-display text-white mb-8 uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              lineHeight: '0.95',
              fontWeight: '400',
              letterSpacing: '-0.01em',
            }}
          >
            {t.hero.title1}
            <br />
            <span className="italic font-normal" style={{ fontStyle: 'italic' }}>
              {t.hero.title2}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-white/70 mb-12 mx-auto"
            style={{
              fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
              lineHeight: '1.7',
              fontWeight: '300',
              letterSpacing: '0.04em',
              maxWidth: '520px',
            }}
          >
            {t.hero.subtitle}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mx-auto mb-10 max-w-2xl">
            <div className="flex items-stretch bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-colors duration-300">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'es' ? 'Buscar por zona, tipo, precio...' : 'Search by area, type, price...'}
                className="flex-1 bg-transparent px-6 py-4 text-white placeholder-white/40 text-[13px] tracking-wide outline-none font-body"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#002FA7] px-7 py-4 text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#0038c8] transition-colors duration-300 font-body"
              >
                <Search size={14} strokeWidth={2} />
                {lang === 'es' ? 'Buscar' : 'Search'}
              </button>
            </div>
          </form>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              lang === 'es' ? 'Villas' : 'Villas',
              lang === 'es' ? 'Fincas' : 'Fincas',
              lang === 'es' ? 'Apartamentos' : 'Apartments',
              lang === 'es' ? 'Frente al Mar' : 'Sea Front',
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/propiedades?q=${encodeURIComponent(tag)}`)}
                className="px-4 py-2 border border-white/20 text-white/60 text-[11px] uppercase tracking-[0.18em] font-body hover:border-white/60 hover:text-white transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-12 w-[1px] overflow-hidden bg-white/15">
            <div className="absolute left-0 top-0 h-full w-full -translate-y-full animate-[scroll-hint_2.5s_infinite] bg-[#002FA7]" />
          </div>
          <span className="font-body text-[9px] uppercase tracking-[0.4em] text-white/35">
            {t.hero.scroll}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
