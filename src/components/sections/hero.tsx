"use client";

import React, { useState } from 'react';

const HeroSection = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // YouTube video ID de Ibiza - vista aérea espectacular
  const youtubeId = 'ZNlElSZoMY8';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video via YouTube embed */}
      <div className="absolute inset-0 z-0">
        {/* Poster mientras carga el iframe */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1559827291-72fec5e96f4d?w=1920&q=80)',
            opacity: iframeLoaded ? 0 : 1,
          }}
        />
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          onLoad={() => setIframeLoaded(true)}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: '177.78vh',
            height: '56.25vw',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.50) 80%, rgba(0,0,0,0.80) 100%)',
          }}
        />
      </div>

      {/* Hero Content – centered like Aaron Kirman */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-5xl">
          {/* Small accent line */}
          <div className="mx-auto mb-6 h-[1px] w-12 bg-[#002FA7]" />

          <p
            className="font-body mb-4 text-[11px] uppercase tracking-[0.35em] text-white/70 sm:text-xs"
          >
            Ibiza Flow Real Estate
          </p>

          <h1
            className="font-display mb-6 uppercase tracking-[0.08em] text-white sm:mb-8"
            style={{
              fontSize: 'clamp(2.75rem, 7vw, 6.5rem)',
              lineHeight: '1.05',
              fontWeight: '400',
            }}
          >
            Tu Vida<br />en Ibiza
          </h1>

          <p
            className="font-body mx-auto max-w-xl text-white/80"
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
              lineHeight: '1.6',
              fontWeight: '300',
              letterSpacing: '0.03em',
            }}
          >
            Propiedades exclusivas en la isla mas deseada del Mediterraneo
          </p>

          {/* CTA Button */}
          <div className="mt-10 sm:mt-14">
            <a
              href="#propiedades"
              className="inline-block border border-white/40 px-10 py-4 text-[11px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#002FA7] hover:bg-[#002FA7] hover:text-white font-body"
            >
              Ver Propiedades
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-4">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/50">
            Descubre
          </span>
          <div className="relative h-14 w-[1px] overflow-hidden bg-white/20">
            <div className="absolute left-0 top-0 h-full w-full -translate-y-full animate-[scroll-hint_2.5s_infinite] bg-[#002FA7]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
