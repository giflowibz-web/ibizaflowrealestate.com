import React from 'react';

const pressData = [
  {
    publication: "Luxury Living",
    date: "Enero 2025",
    headline: "Ibiza Flow Real Estate: redefine el lujo inmobiliario en la isla blanca",
  },
  {
    publication: "Architectural Digest",
    date: "Marzo 2024",
    headline: "Las villas mas espectaculares de Ibiza con vistas al Mediterraneo",
  },
  {
    publication: "Forbes",
    date: "Julio 2024",
    headline: "El mercado inmobiliario de lujo en Ibiza alcanza cifras record en 2024",
  },
  {
    publication: "El Pais",
    date: "Noviembre 2024",
    headline: "Ibiza se consolida como destino premium para inversores internacionales",
  },
];

const PressCarousel: React.FC = () => {
  return (
    <section className="bg-white section-spacing">
      <div className="container">
        <div className="mb-16 md:mb-24">
          <span className="text-accent-caps block mb-4">En los Medios</span>
          <h2 className="text-section-title text-foreground">Prensa y Noticias</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-x-12 md:gap-y-16">
          {pressData.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col border-t border-border pt-10 group cursor-pointer transition-all duration-400"
            >
              <div className="flex flex-col mb-6">
                <span className="font-display text-2xl md:text-3xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  {item.publication}
                </span>
                <time className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
                  {item.date}
                </time>
              </div>

              <h3 className="font-display text-xl md:text-2xl leading-snug text-foreground group-hover:opacity-80 transition-opacity">
                {item.headline}
              </h3>

              <div className="mt-auto pt-8">
                <span className="inline-block text-xs uppercase tracking-widest font-bold text-accent border-b border-transparent group-hover:border-accent transition-all">
                  Leer Articulo
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a 
            href="/prensa" 
            className="btn-luxury px-12 py-5 text-sm transition-transform hover:-translate-y-1"
          >
            Ver Toda la Prensa
          </a>
        </div>
      </div>

      <div className="container mt-32">
        <div className="h-px w-full bg-border/50"></div>
      </div>
    </section>
  );
};

export default PressCarousel;
