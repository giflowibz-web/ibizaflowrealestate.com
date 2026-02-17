import React from "react";
import Image from "next/image";
import Link from "next/link";
import { properties as fallbackProperties } from "@/data/properties";
import { supabaseAdmin } from "@/lib/supabase";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";

const ListingsGrid = async () => {
  let displayProperties: any[] = []

  try {
    const { data } = await supabaseAdmin
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(6)

    if (data && data.length > 0) {
      displayProperties = data.map(p => ({
        id: p.id,
        slug: p.slug || p.id,
        title: p.title_en || p.title_es,
        address: `${p.area || ''}${p.area && p.municipality ? ', ' : ''}${p.municipality || 'Ibiza'}`,
        price: p.price_on_request ? 'Price on request' : p.price ? `€${p.price.toLocaleString()}` : '',
        status: p.status,
        beds: p.bedrooms,
        baths: p.bathrooms,
        sqm: p.size_built,
        images: p.images?.length ? p.images : ['/hero-small.mp4'],
      }))
    }
  } catch (_) {}

  if (displayProperties.length === 0) {
    displayProperties = fallbackProperties
  }

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-[6%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.2em] font-bold">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-black">
            Featured Properties
          </h2>
          <p className="text-[#666] text-lg font-body mt-4 max-w-2xl mx-auto">
            An exclusive selection of the finest properties in Ibiza
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProperties.map((property) => (
            <Link
              key={property.id}
              href={`/propiedades/${property.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F0F0F0]">
                {property.images?.[0] ? (
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-[#E8E4DC]" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#002FA7] text-white text-[10px] uppercase tracking-[0.15em] font-bold">
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="pt-5 pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif text-black group-hover:text-[#002FA7] transition-colors duration-300">
                      {property.title}
                    </h3>
                    <p className="text-[#888] text-[13px] font-body mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {property.address}
                    </p>
                  </div>
                  <p className="text-black font-serif text-lg whitespace-nowrap">
                    {property.price}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[#E5E5E5]">
                  {property.beds && (
                    <div className="flex items-center gap-1.5 text-[#666] text-[13px] font-body">
                      <Bed className="w-4 h-4 text-[#002FA7]" />
                      {property.beds} bed
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center gap-1.5 text-[#666] text-[13px] font-body">
                      <Bath className="w-4 h-4 text-[#002FA7]" />
                      {property.baths} bath
                    </div>
                  )}
                  {property.sqm && (
                    <div className="flex items-center gap-1.5 text-[#666] text-[13px] font-body">
                      <Maximize className="w-4 h-4 text-[#002FA7]" />
                      {property.sqm} m&sup2;
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <a
            href="/propiedades"
            className="inline-flex items-center justify-center px-12 py-4 border-2 border-black text-black text-[13px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default ListingsGrid;
