import React from 'react';
import Image from 'next/image';

const InquiryCTA = () => {
  // Asset link from provided list
  const bgImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/images_30.png";

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Luxury Real Estate Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark Overlay for readability - Matching High Level Design "Luxury Overlay" */}
        <div className="absolute inset-0 bg-black/40 luxury-overlay" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 text-center max-w-[850px] px-6">
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          {/* Section Subtitle - Mapped from design system "Section Subtitle" */}
          <span className="text-accent-caps animate-fade-in">
            Inquire
          </span>

          {/* Elegant Serif Header - Mapped from Design Instructions & Typography Scale */}
          <h2 className="text-white text-section-title font-serif leading-tight">
            Embrace Higher Living
          </h2>

          {/* Inviting Paragraph - Gilroy Regular 16px-18px as per design system */}
          <p className="text-white/90 text-lg md:text-xl font-body font-normal leading-relaxed max-w-2xl mx-auto">
            Luxury real estate means going above and beyond the client&rsquo;s expectations. 
            Whatever luxury means to you, we are here to help you seek it. 
            Experience luxury with us.
          </p>

          {/* CTA Button - btn-luxury from globals.css */}
          <div className="pt-4">
            <button className="btn-luxury group">
              Contact Us
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