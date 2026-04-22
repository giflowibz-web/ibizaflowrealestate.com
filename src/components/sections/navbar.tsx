"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import Logo from "../logo";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftLinks = [
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.about, href: "#nosotros" },
  ];

  return (
    <>
      <style>{`
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-link-line::after {
          content: '';
          display: block;
          height: 1px;
          width: 0;
          background: #fff;
          transition: width 0.3s ease;
          margin-top: 3px;
        }
        .nav-link-line:hover::after { width: 100%; }
        .logo-wrap {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.4s ease;
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease, padding 0.4s ease",
          padding: 0,
          display: "flex",
          alignItems: "center",
          background: scrolled ? "rgba(4,4,10,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
          animation: "navFadeIn 0.8s ease both",
          overflow: "visible",
        }}
      >

        <div style={{ display: "flex", alignItems: "center", width: "100%", position: "relative", height: scrolled ? 68 : 92 }}>

          {/* LEFT */}
          <nav className="hidden md:flex" style={{ flex: 1, paddingLeft: 40, display: "flex", alignItems: "center", gap: 40 }}>

            {/* Properties dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setPropertiesOpen(true)}
              onMouseLeave={() => setPropertiesOpen(false)}
            >
              <a
                href="/propiedades/venta"
                className="nav-link-line"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.28em",
                  fontWeight: 300,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              >
                {t.nav.properties}
                <svg width="7" height="7" viewBox="0 0 8 8" fill="none" style={{ marginTop: 1, opacity: 0.6 }}>
                  <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Dropdown */}
              <div style={{
                position: "absolute",
                top: "calc(100% + 14px)",
                left: "50%",
                transform: "translateX(-50%)",
                opacity: propertiesOpen ? 1 : 0,
                pointerEvents: propertiesOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                zIndex: 100,
                minWidth: 160,
              }}>
                {/* small triangle */}
                <div style={{
                  width: 0, height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: "6px solid rgba(255,255,255,0.08)",
                  margin: "0 auto",
                  marginBottom: -1,
                }} />
                <div style={{
                  background: "rgba(6,6,6,0.97)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}>
                  {[
                    { label: lang === "es" ? "Venta" : "For Sale", href: "/propiedades/venta" },
                    { label: lang === "es" ? "Alquiler" : "For Rent", href: "/propiedades/alquiler" },
                  ].map((item, i) => (
                    <a key={item.href} href={item.href} style={{
                      display: "block",
                      padding: "13px 24px",
                      fontSize: "0.58rem",
                      fontWeight: 500,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      transition: "color 0.2s, background 0.2s, padding-left 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "#1847E8";
                      e.currentTarget.style.paddingLeft = "28px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.paddingLeft = "24px";
                    }}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {leftLinks.map(item => (
              <a key={item.href} href={item.href} className="nav-link-line" style={{
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                fontWeight: 300,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* CENTER LOGO */}
          <a
            href="/"
            className="logo-wrap"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 0,
            }}
          >
            <Logo variant="light" size={scrolled ? "sm" : "md"} />
          </a>

          {/* RIGHT */}
          <div className="hidden md:flex" style={{ flex: 1, justifyContent: "flex-end", paddingRight: 40, alignItems: "center", gap: 32 }}>
            <a href="#contacto" className="nav-link-line" style={{
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              fontWeight: 300,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
              {t.nav.contact}
            </a>

            {/* Lang switcher */}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4,
                fontSize: "0.6rem", letterSpacing: "0.22em", fontWeight: 300,
                textTransform: "uppercase",
              }}
            >
              <span style={{
                color: lang === "es" ? "#fff" : "rgba(255,255,255,0.25)",
                transition: "color 0.3s",
              }}>ES</span>
              <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 1px" }}>/</span>
              <span style={{
                color: lang === "en" ? "#fff" : "rgba(255,255,255,0.25)",
                transition: "color 0.3s",
              }}>EN</span>
            </button>

            {/* Search */}
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.6)",
              display: "flex", alignItems: "center",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            aria-label={t.nav.search}>
              <Search size={13} strokeWidth={1.4} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            style={{
              marginLeft: "auto", paddingRight: 24,
              background: "none", border: "none",
              color: "#fff", cursor: "pointer",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            position: "absolute",
            top: "100%", left: 0, right: 0,
            background: "rgba(4,4,4,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            animation: "navFadeIn 0.25s ease both",
          }}>
            {[
              { label: lang === "es" ? "Venta" : "For Sale", href: "/propiedades/venta" },
              { label: lang === "es" ? "Alquiler" : "For Rent", href: "/propiedades/alquiler" },
              ...leftLinks,
              { label: t.nav.contact, href: "#contacto" },
            ].map(item => (
              <a key={item.href} href={item.href} style={{
                fontSize: "0.6rem",
                letterSpacing: "0.24em",
                fontWeight: 300,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ))}
            <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
              {["es", "en"].map(l => (
                <button key={l} onClick={() => setLang(l as "es" | "en")} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "0.6rem", letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: lang === l ? "#fff" : "rgba(255,255,255,0.25)",
                  padding: 0,
                }}>{l}</button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
