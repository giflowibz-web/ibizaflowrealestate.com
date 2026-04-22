'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PropertyForm from '../PropertyForm'
import { Property } from '@/lib/supabase'

export default function NewPropertyPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleSave = async (data: Partial<Property>) => {
    setSaving(true)
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      router.push('/admin/properties')
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/properties" style={{ color: '#666', textDecoration: 'none', fontSize: 13 }}>← Properties</a>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 0' }}>New Property</h1>
      </div>
      <PropertyForm onSave={handleSave} saving={saving} />
    </div>
  )
}
