'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Contact } from '@/lib/supabase'

const INPUT = {
  background: '#111', border: '1px solid #2a2a2a', borderRadius: 8,
  padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%',
  boxSizing: 'border-box' as const,
}
const LABEL = { fontSize: 13, color: '#888', marginBottom: 6, display: 'block' as const }

interface Props {
  initial?: Partial<Contact>
  onSave: (data: Partial<Contact>) => Promise<void>
  saving: boolean
  isNew?: boolean
}

export default function ContactForm({ initial = {}, onSave, saving, isNew }: Props) {
  const [form, setForm] = useState<Partial<Contact>>({
    status: 'new', type: 'buyer', language: 'en',
    ...initial,
  })

  const set = (key: keyof Contact, val: any) => setForm(f => ({ ...f, [key]: val }))

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={LABEL}>Full Name *</label>
          <input style={INPUT} required value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="John Smith" />
        </div>
        <div>
          <label style={LABEL}>Email</label>
          <input style={INPUT} type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="john@email.com" />
        </div>
        <div>
          <label style={LABEL}>Phone</label>
          <input style={INPUT} value={form.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+34 600 000 000" />
        </div>
        <div>
          <label style={LABEL}>Nationality</label>
          <input style={INPUT} value={form.nationality || ''} onChange={e => set('nationality', e.target.value)} placeholder="British, German, Spanish..." />
        </div>
        <div>
          <label style={LABEL}>Language</label>
          <select style={INPUT} value={form.language || 'en'} onChange={e => set('language', e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="it">Italian</option>
            <option value="nl">Dutch</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <div>
          <label style={LABEL}>Type</label>
          <select style={INPUT} value={form.type || 'buyer'} onChange={e => set('type', e.target.value as any)}>
            <option value="buyer">Buyer</option>
            <option value="renter">Renter</option>
            <option value="seller">Seller</option>
            <option value="investor">Investor</option>
          </select>
        </div>
        <div>
          <label style={LABEL}>Status</label>
          <select style={INPUT} value={form.status || 'new'} onChange={e => set('status', e.target.value as any)}>
            <option value="new">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="negotiating">Negotiating</option>
            <option value="closed">Closed</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div>
          <label style={LABEL}>Source</label>
          <select style={INPUT} value={form.source || ''} onChange={e => set('source', e.target.value)}>
            <option value="">Unknown</option>
            <option value="website">Website</option>
            <option value="idealista">Idealista</option>
            <option value="fotocasa">Fotocasa</option>
            <option value="kyero">Kyero</option>
            <option value="referral">Referral</option>
            <option value="instagram">Instagram</option>
            <option value="direct">Direct</option>
          </select>
        </div>
        <div>
          <label style={LABEL}>Budget Min (€)</label>
          <input style={INPUT} type="number" value={form.budget_min || ''} onChange={e => set('budget_min', Number(e.target.value))} placeholder="500000" />
        </div>
        <div>
          <label style={LABEL}>Budget Max (€)</label>
          <input style={INPUT} type="number" value={form.budget_max || ''} onChange={e => set('budget_max', Number(e.target.value))} placeholder="2000000" />
        </div>
        <div>
          <label style={LABEL}>Next Follow-up</label>
          <input style={INPUT} type="date" value={form.next_followup || ''} onChange={e => set('next_followup', e.target.value)} />
        </div>
        <div>
          <label style={LABEL}>Assigned To</label>
          <input style={INPUT} value={form.assigned_to || ''} onChange={e => set('assigned_to', e.target.value)} placeholder="Agent name" />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={LABEL}>Interested In</label>
          <input style={INPUT} value={form.interested_in || ''} onChange={e => set('interested_in', e.target.value)} placeholder="Villa with pool, sea views, 3-4 bedrooms..." />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={LABEL}>Notes</label>
          <textarea style={{ ...INPUT, height: 120, resize: 'vertical' }}
            value={form.notes || ''} onChange={e => set('notes', e.target.value)}
            placeholder="Internal notes about this contact..." />
        </div>
      </div>

      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <button type="submit" disabled={saving} style={{
          padding: '12px 32px', background: '#60a5fa', color: '#000',
          border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700,
          cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
        }}>{saving ? 'Saving...' : 'Save Contact'}</button>
        <a href="/admin/contacts" style={{
          padding: '12px 24px', border: '1px solid #333', borderRadius: 8,
          color: '#666', textDecoration: 'none', fontSize: 14,
        }}>Cancel</a>
      </div>
    </form>
  )
}
