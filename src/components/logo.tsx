import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { main: "text-xl", sub: "text-[7px] tracking-[0.45em]", gap: "mt-[5px]", line: "w-6" },
  md: { main: "text-3xl md:text-4xl", sub: "text-[9px] tracking-[0.5em]", gap: "mt-[7px]", line: "w-8" },
  lg: { main: "text-5xl md:text-6xl", sub: "text-[11px] tracking-[0.55em]", gap: "mt-[10px]", line: "w-10" },
};

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const colors = variant === "light"
    ? { main: "text-white", sub: "text-white/50", accent: "#002FA7", line: "bg-white/25" }
    : { main: "text-[#0a0a0a]", sub: "text-black/40", accent: "#002FA7", line: "bg-black/20" };
  const s = sizeMap[size ?? "sm"];

  return (
    <div className={`flex flex-col items-center select-none ${className}`} translate="no">
      <span
        className={`${colors.main} ${s.main} font-serif leading-none font-normal`}
        style={{ letterSpacing: "0.12em" }}
      >
        IBIZA <span style={{ color: colors.accent, fontStyle: "italic" }}>Flow</span>
      </span>
      <div className={`flex items-center gap-2 ${s.gap}`}>
        <span className={`h-px ${s.line} ${colors.line}`} />
        <span className={`${colors.sub} ${s.sub} uppercase font-light tracking-widest`}>
          Real Estate
        </span>
        <span className={`h-px ${s.line} ${colors.line}`} />
      </div>
    </div>
  );
}
