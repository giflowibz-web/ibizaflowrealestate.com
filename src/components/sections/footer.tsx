"use client";

import React from "react";
import { useLang } from "@/lib/i18n";
import Logo from "../logo";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main footer */}
      <div className="container pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/8">

          {/* Brand - spans 2 cols */}
          <div className="lg:col-span-2">
            <Logo className="h-8 w-auto text-white mb-6" />
            <p className="text-white/40 text-[13px] leading-relaxed font-body max-w-[260px] mb-8">
              {t.footer.tagline}
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {['IG', 'FB', 'LI'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-[10px] font-bold text-white/40 hover:border-[#002FA7] hover:text-[#002FA7] transition-all duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6">{t.footer.properties}</h4>
            <ul className="space-y-3">
              {[t.footer.for_sale, t.footer.for_rent, t.footer.new_dev, t.footer.commercial].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-[13px] font-body transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6">{t.footer.services}</h4>
            <ul className="space-y-3">
              {[t.footer.buy, t.footer.sell, t.footer.invest, t.footer.manage].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-[13px] font-body transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6">{t.footer.company}</h4>
            <ul className="space-y-3 mb-8">
              {[t.footer.about, t.footer.team, t.footer.press, t.footer.contact].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-[13px] font-body transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <p className="text-white/30 text-[11px] font-body">+34 600 000 000</p>
              <p className="text-white/30 text-[11px] font-body">info@ibizaflowrealestate.com</p>
              <p className="text-white/30 text-[11px] font-body">Ibiza, Islas Baleares</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[11px] font-body">
            © {new Date().getFullYear()} Ibiza Flow Real Estate. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map((item) => (
              <a key={item} href="#" className="text-white/20 hover:text-white/50 text-[11px] font-body transition-colors">
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
