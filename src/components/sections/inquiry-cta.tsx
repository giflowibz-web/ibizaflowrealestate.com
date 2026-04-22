"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';

const INTEREST_OPTIONS = [
  { es: "Comprar propiedad",    en: "Buy a property" },
  { es: "Alquilar propiedad",   en: "Rent a property" },
  { es: "Invertir en Ibiza",    en: "Invest in Ibiza" },
  { es: "Vender mi propiedad",  en: "Sell my property" },
];

const BUDGET_OPTIONS = [
  { es: "Hasta 1M €",          en: "Up to €1M" },
  { es: "1M – 3M €",           en: "€1M – €3M" },
  { es: "3M – 6M €",           en: "€3M – €6M" },
  { es: "+ 6M €",              en: "Over €6M" },
];

export default function InquiryCTA() {
  const { lang } = useLang();
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    setStep(3);
  };

  const iL = lang === 'es' ? 'es' : 'en';

  return (
    <section
      id="contacto"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.85); opacity: 0.8; }
          100% { transform: scale(1.5);  opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }

        .cta-inp {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          outline: none;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 300;
          padding: 10px 0 12px;
          font-family: inherit;
          transition: border-color 0.3s;
        }
        .cta-inp:focus { border-bottom-color: #fff; }
        .cta-inp::placeholder { color: rgba(255,255,255,0.22); }
        .cta-inp-wrap label {
          display: block;
          font-size: 0.55rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
        }

        .pill-btn {
          padding: 10px 18px;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 400;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.22s;
          font-family: inherit;
        }
        .pill-btn:hover {
          border-color: rgba(255,255,255,0.55);
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
        .pill-btn.sel {
          border-color: #fff;
          background: rgba(255,255,255,0.12);
          color: #fff;
        }

        .cta-submit {
          width: 100%;
          background: #fff;
          color: #0a0a0a;
          border: none;
          padding: 17px 32px;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: background 0.25s, color 0.25s;
          position: relative;
          overflow: hidden;
        }
        .cta-submit:hover {
          background: #1847E8;
          color: #fff;
        }
        .cta-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      {/* ── FONDO: foto Es Vedrà con overlay gradiente ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/servicios-real-estate.jpg"
          alt="Servicios inmobiliarios Ibiza"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Overlay oscuro izquierda para el formulario, abre la imagen a la derecha */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(100deg, rgba(4,4,10,0.97) 0%, rgba(4,4,10,0.88) 42%, rgba(4,4,10,0.45) 68%, rgba(4,4,10,0.15) 100%)',
        }} />
      </div>

      {/* ── CONTENIDO ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1280,
        margin: '0 auto',
        padding: '100px 24px',
        display: 'grid',
        gridTemplateColumns: '480px 1fr',
        gap: 0,
        alignItems: 'center',
      }}>

        {/* ── COLUMNA IZQUIERDA: formulario ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(36px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>

          {/* Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontSize: '0.56rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
              {lang === 'es' ? 'Contacto Privado' : 'Private Enquiry'}
            </span>
          </div>

          {/* Título */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: '-0.01em',
          }}>
            {lang === 'es' ? (
              <>Su vida<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>en Ibiza</em></>
            ) : (
              <>Your life<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>in Ibiza</em></>
            )}
          </h2>

          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.85, marginBottom: 40, fontWeight: 300, maxWidth: 360 }}>
            {lang === 'es'
              ? 'Nuestro equipo le responde en menos de 24 horas con total discreción.'
              : 'Our team responds within 24 hours with complete discretion.'}
          </p>

          {/* ── Formulario card ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '36px 36px 32px',
          }}>

            {/* Step dots */}
            {step < 3 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
                {[1, 2].map(s => (
                  <React.Fragment key={s}>
                    <div style={{
                      width: s === step ? 20 : 6,
                      height: 3,
                      background: s <= step ? '#fff' : 'rgba(255,255,255,0.15)',
                      transition: 'all 0.4s ease',
                    }} />
                  </React.Fragment>
                ))}
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', marginLeft: 6 }}>
                  {step}/2
                </span>
              </div>
            )}

            {/* ── PASO 1 ── */}
            {step === 1 && (
              <div key="step1">
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', marginBottom: 20 }}>
                  {lang === 'es' ? '¿Cómo podemos ayudarle?' : 'How can we help you?'}
                </p>

                {/* Interest pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {INTEREST_OPTIONS.map(opt => (
                    <button
                      key={opt.es}
                      type="button"
                      className={`pill-btn${interest === opt[iL] ? ' sel' : ''}`}
                      onClick={() => setInterest(opt[iL])}
                    >
                      {opt[iL]}
                    </button>
                  ))}
                </div>

                {/* Budget pills */}
                <p style={{ fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>
                  {lang === 'es' ? 'Presupuesto' : 'Budget'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                  {BUDGET_OPTIONS.map(opt => (
                    <button
                      key={opt.es}
                      type="button"
                      className={`pill-btn${budget === opt[iL] ? ' sel' : ''}`}
                      onClick={() => setBudget(opt[iL])}
                    >
                      {opt[iL]}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="cta-submit"
                  onClick={() => interest && setStep(2)}
                  style={{ opacity: interest ? 1 : 0.35, cursor: interest ? 'pointer' : 'not-allowed' }}
                >
                  {lang === 'es' ? 'Continuar' : 'Continue'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            )}

            {/* ── PASO 2 ── */}
            {step === 2 && (
              <form key="step2" onSubmit={handleSubmit}>
                <button type="button" onClick={() => setStep(1)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: 0, marginBottom: 20, fontFamily: 'inherit',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {lang === 'es' ? 'Volver' : 'Back'}
                </button>

                {/* Selección previa */}
                {interest && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '5px 12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{interest}</span>
                    {budget && <>
                      <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                      <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{budget}</span>
                    </>}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 28 }}>
                  <div className="cta-inp-wrap">
                    <label>{lang === 'es' ? 'Nombre completo' : 'Full name'}</label>
                    <input className="cta-inp" type="text" required placeholder="Alexandra Rousseau" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div className="cta-inp-wrap">
                      <label>Email</label>
                      <input className="cta-inp" type="email" required placeholder="a@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="cta-inp-wrap">
                      <label>{lang === 'es' ? 'Teléfono' : 'Phone'}</label>
                      <input className="cta-inp" type="tel" placeholder="+33 6 00 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div className="cta-inp-wrap">
                    <label>{lang === 'es' ? 'Mensaje (opcional)' : 'Message (optional)'}</label>
                    <textarea className="cta-inp" rows={3} style={{ resize: 'none' }}
                      placeholder={lang === 'es' ? 'Cuéntenos qué busca…' : 'Tell us what you are looking for…'}
                      value={message} onChange={e => setMessage(e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="cta-submit" disabled={sending}>
                  {sending ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.9s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      {lang === 'es' ? 'Enviando…' : 'Sending…'}
                    </>
                  ) : (
                    <>
                      {lang === 'es' ? 'Enviar consulta' : 'Send enquiry'}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>

                <p style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.18)', textAlign: 'center', marginTop: 14, lineHeight: 1.7, letterSpacing: '0.05em' }}>
                  {lang === 'es' ? 'Discreción absoluta. Sus datos nunca se comparten.' : 'Absolute discretion. Your data is never shared.'}
                </p>
              </form>
            )}

            {/* ── PASO 3: Confirmación ── */}
            {step === 3 && (
              <div key="step3" style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                {/* Check animado */}
                <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 28px' }}>
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.4)',
                    animation: 'pulseRing 1.6s ease-out forwards',
                  }} />
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.06)',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>

                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.5rem', fontWeight: 300, color: '#fff', marginBottom: 10,
                }}>
                  {lang === 'es' ? 'Consulta recibida' : 'Enquiry received'}
                </p>
                <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, marginBottom: 28 }}>
                  {lang === 'es'
                    ? 'Le contactaremos en menos de 24 horas.'
                    : 'We will contact you within 24 hours.'}
                </p>
                {(interest || budget) && (
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
                    {interest}{budget && ` · ${budget}`}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Contacto directo */}
          <div style={{ display: 'flex', gap: 28, marginTop: 24 }}>
            {[
              { label: '+34 600 000 000', href: 'tel:+34600000000' },
              { label: 'info@ibizaflowrealestate.com', href: 'mailto:info@ibizaflowrealestate.com' },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{
                fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)',
                textDecoration: 'none', letterSpacing: '0.04em',
                transition: 'color 0.25s', fontWeight: 300,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── COLUMNA DERECHA: vacía — la foto respira aquí ── */}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 860px) {
          #contacto > div { grid-template-columns: 1fr !important; }
          #contacto > div > div:first-child { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
