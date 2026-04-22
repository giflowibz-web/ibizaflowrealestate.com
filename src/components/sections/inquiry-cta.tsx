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
      { threshold: 0.1 }
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
      style={{ position: 'relative', width: '100%', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden' }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(48px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes successIn {
          0%   { opacity:0; transform:scale(0.88); }
          70%  { transform:scale(1.03); }
          100% { opacity:1; transform:scale(1); }
        }

        .cf { position:relative; }
        .cf label {
          display:block;
          font-size:0.48rem; letter-spacing:0.4em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.3);
          margin-bottom:6px; font-weight:500;
        }
        .cf input, .cf textarea {
          width:100%; background:transparent;
          border:none; border-bottom:1px solid rgba(255,255,255,0.12);
          outline:none; color:#fff;
          font-size:0.9rem; font-weight:300;
          letter-spacing:0.02em;
          padding:6px 0 14px;
          font-family:inherit;
          transition:border-color 0.35s;
        }
        .cf input:focus, .cf textarea:focus {
          border-bottom-color:rgba(255,255,255,0.55);
        }
        .cf input::placeholder, .cf textarea::placeholder {
          color:rgba(255,255,255,0.15);
        }
        .cf textarea { resize:none; }
        .cf::after {
          content:'';
          position:absolute; bottom:0; left:0;
          height:1px; width:0; background:#fff;
          transition:width 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .cf:focus-within::after { width:100%; }

        .send-btn {
          width:100%;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.22);
          color:rgba(255,255,255,0.8);
          padding:16px 24px;
          font-size:0.56rem; letter-spacing:0.42em;
          text-transform:uppercase; font-weight:600;
          font-family:inherit; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:14px;
          transition:background 0.3s, border-color 0.3s, color 0.3s;
          backdrop-filter:blur(8px);
        }
        .send-btn:hover:not(:disabled) {
          background:rgba(255,255,255,0.13);
          border-color:rgba(255,255,255,0.6);
          color:#fff;
        }
        .send-btn:disabled { opacity:0.5; cursor:not-allowed; }
      `}</style>

      {/* ── FOTO FONDO a pantalla completa ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/es-vedra-pool.jpg"
        alt="Es Vedrà"
        style={{
          position:'absolute', inset:0,
          width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'center 35%',
          zIndex:0,
        }}
      />

      {/* Overlay suave — la foto respira, solo oscurece levemente el centro */}
      <div style={{
        position:'absolute', inset:0, zIndex:1,
        background:'radial-gradient(ellipse 80% 90% at 50% 50%, rgba(2,2,6,0.72) 0%, rgba(2,2,6,0.35) 60%, rgba(2,2,6,0.1) 100%)',
      }} />
      {/* Banda oscura solo abajo para anclar la sección */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:180, zIndex:1,
        background:'linear-gradient(to top, rgba(2,2,6,0.6), transparent)',
      }} />

      {/* ── CARD CENTRAL ── */}
      <div style={{
        position:'relative', zIndex:2,
        width:'100%', maxWidth:540,
        margin:'0 auto',
        padding:'0 24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(52px)',
        transition:'opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)',
      }}>

        {/* Eyebrow */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'center', gap:16, marginBottom:28,
        }}>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.15)' }} />
          <span style={{
            fontSize:'0.48rem', letterSpacing:'0.44em',
            textTransform:'uppercase', color:'rgba(255,255,255,0.4)',
            fontWeight:500, whiteSpace:'nowrap',
          }}>
            {lang === 'es' ? 'Contacte con nosotros' : 'Get in touch'}
          </span>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily:"'Playfair Display', Georgia, serif",
          fontSize:'clamp(2.8rem, 5vw, 4.2rem)',
          fontWeight:300, color:'#fff',
          textAlign:'center', lineHeight:1.1,
          letterSpacing:'-0.02em', marginBottom:12,
        }}>
          {lang === 'es' ? (
            <><em style={{fontStyle:'italic', color:'rgba(255,255,255,0.55)'}}>Su vida</em><br/>en Ibiza</>
          ) : (
            <><em style={{fontStyle:'italic', color:'rgba(255,255,255,0.55)'}}>Your life</em><br/>in Ibiza</>
          )}
        </h2>

        <p style={{
          textAlign:'center', fontSize:'0.72rem', fontWeight:300,
          color:'rgba(255,255,255,0.28)', lineHeight:1.9,
          letterSpacing:'0.02em', marginBottom:44,
        }}>
          {lang === 'es'
            ? 'Respuesta en menos de 24 horas · Discreción absoluta'
            : 'Response within 24 hours · Absolute discretion'}
        </p>

        {/* ── Panel cristal ── */}
        <div style={{
          background:'rgba(255,255,255,0.04)',
          backdropFilter:'blur(32px)',
          WebkitBackdropFilter:'blur(32px)',
          border:'1px solid rgba(255,255,255,0.09)',
          padding:'40px 36px 36px',
        }}>

          {done ? (

            /* Confirmación */
            <div style={{
              textAlign:'center', padding:'16px 0',
              animation:'successIn 0.7s cubic-bezier(0.22,1,0.36,1) both',
            }}>
              <div style={{
                width:60, height:60, borderRadius:'50%',
                border:'1px solid rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 24px',
                background:'rgba(255,255,255,0.05)',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{
                fontFamily:"'Playfair Display', Georgia, serif",
                fontSize:'1.6rem', fontWeight:300, color:'#fff', marginBottom:10,
              }}>
                {lang === 'es' ? 'Mensaje enviado' : 'Message sent'}
              </p>
              <p style={{
                fontSize:'0.72rem', color:'rgba(255,255,255,0.3)',
                lineHeight:1.85,
              }}>
                {lang === 'es'
                  ? 'Le contactaremos en breve con total discreción.'
                  : 'We will contact you shortly with complete discretion.'}
              </p>
            </div>

          ) : (

            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:28 }}>

              <div className="cf">
                <label>{lang === 'es' ? 'Nombre' : 'Name'}</label>
                <input type="text" required
                  placeholder={lang === 'es' ? 'Su nombre completo' : 'Your full name'}
                  value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
                <div className="cf">
                  <label>Email</label>
                  <input type="email" required placeholder="hello@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="cf">
                  <label>{lang === 'es' ? 'Teléfono' : 'Phone'}</label>
                  <input type="tel" placeholder="+34 600 000 000"
                    value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="cf">
                <label>{lang === 'es' ? 'Mensaje' : 'Message'}</label>
                <textarea rows={3}
                  placeholder={lang === 'es'
                    ? '¿Qué tipo de propiedad busca?'
                    : 'What kind of property are you looking for?'}
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              <button type="submit" className="send-btn" disabled={sending}>
                {sending ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      style={{ animation:'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    {lang === 'es' ? 'Enviando…' : 'Sending…'}
                  </>
                ) : (
                  lang === 'es' ? 'Enviar consulta' : 'Send enquiry'
                )}
              </button>

            </form>
          )}
        </div>

        {/* Contacto directo bajo el card */}
        <div style={{
          display:'flex', justifyContent:'center', gap:32, marginTop:24,
        }}>
          {[
            { label:'+34 600 000 000', href:'tel:+34600000000' },
            { label:'info@ibizaflowrealestate.com', href:'mailto:info@ibizaflowrealestate.com' },
          ].map((item, i) => (
            <a key={i} href={item.href} style={{
              fontSize:'0.6rem', color:'rgba(255,255,255,0.2)',
              textDecoration:'none', letterSpacing:'0.06em', fontWeight:300,
              transition:'color 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
              {item.label}
            </a>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          #contacto .cf-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
