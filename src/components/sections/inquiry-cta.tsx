import React from 'react';
import Image from 'next/image';

const InquiryCTA = () => {
  const bgImage = "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=1200&q=80";

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Ibiza sunset luxury"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 luxury-overlay" />
      </div>

      <div className="container relative z-10 text-center max-w-[850px] px-6">
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          <span className="text-[#002FA7] text-sm font-bold uppercase tracking-[0.2em]">
            Contacto
          </span>

          <h2 className="text-white text-section-title font-serif leading-tight">
            Vive el Mediterraneo
          </h2>

          <p className="text-white/90 text-lg md:text-xl font-body font-normal leading-relaxed max-w-2xl mx-auto">
            Cada propiedad en Ibiza cuenta una historia. Dejanos ayudarte a encontrar la tuya.
            Experiencia, dedicacion y un conocimiento unico de la isla a tu servicio.
          </p>

          <div className="pt-4">
            <button className="btn-luxury group">
              Contactanos
              <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryCTA;
