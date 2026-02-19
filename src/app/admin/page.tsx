'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Stats {
  total: number
  available: number
  reserved: number
  sold: number
  contacts: number
  new_leads: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, available: 0, reserved: 0, sold: 0, contacts: 0, new_leads: 0 })
  const [heroVideoUrl, setHeroVideoUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.from('site_settings').select('value').eq('key', 'hero_video_url').single()
      .then(({ data }) => { if (data?.value) setHeroVideoUrl(data.value) })
  }, [])

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadMsg('')
    const ext = file.name.split('.').pop()
    const path = `hero.${ext}`
    const { error: upErr } = await supabase.storage.from('hero-video').upload(path, file, { upsert: true })
    if (upErr) { setUploadMsg('Error: ' + upErr.message); setUploading(false); return }
    const { data: urlData } = supabase.storage.from('hero-video').getPublicUrl(path)
    const url = urlData.publicUrl
    await supabase.from('site_settings').upsert({ key: 'hero_video_url', value: url, updated_at: new Date().toISOString() })
    setHeroVideoUrl(url)
    setUploadMsg('¡Video subido correctamente!')
    setUploading(false)
  }

  useEffect(() => {
    Promise.all([
      fetch('/api/properties?limit=1').then(r => r.json()),
      fetch('/api/properties?status=available&limit=1').then(r => r.json()),
      fetch('/api/properties?status=reserved&limit=1').then(r => r.json()),
      fetch('/api/properties?status=sold&limit=1').then(r => r.json()),
      fetch('/api/contacts?limit=1').then(r => r.json()),
      fetch('/api/contacts?status=new&limit=1').then(r => r.json()),
    ]).then(([all, avail, res, sold, contacts, newLeads]) => {
      setStats({
        total: all.count || 0,
        available: avail.count || 0,
        reserved: res.count || 0,
        sold: sold.count || 0,
        contacts: contacts.count || 0,
        new_leads: newLeads.count || 0,
      })
    })
  }, [])

  const cards = [
    { label: 'Total Properties', value: stats.total, color: '#c9a96e', icon: '🏠' },
    { label: 'Available', value: stats.available, color: '#4ade80', icon: '✓' },
    { label: 'Reserved', value: stats.reserved, color: '#facc15', icon: '⏳' },
    { label: 'Sold', value: stats.sold, color: '#f87171', icon: '🔑' },
    { label: 'Total Contacts', value: stats.contacts, color: '#60a5fa', icon: '👥' },
    { label: 'New Leads', value: stats.new_leads, color: '#e879f9', icon: '🔔' },
  ]

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#fff' }}>Dashboard</h1>
        <p style={{ color: '#666', marginTop: 4 }}>{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        {cards.map(card => (
          <div key={card.label} style={{
            background: '#1a1a1a', border: '1px solid #222', borderRadius: 12,
            padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ fontSize: 24 }}>{card.icon}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: 13, color: '#666' }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 12, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', color: '#c9a96e', fontSize: 15 }}>Portal Feed URLs</h3>
          <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>Use these URLs to sync with property portals:</p>
          {[
            { name: 'Idealista / Fotocasa', url: '/api/portal-feed?portal=idealista' },
            { name: 'Kyero / ThinkSpain', url: '/api/portal-feed?portal=kyero' },
          ].map(p => (
            <div key={p.name} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{p.name}</div>
              <code style={{ fontSize: 11, background: '#111', padding: '6px 10px', borderRadius: 6, display: 'block', color: '#4ade80', wordBreak: 'break-all' }}>
                {typeof window !== 'undefined' ? window.location.origin : ''}{p.url}
              </code>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 12, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', color: '#c9a96e', fontSize: 15 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: '+ Add Property', href: '/admin/properties/new', color: '#c9a96e' },
              { label: '+ Add Contact', href: '/admin/contacts/new', color: '#60a5fa' },
              { label: 'View All Properties', href: '/admin/properties', color: '#666' },
              { label: 'View All Leads', href: '/admin/contacts', color: '#666' },
            ].map(a => (
              <a key={a.href} href={a.href} style={{
                display: 'block', padding: '10px 16px', borderRadius: 8,
                background: '#111', border: '1px solid #333',
                color: a.color, textDecoration: 'none', fontSize: 14, fontWeight: 500,
              }}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
