import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

// Parse multi-line custom headers from ANTHROPIC_CUSTOM_HEADERS env var
const customHeaders: Record<string, string> = {}
const rawHeaders = process.env.ANTHROPIC_CUSTOM_HEADERS || ''
rawHeaders.split('\n').forEach(line => {
  const idx = line.indexOf(':')
  if (idx > 0) {
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim()
    if (key && val) customHeaders[key] = val
  }
})

const orchidsKey = customHeaders['x-orchids-api-key'] || process.env.ANTHROPIC_AUTH_TOKEN || ''
const client = new Anthropic({
  apiKey: orchidsKey || 'placeholder',
  baseURL: process.env.ANTHROPIC_BASE_URL,
  defaultHeaders: Object.keys(customHeaders).length > 0 ? customHeaders : undefined,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, title_es, area, bedrooms, bathrooms, size_built, size_plot, features, listing_type, price, property_type } = body

    const propertyTitle = title_es || title || 'Propiedad en Ibiza'
    const featuresList = Array.isArray(features) && features.length > 0
      ? features.join(', ')
      : 'no especificadas'

    const priceInfo = price ? `${Number(price).toLocaleString('es-ES')} €` : 'precio a consultar'
    const listingLabel = listing_type === 'rent' ? 'alquiler' : listing_type === 'both' ? 'venta y alquiler' : 'venta'
    const listingLabelEn = listing_type === 'rent' ? 'rent' : 'sale'
    const listingLabelFr = listing_type === 'rent' ? 'location' : listing_type === 'both' ? 'vente et location' : 'vente'
    const propTypeEs = property_type === 'villa' ? 'villa' : property_type === 'apartment' ? 'apartamento' : property_type === 'finca' ? 'finca' : property_type === 'penthouse' ? 'ático' : property_type === 'townhouse' ? 'casa adosada' : property_type || 'propiedad'
    const propTypeFr = property_type === 'villa' ? 'villa' : property_type === 'apartment' ? 'appartement' : property_type === 'finca' ? 'finca' : property_type === 'penthouse' ? 'penthouse' : property_type === 'townhouse' ? 'maison de ville' : property_type || 'propriété'

    const seoKeywords_es = [
      `${propTypeEs} de lujo en Ibiza`,
      area ? `${propTypeEs} en ${area}, Ibiza` : 'propiedad exclusiva en Ibiza',
      listing_type === 'rent' ? 'alquiler de lujo en Ibiza' : `comprar ${propTypeEs} de lujo en Ibiza`,
      'inmobiliaria de lujo Ibiza',
      bedrooms ? `${propTypeEs} ${bedrooms} dormitorios Ibiza` : null,
      features?.includes('Sea View') ? 'villa con vistas al mar Ibiza' : null,
      features?.includes('Pool') ? 'piscina infinita privada Ibiza' : null,
      features?.includes('Beach Access') ? 'acceso directo a la playa Ibiza' : null,
      area === 'Es Cubells' || area === 'Cala Jondal' ? 'propiedad exclusiva sur de Ibiza' : null,
      'vivir en Ibiza',
    ].filter(Boolean).join(', ')

    const seoKeywords_en = [
      `luxury ${property_type || 'property'} for ${listingLabelEn} in Ibiza`,
      area ? `${property_type || 'villa'} in ${area}, Ibiza` : 'luxury property in Ibiza',
      listing_type === 'rent' ? 'luxury villa rental Ibiza' : `buy luxury ${property_type || 'villa'} Ibiza`,
      'Ibiza luxury real estate',
      bedrooms ? `${bedrooms} bedroom luxury ${property_type || 'villa'} Ibiza` : null,
      features?.includes('Sea View') ? 'sea view luxury villa Ibiza' : null,
      features?.includes('Pool') ? 'infinity pool villa Ibiza' : null,
      features?.includes('Beach Access') ? 'beachfront property Ibiza' : null,
      'Ibiza island lifestyle',
      'exclusive Ibiza property',
    ].filter(Boolean).join(', ')

    const seoKeywords_fr = [
      `${propTypeFr} de luxe à Ibiza`,
      area ? `${propTypeFr} à ${area}, Ibiza` : 'propriété de luxe à Ibiza',
      listing_type === 'rent' ? 'location de luxe à Ibiza' : `acheter ${propTypeFr} de luxe Ibiza`,
      'immobilier de luxe Ibiza',
      bedrooms ? `${propTypeFr} ${bedrooms} chambres Ibiza` : null,
      features?.includes('Sea View') ? 'villa vue mer Ibiza' : null,
      features?.includes('Pool') ? 'piscine à débordement Ibiza' : null,
      features?.includes('Beach Access') ? 'bord de mer Ibiza' : null,
      'vivre à Ibiza',
      'propriété exclusive Ibiza',
    ].filter(Boolean).join(', ')

    const prompt = `Eres el mejor copywriter de inmobiliaria de ultra lujo del mundo, especializado en Ibiza. Tu escritura es magnética, sensorial y aspiracional — evoca el estilo de vida más exclusivo de la isla blanca: las noches doradas de Dalt Vila, el Mediterráneo en calma desde una terraza privada, la brisa salada de cala en cala. Escribes como si conocieras Ibiza íntimamente, con amor genuino por la isla.

REGLAS ABSOLUTAS:
- NUNCA uses frases genéricas tipo "Esta hermosa propiedad", "No te pierdas esta oportunidad", "ideal para familias"
- NUNCA suenes como una IA ni como un listado de características
- USA referencias geográficas e identitarias de Ibiza: Dalt Vila, ses Salines, Cala Jondal, tramontana, luz mediterránea, Islas Pitiusas, Formentera en el horizonte, atardeceres de poniente, etc.
- El texto debe hacer SENTIR y DESEAR — que el lector cierre los ojos y ya esté allí
- Integra con fluidez orgánica las keywords SEO (sin listarlas, sin forzarlas)

KEYWORDS SEO A INTEGRAR NATURALMENTE:
- ES: ${seoKeywords_es}
- EN: ${seoKeywords_en}
- FR: ${seoKeywords_fr}

DATOS DE LA PROPIEDAD:
- Nombre: ${propertyTitle}
- Tipo: ${property_type || 'propiedad'}
- Zona: ${area || 'Ibiza'}
- Dormitorios: ${bedrooms || '—'}
- Baños: ${bathrooms || '—'}
- Superficie construida: ${size_built ? size_built + ' m²' : '—'}
- Parcela: ${size_plot ? size_plot + ' m²' : '—'}
- Características: ${featuresList}
- Tipo de operación: ${listingLabel} / ${listingLabelEn} / ${listingLabelFr}
- Precio: ${priceInfo}

TAMBIÉN GENERA:
- Un título evocador y lujoso en cada idioma (máx. 8 palabras, que capture la esencia de la propiedad)
- Palabras clave SEO para cada idioma (las que definiste arriba, formateadas como lista separada por comas)

Escribe TRES descripciones (6-8 frases cada una, ricas y sensoriales) + títulos + keywords:

FORMATO DE RESPUESTA (exactamente así, sin markdown ni etiquetas extra):
TITLE_ES: [título en español]
TITLE_EN: [title in English]
TITLE_FR: [titre en français]
ES: [descripción en español]
EN: [description in English]
FR: [description en français]
SEO_ES: [keywords separadas por comas]
SEO_EN: [keywords separated by commas]
SEO_FR: [mots-clés séparés par des virgules]`

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text

    const titleEsMatch = text.match(/^TITLE_ES:\s*(.+)$/m)
    const titleEnMatch = text.match(/^TITLE_EN:\s*(.+)$/m)
    const titleFrMatch = text.match(/^TITLE_FR:\s*(.+)$/m)
    const esMatch = text.match(/^ES:\s*([\s\S]*?)(?=\n(?:EN|FR|SEO_ES|SEO_EN|SEO_FR|TITLE_EN|TITLE_FR):|$)/m)
    const enMatch = text.match(/^EN:\s*([\s\S]*?)(?=\n(?:FR|SEO_ES|SEO_EN|SEO_FR|TITLE_FR):|$)/m)
    const frMatch = text.match(/^FR:\s*([\s\S]*?)(?=\nSEO_ES:|$)/m)
    const seoEsMatch = text.match(/^SEO_ES:\s*(.+)$/m)
    const seoEnMatch = text.match(/^SEO_EN:\s*(.+)$/m)
    const seoFrMatch = text.match(/^SEO_FR:\s*([\s\S]*)/m)

    return NextResponse.json({
      title_es: titleEsMatch ? titleEsMatch[1].trim() : '',
      title_en: titleEnMatch ? titleEnMatch[1].trim() : '',
      title_fr: titleFrMatch ? titleFrMatch[1].trim() : '',
      description_es: esMatch ? esMatch[1].trim() : '',
      description_en: enMatch ? enMatch[1].trim() : '',
      description_fr: frMatch ? frMatch[1].trim() : '',
      seo_keywords_es: seoEsMatch ? seoEsMatch[1].trim() : seoKeywords_es,
      seo_keywords_en: seoEnMatch ? seoEnMatch[1].trim() : seoKeywords_en,
      seo_keywords_fr: seoFrMatch ? seoFrMatch[1].trim() : seoKeywords_fr,
    })
  } catch (err: unknown) {
    console.error('Generate description error:', err)
    const message = err instanceof Error ? err.message : 'Error generating description'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
