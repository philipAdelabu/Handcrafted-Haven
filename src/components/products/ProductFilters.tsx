'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'JEWELRY', label: 'Jewelry' },
  { value: 'HOME_DECOR', label: 'Home Decor' },
  { value: 'CLOTHING', label: 'Clothing' },
  { value: 'ART', label: 'Art' },
  { value: 'CERAMICS', label: 'Ceramics' },
  { value: 'WOODWORK', label: 'Woodwork' },
  { value: 'TEXTILES', label: 'Textiles' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || 'newest',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
  })

  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (filters.category) params.set('category', filters.category)
    if (filters.sort) params.set('sort', filters.sort)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.search) params.set('search', filters.search)
    
    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setFilters({
      category: '',
      sort: 'newest',
      minPrice: '',
      maxPrice: '',
      search: '',
    })
    router.push('/products')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <Input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <Select
          options={categories}
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <Select
          options={sortOptions}
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  )
}