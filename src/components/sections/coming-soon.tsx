"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Logo from "@/components/logo";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from("coming_soon_emails").insert({ email });
      if (error) throw error;
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video fullscreen */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      >
        <source src="/hero-small.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — más denso abajo para el texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />

      {/* Línea decorativa top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)" }}
      />

      {/* Contenido centrado */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      >
        {/* Supratítulo */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px w-10 bg-white/30" />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Exclusive Properties · Ibiza
          </span>
          <div className="h-px w-10 bg-white/30" />
        </div>

        {/* Logo principal — igual que en la navbar */}
        <Logo variant="light" size="lg" />

        {/* Divider */}
        <div className="my-10 h-px w-14 bg-white/25" />

        {/* Mensaje */}
        <p
          style={{
            fontFamily: "'Playfair Display', 'Didot', Georgia, serif",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.04em",
            marginBottom: "0.5rem",
            textShadow: "0 1px 30px rgba(0,0,0,0.5)",
          }}
        >
          Something exceptional is coming.
        </p>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "2.5rem",
          }}
        >
          Our new website is under construction
        </p>

        {/* Formulario email */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-8 bg-white/30" />
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Thank you. We will be in touch.
            </p>
            <div className="h-px w-8 bg-white/30" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
              }}
              className="flex-1 border border-white/25 bg-white/8 px-5 py-3 text-white placeholder-white/35 backdrop-blur-sm outline-none transition focus:border-white/60 focus:bg-white/12"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
              className="border border-white bg-white px-8 py-3 text-black transition hover:bg-transparent hover:text-white disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Notify Me"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p
            className="mt-3 text-red-400"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Something went wrong. Please try again.
          </p>
        )}

        {/* Tagline inferior */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            Ibiza · Formentera · Balearic Islands
          </p>
        </div>
      </div>

      {/* Línea decorativa bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
      />
    </section>
  );
}
