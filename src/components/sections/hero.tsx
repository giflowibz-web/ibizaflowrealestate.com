"use client";

import { useLang } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=85';

const HeroSection = () => {
  const { lang } = useLang();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'hero_video_url')
      .single()
      .then(({ data }) => {
        if (data?.value) setVideoUrl(data.value);
      });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src={FALLBACK_IMAGE}
          alt="Ibiza"
          className="h-full w-full object-cover"
          style={{ opacity: videoLoaded ? 0 : 0.85, transition: 'opacity 0.8s ease' }}
        />
        {videoUrl && (
          <video
            key={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: videoLoaded ? 0.85 : 0, transition: 'opacity 0.8s ease' }}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Tagline minimalista — solo esto */}
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
        <div className="relative h-10 w-[1px] overflow-hidden bg-white/15">
          <div className="absolute left-0 top-0 h-full w-full -translate-y-full animate-[scroll-hint_2.5s_infinite] bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
