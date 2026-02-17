import React from 'react';
import Image from 'next/image';

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  details: string;
  image: string;
}

const listings: Property[] = [
  {
    id: "1",
    title: "Villa Blanca",
    address: "Cala Jondal, Ibiza",
    price: "4.500.000 EUR",
    details: "5 hab. | 4 banos | 450 m2",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: "2",
    title: "Villa Ses Salines",
    address: "Ses Salines, Ibiza",
    price: "6.200.000 EUR",
    details: "6 hab. | 5 banos | 620 m2",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: "3",
    title: "Atico Vista Mar",
    address: "Marina Botafoch, Ibiza",
    price: "2.800.000 EUR",
    details: "3 hab. | 3 banos | 220 m2",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    id: "4",
    title: "Finca Can Roca",
    address: "San Rafael, Ibiza",
    price: "3.900.000 EUR",
    details: "4 hab. | 3 banos | 380 m2",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: "5",
    title: "Villa Es Cubells",
    address: "Es Cubells, Ibiza",
    price: "8.500.000 EUR",
    details: "7 hab. | 6 banos | 850 m2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "6",
    title: "Casa Talamanca",
    address: "Talamanca, Ibiza",
    price: "1.950.000 EUR",
    details: "3 hab. | 2 banos | 180 m2",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
];

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
      </div>
      <div className="mt-6 space-y-2">
        <h3 className="font-body text-[20px] font-bold tracking-tight text-primary uppercase">
          {property.title}
        </h3>
        <p className="font-body text-[16px] text-muted-foreground">
          {property.address}
        </p>
        <div className="flex flex-col pt-1">
          <span className="font-body text-[20px] font-bold text-primary">
            {property.price}
          </span>
          <span className="font-body text-[13px] tracking-wider text-muted-foreground">
            {property.details}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ListingsGrid() {
  return (
    <section className="bg-[#F5F5F5] section-spacing">
      <div className="container">
        <div className="mb-16 md:mb-24">
          <div className="flex flex-col space-y-4">
            <span className="text-accent-caps">Destacadas</span>
            <h2 className="text-section-title font-serif">Propiedades Exclusivas</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 lg:gap-y-24">
          {listings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-16 md:mt-24 flex justify-center lg:justify-end">
          <a
            href="/propiedades"
            className="group flex items-center space-x-3 font-body font-bold text-[14px] uppercase tracking-[0.2em] border-b border-primary/20 pb-2 transition-all hover:border-accent hover:text-accent"
          >
            <span>Ver Todas las Propiedades</span>
            <svg
              width="20"
              height="8"
              viewBox="0 0 20 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:translate-x-2"
            >
              <path
                d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
