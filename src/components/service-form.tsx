"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";

interface ServiceFormProps {
  service: string;
  showDate?: boolean;
}

const ServiceForm = ({ service, showDate = false }: ServiceFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, ...form }),
    });
    setStatus(res.ok ? "success" : "error");
  };

  return (
    <div className="bg-[#0A0A0A] px-10 py-16 lg:px-16 lg:py-20 w-full">
      <span className="text-[#002FA7] text-[11px] uppercase tracking-[0.3em] font-bold block mb-4">
        Solicitar información
      </span>
      <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-2">
        Cuéntanos qué necesitas
      </h2>
      <p className="text-white/50 text-[13px] mb-10 leading-relaxed">
        Nos pondremos en contacto contigo en menos de 24 horas.
      </p>

      {status === "success" ? (
        <div className="border border-[#002FA7] p-8 text-center">
          <p className="text-white text-lg font-display font-light mb-2">Solicitud recibida</p>
          <p className="text-white/50 text-sm">Te contactaremos pronto en <span className="text-white">{form.email}</span></p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Nombre *</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handle}
                className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#002FA7] transition-colors placeholder:text-white/20"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Email *</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handle}
                className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#002FA7] transition-colors placeholder:text-white/20"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Teléfono</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handle}
                className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#002FA7] transition-colors placeholder:text-white/20"
                placeholder="+34 600 000 000"
              />
            </div>
            {showDate && (
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Fecha deseada</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handle}
                  className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#002FA7] transition-colors"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Mensaje</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handle}
              rows={4}
              className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#002FA7] transition-colors placeholder:text-white/20 resize-none"
              placeholder="Cuéntanos más detalles..."
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm">Ha habido un error. Inténtalo de nuevo.</p>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex items-center gap-3 bg-[#002FA7] text-white px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#0038c8] transition-colors duration-300 disabled:opacity-50"
            >
              {status === "loading" ? "Enviando..." : "Enviar solicitud"}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a href="mailto:info@ibizaflowrealestate.com" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[12px]">
              <Mail className="w-3.5 h-3.5" />
              info@ibizaflowrealestate.com
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

export default ServiceForm;
