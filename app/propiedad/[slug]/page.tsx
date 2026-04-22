import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllProperties } from '@/lib/db'

function formatPrice(price: number | null) {
  if (!price) return 'Consultar precio'
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

export async function generateStaticParams() {
  const properties = getAllProperties()
  return properties.map(p => ({ slug: p.slug }))
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const properties = getAllProperties()
  const property = properties.find(p => p.slug === params.slug && p.status === 'active')

  if (!property) notFound()

  const typeLabel: Record<string, string> = {
    villa: 'Villa', finca: 'Finca', penthouse: 'Ático',
    apartment: 'Apartamento', house: 'Casa', land: 'Parcela',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#05080f', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(5,8,15,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>Ibiza Flow</span>
          <span style={{
            fontSize: 10, fontWeight: 600, color: '#002FA7',
            background: 'rgba(0,47,167,0.15)', border: '1px solid rgba(0,47,167,0.3)',
            borderRadius: 4, padding: '2px 6px', letterSpacing: '1px', textTransform: 'uppercase',
          }}>Real Estate</span>
        </Link>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/#propiedades" style={{ color: '#9ab', textDecoration: 'none', fontSize: 14 }}>← Todas las propiedades</Link>
        </div>
      </nav>

      {/* HERO IMAGE */}
      <div style={{ paddingTop: 64, position: 'relative' }}>
        {property.images?.[0] ? (
          <div style={{ height: '60vh', overflow: 'hidden', position: 'relative' }}>
            <img
              src={property.images[0]}
              alt={property.title_es}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 50%, rgba(5,8,15,1) 100%)',
            }} />
          </div>
        ) : (
          <div style={{ height: 360, background: '#0d1424', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>🏠</div>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px' }}>

        {/* Title block */}
        <div style={{ marginTop: -80, position: 'relative', zIndex: 2, marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              borderRadius: 6, padding: '4px 12px',
              fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>
              {typeLabel[property.property_type] || property.property_type}
            </span>
            <span style={{ fontSize: 13, color: '#4a8fd4', fontWeight: 600 }}>📍 {property.area}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-1.5px' }}>
            {property.title_es}
          </h1>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#fff' }}>
            {formatPrice(property.price)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div>
            {/* Specs */}
            <div style={{
              display: 'flex', gap: 20, flexWrap: 'wrap',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, padding: '20px 24px', marginBottom: 32,
            }}>
              {[
                property.bedrooms && { icon: '🛏', label: `${property.bedrooms} Habitaciones` },
                property.bathrooms && { icon: '🚿', label: `${property.bathrooms} Baños` },
                property.size_built && { icon: '📐', label: `${property.size_built}m² construidos` },
                property.size_plot && { icon: '🌿', label: `${property.size_plot}m² parcela` },
              ].filter(Boolean).map((spec, i) => spec && (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#c0d8f0' }}>
                  <span style={{ fontSize: 18 }}>{spec.icon}</span>
                  <span>{spec.label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Descripción</h2>
              <p style={{ color: '#7a9ab4', lineHeight: 1.8, fontSize: 15 }}>
                {property.description_es}
              </p>
            </div>

            {/* Features */}
            {property.features?.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Características</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {property.features.map((f, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: 'rgba(0,47,167,0.08)', border: '1px solid rgba(0,47,167,0.15)',
                      borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#a0c0e0',
                    }}>
                      <span style={{ color: '#4a8fd4', fontSize: 16 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image gallery */}
            {property.images?.length > 1 && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Galería</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {property.images.slice(1).map((img, i) => (
                    <div key={i} style={{ borderRadius: 10, overflow: 'hidden', height: 160 }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — Contact card */}
          <div style={{
            position: 'sticky', top: 80,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, padding: 28,
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              ¿Te interesa esta propiedad?
            </h3>
            <p style={{ fontSize: 13, color: '#6a8aaa', marginBottom: 24 }}>
              Contacta con nuestro equipo para más información o para organizar una visita.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:info@ibizaflow.com" style={{
                background: '#002FA7', color: '#fff', padding: '13px 20px',
                borderRadius: 10, textDecoration: 'none', fontWeight: 700,
                fontSize: 14, textAlign: 'center',
              }}>
                Enviar consulta
              </a>
              <a href="tel:+34600000000" style={{
                background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '13px 20px',
                borderRadius: 10, textDecoration: 'none', fontWeight: 600,
                fontSize: 14, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)',
              }}>
                Llamar ahora
              </a>
            </div>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 11, color: '#4a6a8a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>
                Referencia
              </div>
              <div style={{ fontSize: 12, color: '#6a8aaa', fontFamily: 'monospace' }}>
                {property.slug.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
