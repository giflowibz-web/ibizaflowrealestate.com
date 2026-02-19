import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const isLight = variant === "light";

  const subColor = isLight ? "rgba(255,255,255,0.45)" : "rgba(10,10,10,0.45)";
  const accentColor = "#002FA7";

  const sizes = {
    sm: {
      ibiza: "0.55rem",
      flow: "1.6rem",
      sub: "0.48rem",
      tracking: "0.42em",
      gap: "2px",
      lineW: "28px",
    },
    md: {
      ibiza: "0.65rem",
      flow: "2.4rem",
      sub: "0.55rem",
      tracking: "0.42em",
      gap: "3px",
      lineW: "36px",
    },
    lg: {
      ibiza: "0.75rem",
      flow: "3.2rem",
      sub: "0.62rem",
      tracking: "0.44em",
      gap: "4px",
      lineW: "44px",
    },
  };

  const s = sizes[size];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      {/* IBIZA — pequeño, muy espaciado */}
      <span
        style={{
          fontSize: s.ibiza,
          fontWeight: 400,
          letterSpacing: "0.55em",
          textTransform: "uppercase",
          color: subColor,
          fontFamily: "var(--font-body, 'Gilroy', sans-serif)",
          marginBottom: s.gap,
          paddingLeft: "0.55em",
        }}
      >
        IBIZA
      </span>

      {/* FLOW — serif bold, azul Klein, protagonista */}
      <span
        style={{
          fontSize: s.flow,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: accentColor,
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1,
          paddingLeft: "0.18em",
        }}
      >
        FLOW
      </span>

      {/* líneas + REAL ESTATE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: s.gap,
        }}
      >
        <span style={{ display: "block", width: s.lineW, height: "0.5px", background: subColor }} />
        <span
          style={{
            fontSize: s.sub,
            fontWeight: 400,
            letterSpacing: s.tracking,
            textTransform: "uppercase",
            color: subColor,
            fontFamily: "var(--font-body, 'Gilroy', sans-serif)",
            paddingLeft: s.tracking,
          }}
        >
          Real Estate
        </span>
        <span style={{ display: "block", width: s.lineW, height: "0.5px", background: subColor }} />
      </div>
    </div>
  );
}
