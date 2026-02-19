import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { ibiza: "text-[13px]", flow: "text-[22px]", sub: "text-[6.5px]", gap: "gap-[3px]", lineW: "16px" },
  md: { ibiza: "text-[15px]", flow: "text-[30px]", sub: "text-[7.5px]", gap: "gap-[4px]", lineW: "20px" },
  lg: { ibiza: "text-[18px]", flow: "text-[40px]", sub: "text-[9px]",   gap: "gap-[5px]", lineW: "26px" },
};

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const light = variant === "light";
  const s = sizeMap[size];

  return (
    <div className={`flex flex-col items-center select-none leading-none ${className}`} translate="no">

      {/* IBIZA pequeño arriba */}
      <span
        className={`font-sans font-light uppercase ${light ? "text-white/70" : "text-black/50"}`}
        style={{ fontSize: s.ibiza === "text-[13px]" ? "13px" : s.ibiza === "text-[15px]" ? "15px" : "18px", letterSpacing: "0.55em" }}
      >
        IBIZA
      </span>

        {/* FLOW grande */}
        <span
          className="font-serif font-normal"
          style={{
            fontSize: s.flow === "text-[22px]" ? "22px" : s.flow === "text-[30px]" ? "30px" : "40px",
            letterSpacing: "0.25em",
            marginTop: "-2px",
            color: "#002FA7",
          }}
        >
          FLOW
        </span>

      {/* línea + Real Estate */}
      <div className={`flex items-center ${s.gap}`} style={{ marginTop: "5px" }}>
        <span
          className={`block h-px ${light ? "bg-white/30" : "bg-black/20"}`}
          style={{ width: s.lineW }}
        />
        <span
          className={`font-sans font-light uppercase ${light ? "text-white/45" : "text-black/35"}`}
          style={{ fontSize: s.sub === "text-[6.5px]" ? "6.5px" : s.sub === "text-[7.5px]" ? "7.5px" : "9px", letterSpacing: "0.5em" }}
        >
          IBIZA &nbsp; REAL ESTATE
        </span>
        <span
          className={`block h-px ${light ? "bg-white/30" : "bg-black/20"}`}
          style={{ width: s.lineW }}
        />
      </div>

    </div>
  );
}
