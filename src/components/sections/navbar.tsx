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
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full flex items-center relative" style={{ paddingLeft: "3vw", paddingRight: "3vw" }}>

        {/* Left — nav links pegados al borde izquierdo */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] uppercase tracking-[0.22em] font-medium text-white/75 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Center — logo absolute centrado */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/">
            <Logo variant="light" size={scrolled ? "sm" : "md"} />
          </a>
        </div>

        {/* Right — lang + search */}
        <div className="flex items-center gap-5 ml-auto">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="hidden md:flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-medium text-white/75 hover:text-white transition-colors"
          >
            <span className={lang === "es" ? "text-white" : "text-white/40"}>ES</span>
            <span className="text-white/25 mx-0.5">/</span>
            <span className={lang === "en" ? "text-white" : "text-white/40"}>EN</span>
          </button>

          <button
            className="hidden md:flex items-center text-white/75 hover:text-white transition-colors"
            aria-label={t.nav.search}
          >
            <Search size={16} strokeWidth={1.5} />
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 py-6 px-6 flex flex-col gap-5">
          {navLinks.map((item) => (
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
