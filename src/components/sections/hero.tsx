import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="https://res.cloudinary.com/luxuryp/videos/w_1920,c_scale,so_0,eo_0,f_auto,q_auto/lm6zzpye3cvtxslnijil/final-2-1"
        >
          <source
            src="https://res.cloudinary.com/luxuryp/videos/w_1920,c_scale,so_0,eo_0,f_auto,q_auto/lm6zzpye3cvtxslnijil/final-2-1"
            type="video/mp4"
          />
        </video>
        {/* Cinematic Overlay Gradient */}
        <div 
          className="absolute inset-0 bg-black/30 luxury-overlay" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)' 
          }}
        />
      </div>

      {/* Hero Content Overlay */}
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
            Luxury Defined
          </h1>
          
          <div className="w-16 h-[1px] bg-accent mx-auto mb-8 sm:mb-10" />

          <p 
            className="text-white font-body tracking-[0.05em] opacity-90 mx-auto max-w-2xl"
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: '1.5',
              fontWeight: '400'
            }}
          >
            The leader in global luxury real estate, with over $23B sold.
          </p>
        </div>
      </div>

      {/* Optional: Visual Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-body">Scroll</span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent -translate-y-full animate-[scroll-hint_2.5s_infinite]" />
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection;