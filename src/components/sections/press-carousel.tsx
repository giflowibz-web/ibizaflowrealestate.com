import React from 'react';

/**
 * PressCarousel Component
 * 
 * Clones the "Featured In" section featuring a horizontal list of major publications 
 * like Robb Report, Architectural Digest, and Los Angeles Business Journal.
 * 
 * Styled according to the luxury real estate aesthetic: 
 * high-contrast typography, minimalist layout, and expansive white space.
 */

const pressData = [
  {
    publication: "Robb Report",
    date: "November 14, 2024",
    headline: "Meet the Robb Report Real Estate Masters: 21 Specialists Who Can Help You Buy or Sell the Ultimate Home",
  },
  {
    publication: "Architectural Digest",
    date: "March 30, 2023",
    headline: "Inside a Legendary $16,000,000 Canyonside Mansion",
  },
  {
    publication: "Los Angeles Business Journal",
    date: "August 26, 2024",
    headline: "Leaders of Influence: Residential Real Estate 2024 – Aaron Kirman",
  },
  {
    publication: "Architectural Digest",
    date: "October 2, 2024",
    headline: "Sable Ranch, Home to an Iconic Hollywood Ghost Town, Hits the Market for $35 Million",
  },
];

const PressCarousel: React.FC = () => {
  return (
    <section className="bg-[#F1F1F1] section-spacing">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-accent-caps block mb-4">Featured In</span>
          <h2 className="text-section-title text-foreground">Press Highlights</h2>
        </div>

        {/* Press Grid - Horizontal scrolling on mobile, grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-x-12 md:gap-y-16">
          {pressData.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col border-t border-border pt-10 group cursor-pointer transition-all duration-400"
            >
              {/* Publication Info */}
              <div className="flex flex-col mb-6">
                <span className="font-display text-2xl md:text-3xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.publication}
                </span>
                <time className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
                  {item.date}
                </time>
              </div>

              {/* Headline */}
              <h3 className="font-display text-xl md:text-2xl leading-snug text-foreground group-hover:opacity-80 transition-opacity">
                {item.headline}
              </h3>

              {/* Read More Link (Optional visual cue) */}
              <div className="mt-auto pt-8">
                <span className="inline-block text-xs uppercase tracking-widest font-bold text-accent border-b border-transparent group-hover:border-accent transition-all">
                  Read Article
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 flex justify-center">
          <a 
            href="/media/print-media" 
            className="btn-luxury px-12 py-5 text-sm transition-transform hover:-translate-y-1"
          >
            View All Press
          </a>
        </div>
      </div>

      {/* Subtle bottom border to separate from next section */}
      <div className="container mt-32">
        <div className="h-px w-full bg-border/50"></div>
      </div>
    </section>
  );
};

export default PressCarousel;