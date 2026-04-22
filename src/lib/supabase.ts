import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'rented' | 'draft'
export type ListingType = 'sale' | 'rent' | 'both'
export type ContactStatus = 'new' | 'contacted' | 'qualified' | 'negotiating' | 'closed' | 'lost'
export type ContactType = 'buyer' | 'renter' | 'seller' | 'investor'

export interface Property {
  id: string
  created_at: string
  updated_at: string
  ref: string
  status: PropertyStatus
  listing_type: ListingType
  title_es: string
  title_en: string
  description_es: string
  description_en: string
  area: string
  municipality: string
  island: string
  country: string
  address: string
  latitude: number
  longitude: number
  price: number
  price_rent: number
  currency: string
  price_on_request: boolean
  property_type: string
  bedrooms: number
  bathrooms: number
  size_built: number
  size_plot: number
  year_built: number
  floor: number
  features: string[]
  images: string[]
  virtual_tour_url: string
  video_url: string
  idealista_id: string
  fotocasa_id: string
  kyero_id: string
  published_idealista: boolean
  published_fotocasa: boolean
  published_kyero: boolean
  featured: boolean
  slug: string
}

export interface Contact {
  id: string
  created_at: string
  updated_at: string
  name: string
  email: string
  phone: string
  nationality: string
  language: string
  source: string
  status: ContactStatus
  type: ContactType
  budget_min: number
  budget_max: number
  interested_in: string
  property_id: string
  notes: string
  assigned_to: string
  next_followup: string
}
