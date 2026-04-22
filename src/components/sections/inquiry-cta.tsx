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
    await new Promise(r => setTimeout(r, 1500));
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
        @keyframes formIn {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes successIn {
          0%   { opacity:0; transform:scale(0.9); }
          65%  { transform:scale(1.02); }
          100% { opacity:1; transform:scale(1); }
        }

        .lf { position:relative; }
        .lf label {
          display:block;
          font-size:0.48rem;
          letter-spacing:0.4em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.35);
          margin-bottom:8px;
          font-weight:500;
          transition:color 0.3s;
        }
        .lf:focus-within label { color:rgba(255,255,255,0.7); }

        .lf input, .lf textarea {
          width:100%;
          background:transparent;
          border:none;
          border-bottom:1px solid rgba(255,255,255,0.18);
          outline:none;
          color:#fff;
          font-size:0.9rem;
          font-weight:300;
          letter-spacing:0.02em;
          padding:6px 0 13px;
          font-family:inherit;
          transition:border-color 0.35s;
          caret-color:#fff;
        }
        .lf input:focus, .lf textarea:focus {
          border-bottom-color:rgba(255,255,255,0.55);
        }
        .lf input::placeholder, .lf textarea::placeholder {
          color:rgba(255,255,255,0.18);
        }
        .lf textarea { resize:none; }

        /* White underline sweep on focus */
        .lf::after {
          content:'';
          position:absolute;
          bottom:0; left:0;
          height:1px; width:100%;
          background:#fff;
          transform:scaleX(0);
          transform-origin:left;
          transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .lf:focus-within::after { transform:scaleX(1); }

        .lf-btn {
          width:100%;
          background:rgba(255,255,255,0.07);
          border:1px solid rgba(255,255,255,0.25);
          color:rgba(255,255,255,0.7);
          padding:17px 24px;
          font-size:0.52rem;
          letter-spacing:0.45em;
          text-transform:uppercase;
          font-weight:600;
          font-family:inherit;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:14px;
          transition:all 0.35s ease;
          backdrop-filter:blur(4px);
        }
        .lf-btn:hover:not(:disabled) {
          background:rgba(255,255,255,0.14);
          border-color:rgba(255,255,255,0.55);
          color:#fff;
          letter-spacing:0.52em;
        }
        .lf-btn:disabled { opacity:0.45; cursor:not-allowed; }
      `}</style>

      {/* ── FOTO COMPLETA DE ES VEDRÀ ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/es-vedra-pool.jpg"
        alt="Es Vedrà, Ibiza"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 38%',
          zIndex: 0,
        }}
      />

      {/* Overlay — oscurece solo la zona del formulario, el resto respira */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `
          linear-gradient(
            to right,
            rgba(3,3,10,0.88) 0%,
            rgba(3,3,10,0.72) 28%,
            rgba(3,3,10,0.22) 58%,
            rgba(3,3,10,0.0) 100%
          )
        `,
      }} />
      {/* Degradado vertical suave abajo */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 160, zIndex: 1,
        background: 'linear-gradient(to top, rgba(3,3,10,0.5), transparent)',
      }} />

      {/* ── FORMULARIO sobre la foto ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1280,
        margin: '0 auto',
        padding: '100px 80px',
        display: 'flex',
        alignItems: 'center',
      }}>

        <div style={{
          width: 460,
          flexShrink: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(40px)',
          transition: 'opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{
              fontSize: '0.48rem', letterSpacing: '0.44em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              fontWeight: 500,
            }}>
              {lang === 'es' ? 'Contacte con nosotros' : 'Get in touch'}
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.4rem, 3.5vw, 4rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
              {lang === 'es' ? 'su ibiza' : 'your ibiza'}
            </span>
            <span style={{ color: '#fff' }}>
              {lang === 'es' ? ' le espera' : ' awaits'}
            </span>
          </h2>

          <p style={{
            fontSize: '0.62rem', fontWeight: 300,
            color: 'rgba(255,255,255,0.25)',
            lineHeight: 2, letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: 18, marginBottom: 44,
          }}>
            {lang === 'es'
              ? 'Respuesta en 24 h · Discreción absoluta'
              : 'Response within 24 h · Absolute discretion'}
          </p>

          {/* Formulario */}
          {done ? (

            <div style={{ animation: 'successIn 0.8s cubic-bezier(0.22,1,0.36,1) both' }}>
              <div style={{
                width: 58, height: 58, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.8rem', fontWeight: 300, color: '#fff', marginBottom: 12,
              }}>
                {lang === 'es' ? 'Mensaje enviado' : 'Message sent'}
              </p>
              <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', lineHeight: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {lang === 'es'
                  ? 'Le contactaremos en breve con total discreción.'
                  : 'We will contact you shortly with complete discretion.'}
              </p>
            </div>

          ) : (

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              <div className="lf">
                <label>{lang === 'es' ? 'Nombre' : 'Name'}</label>
                <input type="text" required
                  placeholder={lang === 'es' ? 'Su nombre completo' : 'Your full name'}
                  value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <div className="lf">
                  <label>Email</label>
                  <input type="email" required placeholder="hello@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="lf">
                  <label>{lang === 'es' ? 'Teléfono' : 'Phone'}</label>
                  <input type="tel" placeholder="+34 600 000 000"
                    value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="lf">
                <label>{lang === 'es' ? 'Mensaje' : 'Message'}</label>
                <textarea rows={3}
                  placeholder={lang === 'es' ? '¿Qué tipo de propiedad busca?' : 'What kind of property are you looking for?'}
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              <div style={{ paddingTop: 6 }}>
                <button type="submit" className="lf-btn" disabled={sending}>
                  {sending ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        style={{ animation: 'spin 0.8s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
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

          {/* Contacto directo */}
          <div style={{
            display: 'flex', gap: 28, marginTop: 36, flexWrap: 'wrap',
            paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            <a href="tel:+34600000000" style={{
              fontSize: '0.58rem', color: 'rgba(255,255,255,0.22)',
              textDecoration: 'none', letterSpacing: '0.06em', fontWeight: 300,
              transition: 'color 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
              +34 600 000 000
            </a>
            <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: '0.58rem' }}>·</span>
            <a href="mailto:info@ibizaflowrealestate.com" style={{
              fontSize: '0.58rem', color: 'rgba(255,255,255,0.22)',
              textDecoration: 'none', letterSpacing: '0.06em', fontWeight: 300,
              transition: 'color 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}>
              info@ibizaflowrealestate.com
            </a>
          </div>

        </div>

        {/* Label sobre la foto a la derecha */}
        <div style={{
          position: 'absolute',
          right: 80, bottom: 56,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 0.6s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.25)' }} />
            <span style={{
              fontSize: '0.44rem', letterSpacing: '0.36em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            }}>
              Es Vedrà · Ibiza
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 760px) {
          #contacto > div:last-child {
            padding: 80px 28px !important;
          }
          #contacto > div:last-child > div:first-child {
            width: 100% !important;
          }
        }
      `}</style>

    </section>
  );
}
