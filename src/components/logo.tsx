import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { main: 20, sub: 6, bar: 1.5, barW: 18 },
    md: { main: 28, sub: 7.5, bar: 1.5, barW: 24 },
    lg: { main: 38, sub: 9, bar: 2, barW: 32 },
  };
  const s = sizes[size];

  const white = "#ffffff";
  const black = "#0a0a0a";
  const blue = "#002FA7";

  const mainColor = light ? white : black;
  const subColor = light ? "rgba(255,255,255,0.5)" : "rgba(10,10,10,0.45)";

  return (
    <div
      className={`flex flex-col select-none ${className}`}
      translate="no"
      style={{ lineHeight: 1, gap: 0 }}
    >
      {/* Top row: IBIZA + barra azul */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
        <span
          style={{
            fontFamily: "'Montserrat', 'Inter', sans-serif",
            fontSize: s.sub,
            fontWeight: 300,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: subColor,
          }}
        >
          IBIZA
        </span>
        <span
          style={{
            display: "inline-block",
            width: s.barW,
            height: s.bar,
            backgroundColor: blue,
            flexShrink: 0,
          }}
        />
      </div>

      {/* FLOW — protagonista */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.main,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: mainColor,
          lineHeight: 1,
        }}
      >
        FL
        <span style={{ color: blue }}>O</span>
        W
      </span>

      {/* REAL ESTATE */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.sub,
          fontWeight: 300,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: subColor,
          marginTop: 4,
        }}
      >
        REAL ESTATE
      </span>
    </div>
  );
}
