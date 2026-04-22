'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Property } from '@/lib/types'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProperties(data || [])
        setLoading(false)
      })
  }, [])

  const statusColor: Record<string, string> = {
    active: '#22c55e',
    draft: '#f59e0b',
    archived: '#6b7280',
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Propiedades</h1>
          <p style={{ color: '#4a6a8a', fontSize: 14, marginTop: 4 }}>
            {properties.length} propiedad{properties.length !== 1 ? 'es' : ''} en total
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          style={{
            background: '#002FA7', color: '#fff', padding: '10px 20px',
            borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          + Nueva propiedad
        </Link>
      </div>

      {loading ? (
        <div style={{ color: '#4a6a8a', textAlign: 'center', padding: 60 }}>Cargando...</div>
      ) : properties.length === 0 ? (
        <div style={{
          background: '#0d1424', border: '1px solid #1e2d4a', borderRadius: 12,
          padding: 60, textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <h3 style={{ color: '#fff', marginBottom: 8 }}>Sin propiedades</h3>
          <p style={{ color: '#4a6a8a', marginBottom: 24 }}>Crea tu primera propiedad para empezar</p>
          <Link
            href="/admin/properties/new"
            style={{
              background: '#002FA7', color: '#fff', padding: '10px 20px',
              borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
            }}
          >
            + Nueva propiedad
          </Link>
        </div>
      ) : (
        <div style={{
          background: '#0d1424', border: '1px solid #1e2d4a', borderRadius: 12, overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2d4a' }}>
                {['Propiedad', 'Área', 'Tipo', 'Precio', 'Estado', ''].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left',
                    fontSize: 11, fontWeight: 600, color: '#4a6a8a',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={p.id} style={{
                  borderBottom: i < properties.length - 1 ? '1px solid #1a2640' : 'none',
                }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>
                      {p.title_es || p.slug || 'Sin título'}
                    </div>
                    <div style={{ color: '#4a6a8a', fontSize: 12, marginTop: 2 }}>{p.slug}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#a0b4cc', fontSize: 14 }}>{p.area || '—'}</td>
                  <td style={{ padding: '14px 16px', color: '#a0b4cc', fontSize: 14 }}>{p.property_type || '—'}</td>
                  <td style={{ padding: '14px 16px', color: '#a0b4cc', fontSize: 14 }}>
                    {p.price ? `${Number(p.price).toLocaleString('es-ES')} €` : '—'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: `${statusColor[p.status] || '#6b7280'}20`,
                      color: statusColor[p.status] || '#6b7280',
                      padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                    }}>{p.status || 'draft'}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Link
                      href={`/admin/properties/${p.id}`}
                      style={{ color: '#3a8af7', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}
                    >
                      Editar →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
