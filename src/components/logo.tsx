import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const logoSrc = variant === "dark" ? "/logo-negro-trimmed.png" : "/logo-blanco-trimmed.png";

  const sizes = {
    sm:   { width: 75, height: 30 },
    md:   { width: 110, height: 44 },
    lg:   { width: 200, height: 80 },
    hero: { width: 160, height: 64 },
  };

  const s = sizes[size];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      <Image
        src={logoSrc}
        alt="Ibiza Flow Real Estate"
        width={s.width}
        height={s.height}
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
