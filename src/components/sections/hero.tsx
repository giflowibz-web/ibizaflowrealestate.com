import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video - Ibiza aerial/lifestyle */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/4253478/4253478-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.75) 100%)' 
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-[6%] text-center">
        <div className="max-w-5xl animate-fadeIn">
          <h1 
            className="text-white font-display uppercase tracking-[0.1em] mb-4 sm:mb-6"
            style={{ 
              fontSize: 'clamp(3rem, 7vw, 6.25rem)', 
              lineHeight: '1.1',
              fontWeight: '400'
            }}
          >
            Tu Vida en Ibiza
          </h1>
          
          <div className="w-16 h-[1px] bg-[#002FA7] mx-auto mb-8 sm:mb-10" />

          <p 
            className="text-white font-body tracking-[0.05em] opacity-90 mx-auto max-w-2xl"
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: '1.5',
              fontWeight: '400'
            }}
          >
            Propiedades exclusivas en la isla mas deseada del Mediterraneo.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-body">Descubre</span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#002FA7] -translate-y-full animate-[scroll-hint_2.5s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
