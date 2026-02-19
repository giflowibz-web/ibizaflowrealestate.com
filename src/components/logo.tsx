import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { ibiza: 18, flow: 20, sub: 6.5, lineW: 18, gap: 4 },
    md: { ibiza: 22, flow: 25, sub: 7.5, lineW: 24, gap: 5 },
    lg: { ibiza: 28, flow: 32, sub: 9,   lineW: 30, gap: 6 },
  };
  const s = sizes[size];

  return (
    <div
      className={`flex flex-col items-center select-none leading-none ${className}`}
      translate="no"
    >
      {/* IBIZA · FLOW en una línea */}
      <div className="flex items-baseline gap-[0.35em]">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: s.ibiza,
            fontWeight: 300,
            letterSpacing: "0.35em",
            color: light ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.85)",
          }}
        >
          IBIZA
        </span>

        {/* separador punto dorado */}
        <span
          style={{
            fontSize: s.ibiza * 0.5,
            color: "#C9A96E",
            letterSpacing: 0,
            lineHeight: 1,
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
              letterSpacing: "0.3em",
              background: "linear-gradient(135deg, #C9A96E 0%, #F0D080 45%, #C9A96E 75%, #A07840 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FLOW
          </span>
      </div>

      {/* línea dorada + subtítulo */}
      <div
        className="flex items-center"
        style={{ gap: s.gap, marginTop: 5 }}
      >
        <span
          style={{
            display: "block",
            height: 1,
            width: s.lineW,
            background: "linear-gradient(90deg, transparent, #C9A96E)",
          }}
        />
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 300,
            fontSize: s.sub,
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: light ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)",
          }}
        >
          REAL ESTATE
        </span>
        <span
          style={{
            display: "block",
            height: 1,
            width: s.lineW,
            background: "linear-gradient(90deg, #C9A96E, transparent)",
          }}
        />
      </div>
    </div>
  );
}
