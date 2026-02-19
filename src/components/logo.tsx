import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { main: 15, sub: 6, lineHeight: 20 },
    md: { main: 19, sub: 7, lineHeight: 26 },
    lg: { main: 26, sub: 9, lineHeight: 34 },
  };
  const s = sizes[size];

  const textColor = light ? "#ffffff" : "#111111";
  const subColor  = light ? "rgba(255,255,255,0.45)" : "rgba(17,17,17,0.4)";

  return (
    <div
      className={`flex items-center select-none ${className}`}
      translate="no"
      style={{ gap: "0.75em" }}
    >
      {/* Barra azul Klein vertical */}
      <div
        style={{
          width: 2,
          height: s.lineHeight * 1.6,
          backgroundColor: "#002FA7",
          flexShrink: 0,
        }}
      />

      {/* Texto en dos líneas */}
      <div className="flex flex-col" style={{ gap: 1 }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: s.main,
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: textColor,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          IBIZA
          <span style={{ color: "#002FA7", fontWeight: 600, marginLeft: "0.2em" }}>FLOW</span>
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', 'Inter', sans-serif",
            fontWeight: 300,
            fontSize: s.sub,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: subColor,
            lineHeight: 1,
          }}
        >
          REAL ESTATE
        </span>
      </div>
    </div>
  );
}
