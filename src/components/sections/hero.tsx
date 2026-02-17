"use client";

import React, { useState } from 'react';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Poster image while video loads */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1920&q=80)',
            opacity: videoLoaded ? 0 : 1,
          }}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className="h-full w-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
        >
          {/* Ibiza coastline / Mediterranean aerial */}
          {/* Mediterranean coast aerial */}
          <source
            src="https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>
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
