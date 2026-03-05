'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/properties', label: 'Properties', icon: '🏠' },
  { href: '/admin/contacts', label: 'Contacts / CRM', icon: '👥' },
  { href: '/admin/portals', label: 'Portal Sync', icon: '🔗' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, sans-serif', background: '#0f0f0f', color: '#fff' }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <aside style={{
            width: collapsed ? 64 : 240,
            background: '#111',
            borderRight: '1px solid #222',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.2s',
            flexShrink: 0,
          }}>
            <div style={{ padding: '20px 16px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: 12 }}>
              {!collapsed && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#c9a96e' }}>IBIZA FLOW</div>
                  <div style={{ fontSize: 10, color: '#666', letterSpacing: 1 }}>REAL ESTATE · ADMIN</div>
                </div>
              )}
              <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 18 }}>
                {collapsed ? '→' : '←'}
              </button>
            </div>
            <nav style={{ padding: '16px 8px', flex: 1 }}>
              {nav.map((item) => {
                const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                    textDecoration: 'none', color: active ? '#c9a96e' : '#888',
                    background: active ? '#1a1a1a' : 'transparent',
                    fontWeight: active ? 600 : 400, fontSize: 14,
                    transition: 'all 0.15s',
                  }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    {!collapsed && item.label}
                  </Link>
                )
              })}
            </nav>
            <div style={{ padding: 16, borderTop: '1px solid #222' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555', textDecoration: 'none', fontSize: 13 }}>
                <span>↗</span>{!collapsed && 'View Website'}
              </Link>
            </div>
          </aside>

          {/* Main */}
          <main style={{ flex: 1, overflow: 'auto', minHeight: '100vh' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
