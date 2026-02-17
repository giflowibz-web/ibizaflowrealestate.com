'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ContactForm from '../ContactForm'
import { Contact } from '@/lib/supabase'

export default function NewContactPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleSave = async (data: Partial<Contact>) => {
    setSaving(true)
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      router.push('/admin/contacts')
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/contacts" style={{ color: '#666', textDecoration: 'none', fontSize: 13 }}>← Contacts</a>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 0' }}>New Contact</h1>
      </div>
      <ContactForm onSave={handleSave} saving={saving} isNew />
    </div>
  )
}
