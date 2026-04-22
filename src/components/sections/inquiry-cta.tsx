"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '@/lib/i18n';

export default function InquiryCTA() {
  const { lang } = useLang();
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);
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
    await new Promise(r => setTimeout(r, 1400));
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
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes ctaUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes checkPulse {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .cta-field {
          position: relative;
          padding-bottom: 2px;
        }
        .cta-field::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #fff;
          transition: width 0.4s ease;
        }
        .cta-field:focus-within::after { width: 100%; }

        .cta-field input,
        .cta-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          outline: none;
          color: #fff;
          font-size: 0.88rem;
          font-weight: 300;
          letter-spacing: 0.03em;
          padding: 8px 0 13px;
          font-family: inherit;
          transition: border-color 0.3s;
        }
        .cta-field input:focus,
        .cta-field textarea:focus {
          border-bottom-color: rgba(255,255,255,0.5);
        }
        .cta-field input::placeholder,
        .cta-field textarea::placeholder {
          color: rgba(255,255,255,0.2);
          font-style: italic;
        }
        .cta-field textarea { resize: none; }
        .cta-field label {
          display: block;
          font-size: 0.5rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 2px;
          font-weight: 500;
        }
      `}</style>

      {/* ── FOTO FONDO ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/es-vedra-pool.jpg"
        alt="Es Vedrà, Ibiza"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 40%',
          zIndex: 0,
        }}
      />

      {/* Overlay: oscuro en el centro izquierdo, abre hacia la derecha */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(105deg, rgba(3,3,8,0.93) 0%, rgba(3,3,8,0.82) 35%, rgba(3,3,8,0.4) 60%, rgba(3,3,8,0.05) 100%)',
      }} />

      {/* ── CONTENIDO ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1280,
        margin: '0 auto',
        padding: '110px 64px',
        display: 'grid',
        gridTemplateColumns: '440px 1fr',
        alignItems: 'center',
        gap: 0,
      }}>

        {/* ── FORMULARIO ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(36px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}>

          {/* Tag */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36,
          }}>
            <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.35)' }} />
            <span style={{
              fontSize: '0.52rem', letterSpacing: '0.42em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
            }}>
              {lang === 'es' ? 'Contacto Privado' : 'Private Enquiry'}
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.6rem, 4vw, 3.8rem)',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 14,
            letterSpacing: '-0.02em',
          }}>
            {lang === 'es' ? (
              <>Contacte<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>con nosotros</em></>
            ) : (
              <>Get in<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>touch</em></>
            )}
          </h2>

          <p style={{
            fontSize: '0.76rem', fontWeight: 300,
            color: 'rgba(255,255,255,0.32)',
            lineHeight: 1.9, marginBottom: 44,
            maxWidth: 340,
            letterSpacing: '0.01em',
          }}>
            {lang === 'es'
              ? 'Respuesta en menos de 24h. Discreción absoluta en cada consulta.'
              : 'Response within 24h. Absolute discretion on every enquiry.'}
          </p>

          {/* ── FORM o CONFIRMACIÓN ── */}
          {done ? (

            <div style={{ animation: 'checkPulse 0.6s ease both' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.5rem', fontWeight: 300, color: '#fff', marginBottom: 10,
              }}>
                {lang === 'es' ? 'Mensaje enviado' : 'Message sent'}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.32)', lineHeight: 1.8 }}>
                {lang === 'es'
                  ? 'Le contactaremos muy pronto.'
                  : 'We will be in touch very soon.'}
              </p>
            </div>

          ) : (

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>

              <div className="cta-field">
                <label>{lang === 'es' ? 'Nombre' : 'Name'}</label>
                <input type="text" required placeholder={lang === 'es' ? 'Su nombre completo' : 'Your full name'}
                  value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="cta-field">
                  <label>Email</label>
                  <input type="email" required placeholder="name@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="cta-field">
                  <label>{lang === 'es' ? 'Teléfono' : 'Phone'}</label>
                  <input type="tel" placeholder="+34 600 000 000"
                    value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="cta-field">
                <label>{lang === 'es' ? 'Mensaje' : 'Message'}</label>
                <textarea rows={3}
                  placeholder={lang === 'es' ? '¿Qué tipo de propiedad busca?' : 'What kind of property are you looking for?'}
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                style={{
                  marginTop: 4,
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: '#fff',
                  padding: '16px 32px',
                  fontSize: '0.58rem',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  width: '100%',
                  transition: 'background 0.3s, border-color 0.3s',
                  opacity: sending ? 0.6 : 1,
                }}
                onMouseEnter={e => {
                  if (!sending) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.7)';
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'none';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.35)';
                }}
              >
                {sending ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    {lang === 'es' ? 'Enviando' : 'Sending'}
                  </>
                ) : (
                  lang === 'es' ? 'Enviar consulta' : 'Send enquiry'
                )}
              </button>

            </form>
          )}

          {/* Contacto directo */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 6, marginTop: 32,
            paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            {[
              { label: '+34 600 000 000', href: 'tel:+34600000000' },
              { label: 'info@ibizaflowrealestate.com', href: 'mailto:info@ibizaflowrealestate.com' },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{
                fontSize: '0.65rem', color: 'rgba(255,255,255,0.22)',
                textDecoration: 'none', letterSpacing: '0.05em', fontWeight: 300,
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
                {item.label}
              </a>
            ))}
          </div>

        </div>
        {/* columna derecha: respira la foto */}
      </div>

      <style>{`
        @media (max-width: 800px) {
          #contacto > div:last-child {
            grid-template-columns: 1fr !important;
            padding: 80px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
