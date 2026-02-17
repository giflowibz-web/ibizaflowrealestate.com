"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "es" | "en";

export const translations = {
  es: {
    // Navbar
    nav: {
      properties: "Propiedades",
      services: "Servicios",
      about: "Nosotros",
      contact: "Contacto",
      search: "Buscar",
    },
    // Hero
    hero: {
      tag: "Inmobiliaria de Lujo en Ibiza",
      title1: "Tu Vida",
      title2: "en Ibiza",
      subtitle: "Propiedades exclusivas en la isla más deseada del Mediterráneo",
      cta_primary: "Ver Propiedades",
      cta_secondary: "Contactar",
      scroll: "Descubrir",
    },
    // Stats
    stats: {
      tag: "Nuestros Números",
      title: "Líderes del Mercado en Ibiza",
      subtitle: "Más de una década ayudando a nuestros clientes a encontrar su paraíso en el Mediterráneo.",
      years: "Años de Experiencia",
      properties: "Propiedades Vendidas",
      clients: "Clientes Satisfechos",
      volume: "Volumen de Ventas",
      cta: "Conocer el Equipo",
    },
    // Listings
    listings: {
      tag: "Portfolio",
      title: "Propiedades Destacadas",
      subtitle: "Selección exclusiva de las mejores propiedades de lujo en Ibiza",
      view_all: "Ver Todas las Propiedades",
      no_properties: "No hay propiedades disponibles.",
      beds: "hab",
      baths: "baños",
      sqm: "m²",
      view: "Ver Propiedad",
      new: "Nuevo",
      exclusive: "Exclusiva",
    },
    // Christies blocks
    christies: {
      tag: "Nuestros Servicios",
      title: "Experiencia Inmobiliaria Completa",
      buy_title: "Comprar",
      buy_desc: "Acceso exclusivo a las mejores propiedades de Ibiza antes de salir al mercado. Asesoramiento personalizado para encontrar tu hogar ideal.",
      sell_title: "Vender",
      sell_desc: "Estrategia de marketing premium con alcance internacional para maximizar el valor de tu propiedad.",
      invest_title: "Invertir",
      invest_desc: "Análisis de mercado detallado y oportunidades de inversión con alto potencial de retorno en el mercado ibicenco.",
      manage_title: "Gestión",
      manage_desc: "Servicio integral de gestión de propiedades para optimizar tu inversión y garantizar una experiencia sin preocupaciones.",
      cta: "Más Información",
    },
    // Press
    press: {
      tag: "En los Medios",
      title: "Prensa y Noticias",
      read: "Leer Artículo",
      view_all: "Ver Toda la Prensa",
      items: [
        { publication: "Luxury Living", date: "Enero 2025", headline: "Ibiza Flow Real Estate: redefine el lujo inmobiliario en la isla blanca" },
        { publication: "Architectural Digest", date: "Marzo 2024", headline: "Las villas más espectaculares de Ibiza con vistas al Mediterráneo" },
        { publication: "Forbes", date: "Julio 2024", headline: "El mercado inmobiliario de lujo en Ibiza alcanza cifras récord en 2024" },
        { publication: "El País", date: "Noviembre 2024", headline: "Ibiza se consolida como destino premium para inversores internacionales" },
      ],
    },
    // Newsletter
    newsletter: {
      tag: "Únete",
      title: "Lista Exclusiva",
      subtitle: "Recibe acceso anticipado a propiedades exclusivas, actualizaciones del mercado y contenido VIP directamente en tu correo.",
      name: "Nombre Completo",
      phone: "Teléfono",
      email: "Email",
      consent: "Acepto ser contactado por Ibiza Flow Real Estate por teléfono, email y mensaje para servicios inmobiliarios. Puedes darte de baja en cualquier momento.",
      privacy: "Política de Privacidad",
      submit: "ENVIAR",
    },
    // CTA Inquiry
    cta: {
      tag: "Contacto",
      title: "¿Listo para Encontrar tu Propiedad Ideal?",
      subtitle: "Nuestro equipo de expertos está disponible para guiarte en cada paso del proceso.",
      name: "Nombre",
      email: "Email",
      phone: "Teléfono",
      message: "Mensaje",
      message_placeholder: "Cuéntanos qué tipo de propiedad buscas...",
      submit: "Enviar Consulta",
      sending: "Enviando...",
      success: "Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.",
    },
    // Footer
    footer: {
      tagline: "Propiedades exclusivas en la isla más deseada del Mediterráneo",
      properties: "Propiedades",
      for_sale: "En Venta",
      for_rent: "En Alquiler",
      new_dev: "Nueva Promoción",
      commercial: "Comercial",
      services: "Servicios",
      buy: "Comprar",
      sell: "Vender",
      invest: "Invertir",
      manage: "Gestionar",
      company: "Empresa",
      about: "Sobre Nosotros",
      team: "Equipo",
      press: "Prensa",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
      cookies: "Cookies",
    },
    // Property detail
    property: {
      back: "← Volver",
      exclusive: "Exclusiva",
      beds: "Habitaciones",
      baths: "Baños",
      sqm: "Metros",
      contact_title: "Consultar esta Propiedad",
      name: "Nombre",
      email: "Email",
      phone: "Teléfono",
      message: "Mensaje",
      message_default: "Me interesa esta propiedad y quisiera más información.",
      submit: "Enviar Consulta",
      sending: "Enviando...",
      features: "Características",
      description: "Descripción",
      location: "Ubicación",
    },
    // Common
    common: {
      loading: "Cargando...",
      error: "Error",
      close: "Cerrar",
    },
  },
  en: {
    // Navbar
    nav: {
      properties: "Properties",
      services: "Services",
      about: "About",
      contact: "Contact",
      search: "Search",
    },
    // Hero
    hero: {
      tag: "Luxury Real Estate in Ibiza",
      title1: "Your Life",
      title2: "in Ibiza",
      subtitle: "Exclusive properties on the most desired island in the Mediterranean",
      cta_primary: "View Properties",
      cta_secondary: "Contact Us",
      scroll: "Discover",
    },
    // Stats
    stats: {
      tag: "Our Numbers",
      title: "Market Leaders in Ibiza",
      subtitle: "Over a decade helping our clients find their paradise in the Mediterranean.",
      years: "Years of Experience",
      properties: "Properties Sold",
      clients: "Satisfied Clients",
      volume: "Sales Volume",
      cta: "Meet the Team",
    },
    // Listings
    listings: {
      tag: "Portfolio",
      title: "Featured Properties",
      subtitle: "Exclusive selection of the finest luxury properties in Ibiza",
      view_all: "View All Properties",
      no_properties: "No properties available.",
      beds: "beds",
      baths: "baths",
      sqm: "sqm",
      view: "View Property",
      new: "New",
      exclusive: "Exclusive",
    },
    // Christies blocks
    christies: {
      tag: "Our Services",
      title: "Complete Real Estate Experience",
      buy_title: "Buy",
      buy_desc: "Exclusive access to the best properties in Ibiza before they hit the market. Personalised guidance to find your ideal home.",
      sell_title: "Sell",
      sell_desc: "Premium marketing strategy with international reach to maximise the value of your property.",
      invest_title: "Invest",
      invest_desc: "Detailed market analysis and investment opportunities with high return potential in the Ibiza market.",
      manage_title: "Manage",
      manage_desc: "Comprehensive property management service to optimise your investment and guarantee a hassle-free experience.",
      cta: "Learn More",
    },
    // Press
    press: {
      tag: "In the Media",
      title: "Press & News",
      read: "Read Article",
      view_all: "View All Press",
      items: [
        { publication: "Luxury Living", date: "January 2025", headline: "Ibiza Flow Real Estate: redefining luxury real estate on the white island" },
        { publication: "Architectural Digest", date: "March 2024", headline: "The most spectacular Ibiza villas with Mediterranean views" },
        { publication: "Forbes", date: "July 2024", headline: "Ibiza's luxury real estate market reaches record figures in 2024" },
        { publication: "El País", date: "November 2024", headline: "Ibiza consolidates as a premium destination for international investors" },
      ],
    },
    // Newsletter
    newsletter: {
      tag: "Join Us",
      title: "Exclusive List",
      subtitle: "Receive early access to exclusive properties, market updates and VIP content directly to your inbox.",
      name: "Full Name",
      phone: "Phone",
      email: "Email",
      consent: "I agree to be contacted by Ibiza Flow Real Estate by phone, email and message for real estate services. You can unsubscribe at any time.",
      privacy: "Privacy Policy",
      submit: "SUBMIT",
    },
    // CTA Inquiry
    cta: {
      tag: "Contact",
      title: "Ready to Find Your Ideal Property?",
      subtitle: "Our team of experts is available to guide you through every step of the process.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      message_placeholder: "Tell us what type of property you are looking for...",
      submit: "Send Enquiry",
      sending: "Sending...",
      success: "Message sent successfully. We will be in touch with you soon.",
    },
    // Footer
    footer: {
      tagline: "Exclusive properties on the most desired island in the Mediterranean",
      properties: "Properties",
      for_sale: "For Sale",
      for_rent: "For Rent",
      new_dev: "New Development",
      commercial: "Commercial",
      services: "Services",
      buy: "Buy",
      sell: "Sell",
      invest: "Invest",
      manage: "Manage",
      company: "Company",
      about: "About Us",
      team: "Team",
      press: "Press",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
    },
    // Property detail
    property: {
      back: "← Back",
      exclusive: "Exclusive",
      beds: "Bedrooms",
      baths: "Bathrooms",
      sqm: "Square Metres",
      contact_title: "Enquire About This Property",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      message_default: "I am interested in this property and would like more information.",
      submit: "Send Enquiry",
      sending: "Sending...",
      features: "Features",
      description: "Description",
      location: "Location",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      close: "Close",
    },
  },
};

type Translations = typeof translations.es;

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("ibizaflow-lang") as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ibizaflow-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
