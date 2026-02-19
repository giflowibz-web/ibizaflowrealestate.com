import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";

  const sizes = {
    sm: { flow: 20, ibiza: 7,  sub: 5.5, spacing: 3,  lineW: 1,  infinityH: 13, infinityW: 22 },
    md: { flow: 30, ibiza: 9,  sub: 7,   spacing: 4,  lineW: 1.5, infinityH: 19, infinityW: 33 },
    lg: { flow: 42, ibiza: 11, sub: 8,   spacing: 5,  lineW: 2,  infinityH: 27, infinityW: 46 },
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
      {/* IBIZA */}
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

      {/* FLOW con ∞ como la O */}
      <span
        style={{
          fontFamily: "'Montserrat', 'Inter', sans-serif",
          fontSize: s.flow,
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: mainColor,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        FL
        <svg
          width={s.infinityW}
          height={s.infinityH}
          viewBox="0 0 44 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginTop: -s.flow * 0.04,
            marginLeft: s.flow * 0.01,
            marginRight: s.flow * 0.01,
          }}
        >
          <path
            d="M22 13C22 13 17.5 4 11 4C5.477 4 1 8.477 1 13C1 17.523 5.477 22 11 22C17.5 22 22 13 22 13Z"
            stroke={blue}
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M22 13C22 13 26.5 22 33 22C38.523 22 43 17.523 43 13C43 8.477 38.523 4 33 4C26.5 4 22 13 22 13Z"
            stroke={blue}
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
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
