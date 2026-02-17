import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  let query = supabaseAdmin.from('properties').select('*', { count: 'exact' })

  if (status) query = query.eq('status', status)
  if (type) query = query.eq('listing_type', type)

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count, page, limit })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  // Auto-generate ref if not provided
  if (!body.ref) {
    const { count } = await supabaseAdmin.from('properties').select('*', { count: 'exact', head: true })
    body.ref = `IBZ-${String((count || 0) + 1).padStart(4, '0')}`
  }

  // Auto-generate slug
  if (!body.slug && body.title_es) {
    body.slug = body.title_es
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const { data, error } = await supabaseAdmin.from('properties').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
