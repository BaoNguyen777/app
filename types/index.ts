// Common types for the application

export interface FormData {
  name: string
  email: string
  message: string
}

export interface Service {
  icon: JSX.Element
  title: string
  description: string
}

export interface PortfolioItem {
  title: string
  category: string
  description: string
  image: string
  results: string
}

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  data?: T
  total?: number
  error?: string
  details?: string
}
