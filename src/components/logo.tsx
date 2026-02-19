import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { flow: 20, ibiza: 7,  sub: 5.5, spacing: 3,  lineW: 1 },
    md: { flow: 30, ibiza: 9,  sub: 7,   spacing: 4,  lineW: 1.5 },
    lg: { flow: 42, ibiza: 11, sub: 8,   spacing: 5,  lineW: 2 },
  };
  const s = sizes[size];

  const mainColor = light ? "#ffffff" : "#0a0a0a";
  const dimColor  = light ? "rgba(255,255,255,0.42)" : "rgba(10,10,10,0.38)";
  const blue = "#002FA7";

  return (
    <div
      className={`flex flex-col select-none ${className}`}
      translate="no"
      style={{ lineHeight: 1, gap: 0 }}
    >
      {/* IBIZA — muy espaciado, tenue */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.ibiza,
          fontWeight: 300,
          letterSpacing: "0.62em",
          textTransform: "uppercase",
          color: dimColor,
          marginBottom: s.spacing * 0.6,
          paddingLeft: 1,
        }}
      >
        IBIZA
      </span>

      {/* FLOW — protagonista */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.flow,
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: mainColor,
          lineHeight: 1,
        }}
      >
        FL
        <span style={{ color: blue }}>O</span>
        W
      </span>

      {/* Separador: línea azul Klein */}
      <div
        style={{
          width: "100%",
          height: s.lineW,
          background: `linear-gradient(to right, ${blue}, ${blue} 60%, transparent)`,
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
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: dimColor,
        }}
      >
        REAL ESTATE
      </span>
    </div>
  );
}
