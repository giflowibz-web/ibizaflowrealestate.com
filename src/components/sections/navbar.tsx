"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import Logo from "../logo";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.properties, href: "/propiedades" },
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.about, href: "#nosotros" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full flex items-center justify-between px-8 md:px-12">

        {/* LEFT — Logo */}
        <a href="/" className="flex-shrink-0">
          <Logo variant="light" size={scrolled ? "sm" : "md"} />
        </a>

        {/* RIGHT — Links + Contacto CTA + idioma + búsqueda */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] uppercase tracking-[0.25em] font-medium text-white/70 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}

          {/* Contacto — botón CTA estilo Aaron Kirman */}
          <a
            href="#contacto"
            className="text-[10px] uppercase tracking-[0.25em] font-medium text-white border border-white/40 px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300"
          >
            {t.nav.contact}
          </a>

          {/* Idioma */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-medium text-white/70 hover:text-white transition-colors"
          >
            <span className={lang === "es" ? "text-white" : "text-white/35"}>ES</span>
            <span className="text-white/20 mx-0.5">/</span>
            <span className={lang === "en" ? "text-white" : "text-white/35"}>EN</span>
          </button>

          {/* Búsqueda */}
          <button
            className="flex items-center text-white/70 hover:text-white transition-colors"
            aria-label={t.nav.search}
          >
            <Search size={15} strokeWidth={1.5} />
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 py-6 px-8 flex flex-col gap-5">
          {[...links, { label: t.nav.contact, href: "#contacto" }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] uppercase tracking-[0.22em] font-medium text-white/75 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
