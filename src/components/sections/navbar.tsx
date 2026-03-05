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

  const [propertiesOpen, setPropertiesOpen] = useState(false);

  const leftLinks = [
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.about, href: "#nosotros" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-7"
      }`}
    >
      {/* Contenedor relativo para logo absolute centrado — igual que Aaron Kirman header-container--center */}
      <div className="relative w-full flex items-center">

          {/* IZQUIERDA — flex-1, links pegados al borde izquierdo */}
            <nav className="hidden md:flex items-center gap-10 flex-1 pl-6">
            {/* Properties dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPropertiesOpen(true)}
              onMouseLeave={() => setPropertiesOpen(false)}
            >
              <a
                href="/propiedades/venta"
                className="text-[10px] uppercase tracking-[0.28em] font-light text-white/75 transition-colors duration-300 hover:text-white whitespace-nowrap flex items-center gap-1"
              >
                {t.nav.properties}
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ marginTop: 1 }}>
                  <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {propertiesOpen && (
                <div
                  className="absolute top-full left-0 pt-3"
                  style={{ zIndex: 100 }}
                >
                  <div style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", minWidth: 180 }}>
                    {[
                      { label: lang === "es" ? "Venta" : "For Sale", href: "/propiedades/venta" },
                      { label: lang === "es" ? "Alquiler" : "For Rent", href: "/propiedades/alquiler" },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        style={{
                          display: "block",
                          padding: "14px 22px",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          letterSpacing: "0.26em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.65)",
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          transition: "color 0.2s, background 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,47,167,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)";
                          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {leftLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.28em] font-light text-white/75 transition-colors duration-300 hover:text-white whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

        {/* CENTRO — absoluto, centrado en la página */}
        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex-shrink-0"
        >
          <Logo variant="light" size={scrolled ? "sm" : "md"} />
        </a>

        {/* DERECHA — flex-1, elementos pegados al borde derecho */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-end pr-10">
          <a
            href="#contacto"
            className="text-[10px] uppercase tracking-[0.28em] font-light text-white/75 hover:text-white transition-colors whitespace-nowrap"
          >
            {t.nav.contact}
          </a>

          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-light text-white/75 hover:text-white transition-colors"
          >
            <span className={lang === "es" ? "text-white" : "text-white/30"}>ES</span>
            <span className="text-white/20 mx-0.5">/</span>
            <span className={lang === "en" ? "text-white" : "text-white/30"}>EN</span>
          </button>

          <button
            className="flex items-center text-white/75 hover:text-white transition-colors"
            aria-label={t.nav.search}
          >
            <Search size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white ml-auto pr-6"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 py-6 px-8 flex flex-col gap-5">
          {[...leftLinks, { label: t.nav.contact, href: "#contacto" }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] uppercase tracking-[0.22em] font-light text-white/75 hover:text-white transition-colors"
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
