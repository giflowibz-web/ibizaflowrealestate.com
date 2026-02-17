"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Propiedades",
      children: [
        { label: "Villas de Lujo", href: "/villas" },
        { label: "Apartamentos Premium", href: "/apartamentos" },
        { label: "Fincas y Casas de Campo", href: "/fincas" },
        { label: "Obra Nueva", href: "/obra-nueva" },
        { label: "Propiedades en Exclusiva", href: "/exclusivas" },
      ],
    },
    {
      label: "Servicios",
      children: [
        { label: "Compra y Venta", href: "/compra-venta" },
        { label: "Alquiler Vacacional", href: "/alquiler" },
        { label: "Property Management", href: "/gestion" },
        { label: "Asesoramiento Legal", href: "/legal" },
      ],
    },
    {
      label: "Ibiza",
      children: [
        { label: "Zonas de Ibiza", href: "/zonas" },
        { label: "Guia de la Isla", href: "/guia" },
        { label: "Estilo de Vida", href: "/lifestyle" },
      ],
    },
  ];

  const rightNavItems = [
    { label: "Contacto", href: "#contacto" },
    { label: "Buscar", href: "/buscar", icon: true },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-[6%] py-6",
          isScrolled ? "bg-black py-4 shadow-xl" : "bg-transparent"
        )}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Left Navigation (Desktop) */}
          <ul className="hidden lg:flex items-center gap-10 flex-1">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-[15px] font-body tracking-wider uppercase transition-colors duration-300 text-white hover:text-[#002FA7]">
                  {item.label}
                </button>
                <div className="absolute top-full left-0 pt-6 transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 min-w-[280px]">
                  <ul className="bg-black border border-white/10 py-6 px-8 flex flex-col gap-4 shadow-2xl">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          className="text-[13px] text-white/70 hover:text-white font-body tracking-wide transition-colors whitespace-nowrap block"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

            {/* Centered Logo */}
            <div className="flex-shrink-0 px-8">
              <a href="/" className="block">
                <Logo variant="light" size="md" />
              </a>
            </div>

          {/* Right Navigation (Desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-10 flex-1">
            <ul className="flex items-center gap-10">
              {rightNavItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[15px] font-body tracking-wider uppercase flex items-center gap-2 transition-colors duration-300 text-white hover:text-[#002FA7]"
                  >
                    {item.label}
                    {item.icon && <Search className="w-4 h-4" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black transition-transform duration-500 ease-in-out transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full px-8 py-10">
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-[#002FA7] transition-colors"
              aria-label="Cerrar menu"
            >
              <X className="w-10 h-10 stroke-1" />
            </button>
          </div>

          <div className="flex flex-col gap-8 overflow-y-auto pb-12">
            {[...navItems, ...rightNavItems].map((item) => (
              <div key={item.label} className="flex flex-col">
                {"children" in item ? (
                  <>
                    <span className="text-[#002FA7] text-[12px] font-bold uppercase tracking-[0.2em] mb-4">
                      {item.label}
                    </span>
                    <ul className="flex flex-col gap-4 pl-0">
                      {(item.children as { label: string; href: string }[]).map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            className="text-white text-2xl font-serif hover:text-[#002FA7] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="text-white text-4xl font-serif hover:text-[#002FA7] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex flex-col gap-2">
              <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Contacto</p>
              <p className="text-white text-lg">Ibiza Flow Real Estate</p>
              <a href="tel:+34971000000" className="text-white text-lg hover:text-[#002FA7] transition-colors">
                +34 971 000 000
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Oficina</p>
              <p className="text-white text-lg leading-relaxed">
                Paseo Maritimo, s/n<br />
                07800 Ibiza, Baleares
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
