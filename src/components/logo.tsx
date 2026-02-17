import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { main: "text-lg", sub: "text-[7px] tracking-[0.35em]", gap: "mt-0.5" },
  md: { main: "text-2xl md:text-3xl", sub: "text-[9px] md:text-[10px] tracking-[0.4em]", gap: "mt-1" },
  lg: { main: "text-4xl md:text-5xl", sub: "text-[11px] md:text-[13px] tracking-[0.45em]", gap: "mt-1.5" },
};

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const colors = variant === "light"
    ? { main: "text-white", sub: "text-white/60", accent: "#002FA7" }
    : { main: "text-black", sub: "text-black/50", accent: "#002FA7" };
  const s = sizeMap[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`} translate="no">
      <span className={`${colors.main} ${s.main} font-serif tracking-[0.08em] leading-none font-normal`}>
        IBIZA <span style={{ color: colors.accent }}>FLOW</span>
      </span>
      <span
        className={`block ${colors.sub} ${s.sub} uppercase font-body ${s.gap}`}
        style={{ letterSpacing: undefined }}
      >
        Real Estate
      </span>
    </div>
  );
}
