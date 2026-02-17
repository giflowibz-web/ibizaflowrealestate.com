"use client";

import React from "react";
import { useLang } from "@/lib/i18n";
import Logo from "../logo";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10">
      <div className="container">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="h-8 w-auto text-white mb-6" />
            <p className="text-white/50 text-sm leading-relaxed font-body max-w-[260px]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold mb-6">{t.footer.properties}</h4>
            <ul className="space-y-3">
              {[t.footer.for_sale, t.footer.for_rent, t.footer.new_dev, t.footer.commercial].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white text-sm font-body transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold mb-6">{t.footer.services}</h4>
            <ul className="space-y-3">
              {[t.footer.buy, t.footer.sell, t.footer.invest, t.footer.manage].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white text-sm font-body transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold mb-6">{t.footer.company}</h4>
            <ul className="space-y-3">
              {[t.footer.about, t.footer.team, t.footer.press, t.footer.contact].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white text-sm font-body transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-body">
            © {new Date().getFullYear()} Ibiza Flow Real Estate. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map((item) => (
              <a key={item} href="#" className="text-white/30 hover:text-white/60 text-xs font-body transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
