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

  const sizes = {
    sm:   { ibiza: "0.62rem", flow: "0.72rem", sub: "0.38rem", gap: 6,  tracking: "0.35em", subTracking: "0.45em" },
    md:   { ibiza: "0.9rem",  flow: "1.05rem", sub: "0.45rem", gap: 8,  tracking: "0.32em", subTracking: "0.42em" },
    lg:   { ibiza: "1.1rem",  flow: "1.3rem",  sub: "0.5rem",  gap: 10, tracking: "0.30em", subTracking: "0.40em" },
    hero: { ibiza: "1.4rem",  flow: "5.5rem",  sub: "0.62rem", gap: 4,  tracking: "0.55em", subTracking: "0.50em" },
  };

  const s = sizes[size];

  if (size === "hero") {
    return (
      <div
        className={className}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "none",
          textAlign: "center",
        }}
      >
        {/* IBIZA — small, spaced */}
        <span
          style={{
            fontSize: s.ibiza,
            fontWeight: 300,
            letterSpacing: s.tracking,
            textTransform: "uppercase",
            color: subColor,
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1,
            marginBottom: "0.4rem",
          }}
        >
          IBIZA
        </span>

        {/* FLOW — massive serif */}
        <span
          style={{
            fontSize: s.flow,
            fontWeight: 300,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: textColor,
            fontFamily: "'Playfair Display', 'Georgia', serif",
            lineHeight: 0.9,
          }}
        >
          FLOW
        </span>

        {/* Thin line */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: isLight ? "rgba(255,255,255,0.25)" : "rgba(10,10,10,0.2)",
            margin: "1rem 0 0.8rem",
          }}
        />

        {/* REAL ESTATE */}
        <span
          style={{
            fontSize: s.sub,
            fontWeight: 400,
            letterSpacing: s.subTracking,
            textTransform: "uppercase",
            color: subColor,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Real Estate
        </span>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        userSelect: "none",
        gap: s.gap,
      }}
    >
      {/* Main: IBIZA · FLOW */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span
          style={{
            fontSize: s.ibiza,
            fontWeight: 300,
            letterSpacing: s.tracking,
            textTransform: "uppercase",
            color: subColor,
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1,
          }}
        >
          IBIZA
        </span>
        <span style={{ color: subColor, fontSize: s.ibiza, lineHeight: 1 }}>·</span>
        <span
          style={{
            fontSize: s.flow,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: textColor,
            fontFamily: "'Playfair Display', 'Georgia', serif",
            lineHeight: 1,
          }}
        >
          FLOW
        </span>
      </div>

      {/* REAL ESTATE */}
      <span
        style={{
          fontSize: s.sub,
          fontWeight: 400,
          letterSpacing: s.subTracking,
          textTransform: "uppercase",
          color: subColor,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Real Estate
      </span>
    </div>
  );
}
