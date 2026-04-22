"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/i18n';

const INTEREST_OPTIONS = [
  { es: "Comprar villa",        en: "Buy a villa" },
  { es: "Alquilar propiedad",   en: "Rent a property" },
  { es: "Invertir en Ibiza",    en: "Invest in Ibiza" },
  { es: "Vender mi propiedad",  en: "Sell my property" },
  { es: "Gestión patrimonial",  en: "Property management" },
];

const BUDGET_OPTIONS = [
  { es: "Hasta 1M €",          en: "Up to €1M" },
  { es: "1M – 3M €",           en: "€1M – €3M" },
  { es: "3M – 6M €",           en: "€3M – €6M" },
  { es: "Más de 6M €",         en: "Over €6M" },
  { es: "Prefiero no indicar", en: "Prefer not to say" },
];

export default function InquiryCTA() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(1); // 1: interest, 2: details, 3: done
  const [interest, setInterest] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
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
        background: '#05050a',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes ctaFadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(30px,-20px) scale(1.08); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-20px,30px) scale(1.05); }
        }
        @keyframes pulse-ring {
          0%   { transform:scale(0.9); opacity:0.6; }
          100% { transform:scale(1.4); opacity:0; }
        }
        .cta-card-enter { animation: ctaFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .interest-btn {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.55);
          font-size: 0.7rem; letter-spacing: 0.18em;
          text-transform: uppercase; font-weight: 300;
          padding: 14px 20px; cursor: pointer;
          transition: all 0.25s ease; width:100%; text-align:left;
        }
        .interest-btn:hover, .interest-btn.active {
          border-color: rgba(24,71,232,0.6);
          background: rgba(24,71,232,0.1);
          color: #fff;
        }
        .interest-btn.active { border-color: #1847E8; color:#fff; }
        .interest-btn.active::before {
          content:'';
          position:absolute; left:0; top:0; bottom:0; width:3px;
          background: #1847E8;
        }
        .form-field {
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.3s;
        }
        .form-field:focus-within { border-color: #1847E8; }
        .form-field label {
          display: block;
          font-size: 0.58rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          margin-bottom: 6px; font-weight: 400;
        }
        .form-field input, .form-field textarea {
          width: 100%; background: transparent;
          border: none; outline: none;
          color: #fff; font-size: 0.9rem; font-weight: 300;
          line-height: 1.5; padding: 0 0 12px 0;
          font-family: inherit;
        }
        .form-field input::placeholder, .form-field textarea::placeholder {
          color: rgba(255,255,255,0.15);
        }
        .form-field textarea { resize: none; }
        .submit-btn {
          position: relative; overflow: hidden;
          width: 100%; background: #1847E8;
          border: none; color: #fff; cursor: pointer;
          font-size: 0.65rem; letter-spacing: 0.3em;
          text-transform: uppercase; font-weight: 600;
          padding: 18px 32px;
          transition: background 0.3s ease;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .submit-btn:hover { background: #0d35c7; }
        .submit-btn::after {
          content:'';
          position:absolute; inset:0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          background-size: 400px 100%;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .submit-btn:hover::after {
          opacity:1;
          animation: shimmer 0.8s ease;
        }
        .step-dot {
          width:6px; height:6px; border-radius:50%;
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Background image with dark overlay */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a6bda00f-9d85-4858-8c8d-a58f8ab1c935/13048209_1209163009095942_677535093064324347_o-1771512577838.jpg?width=1800&height=1200&resize=cover"
          alt="Ibiza luxury property"
          fill
          className="object-cover"
          style={{ opacity: 0.18 }}
        />
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(135deg, #05050a 0%, rgba(5,5,10,0.7) 50%, #05050a 100%)',
        }} />
      </div>

      {/* Ambient orbs */}
      <div style={{
        position:'absolute', top:'15%', left:'8%',
        width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(24,71,232,0.12) 0%, transparent 70%)',
        animation:'orb1 8s ease-in-out infinite', pointerEvents:'none', zIndex:1,
      }} />
      <div style={{
        position:'absolute', bottom:'10%', right:'5%',
        width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(24,71,232,0.08) 0%, transparent 70%)',
        animation:'orb2 11s ease-in-out infinite', pointerEvents:'none', zIndex:1,
      }} />

      {/* Content */}
      <div style={{
        position:'relative', zIndex:2, width:'100%',
        maxWidth:1200, margin:'0 auto',
        padding:'80px 24px',
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gap:80,
        alignItems:'center',
      }}
      className="contact-grid"
      >

        {/* LEFT — Editorial copy */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          {/* Tag */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
            <div style={{ width:32, height:1, background:'#1847E8' }} />
            <span style={{
              fontSize:'0.58rem', letterSpacing:'0.35em',
              textTransform:'uppercase', color:'#1847E8', fontWeight:600,
            }}>
              {lang === 'es' ? 'Contacto Privado' : 'Private Enquiry'}
            </span>
          </div>

          <h2 style={{
            fontFamily:"var(--font-display, 'Playfair Display', serif)",
            fontSize:'clamp(2.4rem, 4vw, 3.5rem)',
            fontWeight:300,
            color:'#fff',
            lineHeight:1.15,
            marginBottom:24,
            letterSpacing:'-0.01em',
          }}>
            {lang === 'es'
              ? <>Su vida en Ibiza<br /><em style={{color:'rgba(255,255,255,0.5)', fontStyle:'italic'}}>comienza aquí</em></>
              : <>Your life in Ibiza<br /><em style={{color:'rgba(255,255,255,0.5)', fontStyle:'italic'}}>starts here</em></>
            }
          </h2>

          <p style={{
            color:'rgba(255,255,255,0.38)',
            fontSize:'0.82rem',
            lineHeight:1.9,
            maxWidth:380,
            marginBottom:48,
            fontWeight:300,
          }}>
            {lang === 'es'
              ? 'Nuestro equipo responde en menos de 24 horas. Discreción absoluta y asesoramiento personalizado para cada cliente.'
              : 'Our team responds within 24 hours. Absolute discretion and tailored advice for every client.'
            }
          </p>

          {/* Contact lines */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {[
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.93 2 2 0 0 1 3.6 2.73h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5l.19-.58z"/>
                  </svg>
                ),
                label: '+34 600 000 000',
                href: 'tel:+34600000000',
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'info@ibizaflowrealestate.com',
                href: 'mailto:info@ibizaflowrealestate.com',
              },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{
                display:'flex', alignItems:'center', gap:16,
                textDecoration:'none', color:'rgba(255,255,255,0.45)',
                fontSize:'0.75rem', fontWeight:300, letterSpacing:'0.04em',
                transition:'color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                <div style={{
                  width:38, height:38, border:'1px solid rgba(255,255,255,0.1)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0, transition:'border-color 0.25s, background 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#1847E8';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(24,71,232,0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
                >
                  {item.icon}
                </div>
                {item.label}
              </a>
            ))}
          </div>

          {/* Quote */}
          <div style={{
            marginTop:56,
            paddingLeft:20,
            borderLeft:'1px solid rgba(24,71,232,0.4)',
          }}>
            <p style={{
              fontFamily:"var(--font-display, 'Playfair Display', serif)",
              fontSize:'1rem', fontStyle:'italic',
              color:'rgba(255,255,255,0.3)', lineHeight:1.7,
            }}>
              {lang === 'es'
                ? '"Ibiza no es solo un destino,\nes un estado del alma."'
                : '"Ibiza is not just a destination,\nit is a state of mind."'
              }
            </p>
          </div>
        </div>

        {/* RIGHT — Multi-step form */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}
        >
          <div style={{
            background:'rgba(255,255,255,0.03)',
            border:'1px solid rgba(255,255,255,0.08)',
            padding:'48px 40px',
            backdropFilter:'blur(12px)',
          }}>

            {/* Step indicator */}
            {step < 3 && (
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:36 }}>
                {[1,2].map(s => (
                  <React.Fragment key={s}>
                    <div className="step-dot" style={{
                      background: step >= s ? '#1847E8' : 'rgba(255,255,255,0.15)',
                      transform: step === s ? 'scale(1.4)' : 'scale(1)',
                    }} />
                    {s < 2 && <div style={{ flex:1, height:1, background: step > s ? '#1847E8' : 'rgba(255,255,255,0.1)', transition:'background 0.4s' }} />}
                  </React.Fragment>
                ))}
                <span style={{
                  marginLeft:12, fontSize:'0.58rem', letterSpacing:'0.22em',
                  textTransform:'uppercase', color:'rgba(255,255,255,0.25)',
                }}>
                  {step === 1
                    ? (lang === 'es' ? 'Paso 1 de 2' : 'Step 1 of 2')
                    : (lang === 'es' ? 'Paso 2 de 2' : 'Step 2 of 2')
                  }
                </span>
              </div>
            )}

            {/* STEP 1 — Interest selector */}
            {step === 1 && (
              <div className="cta-card-enter">
                <p style={{
                  fontFamily:"var(--font-display,'Playfair Display',serif)",
                  fontSize:'1.4rem', fontWeight:300, color:'#fff',
                  marginBottom:8, lineHeight:1.3,
                }}>
                  {lang === 'es' ? '¿Cómo podemos ayudarle?' : 'How can we help you?'}
                </p>
                <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.3)', marginBottom:28, fontWeight:300 }}>
                  {lang === 'es' ? 'Seleccione su interés principal' : 'Select your main interest'}
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:28 }}>
                  {INTEREST_OPTIONS.map(opt => (
                    <button
                      key={opt.es}
                      type="button"
                      className={`interest-btn${interest === opt[iL] ? ' active' : ''}`}
                      onClick={() => setInterest(opt[iL])}
                    >
                      <span style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{
                          width:16, height:16, border:`1px solid ${interest === opt[iL] ? '#1847E8' : 'rgba(255,255,255,0.2)'}`,
                          borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                          flexShrink:0, transition:'border-color 0.2s',
                        }}>
                          {interest === opt[iL] && (
                            <span style={{ width:7, height:7, borderRadius:'50%', background:'#1847E8', display:'block' }} />
                          )}
                        </span>
                        {opt[iL]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Budget */}
                <p style={{ fontSize:'0.58rem', letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:12 }}>
                  {lang === 'es' ? 'Presupuesto' : 'Budget'}
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:32 }}>
                  {BUDGET_OPTIONS.map(opt => (
                    <button
                      key={opt.es}
                      type="button"
                      onClick={() => setBudget(opt[iL])}
                      style={{
                        padding:'7px 14px',
                        fontSize:'0.62rem', letterSpacing:'0.1em',
                        border:`1px solid ${budget === opt[iL] ? '#1847E8' : 'rgba(255,255,255,0.1)'}`,
                        background: budget === opt[iL] ? 'rgba(24,71,232,0.15)' : 'transparent',
                        color: budget === opt[iL] ? '#fff' : 'rgba(255,255,255,0.4)',
                        cursor:'pointer', transition:'all 0.2s',
                      }}
                    >
                      {opt[iL]}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="submit-btn"
                  onClick={() => interest && setStep(2)}
                  style={{ opacity: interest ? 1 : 0.4, cursor: interest ? 'pointer' : 'not-allowed' }}
                >
                  {lang === 'es' ? 'Continuar' : 'Continue'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            )}

            {/* STEP 2 — Contact details */}
            {step === 2 && (
              <div className="cta-card-enter">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:20, display:'flex', alignItems:'center', gap:8, padding:0, transition:'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  {lang === 'es' ? 'Volver' : 'Back'}
                </button>

                <p style={{
                  fontFamily:"var(--font-display,'Playfair Display',serif)",
                  fontSize:'1.4rem', fontWeight:300, color:'#fff',
                  marginBottom:6, lineHeight:1.3,
                }}>
                  {lang === 'es' ? 'Sus datos de contacto' : 'Your contact details'}
                </p>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'rgba(24,71,232,0.1)', border:'1px solid rgba(24,71,232,0.25)',
                  padding:'5px 12px', marginBottom:28,
                }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#1847E8', display:'block' }} />
                  <span style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em' }}>
                    {interest}
                  </span>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ display:'flex', flexDirection:'column', gap:24, marginBottom:32 }}>
                    <div className="form-field">
                      <label>{lang === 'es' ? 'Nombre completo' : 'Full name'}</label>
                      <input type="text" required placeholder="Alexandra Rousseau" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
                      <div className="form-field">
                        <label>Email</label>
                        <input type="email" required placeholder="a@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      <div className="form-field">
                        <label>{lang === 'es' ? 'Teléfono' : 'Phone'}</label>
                        <input type="tel" placeholder="+33 6 00 00 00 00" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label>{lang === 'es' ? 'Mensaje (opcional)' : 'Message (optional)'}</label>
                      <textarea rows={3} placeholder={lang === 'es' ? 'Cuéntenos más sobre lo que busca…' : 'Tell us more about what you are looking for…'} value={message} onChange={e => setMessage(e.target.value)} />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={sending}>
                    {sending ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation:'spin 1s linear infinite' }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        {lang === 'es' ? 'Enviando…' : 'Sending…'}
                      </>
                    ) : (
                      <>
                        {lang === 'es' ? 'Enviar consulta privada' : 'Send private enquiry'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p style={{ fontSize:'0.58rem', color:'rgba(255,255,255,0.2)', textAlign:'center', marginTop:16, lineHeight:1.7, letterSpacing:'0.05em' }}>
                    {lang === 'es'
                      ? 'Sus datos son tratados con absoluta discreción y no se comparten con terceros.'
                      : 'Your data is handled with absolute discretion and never shared with third parties.'
                    }
                  </p>
                </form>
              </div>
            )}

            {/* STEP 3 — Success */}
            {step === 3 && (
              <div className="cta-card-enter" style={{ textAlign:'center', padding:'20px 0' }}>
                {/* Animated success ring */}
                <div style={{ position:'relative', width:72, height:72, margin:'0 auto 32px' }}>
                  <div style={{
                    position:'absolute', inset:0, borderRadius:'50%',
                    border:'1px solid #1847E8',
                    animation:'pulse-ring 1.5s ease-out forwards',
                  }} />
                  <div style={{
                    width:72, height:72, borderRadius:'50%',
                    border:'1px solid rgba(24,71,232,0.4)',
                    background:'rgba(24,71,232,0.08)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1847E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>

                <p style={{
                  fontFamily:"var(--font-display,'Playfair Display',serif)",
                  fontSize:'1.6rem', fontWeight:300, color:'#fff', marginBottom:12,
                }}>
                  {lang === 'es' ? 'Consulta recibida' : 'Enquiry received'}
                </p>
                <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)', lineHeight:1.8, maxWidth:280, margin:'0 auto 36px' }}>
                  {lang === 'es'
                    ? 'Nuestro equipo le contactará en menos de 24 horas con total discreción.'
                    : 'Our team will contact you within 24 hours with absolute discretion.'
                  }
                </p>
                <div style={{
                  padding:'16px 24px',
                  border:'1px solid rgba(255,255,255,0.07)',
                  background:'rgba(255,255,255,0.02)',
                  fontSize:'0.68rem', color:'rgba(255,255,255,0.3)',
                  letterSpacing:'0.1em',
                }}>
                  {interest && <span style={{ color:'rgba(255,255,255,0.5)' }}>{interest}</span>}
                  {budget && <><span style={{ color:'rgba(255,255,255,0.15)', margin:'0 8px' }}>·</span><span>{budget}</span></>}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Responsive grid fix */}
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
