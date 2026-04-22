'use client'

import { useState, useRef } from 'react'
import type { Property } from '@/lib/types'

interface GenerateResult {
  title_es: string
  title_en: string
  title_fr: string
  description_es: string
  description_en: string
  description_fr: string
  seo_keywords_es: string
  seo_keywords_en: string
  seo_keywords_fr: string
}

async function generateContent(formData: Partial<Property>): Promise<GenerateResult> {
  const res = await fetch('/api/generate-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Error al generar')
  }
  return res.json()
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

const EMPTY: Partial<Property> = {
  slug: '', title_es: '', title_en: '', title_fr: '',
  description_es: '', description_en: '', description_fr: '',
  seo_keywords_es: '', seo_keywords_en: '', seo_keywords_fr: '',
  property_type: 'villa', listing_type: 'sale', area: '',
  price: null, bedrooms: null, bathrooms: null,
  size_built: null, size_plot: null,
  features: [], images: [], status: 'draft',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 8,
  border: '1px solid #1e2d4a', background: '#0a1020',
  color: '#e8eaf0', fontSize: 14, outline: 'none',
  transition: 'border-color 0.15s',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600,
  color: '#7a94b4', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px',
}

const sectionStyle: React.CSSProperties = {
  background: '#0d1424', border: '1px solid #1e2d4a',
  borderRadius: 12, padding: 24, marginBottom: 20,
}

export default function PropertyForm({ initial, onSave, saving, onSlugChange }: Props) {
  const [form, setForm] = useState<Partial<Property>>({ ...EMPTY, ...initial })
  const [tab, setTab] = useState<'details' | 'descriptions' | 'media'>('details')
  const [langTab, setLangTab] = useState<'es' | 'en' | 'fr'>('es')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')
  const [lastGenerated, setLastGenerated] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof Property, val: unknown) =>
    setForm(f => ({ ...f, [key]: val }))

  const handleTitleEsChange = (val: string) => {
    set('title_es', val)
    if (!initial?.slug) {
      const slug = val.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      set('slug', slug)
      onSlugChange?.(slug)
    }
  }

  const handleGenerate = async () => {
    setGenerating(true)
    setGenError('')
    setLastGenerated(false)
    try {
      const result = await generateContent(form)
      setForm(f => ({
        ...f,
        title_es: result.title_es || f.title_es,
        title_en: result.title_en || f.title_en,
        title_fr: result.title_fr || f.title_fr,
        description_es: result.description_es || f.description_es,
        description_en: result.description_en || f.description_en,
        description_fr: result.description_fr || f.description_fr,
        seo_keywords_es: result.seo_keywords_es || f.seo_keywords_es,
        seo_keywords_en: result.seo_keywords_en || f.seo_keywords_en,
        seo_keywords_fr: result.seo_keywords_fr || f.seo_keywords_fr,
      }))
      setLastGenerated(true)
      setTab('descriptions')
    } catch (e: unknown) {
      setGenError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setGenerating(false)
    }
  }

  const toggleFeature = (f: string) => {
    setForm(prev => ({
      ...prev,
      features: prev.features?.includes(f)
        ? prev.features.filter(x => x !== f)
        : [...(prev.features || []), f],
    }))
  }

  async function uploadFiles(files: FileList) {
    setUploadingImages(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload-image', { method: 'POST', body: fd })
      if (res.ok) {
        const { url } = await res.json()
        if (url) urls.push(url)
      }
    }
    setForm(f => ({ ...f, images: [...(f.images || []), ...urls] }))
    setUploadingImages(false)
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
  }

  const removeImage = (url: string) =>
    setForm(f => ({ ...f, images: (f.images || []).filter(i => i !== url) }))

  const TABS = [
    { key: 'details', label: 'Detalles' },
    { key: 'descriptions', label: 'Descripciones & SEO' },
    { key: 'media', label: 'Imágenes' },
  ]

  return (
    <form onSubmit={async e => { e.preventDefault(); await onSave(form) }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #1e2d4a', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key as typeof tab)}
            style={{
              padding: '10px 20px', background: 'none', border: 'none',
              cursor: 'pointer', fontSize: 14, fontWeight: tab === t.key ? 700 : 400,
              color: tab === t.key ? '#fff' : '#4a6a8a',
              borderBottom: `2px solid ${tab === t.key ? '#002FA7' : 'transparent'}`,
              marginBottom: -1, transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─── DETAILS TAB ─── */}
      {tab === 'details' && (
        <div>
          <div style={sectionStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Información básica</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Nombre (Español) *</label>
                <input
                  style={inputStyle}
                  value={form.title_es || ''}
                  onChange={e => handleTitleEsChange(e.target.value)}
                  placeholder="Ej: Villa Can Montserrat"
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Slug (URL)</label>
                <input
                  style={inputStyle}
                  value={form.slug || ''}
                  onChange={e => set('slug', e.target.value)}
                  placeholder="villa-can-montserrat"
                />
              </div>
              <div>
                <label style={labelStyle}>Estado</label>
                <select
                  style={{ ...inputStyle, appearance: 'none' }}
                  value={form.status || 'draft'}
                  onChange={e => set('status', e.target.value)}
                >
                  <option value="draft">Borrador</option>
                  <option value="active">Activa</option>
                  <option value="archived">Archivada</option>
                </select>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Clasificación</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Tipo de propiedad</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.property_type || 'villa'} onChange={e => set('property_type', e.target.value)}>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartamento</option>
                  <option value="penthouse">Ático</option>
                  <option value="townhouse">Casa adosada</option>
                  <option value="finca">Finca</option>
                  <option value="land">Terreno</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Tipo de operación</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.listing_type || 'sale'} onChange={e => set('listing_type', e.target.value)}>
                  <option value="sale">Venta</option>
                  <option value="rent">Alquiler</option>
                  <option value="both">Venta y alquiler</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Zona</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.area || ''} onChange={e => set('area', e.target.value)}>
                  <option value="">Seleccionar zona</option>
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Datos de la propiedad</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Precio (€)</label>
                <input style={inputStyle} type="number" value={form.price || ''} onChange={e => set('price', e.target.value ? Number(e.target.value) : null)} placeholder="1.500.000" />
              </div>
              <div>
                <label style={labelStyle}>Dormitorios</label>
                <input style={inputStyle} type="number" value={form.bedrooms || ''} onChange={e => set('bedrooms', e.target.value ? Number(e.target.value) : null)} placeholder="4" />
              </div>
              <div>
                <label style={labelStyle}>Baños</label>
                <input style={inputStyle} type="number" value={form.bathrooms || ''} onChange={e => set('bathrooms', e.target.value ? Number(e.target.value) : null)} placeholder="3" />
              </div>
              <div>
                <label style={labelStyle}>Superficie construida (m²)</label>
                <input style={inputStyle} type="number" value={form.size_built || ''} onChange={e => set('size_built', e.target.value ? Number(e.target.value) : null)} placeholder="350" />
              </div>
              <div>
                <label style={labelStyle}>Parcela (m²)</label>
                <input style={inputStyle} type="number" value={form.size_plot || ''} onChange={e => set('size_plot', e.target.value ? Number(e.target.value) : null)} placeholder="1200" />
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Características</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FEATURES_OPTIONS.map(feat => {
                const active = form.features?.includes(feat)
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    style={{
                      padding: '6px 14px', borderRadius: 20, border: '1px solid',
                      borderColor: active ? '#002FA7' : '#1e2d4a',
                      background: active ? 'rgba(0,47,167,0.2)' : 'transparent',
                      color: active ? '#5b9cf7' : '#4a6a8a',
                      cursor: 'pointer', fontSize: 13, fontWeight: active ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  >
                    {feat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── DESCRIPTIONS TAB ─── */}
      {tab === 'descriptions' && (
        <div>
          {/* AI Generator */}
          <div style={{
            background: 'linear-gradient(135deg, #0d1f3c 0%, #1a2d50 100%)',
            border: '1px solid #1e3a6a',
            borderRadius: 12, padding: 24, marginBottom: 24,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>✦</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>
                    Generador con IA — Claude Opus
                  </h3>
                </div>
                <p style={{ color: '#5a7a9a', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                  Genera títulos evocadores, descripciones de lujo y keywords SEO en{' '}
                  <span style={{ color: '#f59e0b', fontWeight: 600 }}>ES</span> ·{' '}
                  <span style={{ color: '#3b82f6', fontWeight: 600 }}>EN</span> ·{' '}
                  <span style={{ color: '#8b5cf6', fontWeight: 600 }}>FR</span>.
                  <br />
                  <span style={{ color: '#3a5a7a', fontSize: 12 }}>
                    Textos Ibiza-específicos y aspiracionales — rellena los detalles primero para mejores resultados.
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating}
                style={{
                  padding: '10px 22px', borderRadius: 8, border: 'none',
                  cursor: generating ? 'not-allowed' : 'pointer',
                  background: generating ? '#1a2a5a' : '#002FA7',
                  color: '#fff', fontWeight: 700, fontSize: 14,
                  display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                {generating ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                    Generando...
                  </>
                ) : (
                  <>⚡ Generar contenido con IA</>
                )}
              </button>
            </div>

            {genError && (
              <div style={{
                marginTop: 16, padding: '10px 14px', borderRadius: 8,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                ⚠ {genError}
              </div>
            )}
            {lastGenerated && !genError && (
              <div style={{
                marginTop: 16, padding: '10px 14px', borderRadius: 8,
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                color: '#4ade80', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                ✓ Contenido generado correctamente. Puedes editar los textos antes de guardar.
              </div>
            )}
          </div>

          {/* Language Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
            {(['es', 'en', 'fr'] as const).map(lang => {
              const labels = { es: '🇪🇸 Español', en: '🇬🇧 English', fr: '🇫🇷 Français' }
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLangTab(lang)}
                  style={{
                    padding: '8px 18px', background: langTab === lang ? 'rgba(0,47,167,0.2)' : 'transparent',
                    border: `1px solid ${langTab === lang ? '#002FA7' : '#1e2d4a'}`,
                    borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: langTab === lang ? 700 : 400,
                    color: langTab === lang ? '#5b9cf7' : '#4a6a8a', transition: 'all 0.15s',
                  }}
                >
                  {labels[lang]}
                </button>
              )
            })}
          </div>

          {/* Content fields per language */}
          {(['es', 'en', 'fr'] as const).map(lang => langTab === lang && (
            <div key={lang}>
              <div style={sectionStyle}>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Título ({lang.toUpperCase()})</label>
                  <input
                    style={inputStyle}
                    value={(form[`title_${lang}` as keyof Property] as string) || ''}
                    onChange={e => set(`title_${lang}` as keyof Property, e.target.value)}
                    placeholder={lang === 'es' ? 'Título evocador en español' : lang === 'en' ? 'Evocative title in English' : 'Titre évocateur en français'}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Descripción ({lang.toUpperCase()})</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 160, resize: 'vertical' }}
                    value={(form[`description_${lang}` as keyof Property] as string) || ''}
                    onChange={e => set(`description_${lang}` as keyof Property, e.target.value)}
                    placeholder={lang === 'es' ? 'Descripción detallada en español...' : lang === 'en' ? 'Detailed description in English...' : 'Description détaillée en français...'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>SEO Keywords ({lang.toUpperCase()})</label>
                  <input
                    style={inputStyle}
                    value={(form[`seo_keywords_${lang}` as keyof Property] as string) || ''}
                    onChange={e => set(`seo_keywords_${lang}` as keyof Property, e.target.value)}
                    placeholder="villa de lujo Ibiza, comprar villa Ibiza..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── MEDIA TAB ─── */}
      {tab === 'media' && (
        <div>
          <div style={sectionStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Imágenes</h3>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? '#002FA7' : '#1e2d4a'}`,
                borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer',
                background: dragOver ? 'rgba(0,47,167,0.05)' : 'transparent',
                transition: 'all 0.2s', marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
              <div style={{ color: '#5a7a9a', fontSize: 14 }}>
                {uploadingImages ? 'Subiendo imágenes...' : 'Arrastra imágenes aquí o haz clic para seleccionar'}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => e.target.files && uploadFiles(e.target.files)}
              />
            </div>

            {/* Image grid */}
            {(form.images || []).length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {(form.images || []).map((url, i) => (
                  <div key={url} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Imagen ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      style={{
                        position: 'absolute', top: 6, right: 6,
                        background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff',
                        width: 24, height: 24, borderRadius: '50%', cursor: 'pointer', fontSize: 14,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >×</button>
                    {i === 0 && (
                      <span style={{
                        position: 'absolute', bottom: 6, left: 6,
                        background: 'rgba(0,47,167,0.8)', color: '#fff',
                        fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                      }}>Principal</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, paddingTop: 20, borderTop: '1px solid #1e2d4a' }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '12px 32px', borderRadius: 8, border: 'none',
            background: saving ? '#1a2a5a' : '#002FA7',
            color: '#fff', fontWeight: 700, fontSize: 15,
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {saving ? 'Guardando...' : 'Guardar propiedad'}
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </form>
  )
}
