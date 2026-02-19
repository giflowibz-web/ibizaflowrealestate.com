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

  const navLinks = [
    { label: t.nav.properties, href: "/propiedades" },
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.about, href: "#nosotros" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="w-full flex items-center px-6 md:px-10 relative">

        {/* Left — nav links */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          {navLinks.slice(0, 2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.18em] font-bold text-white/90 transition-colors duration-300 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          {navLinks.slice(2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.18em] font-bold text-white/90 transition-colors duration-300 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Center — logo absolute */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" style={{ textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.45)" }}>
            <Logo variant="light" size={scrolled ? "sm" : "lg"} />
          </a>
        </div>

        {/* Right — lang + search */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className={`hidden md:flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-bold border px-3 py-1.5 transition-all duration-300 ${
              scrolled
                ? "border-white/30 text-white hover:border-accent hover:text-accent"
                : "border-white/40 text-white hover:border-white hover:text-white"
            }`}
          >
            <span className={lang === "es" ? "opacity-100" : "opacity-40"}>ES</span>
            <span className="opacity-30 mx-0.5">/</span>
            <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
          </button>

          <button
            className="hidden md:flex items-center text-white/90 transition-colors duration-300 hover:text-accent"
            aria-label={t.nav.search}
          >
            <Search size={17} strokeWidth={1.5} />
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
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
          {navLinks.map((item) => (
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
