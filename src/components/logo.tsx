import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { ibiza: 17, flow: 19, sub: 6, lineW: 16, gap: 4 },
    md: { ibiza: 21, flow: 24, sub: 7, lineW: 22, gap: 5 },
    lg: { ibiza: 27, flow: 31, sub: 8.5, lineW: 28, gap: 6 },
  };
  const s = sizes[size];

  const ibizaColor = light ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const flowColor  = "#002FA7";
  const subColor   = light ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)";
  const lineColor  = light ? "rgba(255,255,255,0.25)" : "rgba(0,47,167,0.2)";

  return (
    <div
      className={`flex flex-col items-center select-none leading-none ${className}`}
      translate="no"
    >
      {/* IBIZA · FLOW */}
      <div className="flex items-baseline" style={{ gap: "0.3em" }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: s.ibiza,
            fontWeight: 300,
            letterSpacing: "0.38em",
            color: ibizaColor,
          }}
        >
          IBIZA
        </span>

        <span
          style={{
            fontSize: s.ibiza * 0.45,
            color: flowColor,
            opacity: 0.6,
            letterSpacing: 0,
            alignSelf: "center",
            marginBottom: 1,
          }}
        >
          ·
        </span>

        <span
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: s.flow,
            fontWeight: 700,
            letterSpacing: "0.32em",
            color: flowColor,
          }}
        >
          FLOW
        </span>
      </div>

      {/* línea + REAL ESTATE */}
      <div className="flex items-center" style={{ gap: s.gap, marginTop: 4 }}>
        <span
          style={{
            display: "block",
            height: "0.5px",
            width: s.lineW,
            background: lineColor,
          }}
        />
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 300,
            fontSize: s.sub,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: subColor,
          }}
        >
          REAL ESTATE
        </span>
        <span
          style={{
            display: "block",
            height: "0.5px",
            width: s.lineW,
            background: lineColor,
          }}
        />
      </div>
    </div>
  );
}
