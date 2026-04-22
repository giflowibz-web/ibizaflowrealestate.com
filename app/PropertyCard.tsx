'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Property } from '@/lib/types'

function formatPrice(price: number | null) {
  if (!price) return 'Consultar precio'
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

const typeLabel: Record<string, string> = {
  villa: 'Villa', finca: 'Finca', penthouse: 'Ático',
  apartment: 'Apartamento', house: 'Casa', land: 'Parcela',
}

export default function PropertyCard({ property: p }: { property: Property }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/propiedad/${p.slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${hovered ? 'rgba(0,47,167,0.5)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 16, overflow: 'hidden',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.2s, border-color 0.2s',
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 240, overflow: 'hidden', background: '#0d1424' }}>
          {p.images?.[0] ? (
            <img
              src={p.images[0]}
              alt={p.title_es}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🏠</div>
          )}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            borderRadius: 6, padding: '4px 10px',
            fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            {typeLabel[p.property_type] || p.property_type}
          </div>
          {p.listing_type === 'rent' && (
            <div style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(0,47,167,0.85)',
              borderRadius: 6, padding: '4px 10px',
              fontSize: 11, fontWeight: 700, color: '#fff',
            }}>Alquiler</div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '20px 22px 22px' }}>
          <div style={{ fontSize: 12, color: '#4a8fd4', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>📍</span> {p.area}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.3px' }}>
            {p.title_es}
          </h3>

          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            {p.bedrooms && (
              <div style={{ fontSize: 13, color: '#6a8aaa', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>🛏</span> {p.bedrooms} hab.
              </div>
            )}
            {p.bathrooms && (
              <div style={{ fontSize: 13, color: '#6a8aaa', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>🚿</span> {p.bathrooms} baños
              </div>
            )}
            {p.size_built && (
              <div style={{ fontSize: 13, color: '#6a8aaa', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>📐</span> {p.size_built}m²
              </div>
            )}
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16,
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
              {formatPrice(p.price)}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#4a8fd4' }}>
              Ver detalle →
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
