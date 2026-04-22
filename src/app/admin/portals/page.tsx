'use client'
import { useState, useEffect } from 'react'

const PORTALS = [
  {
    id: 'idealista',
    name: 'Idealista',
    flag: '🇪🇸',
    desc: "Spain's #1 property portal. Send them your XML feed URL.",
    url: 'https://www.idealista.com/cms/gestores/index.htm',
    color: '#ff6b35',
    instructions: [
      'Log in to your Idealista professional account',
      'Go to Settings → XML Feed',
      'Paste the feed URL below',
      'Idealista will crawl it automatically every 24h',
    ],
  },
  {
    id: 'fotocasa',
    name: 'Fotocasa',
    flag: '🇪🇸',
    desc: 'Major Spanish portal, part of Adevinta group.',
    url: 'https://www.fotocasa.es/es/agencias/',
    color: '#00b4d8',
    instructions: [
      'Log in to Fotocasa Pro (fotocasa.es/agencias)',
      'Go to your profile → XML Import',
      'Enter the feed URL below',
      'Sync happens every 12–24 hours',
    ],
  },
  {
    id: 'kyero',
    name: 'Kyero',
    flag: '🌍',
    desc: 'Top international portal for UK, DE, NL buyers.',
    url: 'https://www.kyero.com/en/agent-services',
    color: '#7c3aed',
    instructions: [
      'Create or log in to your Kyero agent account',
      'Go to Feed Management',
      'Submit the Kyero XML feed URL below',
      'Kyero will validate and import your listings',
    ],
  },
  {
    id: 'thinkspain',
    name: 'ThinkSpain',
    flag: '🇬🇧',
    desc: 'Popular with British expats and buyers.',
    url: 'https://www.thinkspain.com/agency-services',
    color: '#059669',
    instructions: [
      'Contact ThinkSpain sales team',
      'Provide your XML feed URL (use Kyero format)',
      'They will configure the import manually',
    ],
  },
]

export default function PortalsPage() {
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const feedUrl = (portal: string) => `${origin}/api/portal-feed?portal=${portal === 'idealista' || portal === 'fotocasa' ? 'idealista' : 'kyero'}`

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Portal Sync</h1>
        <p style={{ color: '#666', marginTop: 4, fontSize: 14 }}>
          Export your properties to external portals via XML feed. Update properties in admin — portals sync automatically.
        </p>
      </div>

      {/* Feed URLs */}
      <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 12, padding: 24, marginBottom: 32 }}>
        <h3 style={{ margin: '0 0 16px', color: '#c9a96e', fontSize: 15 }}>Your XML Feed URLs</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            { label: 'Idealista & Fotocasa format', portal: 'idealista' },
            { label: 'Kyero & ThinkSpain format', portal: 'kyero' },
          ].map(f => (
            <div key={f.portal}>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{f.label}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <code style={{
                  flex: 1, fontSize: 13, background: '#111', padding: '10px 14px',
                  borderRadius: 8, color: '#4ade80', wordBreak: 'break-all',
                  border: '1px solid #2a2a2a',
                }}>{feedUrl(f.portal)}</code>
                <button onClick={() => navigator.clipboard.writeText(feedUrl(f.portal))} style={{
                  padding: '10px 16px', background: '#2a2a2a', border: 'none',
                  borderRadius: 8, color: '#888', cursor: 'pointer', fontSize: 13, flexShrink: 0,
                }}>Copy</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portal cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {PORTALS.map(portal => (
          <div key={portal.id} style={{
            background: '#1a1a1a', border: '1px solid #222', borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{ height: 4, background: portal.color }} />
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{portal.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{portal.name}</div>
                  <div style={{ fontSize: 12, color: '#555' }}>{portal.desc}</div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Setup Steps</div>
                <ol style={{ margin: 0, paddingLeft: 16 }}>
                  {portal.instructions.map((step, i) => (
                    <li key={i} style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{step}</li>
                  ))}
                </ol>
              </div>

              <a href={portal.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', marginTop: 16, padding: '8px 16px',
                border: `1px solid ${portal.color}44`, borderRadius: 8,
                color: portal.color, textDecoration: 'none', fontSize: 13, fontWeight: 500,
              }}>Open {portal.name} ↗</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
