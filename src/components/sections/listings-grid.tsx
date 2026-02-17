import React from 'react';
import Image from 'next/image';

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  mlsId: string;
  image: string;
}

const listings: Property[] = [
  {
    id: "1",
    title: "La Vue",
    address: "La Vue, Bel Air, CA",
    price: "$177,000,000",
    mlsId: "26639473",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/8537804223985679594-5.jpg",
  },
  {
    id: "2",
    title: "1200 Bel Air Rd",
    address: "1200 Bel Air Rd, Los Angeles, CA 90077",
    price: "$99,950,000",
    mlsId: "25609623",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/4584597699505816233-15.jpg",
  },
  {
    id: "3",
    title: "9126 Cordell Dr",
    address: "9126 Cordell Dr, Los Angeles, CA 90069",
    price: "$85,000,000",
    mlsId: "25612239",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/6635392915477721419-17.jpg",
  },
  {
    id: "4",
    title: "9966 Beverly Grove Dr",
    address: "9966 Beverly Grove Dr, Beverly Hills, CA 90210",
    price: "$77,500,000",
    mlsId: "25602121",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/6539636338071487336-19.jpg",
  },
  {
    id: "5",
    title: "1420 Davies Dr",
    address: "1420 Davies Dr, Beverly Hills, CA 90210",
    price: "$69,995,000",
    mlsId: "25599881",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/-1208234391117515716-21.jpg",
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
            MLS ID: {property.mlsId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ListingsGrid() {
  return (
    <section className="bg-[#F1F1F1] section-spacing">
      <div className="container">
        <div className="mb-16 md:mb-24">
          <div className="flex flex-col space-y-4">
            <span className="text-accent-caps">Featured</span>
            <h2 className="text-section-title font-serif">Luxury Listings</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 lg:gap-y-24">
          {listings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}

          {/* Fallback pattern to show 6th card if we only have 5 specifically detected for this section */}
          {listings.length === 5 && (
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={listings[0].image}
                  alt="Additional Listing"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
              <div className="mt-6 space-y-2">
                <h3 className="font-body text-[20px] font-bold tracking-tight text-primary uppercase">
                  9330 Flicker Way
                </h3>
                <p className="font-body text-[16px] text-muted-foreground">
                  9330 Flicker Way, Los Angeles, CA 90069
                </p>
                <div className="flex flex-col pt-1">
                  <span className="font-body text-[20px] font-bold text-primary">
                    $68,000,000
                  </span>
                  <span className="font-body text-[13px] tracking-wider text-muted-foreground">
                    MLS ID: 25566107
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 md:mt-24 flex justify-center lg:justify-end">
          <a
            href="/exclusive-listings"
            className="group flex items-center space-x-3 font-body font-bold text-[14px] uppercase tracking-[0.2em] border-b border-primary/20 pb-2 transition-all hover:border-accent hover:text-accent"
          >
            <span>View All Listings</span>
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