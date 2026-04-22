'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PropertyForm from '../PropertyForm'
import { supabase } from '@/lib/supabase'
import type { Property } from '@/lib/types'

export default function NewPropertyPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (data: Partial<Property>) => {
    setSaving(true)
    setError('')
    try {
      const { error: err } = await supabase.from('properties').insert([{
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      if (err) throw err
      router.push('/admin/properties')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: 28 }}>
        <a
          href="/admin/properties"
          style={{ color: '#4a6a8a', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}
        >
          ← Volver a propiedades
        </a>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Nueva propiedad</h1>
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

      <PropertyForm onSave={handleSave} saving={saving} />
    </div>
  )
}
