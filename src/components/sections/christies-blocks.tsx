import React from 'react';
import Image from 'next/image';

interface ServiceBlockProps {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({
  label,
  title,
  description,
  imageSrc,
  reverse = false,
}) => {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden group">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
      </div>

      <div className="container relative h-full flex items-center">
        <div 
          className={`max-w-[600px] text-white p-8 md:p-12 transition-all duration-700 delay-100 ${
            reverse ? 'ml-auto text-right md:text-right' : 'mr-auto text-left'
          }`}
        >
          <span className="block font-body text-[14px] font-bold uppercase tracking-[0.2em] text-[#002FA7] mb-4">
            {label}
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] leading-[1.1] mb-6">
            {title}
          </h2>
          <p className="font-body text-[16px] md:text-[18px] leading-[1.6] opacity-90 mb-8 max-w-[500px] group-hover:opacity-100 transition-opacity">
            {description}
          </p>
          <a 
            href="#" 
            className="inline-flex items-center group/btn"
          >
            <span className="bg-[#002FA7] text-white px-8 py-3.5 text-[14px] font-bold uppercase tracking-[0.1em] transition-all duration-300 group-hover/btn:bg-white group-hover/btn:text-black">
              Descubrir
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const ServicesBlocks = () => {
  const blocks = [
    {
      label: "Compra & Venta",
      title: "Villas de Lujo",
      description: "Descubre las propiedades mas exclusivas de Ibiza. Desde villas modernas con vistas al mar hasta fincas tradicionales rodeadas de naturaleza. Nuestro equipo te acompana en cada paso del proceso.",
      imageSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      reverse: false,
    },
    {
      label: "Lifestyle",
      title: "Estilo de Vida Ibicenco",
      description: "Ibiza es mucho mas que una isla. Es un estilo de vida unico que combina la tranquilidad del Mediterraneo con la energia de una de las capitales mundiales del entretenimiento y la cultura.",
      imageSrc: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
      reverse: true,
    },
    {
      label: "Inversion",
      title: "Oportunidades de Inversion",
      description: "El mercado inmobiliario de Ibiza ofrece excelentes rentabilidades. Te asesoramos sobre las mejores oportunidades de inversion, desde alquiler vacacional hasta proyectos de desarrollo inmobiliario.",
      imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      reverse: false,
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {blocks.map((block, index) => (
        <ServiceBlock 
          key={index}
          label={block.label}
          title={block.title}
          description={block.description}
          imageSrc={block.imageSrc}
          reverse={block.reverse}
        />
      ))}
    </div>
  );
};

export default ServicesBlocks;
