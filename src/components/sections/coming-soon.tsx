"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source src="/hero-small.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

        {/* Logo / Brand */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-white/40" />
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-white/60">
              Exclusive Properties · Ibiza
            </span>
            <div className="h-px w-12 bg-white/40" />
          </div>
          <h1
            className="font-display text-6xl font-light italic text-white md:text-8xl"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}
          >
            Ibiza Flow
          </h1>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-white/50">
            Real Estate
          </p>
        </div>

        {/* Divider */}
        <div className="mb-10 h-px w-16 bg-white/30" />

        {/* Message */}
        <p
          className="mb-2 font-display text-2xl font-light text-white md:text-3xl"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.5)" }}
        >
          Something exceptional is coming.
        </p>
        <p className="mb-12 font-body text-sm text-white/60 tracking-widest uppercase">
          Our new website is under construction
        </p>

        {/* Email form */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-8 bg-white/40" />
            <p className="font-body text-sm uppercase tracking-[0.3em] text-white/80">
              Thank you. We will be in touch.
            </p>
            <div className="h-px w-8 bg-white/40" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border border-white/30 bg-white/10 px-5 py-3 font-body text-sm text-white placeholder-white/40 backdrop-blur-sm outline-none transition focus:border-white/70 focus:bg-white/15"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="border border-white bg-white px-8 py-3 font-body text-xs uppercase tracking-[0.3em] text-black transition hover:bg-transparent hover:text-white disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Notify Me"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 font-body text-xs text-red-400 tracking-widest uppercase">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Bottom tagline */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <p className="font-body text-[9px] uppercase tracking-[0.5em] text-white/30">
            Ibiza · Formentera · Balearic Islands
          </p>
        </div>
      </div>
    </section>
  );
}
