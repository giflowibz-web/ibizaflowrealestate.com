import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { ibiza: 10, flow: 18, sub: 5.5, gap: 2 },
    md: { ibiza: 12, flow: 22, sub: 6.5, gap: 3 },
    lg: { ibiza: 16, flow: 30, sub: 8, gap: 4 },
  };
  const s = sizes[size];

  const textColor = light ? "#ffffff" : "#0a0a0a";
  const subColor  = light ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.32)";

  return (
    <div
      className={`flex flex-col select-none ${className}`}
      translate="no"
      style={{ gap: s.gap, lineHeight: 1 }}
    >
      {/* IBIZA — pequeño, muy espaciado, sobre FLOW */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.ibiza,
          fontWeight: 400,
          letterSpacing: "0.55em",
          color: subColor,
          textTransform: "uppercase",
          paddingLeft: 2,
        }}
      >
        IBIZA
      </span>

      {/* FLOW — grande, con la O en azul Klein */}
      <span
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontSize: s.flow,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: textColor,
          lineHeight: 1,
        }}
      >
        FL
        <span style={{ color: "#002FA7" }}>O</span>
        W
      </span>

      {/* REAL ESTATE — línea con puntos */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4em", paddingLeft: 2 }}>
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 1,
            backgroundColor: "#002FA7",
            flexShrink: 0,
            opacity: 0.7,
          }}
        />
        <span
          style={{
            fontFamily: "'Montserrat', 'Inter', sans-serif",
            fontWeight: 300,
            fontSize: s.sub,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: subColor,
          }}
        >
          REAL ESTATE
        </span>
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 1,
            backgroundColor: "#002FA7",
            flexShrink: 0,
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}
