"use client";

import { useLang } from '@/lib/i18n';

const HeroSection = () => {
  const { lang } = useLang();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video fullscreen */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
          <source src="/hero-small.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro sutil */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Tagline abajo centrado */}
      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-white/40" />
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-white/60">
            {lang === 'es' ? 'Propiedades Exclusivas · Ibiza' : 'Exclusive Properties · Ibiza'}
          </p>
          <div className="h-px w-8 bg-white/40" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="relative h-10 w-[1px] overflow-hidden bg-white/20">
          <div className="absolute left-0 top-0 h-full w-full -translate-y-full animate-[scroll-hint_2.5s_infinite] bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
