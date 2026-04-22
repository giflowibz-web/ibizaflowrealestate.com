'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PropertyForm from '../PropertyForm'
import { supabase } from '@/lib/supabase'
import type { Property } from '@/lib/types'

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [property, setProperty] = useState<Partial<Property> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    supabase.from('properties').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error) setError(error.message)
      else setProperty(data)
      setLoading(false)
    })
  }, [id])

  const handleSave = async (data: Partial<Property>) => {
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      const { error: err } = await supabase
        .from('properties')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (err) throw err
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Seguro que quieres eliminar esta propiedad?')) return
    const { error: err } = await supabase.from('properties').delete().eq('id', id)
    if (err) { setError(err.message); return }
    router.push('/admin/properties')
  }

  if (loading) return (
    <div style={{ padding: 40, color: '#4a6a8a', textAlign: 'center' }}>Cargando...</div>
  )

  if (!property) return (
    <div style={{ padding: 40, color: '#f87171' }}>Propiedad no encontrada</div>
  )

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <a
            href="/admin/properties"
            style={{ color: '#4a6a8a', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}
          >
            ← Volver a propiedades
          </a>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>
            {property.title_es || 'Editar propiedad'}
          </h1>
          {property.slug && (
            <div style={{ color: '#4a6a8a', fontSize: 13, marginTop: 4 }}>/{property.slug}</div>
          )}
        </div>
        <button
          type="button"
          onClick={handleDelete}
          style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)',
            background: 'transparent', color: '#f87171', cursor: 'pointer', fontSize: 13,
          }}
        >
          Eliminar
        </button>
      </div>

      {error && (
        <div style={{
          marginBottom: 20, padding: '12px 16px', borderRadius: 8,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          color: '#f87171', fontSize: 14,
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          marginBottom: 20, padding: '12px 16px', borderRadius: 8,
          background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
          color: '#4ade80', fontSize: 14,
        }}>
          ✓ Propiedad guardada correctamente
        </div>
      )}

      <PropertyForm initial={property} onSave={handleSave} saving={saving} />
    </div>
  )
}
