'use client'

import { useState } from 'react'

const PORTALS = [
  { id: 'idealista', name: 'Idealista', icon: '🏠', status: 'connected', lastSync: 'Hace 2h' },
  { id: 'kyero', name: 'Kyero', icon: '🌍', status: 'connected', lastSync: 'Hace 6h' },
  { id: 'rightmove', name: 'Rightmove Overseas', icon: '🇬🇧', status: 'disconnected', lastSync: null },
  { id: 'green_acres', name: 'Green Acres', icon: '🌿', status: 'disconnected', lastSync: null },
]

export default function PortalSyncPage() {
  const [syncing, setSyncing] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const handleSync = async (portalId: string) => {
    setSyncing(portalId)
    setMessage('')
    await new Promise(r => setTimeout(r, 2000))
    setSyncing(null)
    setMessage(`Sincronización con ${PORTALS.find(p => p.id === portalId)?.name} completada.`)
    setTimeout(() => setMessage(''), 4000)
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Portal Sync</h1>
        <p style={{ color: '#4a6a8a', fontSize: 14, marginTop: 4 }}>
          Sincroniza tus propiedades con los portales inmobiliarios
        </p>
      </div>

      {message && (
        <div style={{
          marginBottom: 20, padding: '12px 16px', borderRadius: 8,
          background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
          color: '#4ade80', fontSize: 14,
        }}>
          ✓ {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {PORTALS.map(portal => (
          <div key={portal.id} style={{
            background: '#0d1424', border: '1px solid #1e2d4a',
            borderRadius: 12, padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{portal.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{portal.name}</div>
                  {portal.lastSync && (
                    <div style={{ color: '#4a6a8a', fontSize: 12 }}>Última sync: {portal.lastSync}</div>
                  )}
                </div>
              </div>
              <span style={{
                padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: portal.status === 'connected' ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)',
                color: portal.status === 'connected' ? '#4ade80' : '#6b7280',
              }}>
                {portal.status === 'connected' ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
            <button
              type="button"
              disabled={syncing === portal.id || portal.status === 'disconnected'}
              onClick={() => handleSync(portal.id)}
              style={{
                width: '100%', padding: '9px 16px', borderRadius: 8,
                border: `1px solid ${portal.status === 'connected' ? '#1e3a6a' : '#1e2d4a'}`,
                background: portal.status === 'connected' ? 'rgba(0,47,167,0.15)' : 'transparent',
                color: portal.status === 'connected' ? '#5b9cf7' : '#2a4a6a',
                cursor: portal.status === 'connected' ? 'pointer' : 'not-allowed',
                fontWeight: 600, fontSize: 13, transition: 'all 0.15s',
              }}
            >
              {syncing === portal.id ? '⟳ Sincronizando...' : portal.status === 'connected' ? '↑ Sincronizar ahora' : 'Configurar conexión'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
