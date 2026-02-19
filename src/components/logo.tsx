import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { flow: 22, ibiza: 7, sub: 6, spacing: 2 },
    md: { flow: 32, ibiza: 9, sub: 7, spacing: 3 },
    lg: { flow: 44, ibiza: 11, sub: 8, spacing: 4 },
  };
  const s = sizes[size];

  const mainColor = light ? "#ffffff" : "#0a0a0a";
  const dimColor = light ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.45)";
  const blue = "#002FA7";

  return (
    <div
      className={`flex flex-col select-none ${className}`}
      translate="no"
      style={{ lineHeight: 1, gap: 0 }}
    >
      {/* IBIZA — pequeño, muy espaciado */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.ibiza,
          fontWeight: 400,
          letterSpacing: "0.55em",
          textTransform: "uppercase",
          color: dimColor,
          marginBottom: s.spacing,
          paddingLeft: 2,
        }}
      >
        IBIZA
      </span>

      {/* FLOW — protagonista, masivo */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.flow,
          fontWeight: 900,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: mainColor,
          lineHeight: 1,
        }}
      >
        FLOW
      </span>

      {/* Línea divisora azul Klein */}
      <div
        style={{
          width: "100%",
          height: 1.5,
          backgroundColor: blue,
          marginTop: s.spacing,
          marginBottom: s.spacing,
        }}
      />

      {/* REAL ESTATE */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.sub,
          fontWeight: 300,
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: dimColor,
        }}
      >
        REAL ESTATE
      </span>
    </div>
  );
}
