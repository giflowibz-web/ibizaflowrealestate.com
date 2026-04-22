export interface Property {
  id: string
  ref?: string
  slug: string
  status: string
  listing_type: string
  property_type: string
  title_es: string
  title_en: string
  title_fr?: string
  description_es: string
  description_en: string
  description_fr?: string
  seo_keywords_es?: string
  seo_keywords_en?: string
  seo_keywords_fr?: string
  area: string
  municipality?: string
  island?: string
  country?: string
  address?: string
  latitude?: number | null
  longitude?: number | null
  price: number | null
  price_rent?: number | null
  currency?: string
  price_on_request?: boolean
  bedrooms: number | null
  bathrooms: number | null
  size_built: number | null
  size_plot: number | null
  year_built?: number | null
  floor?: number | null
  features: string[]
  images: string[]
  virtual_tour_url?: string
  video_url?: string
  featured?: boolean
  published_idealista?: boolean
  published_fotocasa?: boolean
  published_kyero?: boolean
  idealista_id?: string
  fotocasa_id?: string
  kyero_id?: string
  mls_id?: string
  created_at: string
  updated_at: string
}
