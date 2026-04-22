export interface Property {
  id: string
  slug: string
  title_es: string
  title_en: string
  title_fr: string
  description_es: string
  description_en: string
  description_fr: string
  seo_keywords_es: string
  seo_keywords_en: string
  seo_keywords_fr: string
  property_type: string
  listing_type: string
  area: string
  price: number | null
  bedrooms: number | null
  bathrooms: number | null
  size_built: number | null
  size_plot: number | null
  features: string[]
  images: string[]
  status: 'active' | 'draft' | 'archived'
  created_at: string
  updated_at: string
}
