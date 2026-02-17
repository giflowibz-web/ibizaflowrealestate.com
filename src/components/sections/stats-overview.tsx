import React from 'react';

/**
 * StatsOverview component showcasing key luxury real estate metrics.
 * Built with Next.js 15, TypeScript, and Tailwind CSS.
 * Adheres to the ultra-luxury minimalist aesthetic with Playfair Display typography.
 */
const StatsOverview: React.FC = () => {
  return (
    <section 
      className="bg-[#F1F1F1] section-spacing"
      aria-labelledby="stats-heading"
    >
      <div className="container">
        {/* Header Content */}
        <div className="max-w-[900px] mx-auto text-center mb-16 lg:mb-24">
          <span className="text-accent-caps mb-6 block">Featured</span>
          <h2 
            id="stats-heading"
            className="text-section-title font-serif italic mb-8"
          >
            With over $22 Billion in luxury home sales
          </h2>
          <p className="font-body text-[#000000] text-lg lg:text-xl leading-relaxed max-w-[760px] mx-auto opacity-80">
            Aaron Kirman represents the finest estates across the globe and was ranked in the top 5 luxury real estate agents in the US by the Wall Street Journal.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[3.75rem] lg:text-[5rem] font-bold font-body leading-none mb-4 tracking-tight">
              $22B+
            </h3>
            <p className="font-serif italic text-xl lg:text-2xl text-[#000000]">
              Worth of Real estate sold
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[3.75rem] lg:text-[5rem] font-bold font-body leading-none mb-4 tracking-tight">
              .01%
            </h3>
            <p className="font-serif italic text-xl lg:text-2xl text-[#000000]">
              Top Agents Nationwide
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[3.75rem] lg:text-[5rem] font-bold font-body leading-none mb-4 tracking-tight">
              $1.7B+
            </h3>
            <p className="font-serif italic text-xl lg:text-2xl text-[#000000]">
              Total Sales in 2024
            </p>
          </div>
        </div>
      </div>


    </section>
  );
};

export default StatsOverview;