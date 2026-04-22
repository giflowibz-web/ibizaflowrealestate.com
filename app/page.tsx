import Link from 'next/link'
import { getAllProperties } from '@/lib/db'
import PropertyCard from './PropertyCard'

function formatPrice(price: number | null) {
  if (!price) return 'Consultar precio'
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

export default function HomePage() {
  const allProperties = getAllProperties()
  const properties = allProperties.filter(p => p.status === 'active')

  const prices = properties.map(p => p.price).filter(Boolean) as number[]
  const minPrice = prices.length ? Math.min(...prices) : null
  const maxPrice = prices.length ? Math.max(...prices) : null
  const priceRange = minPrice && maxPrice
    ? `${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(minPrice)} – ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(maxPrice)}`
    : 'Consultar'

  return (
    <div style={{ minHeight: '100vh', background: '#05080f', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(5,8,15,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>Ibiza Flow</span>
          <span style={{
            fontSize: 10, fontWeight: 600, color: '#002FA7',
            background: 'rgba(0,47,167,0.15)', border: '1px solid rgba(0,47,167,0.3)',
            borderRadius: 4, padding: '2px 6px', letterSpacing: '1px', textTransform: 'uppercase',
          }}>Real Estate</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#propiedades" style={{ color: '#9ab', textDecoration: 'none', fontSize: 14 }}>Propiedades</a>
          <a href="#contacto" style={{ color: '#9ab', textDecoration: 'none', fontSize: 14 }}>Contacto</a>
          <Link href="/admin/properties" style={{
            background: '#002FA7', color: '#fff', padding: '8px 18px',
            borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600,
          }}>Admin</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        position: 'relative', minHeight: '92vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingTop: 64, overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,8,15,0.3) 0%, rgba(5,8,15,0.1) 50%, rgba(5,8,15,0.9) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780, padding: '0 24px' }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: '#7aa8d4',
            background: 'rgba(0,47,167,0.15)', border: '1px solid rgba(0,47,167,0.3)',
            borderRadius: 20, padding: '6px 16px', marginBottom: 28,
          }}>
            Ibiza · Lujo & Exclusividad
          </div>
          <h1 style={{
            fontSize: 'clamp(42px,7vw,78px)', fontWeight: 900, color: '#fff',
            lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 24px',
          }}>
            Las mejores<br />
            <span style={{ color: '#4a8fd4' }}>propiedades</span><br />
            de Ibiza
          </h1>
          <p style={{ fontSize: 18, color: '#8ab0cc', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>
            Selección exclusiva de villas, fincas y áticos en las zonas más privilegiadas de la isla.
          </p>
          <a href="#propiedades" style={{
            display: 'inline-block', background: '#002FA7', color: '#fff',
            padding: '16px 40px', borderRadius: 12, textDecoration: 'none',
            fontWeight: 700, fontSize: 15, letterSpacing: '0.3px',
          }}>
            Ver propiedades →
          </a>
        </div>
      </div>

      {/* STATS */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 40px',
        display: 'flex', justifyContent: 'center', gap: 80, flexWrap: 'wrap',
      }}>
        {[
          { num: `${properties.length}`, label: 'Propiedades disponibles' },
          { num: '15+', label: 'Años de experiencia' },
          { num: priceRange, label: 'Rango de precios' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>{s.num}</div>
            <div style={{ fontSize: 13, color: '#5a7a9a', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* PROPERTIES GRID */}
      <section id="propiedades" style={{ padding: '80px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#4a8fd4', marginBottom: 12 }}>
              Portfolio
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-1px' }}>
              Propiedades destacadas
            </h2>
          </div>
          <div style={{ color: '#5a7a9a', fontSize: 14 }}>
            {properties.length} propiedades activas
          </div>
        </div>

        {properties.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            background: 'rgba(255,255,255,0.02)', borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
            <p style={{ color: '#5a7a9a', fontSize: 16 }}>Próximamente nuevas propiedades</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 28,
          }}>
            {properties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section id="contacto" style={{
        background: 'linear-gradient(135deg, rgba(0,47,167,0.15) 0%, rgba(0,20,60,0.3) 100%)',
        borderTop: '1px solid rgba(0,47,167,0.2)',
        padding: '80px 40px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#4a8fd4', marginBottom: 16 }}>
          Contacto
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-1px' }}>
          ¿Interesado en una propiedad?
        </h2>
        <p style={{ color: '#7a9ab4', fontSize: 17, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          Nuestro equipo de expertos te acompaña en todo el proceso.
        </p>
        <a href="mailto:info@ibizaflow.com" style={{
          display: 'inline-block', background: '#002FA7', color: '#fff',
          padding: '16px 44px', borderRadius: 12, textDecoration: 'none',
          fontWeight: 700, fontSize: 15,
        }}>
          info@ibizaflow.com
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '28px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>Ibiza Flow Real Estate</span>
        <span style={{ color: '#3a5a7a', fontSize: 13 }}>© {new Date().getFullYear()} Todos los derechos reservados</span>
      </footer>
    </div>
  )
}
