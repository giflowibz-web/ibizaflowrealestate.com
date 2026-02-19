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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 z-10">
          <Logo className={`h-8 w-auto transition-all ${scrolled ? "text-foreground" : "text-white"}`} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: t.nav.properties, href: "/propiedades" },
            { label: t.nav.services, href: "#servicios" },
            { label: t.nav.about, href: "#nosotros" },
            { label: t.nav.contact, href: "#contacto" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
            className={`text-[11px] uppercase tracking-[0.18em] font-bold transition-colors duration-300 hover:text-accent ${
                  scrolled ? "text-white/90" : "text-white/90"
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-bold border px-3 py-1.5 transition-all duration-300 ${
              scrolled
              ? "border-white/30 text-white hover:border-accent hover:text-accent"
                  : "border-white/40 text-white hover:border-white hover:text-white"
            }`}
          >
            <span className={lang === "es" ? "opacity-100" : "opacity-40"}>ES</span>
            <span className="opacity-30 mx-0.5">/</span>
            <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
          </button>

          {/* Search */}
          <button
            className={`hidden md:flex items-center transition-colors duration-300 hover:text-accent ${
              scrolled ? "text-foreground" : "text-white/90"
            }`}
            aria-label={t.nav.search}
          >
            <Search size={17} strokeWidth={1.5} />
          </button>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border py-6 px-[6%] flex flex-col gap-5">
          {[
            { label: t.nav.properties, href: "/propiedades" },
            { label: t.nav.services, href: "#servicios" },
            { label: t.nav.about, href: "#nosotros" },
            { label: t.nav.contact, href: "#contacto" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.18em] font-bold text-foreground hover:text-accent transition-colors"
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
