'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Contact } from '@/lib/supabase'

const STATUS_COLORS: Record<string, string> = {
  new: '#e879f9', contacted: '#60a5fa', qualified: '#facc15',
  negotiating: '#fb923c', closed: '#4ade80', lost: '#f87171',
}
const TYPE_ICONS: Record<string, string> = {
  buyer: '🏠', renter: '🔑', seller: '💼', investor: '📈',
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState('')

  const load = () => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '100' })
    if (statusFilter) params.set('status', statusFilter)
    fetch(`/api/contacts?${params}`)
      .then(r => r.json())
      .then(({ data, count }) => { setContacts(data || []); setCount(count || 0) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [statusFilter])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/contacts/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setEditing(null)
    load()
  }

  const deleteContact = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = contacts.filter(c =>
    !filter ||
    c.name?.toLowerCase().includes(filter.toLowerCase()) ||
    c.email?.toLowerCase().includes(filter.toLowerCase()) ||
    c.phone?.includes(filter)
  )

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Contacts / CRM</h1>
          <p style={{ color: '#666', marginTop: 4, fontSize: 14 }}>{count} total contacts</p>
        </div>
        <Link href="/admin/contacts/new" style={{
          background: '#60a5fa', color: '#000', padding: '10px 20px',
          borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14,
        }}>+ Add Contact</Link>
      </div>

      {/* Status pipeline */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {[{ v: '', l: 'All' }, { v: 'new', l: 'New' }, { v: 'contacted', l: 'Contacted' },
          { v: 'qualified', l: 'Qualified' }, { v: 'negotiating', l: 'Negotiating' },
          { v: 'closed', l: 'Closed' }, { v: 'lost', l: 'Lost' }].map(s => (
          <button key={s.v} onClick={() => setStatusFilter(s.v)} style={{
            padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
            background: statusFilter === s.v ? (STATUS_COLORS[s.v] || '#c9a96e') + '33' : '#1a1a1a',
            color: statusFilter === s.v ? (STATUS_COLORS[s.v] || '#c9a96e') : '#666',
            outline: statusFilter === s.v ? `1px solid ${STATUS_COLORS[s.v] || '#c9a96e'}` : '1px solid #222',
          }}>{s.l}</button>
        ))}
      </div>

      <input
        placeholder="Search by name, email, phone..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 20, boxSizing: 'border-box' }}
      />

      {loading ? (
        <div style={{ color: '#666', textAlign: 'center', padding: 60 }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, color: '#444' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
          <div style={{ fontSize: 18, marginBottom: 8 }}>No contacts yet</div>
          <Link href="/admin/contacts/new" style={{ color: '#60a5fa' }}>Add your first contact →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {filtered.map(c => (
            <div key={c.id} style={{
              background: '#1a1a1a', border: '1px solid #222', borderRadius: 12,
              padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16,
            }}>
              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: '#222',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>{TYPE_ICONS[c.type] || '👤'}</div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: '#666', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {c.email && <span>✉️ {c.email}</span>}
                  {c.phone && <span>📞 {c.phone}</span>}
                  {c.nationality && <span>🌍 {c.nationality}</span>}
                  {c.source && <span>📌 {c.source}</span>}
                </div>
              </div>

              {/* Budget */}
              {(c.budget_min || c.budget_max) && (
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, color: '#c9a96e', fontWeight: 600 }}>
                    {c.budget_min ? `€${(c.budget_min / 1000).toFixed(0)}k` : ''}
                    {c.budget_min && c.budget_max ? ' – ' : ''}
                    {c.budget_max ? `€${(c.budget_max / 1000).toFixed(0)}k` : ''}
                  </div>
                  <div style={{ fontSize: 11, color: '#555', textTransform: 'capitalize' }}>{c.type}</div>
                </div>
              )}

              {/* Property */}
              {c.properties && (
                <div style={{ fontSize: 12, color: '#555', flexShrink: 0 }}>
                  🏠 {c.properties.ref}
                </div>
              )}

              {/* Status */}
              <div style={{ flexShrink: 0 }}>
                {editing === c.id ? (
                  <select
                    autoFocus
                    defaultValue={c.status}
                    onChange={e => updateStatus(c.id, e.target.value)}
                    onBlur={() => setEditing(null)}
                    style={{ background: '#111', border: '1px solid #333', borderRadius: 6, padding: '4px 8px', color: '#fff', fontSize: 12 }}
                  >
                    {['new', 'contacted', 'qualified', 'negotiating', 'closed', 'lost'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <button onClick={() => setEditing(c.id)} style={{
                    padding: '4px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: STATUS_COLORS[c.status] + '22', color: STATUS_COLORS[c.status],
                    fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                  }}>{c.status}</button>
                )}
              </div>

              {/* Follow up */}
              {c.next_followup && (
                <div style={{ fontSize: 12, color: '#555', flexShrink: 0 }}>
                  📅 {new Date(c.next_followup).toLocaleDateString('en-GB')}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Link href={`/admin/contacts/${c.id}`} style={{
                  padding: '6px 14px', borderRadius: 6, border: '1px solid #333',
                  color: '#888', textDecoration: 'none', fontSize: 13,
                }}>Edit</Link>
                <button onClick={() => deleteContact(c.id, c.name)} style={{
                  padding: '6px 12px', borderRadius: 6, border: '1px solid #f8717144',
                  background: 'transparent', color: '#f87171', cursor: 'pointer', fontSize: 13,
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
