import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { main: 18, sub: 6.5, spacing: "0.35em" },
    md: { main: 24, sub: 8,   spacing: "0.35em" },
    lg: { main: 32, sub: 10,  spacing: "0.35em" },
  };
  const s = sizes[size];

  const ibizaColor = light ? "#ffffff" : "#111111";
  const flowColor  = "#002FA7";
  const subColor   = light ? "rgba(255,255,255,0.5)" : "rgba(0,47,167,0.6)";

  return (
    <div
      className={`flex flex-col items-center select-none leading-none ${className}`}
      translate="no"
    >
      {/* IBIZA FLOW */}
      <div className="flex items-baseline" style={{ gap: "0.25em" }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: s.main,
            fontWeight: 300,
            letterSpacing: s.spacing,
            color: ibizaColor,
            textTransform: "uppercase",
          }}
        >
          IBIZA
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: s.main,
            fontWeight: 700,
            letterSpacing: s.spacing,
            color: flowColor,
            textTransform: "uppercase",
          }}
        >
          FLOW
        </span>
      </div>

      {/* REAL ESTATE */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontWeight: 300,
          fontSize: s.sub,
          letterSpacing: "0.55em",
          textTransform: "uppercase",
          color: subColor,
          marginTop: 3,
        }}
      >
        REAL ESTATE
      </span>
    </div>
  );
}
