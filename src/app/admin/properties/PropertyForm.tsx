'use client'
import { useState, useRef } from 'react'
import { Property } from '@/lib/supabase'

interface GenerateResult {
  title_es: string; title_en: string; title_fr: string
  description_es: string; description_en: string; description_fr: string
  seo_keywords_es: string; seo_keywords_en: string; seo_keywords_fr: string
}

async function generateContent(formData: Partial<Property>): Promise<GenerateResult> {
  const res = await fetch('/api/generate-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || 'Error al generar')
  return body
}

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
  onSlugChange?: (slug: string) => void
}

const INPUT = {
  background: '#111', border: '1px solid #2a2a2a', borderRadius: 8,
  padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%',
  boxSizing: 'border-box' as const,
}
const LABEL = { fontSize: 13, color: '#888', marginBottom: 6, display: 'block' as const }

type Lang = 'es' | 'en' | 'fr'

export default function PropertyForm({ initial = {}, onSave, saving, onSlugChange }: Props) {
  const [form, setForm] = useState<Partial<Property>>({
    status: 'available', listing_type: 'sale', currency: 'EUR',
    island: 'Ibiza', country: 'Spain', features: [], images: [],
    published_idealista: false, published_fotocasa: false, published_kyero: false,
    price_on_request: false, featured: false,
    ...initial,
  })
  const [tab, setTab] = useState<'details' | 'description' | 'media' | 'portals'>('details')
  const [lang, setLang] = useState<Lang>('es')
  const [imgInput, setImgInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')
  const [genOk, setGenOk] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof Property, val: any) => {
    setForm(f => {
      const next = { ...f, [key]: val }
      if (key === 'slug' && onSlugChange) onSlugChange(val as string)
      return next
    })
  }

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
    e.preventDefault(); setDragOver(false)
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
  }

  const handleGenerate = async () => {
    setGenerating(true); setGenError(''); setGenOk(false)
    try {
      const result = await generateContent(form)
      setForm(f => ({ ...f, ...result }))
      setGenOk(true)
    } catch (e: any) {
      setGenError(e.message || 'Error desconocido')
    } finally {
      setGenerating(false)
    }
  }

  const BLUE = '#002FA7'
  const langTabs: { id: Lang; label: string; flag: string }[] = [
    { id: 'es', label: 'Español', flag: '🇪🇸' },
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
  ]

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>

      {/* Main tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid #222' }}>
        {[
          { id: 'details', label: 'Details' },
          { id: 'description', label: 'Descripciones & SEO' },
          { id: 'media', label: 'Media' },
          { id: 'portals', label: 'Portals' },
        ].map(t => (
          <button key={t.id} type="button" onClick={() => setTab(t.id as any)} style={{
            padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer',
            color: tab === t.id ? BLUE : '#555', fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
            borderBottom: tab === t.id ? `2px solid ${BLUE}` : '2px solid transparent', marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>

      {/* DETAILS */}
      {tab === 'details' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label style={LABEL}>Título (Español) *</label>
            <input style={INPUT} required value={form.title_es || ''} onChange={e => set('title_es', e.target.value)} placeholder="Villa Blanca" />
          </div>
          <div>
            <label style={LABEL}>Title (English)</label>
            <input style={INPUT} value={form.title_en || ''} onChange={e => set('title_en', e.target.value)} placeholder="White Villa" />
          </div>
          <div>
            <label style={LABEL}>Titre (Français)</label>
            <input style={INPUT} value={(form as any).title_fr || ''} onChange={e => set('title_fr' as any, e.target.value)} placeholder="Villa Blanche" />
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
          <div style={{ gridColumn: '1/-1', display: 'flex', gap: 24 }}>
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
          <div style={{ gridColumn: '1/-1' }}>
            <label style={LABEL}>Features</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FEATURES_OPTIONS.map(f => {
                const active = ((form.features as string[]) || []).includes(f)
                return (
                  <button key={f} type="button" onClick={() => toggleFeature(f)} style={{
                    padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
                    border: `1px solid ${active ? BLUE : '#333'}`,
                    background: active ? `${BLUE}1A` : 'transparent',
                    color: active ? BLUE : '#666',
                  }}>{f}</button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* DESCRIPTION & SEO */}
      {tab === 'description' && (
        <div style={{ display: 'grid', gap: 20 }}>

          {/* AI Panel */}
          <div style={{
            background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1a3a 100%)',
            border: '1px solid #002FA733', borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Generador con IA — Claude Opus</span>
                </div>
                <p style={{ color: '#556', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                  Genera títulos evocadores, descripciones de lujo y keywords SEO en{' '}
                  <strong style={{ color: '#4a6fa5' }}>ES · EN · FR</strong>.<br />
                  <span style={{ color: '#3a5a8a', fontSize: 12 }}>
                    Textos Ibiza-específicos y aspiracionales — rellena los detalles primero.
                  </span>
                </p>
              </div>
              <button type="button" onClick={handleGenerate} disabled={generating} style={{
                padding: '10px 22px', borderRadius: 8, border: 'none',
                cursor: generating ? 'not-allowed' : 'pointer',
                background: generating ? '#1a2a5a' : BLUE,
                color: '#fff', fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
              }}>
                {generating ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Generando...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    Generar contenido con IA
                  </>
                )}
              </button>
            </div>
            {genOk && (
              <div style={{ marginTop: 12, padding: '8px 14px', background: '#00aa6622', borderRadius: 6, color: '#4ade80', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Títulos, descripciones y keywords generados en ES · EN · FR
              </div>
            )}
            {genError && (
              <div style={{ marginTop: 12, padding: '8px 14px', background: '#f8717122', borderRadius: 6, color: '#f87171', fontSize: 13 }}>
                ⚠ {genError}
              </div>
            )}
          </div>

          {/* Language tabs */}
          <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid #1a1a1a' }}>
            {langTabs.map(lt => (
              <button key={lt.id} type="button" onClick={() => setLang(lt.id)} style={{
                padding: '8px 20px', background: 'none', border: 'none', cursor: 'pointer',
                color: lang === lt.id ? '#fff' : '#555', fontSize: 13,
                fontWeight: lang === lt.id ? 600 : 400,
                borderBottom: lang === lt.id ? `2px solid ${BLUE}` : '2px solid transparent',
                marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span>{lt.flag}</span> {lt.label}
              </button>
            ))}
          </div>

          {/* Title */}
          <div>
            <label style={LABEL}>
              {lang === 'es' ? 'Título (Español)' : lang === 'en' ? 'Title (English)' : 'Titre (Français)'}
            </label>
            <input style={INPUT}
              value={(form as any)[`title_${lang}`] || ''}
              onChange={e => set(`title_${lang}` as any, e.target.value)}
              placeholder={
                lang === 'es' ? 'Villa con vistas infinitas al Mediterráneo...' :
                lang === 'en' ? 'Clifftop Villa with Endless Sea Views...' :
                'Villa Suspendue face à la Méditerranée...'
              }
            />
          </div>

          {/* Description */}
          <div>
            <label style={LABEL}>
              {lang === 'es' ? 'Descripción (Español)' : lang === 'en' ? 'Description (English)' : 'Description (Français)'}
            </label>
            <textarea style={{ ...INPUT, height: 220, resize: 'vertical', lineHeight: 1.7 }}
              value={(form as any)[`description_${lang}`] || ''}
              onChange={e => set(`description_${lang}` as any, e.target.value)}
              placeholder={
                lang === 'es' ? 'Desde lo alto de Es Cubells, donde el tiempo se detiene y el Mediterráneo...' :
                lang === 'en' ? 'Perched above the turquoise stillness of southern Ibiza...' :
                'Perchée au-dessus des eaux turquoise du sud d\'Ibiza...'
              }
            />
          </div>

          {/* SEO Keywords */}
          <div>
            <label style={{ ...LABEL, display: 'flex', alignItems: 'center', gap: 8 }}>
              {lang === 'es' ? 'Keywords SEO (Español)' : lang === 'en' ? 'SEO Keywords (English)' : 'Mots-clés SEO (Français)'}
              <span style={{ fontSize: 11, color: '#444', background: '#1a1a1a', padding: '2px 8px', borderRadius: 10, fontWeight: 400 }}>separadas por comas</span>
            </label>
            <textarea style={{ ...INPUT, height: 80, resize: 'vertical', lineHeight: 1.6 }}
              value={(form as any)[`seo_keywords_${lang}`] || ''}
              onChange={e => set(`seo_keywords_${lang}` as any, e.target.value)}
              placeholder={
                lang === 'es' ? 'villa de lujo en Ibiza, comprar villa Ibiza, inmobiliaria de lujo...' :
                lang === 'en' ? 'luxury villa Ibiza, buy property Ibiza, Ibiza luxury real estate...' :
                'villa de luxe Ibiza, acheter villa Ibiza, immobilier de luxe Ibiza...'
              }
            />
          </div>

          <div>
            <label style={LABEL}>Virtual Tour URL</label>
            <input style={INPUT} value={form.virtual_tour_url || ''} onChange={e => set('virtual_tour_url', e.target.value)} placeholder="https://..." />
          </div>
        </div>
      )}

      {/* MEDIA */}
      {tab === 'media' && (
        <div>
          <div onDrop={handleDrop} onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)} onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? BLUE : '#333'}`, borderRadius: 12, padding: 40,
              textAlign: 'center', cursor: 'pointer', marginBottom: 20,
              background: dragOver ? '#002FA70D' : '#0a0a0a', transition: 'all 0.2s',
            }}>
            <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: 'none' }}
              onChange={e => e.target.files && uploadFiles(e.target.files)} />
            {uploading ? (
              <div style={{ color: BLUE, fontSize: 15 }}>Uploading...</div>
            ) : (
              <>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
                <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Drag & drop photos here or click to select</div>
                <div style={{ color: '#555', fontSize: 13 }}>JPG, PNG, WEBP — multiple files allowed</div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input style={{ ...INPUT, flex: 1 }} value={imgInput} onChange={e => setImgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
              placeholder="Or paste image URL..." />
            <button type="button" onClick={addImage} style={{
              padding: '10px 20px', background: '#222', color: '#fff',
              border: '1px solid #333', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}>Add URL</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {((form.images as string[]) || []).map((img, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3', background: '#111' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button type="button" onClick={() => removeImage(i)} style={{
                  position: 'absolute', top: 6, right: 6, background: '#000000cc',
                  border: 'none', color: '#fff', borderRadius: 4, cursor: 'pointer',
                  width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                }}>✕</button>
                {i === 0 && <span style={{ position: 'absolute', bottom: 6, left: 6, background: BLUE, color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>COVER</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PORTALS */}
      {tab === 'portals' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <p style={{ color: '#666', fontSize: 14, margin: 0 }}>Control which portals this property is exported to via the XML feed.</p>
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
                <span style={{ position: 'absolute', inset: 0, borderRadius: 12, background: (form as any)[portal.key] ? BLUE : '#333', transition: 'background 0.2s' }}>
                  <span style={{ position: 'absolute', top: 3, left: (form as any)[portal.key] ? 23 : 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left 0.2s' }} />
                </span>
              </label>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[{ key: 'idealista_id', label: 'Idealista ID' }, { key: 'fotocasa_id', label: 'Fotocasa ID' }, { key: 'kyero_id', label: 'Kyero ID' }].map(f => (
              <div key={f.key}>
                <label style={LABEL}>{f.label}</label>
                <input style={INPUT} value={(form as any)[f.key] || ''} onChange={e => set(f.key as any, e.target.value)} placeholder="External ID (optional)" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <button type="submit" disabled={saving} style={{
          padding: '12px 32px', background: BLUE, color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700,
          cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
        }}>{saving ? 'Saving...' : 'Save Property'}</button>
        <a href="/admin/properties" style={{ padding: '12px 24px', border: '1px solid #333', borderRadius: 8, color: '#666', textDecoration: 'none', fontSize: 14 }}>Cancel</a>
      </div>
    </form>
  )
}
