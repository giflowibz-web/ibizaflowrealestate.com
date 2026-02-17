'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ContactForm from '../ContactForm'
import { Contact } from '@/lib/supabase'

export default function EditContactPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [contact, setContact] = useState<Partial<Contact> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/contacts`)
      .then(r => r.json())
      .then(({ data }) => {
        const c = data?.find((x: any) => x.id === id)
        if (c) setContact(c)
      })
  }, [id])

  const handleSave = async (data: Partial<Contact>) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
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

  if (!contact) return <div style={{ padding: 32, color: '#666' }}>Loading...</div>

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/contacts" style={{ color: '#666', textDecoration: 'none', fontSize: 13 }}>← Contacts</a>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0 0' }}>Edit Contact</h1>
        <p style={{ color: '#555', fontSize: 13, marginTop: 4 }}>{contact.name}</p>
      </div>
      <ContactForm initial={contact} onSave={handleSave} saving={saving} />
    </div>
  )
}
