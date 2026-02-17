import React from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import Logo from "@/components/logo";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-foreground py-16 lg:py-24 border-t border-border">
      <div className="container mx-auto px-[6%] max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">CONTACTO</h4>
            <div className="space-y-2">
              <p className="font-body text-[1rem] leading-relaxed">
                Ibiza Flow Real Estate
              </p>
              <a 
                href="tel:+34971000000" 
                className="block font-body text-[1rem] hover:text-[#002FA7] transition-colors duration-300"
              >
                +34 971 000 000
              </a>
              <a 
                href="mailto:info@ibizaflow.com" 
                className="block font-body text-[1rem] hover:text-[#002FA7] transition-colors duration-300"
              >
                info@ibizaflow.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">OFICINA</h4>
            <div className="space-y-2">
              <p className="font-body text-[1rem] leading-relaxed whitespace-pre-line">
                Paseo Maritimo, s/n{"\n"}
                07800 Ibiza, Baleares{"\n"}
                Espana
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">NAVEGACION</h4>
            <ul className="space-y-3">
              <li><a href="/propiedades" className="font-body text-[0.9375rem] hover:text-[#002FA7] transition-colors duration-300">Propiedades</a></li>
              <li><a href="/servicios" className="font-body text-[0.9375rem] hover:text-[#002FA7] transition-colors duration-300">Servicios</a></li>
              <li><a href="/zonas" className="font-body text-[0.9375rem] hover:text-[#002FA7] transition-colors duration-300">Zonas de Ibiza</a></li>
              <li><a href="/contacto" className="font-body text-[0.9375rem] hover:text-[#002FA7] transition-colors duration-300">Contacto</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-accent-caps text-[0.875rem] font-bold tracking-[0.2em] mb-6">SIGUENOS</h4>
            <div className="flex gap-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-[#002FA7] transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-[#002FA7] transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-[#002FA7] transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border mb-8"></div>

        <div className="space-y-6 text-muted-foreground text-[0.75rem] leading-[1.8] font-body">
          <p className="max-w-[1200px]">
            Toda la informacion proporcionada se ha obtenido de fuentes consideradas fiables, pero puede estar sujeta a errores, omisiones, cambio de precio, venta previa o retirada sin previo aviso. Ibiza Flow Real Estate no hace ninguna representacion, garantia o aval en cuanto a la exactitud de la informacion contenida en este sitio.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Logo variant="dark" size="sm" />
              <span className="text-[0.75rem] text-muted-foreground">
                &copy; {new Date().getFullYear()} Ibiza Flow Real Estate. Todos los derechos reservados.
              </span>
            </div>
          
          <div className="flex gap-6 text-[0.75rem] text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Politica de Privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Aviso Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
