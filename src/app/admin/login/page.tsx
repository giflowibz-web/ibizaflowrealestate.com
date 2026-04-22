'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || 'Credenciales incorrectas')
      setLoading(false)
    }
  }

  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, sans-serif', background: '#0f0f0f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 380, background: '#111', border: '1px solid #222', borderRadius: 12, padding: '40px 36px' }}>
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, color: '#c9a96e', marginBottom: 4 }}>IBIZA FLOW</div>
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 2 }}>REAL ESTATE · ADMIN</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#666', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: 6, padding: '10px 12px',
                  color: '#fff', fontSize: 14, outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#666', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: 6, padding: '10px 12px',
                  color: '#fff', fontSize: 14, outline: 'none',
                }}
              />
            </div>

            {error && (
              <div style={{ marginBottom: 16, padding: '10px 12px', background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.2)', borderRadius: 6, color: '#ff6b6b', fontSize: 13 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px',
                background: loading ? '#333' : '#c9a96e',
                border: 'none', borderRadius: 6,
                color: loading ? '#666' : '#000',
                fontWeight: 600, fontSize: 14,
                letterSpacing: 1, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </body>
    </html>
  )
}
