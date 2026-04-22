"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';

export default function InquiryCTA() {
  const { lang } = useLang();
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [phone,   setPhone]   = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [done,    setDone]    = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1600));
    setSending(false);
    setDone(true);
  };

  return (
    <section
      id="contacto"
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(60px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes successIn {
          0%   { opacity:0; transform:scale(0.9); }
          70%  { transform:scale(1.02); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Fields */
        .lux-field { position:relative; }
        .lux-field label {
          display:block;
          font-size:0.52rem;
          letter-spacing:0.38em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.22);
          margin-bottom:10px;
          font-weight:500;
          transition: color 0.3s;
        }
        .lux-field:focus-within label {
          color:rgba(255,255,255,0.55);
        }
        .lux-field input,
        .lux-field textarea {
          width:100%;
          background:transparent;
          border:none;
          border-bottom:1px solid rgba(255,255,255,0.1);
          outline:none;
          color:#fff;
          font-size:0.95rem;
          font-weight:300;
          letter-spacing:0.03em;
          padding:8px 0 16px;
          font-family:inherit;
          transition:border-color 0.4s;
          caret-color: rgba(255,255,255,0.6);
        }
        .lux-field input:focus,
        .lux-field textarea:focus {
          border-bottom-color:rgba(255,255,255,0.08);
        }
        .lux-field input::placeholder,
        .lux-field textarea::placeholder {
          color:rgba(255,255,255,0.1);
          font-weight:300;
        }
        .lux-field textarea { resize:none; }

        /* Animated underline */
        .lux-field::after {
          content:'';
          position:absolute;
          bottom:0; left:0;
          height:1px; width:100%;
          background:rgba(255,255,255,0.7);
          transform:scaleX(0);
          transform-origin:left;
          transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .lux-field:focus-within::after {
          transform:scaleX(1);
        }

        /* Submit button */
        .lux-btn {
          width:100%;
          background:transparent;
          border:1px solid rgba(255,255,255,0.18);
          color:rgba(255,255,255,0.65);
          padding:18px 24px;
          font-size:0.52rem;
          letter-spacing:0.44em;
          text-transform:uppercase;
          font-weight:600;
          font-family:inherit;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:14px;
          transition:background 0.4s, border-color 0.4s, color 0.4s, letter-spacing 0.4s;
          position:relative;
          overflow:hidden;
        }
        .lux-btn::before {
          content:'';
          position:absolute;
          inset:0;
          background:rgba(255,255,255,0.04);
          opacity:0;
          transition:opacity 0.3s;
        }
        .lux-btn:hover:not(:disabled)::before { opacity:1; }
        .lux-btn:hover:not(:disabled) {
          border-color:rgba(255,255,255,0.5);
          color:#fff;
          letter-spacing:0.52em;
        }
        .lux-btn:disabled { opacity:0.4; cursor:not-allowed; }

        /* Direct contact links */
        .lux-contact-link {
          font-size:0.58rem;
          color:rgba(255,255,255,0.18);
          text-decoration:none;
          letter-spacing:0.08em;
          font-weight:300;
          transition:color 0.3s;
        }
        .lux-contact-link:hover { color:rgba(255,255,255,0.55); }

        @media (max-width:600px) {
          .lux-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/es-vedra-pool.jpg"
        alt="Es Vedrà"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 35%',
          zIndex: 0,
        }}
      />

      {/* Deep overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(2,2,8,0.55) 0%, rgba(2,2,8,0.78) 50%, rgba(2,2,8,0.65) 100%)',
      }} />
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(2,2,8,0.55) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 560,
        margin: '0 auto',
        padding: '80px 28px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(64px)',
        transition: 'opacity 1.3s cubic-bezier(0.22,1,0.36,1), transform 1.3s cubic-bezier(0.22,1,0.36,1)',
      }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 20, marginBottom: 36,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.6s ease 0.2s',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{
            fontSize: '0.5rem', letterSpacing: '0.42em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            {lang === 'es' ? 'Contacte con nosotros' : 'Get in touch'}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* Main headline */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(3.2rem, 6vw, 5rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.18)',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            {lang === 'es' ? 'Su vida' : 'Your life'}
          </h2>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(3.2rem, 6vw, 5rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            en Ibiza
          </h2>
        </div>

        {/* Subtitle */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.68rem',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.22)',
          lineHeight: 2,
          letterSpacing: '0.06em',
          marginBottom: 52,
          textTransform: 'uppercase',
        }}>
          {lang === 'es'
            ? 'Respuesta en menos de 24 h · Discreción absoluta'
            : 'Response within 24 h · Absolute discretion'}
        </p>

        {/* Glass card */}
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '48px 44px 44px',
        }}>

          {done ? (
            <div style={{
              textAlign: 'center', padding: '24px 0',
              animation: 'successIn 0.8s cubic-bezier(0.22,1,0.36,1) both',
            }}>
              {/* Check circle */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 32px',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,0.7)" strokeWidth="1.2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.8rem', fontWeight: 300, color: '#fff', marginBottom: 14,
                letterSpacing: '-0.01em',
              }}>
                {lang === 'es' ? 'Mensaje enviado' : 'Message sent'}
              </p>
              <p style={{
                fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)',
                lineHeight: 2, letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {lang === 'es'
                  ? 'Le contactaremos en breve con total discreción.'
                  : 'We will contact you shortly with complete discretion.'}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

              <div className="lux-field">
                <label>{lang === 'es' ? 'Nombre' : 'Name'}</label>
                <input
                  type="text" required
                  placeholder={lang === 'es' ? 'Su nombre completo' : 'Your full name'}
                  value={name} onChange={e => setName(e.target.value)}
                />
              </div>

              <div
                className="lux-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}
              >
                <div className="lux-field">
                  <label>Email</label>
                  <input
                    type="email" required placeholder="hello@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="lux-field">
                  <label>{lang === 'es' ? 'Teléfono' : 'Phone'}</label>
                  <input
                    type="tel" placeholder="+34 600 000 000"
                    value={phone} onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="lux-field">
                <label>{lang === 'es' ? 'Mensaje' : 'Message'}</label>
                <textarea
                  rows={3}
                  placeholder={lang === 'es'
                    ? '¿Qué tipo de propiedad busca?'
                    : 'What kind of property are you looking for?'}
                  value={message} onChange={e => setMessage(e.target.value)}
                />
              </div>

              <div style={{ paddingTop: 8 }}>
                <button type="submit" className="lux-btn" disabled={sending}>
                  {sending ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        style={{ animation: 'spin 0.9s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      {lang === 'es' ? 'Enviando…' : 'Sending…'}
                    </>
                  ) : (
                    lang === 'es' ? 'Enviar consulta' : 'Send enquiry'
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Direct contact */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: 40, marginTop: 32,
          flexWrap: 'wrap',
        }}>
          <a href="tel:+34600000000" className="lux-contact-link">
            +34 600 000 000
          </a>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)', alignSelf: 'center' }} />
          <a href="mailto:info@ibizaflowrealestate.com" className="lux-contact-link">
            info@ibizaflowrealestate.com
          </a>
        </div>

      </div>
    </section>
  );
}
