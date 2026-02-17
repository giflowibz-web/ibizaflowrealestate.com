'use client'
import { useState, useRef } from 'react'
import { Property } from '@/lib/supabase'

const FEATURES_OPTIONS = [
  'Pool', 'Sea View', 'Garden', 'Garage', 'Terrace', 'Air Conditioning',
  'Alarm System', 'Jacuzzi', 'BBQ Area', 'Solar Panels', 'Smart Home',
  'Underfloor Heating', 'Wine Cellar', 'Home Cinema', 'Gym', 'Tennis Court',
  'Concierge', 'Boat Mooring', 'Beach Access', 'Mountain View',
]

const AREAS = [
  'Ibiza Town', 'Santa Eulalia', 'San Antonio', 'Talamanca', 'Jesús',
  'Can Roca', 'Roca Llisa', 'Cala Llonga', 'Es Canar', 'Santa Gertrudis',
  'San José', 'Cala Jondal', 'Es Cubells', 'Portinatx', 'San Juan',
  'Cala Vadella', 'Cala Tarida', 'Playa den Bossa', 'Can Furnet',
]

interface Props {
  initial?: Partial<Property>
  onSave: (data: Partial<Property>) => Promise<void>
  saving: boolean
}

const INPUT = {
  background: '#111', border: '1px solid #2a2a2a', borderRadius: 8,
  padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%',
  boxSizing: 'border-box' as const,
}

const LABEL = { fontSize: 13, color: '#888', marginBottom: 6, display: 'block' as const }

export default function PropertyForm({ initial = {}, onSave, saving }: Props) {
  const [form, setForm] = useState<Partial<Property>>({
    status: 'available', listing_type: 'sale', currency: 'EUR',
    island: 'Ibiza', country: 'Spain', features: [], images: [],
    published_idealista: false, published_fotocasa: false, published_kyero: false,
    price_on_request: false, featured: false,
    ...initial,
  })
  const [tab, setTab] = useState<'details' | 'description' | 'media' | 'portals'>('details')
  const [imgInput, setImgInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof Property, val: any) => setForm(f => ({ ...f, [key]: val }))

  const toggleFeature = (f: string) => {
    const features = (form.features as string[]) || []
    set('features', features.includes(f) ? features.filter(x => x !== f) : [...features, f])
  }

  const addImage = () => {
    if (!imgInput.trim()) return
    set('images', [...((form.images as string[]) || []), imgInput.trim()])
    setImgInput('')
  }

  const removeImage = (i: number) => {
    const imgs = [...((form.images as string[]) || [])]
    imgs.splice(i, 1)
    set('images', imgs)
  }

  const uploadFiles = async (files: FileList | File[]) => {
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) urls.push(data.url)
    }
    set('images', [...((form.images as string[]) || []), ...urls])
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
  }

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'description', label: 'Description (ES/EN)' },
    { id: 'media', label: 'Media' },
    { id: 'portals', label: 'Portals' },
  ]

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid #222', paddingBottom: 0 }}>
        {tabs.map(t => (
          <button key={t.id} type="button" onClick={() => setTab(t.id as any)} style={{
            padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer',
            color: tab === t.id ? '#c9a96e' : '#555', fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
            borderBottom: tab === t.id ? '2px solid #c9a96e' : '2px solid transparent',
            marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>

      {/* DETAILS TAB */}
      {tab === 'details' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label style={LABEL}>Title (Spanish) *</label>
            <input style={INPUT} required value={form.title_es || ''} onChange={e => set('title_es', e.target.value)} placeholder="Villa Blanca" />
          </div>
          <div>
            <label style={LABEL}>Title (English)</label>
            <input style={INPUT} value={form.title_en || ''} onChange={e => set('title_en', e.target.value)} placeholder="White Villa" />
          </div>
          <div>
            <label style={LABEL}>Reference</label>
            <input style={INPUT} value={form.ref || ''} onChange={e => set('ref', e.target.value)} placeholder="IBZ-0001 (auto-generated)" />
          </div>
          <div>
            <label style={LABEL}>Property Type</label>
            <select style={INPUT} value={form.property_type || ''} onChange={e => set('property_type', e.target.value)}>
              <option value="">Select type</option>
              {['Villa', 'Apartment', 'Finca', 'Penthouse', 'Townhouse', 'Land', 'Commercial'].map(t => (
                <option key={t} value={t.toLowerCase()}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={LABEL}>Status</label>
            <select style={INPUT} value={form.status || 'available'} onChange={e => set('status', e.target.value as any)}>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div>
            <label style={LABEL}>Listing Type</label>
            <select style={INPUT} value={form.listing_type || 'sale'} onChange={e => set('listing_type', e.target.value as any)}>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="both">Sale & Rent</option>
            </select>
          </div>
          <div>
            <label style={LABEL}>Sale Price (€)</label>
            <input style={INPUT} type="number" value={form.price || ''} onChange={e => set('price', Number(e.target.value))} placeholder="1500000" />
          </div>
          <div>
            <label style={LABEL}>Rent Price (€/month)</label>
            <input style={INPUT} type="number" value={form.price_rent || ''} onChange={e => set('price_rent', Number(e.target.value))} placeholder="5000" />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#888', fontSize: 14 }}>
              <input type="checkbox" checked={form.price_on_request || false} onChange={e => set('price_on_request', e.target.checked)} />
              Price on Request
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#888', fontSize: 14 }}>
              <input type="checkbox" checked={form.featured || false} onChange={e => set('featured', e.target.checked)} />
              Featured Property
            </label>
          </div>
          <div>
            <label style={LABEL}>Area / Zone</label>
            <select style={INPUT} value={form.area || ''} onChange={e => set('area', e.target.value)}>
              <option value="">Select area</option>
              {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={LABEL}>Municipality</label>
            <input style={INPUT} value={form.municipality || ''} onChange={e => set('municipality', e.target.value)} placeholder="Ibiza" />
          </div>
          <div>
            <label style={LABEL}>Bedrooms</label>
            <input style={INPUT} type="number" value={form.bedrooms || ''} onChange={e => set('bedrooms', Number(e.target.value))} />
          </div>
          <div>
            <label style={LABEL}>Bathrooms</label>
            <input style={INPUT} type="number" value={form.bathrooms || ''} onChange={e => set('bathrooms', Number(e.target.value))} />
          </div>
          <div>
            <label style={LABEL}>Built Area (m²)</label>
            <input style={INPUT} type="number" value={form.size_built || ''} onChange={e => set('size_built', Number(e.target.value))} />
          </div>
          <div>
            <label style={LABEL}>Plot Size (m²)</label>
            <input style={INPUT} type="number" value={form.size_plot || ''} onChange={e => set('size_plot', Number(e.target.value))} />
          </div>
          <div>
            <label style={LABEL}>Year Built</label>
            <input style={INPUT} type="number" value={form.year_built || ''} onChange={e => set('year_built', Number(e.target.value))} />
          </div>
          <div>
            <label style={LABEL}>Slug (URL)</label>
            <input style={INPUT} value={form.slug || ''} onChange={e => set('slug', e.target.value)} placeholder="auto-generated from title" />
          </div>

          {/* Features */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={LABEL}>Features</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FEATURES_OPTIONS.map(f => {
                const active = ((form.features as string[]) || []).includes(f)
                return (
                  <button key={f} type="button" onClick={() => toggleFeature(f)} style={{
                    padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
                    border: `1px solid ${active ? '#c9a96e' : '#333'}`,
                    background: active ? '#c9a96e22' : 'transparent',
                    color: active ? '#c9a96e' : '#666',
                  }}>{f}</button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* DESCRIPTION TAB */}
      {tab === 'description' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <div>
            <label style={LABEL}>Description (Spanish)</label>
            <textarea style={{ ...INPUT, height: 200, resize: 'vertical' }}
              value={form.description_es || ''} onChange={e => set('description_es', e.target.value)}
              placeholder="Espectacular villa con vistas al mar..." />
          </div>
          <div>
            <label style={LABEL}>Description (English)</label>
            <textarea style={{ ...INPUT, height: 200, resize: 'vertical' }}
              value={form.description_en || ''} onChange={e => set('description_en', e.target.value)}
              placeholder="Spectacular villa with sea views..." />
          </div>
          <div>
            <label style={LABEL}>Virtual Tour URL</label>
            <input style={INPUT} value={form.virtual_tour_url || ''} onChange={e => set('virtual_tour_url', e.target.value)} placeholder="https://..." />
          </div>
        </div>
      )}

      {/* MEDIA TAB */}
      {tab === 'media' && (
        <div>
          <label style={LABEL}>Image URLs</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input style={{ ...INPUT, flex: 1 }} value={imgInput} onChange={e => setImgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
              placeholder="https://images.unsplash.com/..." />
            <button type="button" onClick={addImage} style={{
              padding: '10px 20px', background: '#c9a96e', color: '#000',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, flexShrink: 0,
            }}>Add</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {((form.images as string[]) || []).map((img, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3', background: '#111' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button type="button" onClick={() => removeImage(i)} style={{
                  position: 'absolute', top: 6, right: 6, background: '#000000aa',
                  border: 'none', color: '#fff', borderRadius: 4, cursor: 'pointer',
                  width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                }}>✕</button>
                {i === 0 && <span style={{ position: 'absolute', bottom: 6, left: 6, background: '#c9a96e', color: '#000', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>COVER</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PORTALS TAB */}
      {tab === 'portals' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <p style={{ color: '#666', fontSize: 14, margin: 0 }}>
            Control which portals this property is exported to via the XML feed.
          </p>
          {[
            { key: 'published_idealista', label: 'Idealista', desc: 'Spain\'s leading property portal' },
            { key: 'published_fotocasa', label: 'Fotocasa', desc: 'Major Spanish real estate portal' },
            { key: 'published_kyero', label: 'Kyero / ThinkSpain', desc: 'International portals for foreign buyers' },
          ].map(portal => (
            <div key={portal.key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#111', border: '1px solid #222', borderRadius: 10, padding: '16px 20px',
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{portal.label}</div>
                <div style={{ color: '#555', fontSize: 13 }}>{portal.desc}</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                <input type="checkbox" checked={(form as any)[portal.key] || false}
                  onChange={e => set(portal.key as keyof Property, e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: 12,
                  background: (form as any)[portal.key] ? '#c9a96e' : '#333',
                  transition: 'background 0.2s',
                }}>
                  <span style={{
                    position: 'absolute', top: 3, left: (form as any)[portal.key] ? 23 : 3,
                    width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left 0.2s',
                  }} />
                </span>
              </label>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { key: 'idealista_id', label: 'Idealista ID' },
              { key: 'fotocasa_id', label: 'Fotocasa ID' },
              { key: 'kyero_id', label: 'Kyero ID' },
            ].map(f => (
              <div key={f.key}>
                <label style={LABEL}>{f.label}</label>
                <input style={INPUT} value={(form as any)[f.key] || ''} onChange={e => set(f.key as any, e.target.value)} placeholder="External ID (optional)" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <button type="submit" disabled={saving} style={{
          padding: '12px 32px', background: '#c9a96e', color: '#000',
          border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
          opacity: saving ? 0.7 : 1,
        }}>{saving ? 'Saving...' : 'Save Property'}</button>
        <a href="/admin/properties" style={{
          padding: '12px 24px', border: '1px solid #333', borderRadius: 8,
          color: '#666', textDecoration: 'none', fontSize: 14,
        }}>Cancel</a>
      </div>
    </form>
  )
}
