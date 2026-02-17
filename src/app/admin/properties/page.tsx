'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Property } from '@/lib/supabase'

const STATUS_COLORS: Record<string, string> = {
  available: '#4ade80', reserved: '#facc15', sold: '#f87171',
  rented: '#60a5fa', draft: '#666',
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const load = () => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '50' })
    if (statusFilter) params.set('status', statusFilter)
    fetch(`/api/properties?${params}`)
      .then(r => r.json())
      .then(({ data, count }) => { setProperties(data || []); setCount(count || 0) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [statusFilter])

  const deleteProperty = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/properties/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = properties.filter(p =>
    !filter || p.title_es?.toLowerCase().includes(filter.toLowerCase()) ||
    p.ref?.toLowerCase().includes(filter.toLowerCase()) ||
    p.area?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Properties</h1>
          <p style={{ color: '#666', marginTop: 4, fontSize: 14 }}>{count} total</p>
        </div>
        <Link href="/admin/properties/new" style={{
          background: '#c9a96e', color: '#000', padding: '10px 20px',
          borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14,
        }}>+ Add Property</Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Search by name, ref, area..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: 14, outline: 'none' }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: 14, outline: 'none' }}>
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {loading ? (
        <div style={{ color: '#666', textAlign: 'center', padding: 60 }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, color: '#444' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <div style={{ fontSize: 18, marginBottom: 8 }}>No properties yet</div>
          <Link href="/admin/properties/new" style={{ color: '#c9a96e' }}>Add your first property →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(p => (
            <div key={p.id} style={{
              background: '#1a1a1a', border: '1px solid #222', borderRadius: 12,
              padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
            }}>
              {/* Image */}
              <div style={{
                width: 72, height: 56, borderRadius: 8, background: '#111',
                overflow: 'hidden', flexShrink: 0,
                backgroundImage: p.images?.[0] ? `url(${p.images[0]})` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title_es || 'Untitled'}
                  </span>
                  <span style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 20,
                    background: STATUS_COLORS[p.status] + '22',
                    color: STATUS_COLORS[p.status], fontWeight: 600, textTransform: 'uppercase', flexShrink: 0,
                  }}>{p.status}</span>
                </div>
                <div style={{ fontSize: 13, color: '#666', display: 'flex', gap: 16 }}>
                  <span>{p.ref}</span>
                  {p.area && <span>📍 {p.area}</span>}
                  {p.bedrooms && <span>🛏 {p.bedrooms}</span>}
                  {p.bathrooms && <span>🚿 {p.bathrooms}</span>}
                  {p.size_built && <span>📐 {p.size_built}m²</span>}
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {p.price_on_request ? (
                  <div style={{ color: '#c9a96e', fontWeight: 600 }}>Price on request</div>
                ) : p.price ? (
                  <div style={{ color: '#c9a96e', fontWeight: 700, fontSize: 16 }}>
                    €{p.price.toLocaleString()}
                  </div>
                ) : null}
                {p.listing_type && (
                  <div style={{ fontSize: 12, color: '#555', textTransform: 'capitalize' }}>{p.listing_type}</div>
                )}
              </div>

              {/* Portals */}
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                {[
                  { key: 'published_idealista', label: 'ID' },
                  { key: 'published_fotocasa', label: 'FC' },
                  { key: 'published_kyero', label: 'KY' },
                ].map(portal => (
                  <span key={portal.key} style={{
                    fontSize: 10, padding: '2px 6px', borderRadius: 4,
                    background: (p as any)[portal.key] ? '#4ade8022' : '#22222288',
                    color: (p as any)[portal.key] ? '#4ade80' : '#444',
                    fontWeight: 600,
                  }}>{portal.label}</span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Link href={`/admin/properties/${p.id}`} style={{
                  padding: '6px 14px', borderRadius: 6, border: '1px solid #333',
                  color: '#888', textDecoration: 'none', fontSize: 13,
                }}>Edit</Link>
                <button onClick={() => deleteProperty(p.id, p.title_es)} style={{
                  padding: '6px 12px', borderRadius: 6, border: '1px solid #f8717144',
                  background: 'transparent', color: '#f87171', cursor: 'pointer', fontSize: 13,
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
