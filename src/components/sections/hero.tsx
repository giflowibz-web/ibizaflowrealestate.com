"use client";

import { useLang } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const { lang } = useLang();
  const router = useRouter();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=85"
            alt="Ibiza"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl w-full">

          {/* Tag line */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-10 bg-white/40" />
            <p className="font-body text-[10px] uppercase tracking-[0.5em] text-white/50">
              {lang === 'es' ? 'Propiedades Exclusivas · Ibiza' : 'Exclusive Properties · Ibiza'}
            </p>
            <div className="h-px w-10 bg-white/40" />
          </div>

          {/* Title */}
          <h1
            className="font-display text-white mb-8 uppercase tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: '0.95',
              fontWeight: '300',
              letterSpacing: '-0.01em',
            }}
          >
            {lang === 'es' ? 'Tu Vida' : 'Your Life'}
            <br />
            <span className="italic font-light">
              {lang === 'es' ? 'en Ibiza' : 'in Ibiza'}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-white/60 mb-14 mx-auto"
            style={{
              fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
              lineHeight: '1.8',
              fontWeight: '300',
              letterSpacing: '0.06em',
              maxWidth: '460px',
            }}
          >
            {lang === 'es'
              ? 'Selección de villas, fincas y apartamentos de lujo en la isla más especial del Mediterráneo.'
              : 'A curated selection of luxury villas, fincas and apartments on the most special island in the Mediterranean.'}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.push('/propiedades')}
              className="font-body text-[11px] uppercase tracking-[0.25em] text-white border border-white/40 px-10 py-4 hover:bg-white hover:text-black transition-all duration-400"
            >
              {lang === 'es' ? 'Ver Propiedades' : 'View Properties'}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('contacto');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-body text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-300"
            >
              {lang === 'es' ? 'Contactar' : 'Contact'}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-12 w-[1px] overflow-hidden bg-white/15">
            <div className="absolute left-0 top-0 h-full w-full -translate-y-full animate-[scroll-hint_2.5s_infinite] bg-white/60" />
          </div>
          <span className="font-body text-[9px] uppercase tracking-[0.4em] text-white/30">
            {lang === 'es' ? 'Desplazar' : 'Scroll'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
