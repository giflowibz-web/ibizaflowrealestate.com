"use client";

import { useLang } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=85';

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

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={FALLBACK_IMAGE}
          alt="Ibiza"
          className="h-full w-full object-cover"
          style={{ opacity: videoLoaded ? 0 : 1, transition: 'opacity 1.2s ease' }}
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
            style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.2s ease' }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        {/* Overlay muy ligero */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Text — centrado, mínimo */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">

        <p className="font-body text-[10px] uppercase tracking-[0.5em] text-white/50 mb-8">
          {lang === 'es' ? 'Ibiza · Propiedades Exclusivas' : 'Ibiza · Exclusive Properties'}
        </p>

        <h1
          className="font-display text-white uppercase"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 7rem)',
            lineHeight: '1',
            fontWeight: '300',
            letterSpacing: '0.02em',
          }}
        >
          Ibiza Flow
          <br />
          <span className="italic" style={{ fontWeight: '300' }}>Real Estate</span>
        </h1>

      </div>

    </section>
  );
};

export default HeroSection;
