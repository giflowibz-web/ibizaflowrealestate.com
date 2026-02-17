'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PropertyForm from '../PropertyForm'
import { Property } from '@/lib/supabase'

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [property, setProperty] = useState<Partial<Property> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then(r => r.json())
      .then(({ data }) => setProperty(data))
  }, [id])

  const handleSave = async (data: Partial<Property>) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
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

  if (!property) return <div style={{ padding: 32, color: '#666' }}>Loading...</div>

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/properties" style={{ color: '#666', textDecoration: 'none', fontSize: 13 }}>← Properties</a>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 0' }}>Edit Property</h1>
        <p style={{ color: '#555', fontSize: 13, marginTop: 4 }}>{property.ref}</p>
      </div>
      <PropertyForm initial={property} onSave={handleSave} saving={saving} />
    </div>
  )
}
