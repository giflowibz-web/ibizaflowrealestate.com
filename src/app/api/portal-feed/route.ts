import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const portal = searchParams.get('portal') || 'idealista'

  const { data: properties, error } = await supabaseAdmin
    .from('properties')
    .select('*')
    .eq('status', 'available')
    .neq('status', 'draft')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const xml = generateXML(properties || [], portal)

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function generateXML(properties: any[], portal: string): string {
  const items = properties.map((p) => {
    const price = p.price_on_request ? '' : `<precio>${p.price}</precio>`
    const images = (p.images || []).map((img: string) => `<foto>${img}</foto>`).join('\n        ')

    if (portal === 'kyero') {
      return `
    <property>
      <id>${p.ref}</id>
      <date>${p.updated_at}</date>
      <ref>${p.ref}</ref>
      <price>${p.price || 0}</price>
      <currency>${p.currency || 'EUR'}</currency>
      <type>${p.listing_type === 'rent' ? 'rent' : 'sale'}</type>
      <town>${p.municipality || 'Ibiza'}</town>
      <province>Islas Baleares</province>
      <country>ES</country>
      <beds>${p.bedrooms || 0}</beds>
      <baths>${p.bathrooms || 0}</baths>
      <surface>${p.size_built || 0}</surface>
      <plot>${p.size_plot || 0}</plot>
      <desc lang="es">${escapeXml(p.description_es || '')}</desc>
      <desc lang="en">${escapeXml(p.description_en || '')}</desc>
      ${(p.images || []).map((img: string, i: number) => `<image><url>${img}</url><index>${i + 1}</index></image>`).join('\n      ')}
    </property>`
    }

    // Default: Idealista / Fotocasa format
    return `
    <propiedad>
      <referencia>${p.ref}</referencia>
      <estado>${p.status}</estado>
      <tipoOperacion>${p.listing_type === 'rent' ? 'alquiler' : 'venta'}</tipoOperacion>
      <tipoInmueble>${p.property_type || 'casa'}</tipoInmueble>
      ${price}
      <precioConsultar>${p.price_on_request ? 'S' : 'N'}</precioConsultar>
      <moneda>${p.currency || 'EUR'}</moneda>
      <titulo>${escapeXml(p.title_es || '')}</titulo>
      <tituloEN>${escapeXml(p.title_en || '')}</tituloEN>
      <descripcion>${escapeXml(p.description_es || '')}</descripcion>
      <descripcionEN>${escapeXml(p.description_en || '')}</descripcionEN>
      <municipio>${p.municipality || 'Ibiza'}</municipio>
      <zona>${p.area || ''}</zona>
      <isla>${p.island || 'Ibiza'}</isla>
      <pais>${p.country || 'Spain'}</pais>
      <habitaciones>${p.bedrooms || 0}</habitaciones>
      <banos>${p.bathrooms || 0}</banos>
      <superficieConstruida>${p.size_built || 0}</superficieConstruida>
      <superficieParcela>${p.size_plot || 0}</superficieParcela>
      <fotos>
        ${images}
      </fotos>
    </propiedad>`
  }).join('')

  if (portal === 'kyero') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<properties>
  <last_updated>${new Date().toISOString()}</last_updated>
  <agency>
    <name>Ibiza Flow Real Estate</name>
    <website>https://ibizaflow.com</website>
  </agency>
  ${items}
</properties>`
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<propiedades>
  <agencia>
    <nombre>Ibiza Flow Real Estate</nombre>
    <web>https://ibizaflow.com</web>
    <exportacion>${new Date().toISOString()}</exportacion>
  </agencia>
  ${items}
</propiedades>`
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
