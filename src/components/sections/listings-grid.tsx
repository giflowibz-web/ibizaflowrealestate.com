"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { properties } from "@/data/properties";
import { MapPin } from "lucide-react";

const ListingsGrid = () => {
  return (
    <section className="bg-white py-24 md:py-32" id="propiedades">
      <div className="max-w-[1400px] mx-auto px-[6%]">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#002FA7] text-[12px] uppercase tracking-[0.25em] font-bold font-body">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-4 text-black">
            Propiedades Exclusivas
          </h2>
          <p className="text-[#666] text-lg mt-4 font-body max-w-2xl mx-auto">
            Una seleccion curada de las mejores propiedades disponibles en Ibiza
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/propiedades/${property.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-[#F5F5F5]">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#002FA7] text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                    {property.status}
                  </span>
                </div>

                {/* Hover Price Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-2xl font-serif">{property.price}</p>
                </div>
              </div>

              {/* Card Info */}
              <div className="pt-5 pb-2">
                <h3 className="text-xl md:text-2xl font-serif text-black group-hover:text-[#002FA7] transition-colors duration-300">
                  {property.title}
                </h3>
                <p className="text-[#888] text-[13px] mt-1 font-body flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.address}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-black text-[14px] font-body font-bold">
                    {property.price}
                  </span>
                  <span className="text-[#999] text-[13px] font-body">
                    {property.details}
                  </span>
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
            Ver todas las propiedades
          </a>
        </div>
      </div>
    </section>
  );
};

export default ListingsGrid;
