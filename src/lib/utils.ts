import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export function formatPriceWithDiscount(price: number, compareAtPrice: number | null): {
  formattedPrice: string
  formattedCompareAt: string | null
  discountPercentage: number | null
} {
  const formattedPrice = formatPrice(price)
  
  if (compareAtPrice && compareAtPrice > price) {
    const discountPercentage = Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    return {
      formattedPrice,
      formattedCompareAt: formatPrice(compareAtPrice),
      discountPercentage,
    }
  }
  
  return {
    formattedPrice,
    formattedCompareAt: null,
    discountPercentage: null,
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getInitials(name: string): string {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'PROCESSING': 'bg-blue-100 text-blue-800 border-blue-200',
    'SHIPPED': 'bg-purple-100 text-purple-800 border-purple-200',
    'DELIVERED': 'bg-green-100 text-green-800 border-green-200',
    'CANCELLED': 'bg-red-100 text-red-800 border-red-200',
    'COMPLETED': 'bg-green-100 text-green-800 border-green-200',
    'REFUNDED': 'bg-gray-100 text-gray-800 border-gray-200',
  }
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export function getStatusIcon(status: string): string {
  const icons: Record<string, string> = {
    'PENDING': '⏳',
    'PROCESSING': '🔄',
    'SHIPPED': '📦',
    'DELIVERED': '✅',
    'CANCELLED': '❌',
    'COMPLETED': '✅',
    'REFUNDED': '↩️',
  }
  return icons[status] || '📦'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

export function getImageUrl(url: string | null | undefined, fallback?: string): string {
  if (!url) return fallback || '/placeholder.jpg'
  return url
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0 || salePrice >= originalPrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export function isOutOfStock(stock: number): boolean {
  return stock <= 0
}

export function isLowStock(stock: number, threshold: number = 10): boolean {
  return stock > 0 && stock <= threshold
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phone
}

export function pluralize(word: string, count: number): string {
  return count === 1 ? word : word + 's'
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function deslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

export function randomId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function getInitialsFromEmail(email: string): string {
  if (!email) return ''
  const parts = email.split('@')
  if (parts.length === 0) return ''
  const name = parts[0]
  return name
    .split('.')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}