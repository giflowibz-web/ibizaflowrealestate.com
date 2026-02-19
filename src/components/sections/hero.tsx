"use client";

import { useLang } from '@/lib/i18n';

const HERO_VIDEO = 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_25fps.mp4';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80';

const HeroSection = () => {
  const { lang } = useLang();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src={FALLBACK_IMAGE}
          alt="Ibiza"
          className="absolute inset-0 h-full w-full object-cover opacity-85"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-85"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-white/40" />
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-white/60">
            {lang === 'es' ? 'Propiedades Exclusivas · Ibiza' : 'Exclusive Properties · Ibiza'}
          </p>
          <div className="h-px w-8 bg-white/40" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="relative h-10 w-[1px] overflow-hidden bg-white/15">
          <div className="absolute left-0 top-0 h-full w-full -translate-y-full animate-[scroll-hint_2.5s_infinite] bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
