'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin/properties', label: 'Propiedades', icon: '🏠' },
  { href: '/admin/portal-sync', label: 'Portal Sync', icon: '🔄' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: '#0d1424',
        borderRight: '1px solid #1e2d4a',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 28px', borderBottom: '1px solid #1e2d4a' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.5px' }}>
            Ibiza Flow
          </div>
          <div style={{ fontSize: 11, color: '#4a6a8a', marginTop: 2, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Real Estate Admin
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {NAV.map(item => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                  textDecoration: 'none',
                  background: active ? 'rgba(0,47,167,0.25)' : 'transparent',
                  color: active ? '#fff' : '#7a94b4',
                  fontWeight: active ? 600 : 400,
                  fontSize: 14,
                  transition: 'all 0.15s',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
