import fs from 'fs'
import path from 'path'
import { nanoid } from 'nanoid'
import type { Property } from './types'

const DB_PATH = path.join(process.cwd(), 'data', 'properties.json')

function readDB(): Property[] {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(raw) as Property[]
  } catch {
    return []
  }
}

function writeDB(data: Property[]): void {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export function getAllProperties(): Property[] {
  return readDB().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export function getPropertyById(id: string): Property | null {
  return readDB().find(p => p.id === id) ?? null
}

export function createProperty(data: Partial<Property>): Property {
  const properties = readDB()
  const now = new Date().toISOString()
  const property: Property = {
    id: nanoid(),
    slug: data.slug || '',
    title_es: data.title_es || '',
    title_en: data.title_en || '',
    title_fr: data.title_fr || '',
    description_es: data.description_es || '',
    description_en: data.description_en || '',
    description_fr: data.description_fr || '',
    seo_keywords_es: data.seo_keywords_es || '',
    seo_keywords_en: data.seo_keywords_en || '',
    seo_keywords_fr: data.seo_keywords_fr || '',
    property_type: data.property_type || 'villa',
    listing_type: data.listing_type || 'sale',
    area: data.area || '',
    price: data.price ?? null,
    bedrooms: data.bedrooms ?? null,
    bathrooms: data.bathrooms ?? null,
    size_built: data.size_built ?? null,
    size_plot: data.size_plot ?? null,
    features: data.features || [],
    images: data.images || [],
    status: data.status || 'draft',
    created_at: now,
    updated_at: now,
  }
  properties.push(property)
  writeDB(properties)
  return property
}

export function updateProperty(id: string, data: Partial<Property>): Property | null {
  const properties = readDB()
  const idx = properties.findIndex(p => p.id === id)
  if (idx === -1) return null
  properties[idx] = {
    ...properties[idx],
    ...data,
    id,
    updated_at: new Date().toISOString(),
  }
  writeDB(properties)
  return properties[idx]
}

export function deleteProperty(id: string): boolean {
  const properties = readDB()
  const filtered = properties.filter(p => p.id !== id)
  if (filtered.length === properties.length) return false
  writeDB(filtered)
  return true
}
