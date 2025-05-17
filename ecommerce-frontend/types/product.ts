export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductReview {
  author: string
  rating: number
  date: string
  content: string
}

export interface Product {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  oldPrice?: number
  image: string
  gallery?: string[]
  category: string
  inStock: boolean
  featured: boolean
  rating?: number
  reviewCount?: number
  specifications?: ProductSpecification[]
  reviews?: ProductReview[]
}
