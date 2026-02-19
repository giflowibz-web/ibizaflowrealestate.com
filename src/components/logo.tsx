import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const isLight = variant === "light";
  const textColor = isLight ? "#FFFFFF" : "#0A0A0A";
  const subColor = isLight ? "rgba(255,255,255,0.45)" : "rgba(10,10,10,0.4)";
  const blueO = "#002FA7";

  const sizes = {
    sm:   { main: "1.05rem", sub: "0.34rem", tracking: "0.38em", subTracking: "0.50em" },
    md:   { main: "1.35rem", sub: "0.40rem", tracking: "0.36em", subTracking: "0.48em" },
    lg:   { main: "1.7rem",  sub: "0.46rem", tracking: "0.34em", subTracking: "0.46em" },
    hero: { main: "1.35rem", sub: "0.40rem", tracking: "0.36em", subTracking: "0.48em" },
  };

  const s = sizes[size];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        gap: 5,
        textAlign: "center",
      }}
    >
      {/* IBIZA FL[O]W — O en azul Klein */}
      <span
        style={{
          fontSize: s.main,
          fontWeight: 400,
          letterSpacing: s.tracking,
          textTransform: "uppercase",
          color: textColor,
          fontFamily: "'Playfair Display', 'Didot', 'Georgia', serif",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        IBIZA FL<span style={{ color: blueO }}>O</span>W
      </span>

      {/* REAL ESTATE */}
      <span
        style={{
          fontSize: s.sub,
          fontWeight: 300,
          letterSpacing: s.subTracking,
          textTransform: "uppercase",
          color: subColor,
          fontFamily: "'Montserrat', sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        REAL ESTATE
      </span>
    </div>
  );
}
