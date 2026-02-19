import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const isLight = variant === "light";
  const textColor = isLight ? "#FFFFFF" : "#0A0A0A";
  const subColor = isLight ? "rgba(255,255,255,0.5)" : "rgba(10,10,10,0.5)";
  const accentColor = "#002FA7";

  const sizes = {
    sm: { main: "1.05rem", sub: "0.42rem", block: 14, tracking: "0.28em" },
    md: { main: "1.6rem",  sub: "0.52rem", block: 20, tracking: "0.28em" },
    lg: { main: "2.2rem",  sub: "0.58rem", block: 26, tracking: "0.28em" },
  };

  const s = sizes[size];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        userSelect: "none",
        gap: 4,
      }}
    >
      {/* Main line: IBIZA [block] FLOW */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: s.main,
            fontWeight: 300,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: textColor,
            fontFamily: "'Montserrat', var(--font-body, sans-serif)",
            lineHeight: 1,
          }}
        >
          IBIZA
        </span>

        {/* Blue Klein vertical block */}
        <span
          style={{
            display: "inline-block",
            width: s.block * 0.35,
            height: s.block,
            background: accentColor,
            flexShrink: 0,
          }}
        />

        <span
          style={{
            fontSize: s.main,
            fontWeight: 800,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: accentColor,
            fontFamily: "'Montserrat', var(--font-body, sans-serif)",
            lineHeight: 1,
          }}
        >
          FLOW
        </span>
      </div>

      {/* Subtitle: REAL ESTATE */}
      <span
        style={{
          fontSize: s.sub,
          fontWeight: 400,
          letterSpacing: s.tracking,
          textTransform: "uppercase",
          color: subColor,
          fontFamily: "'Montserrat', var(--font-body, sans-serif)",
          paddingLeft: "0.1em",
        }}
      >
        Real Estate
      </span>
    </div>
  );
}
