'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useState } from 'react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    compareAtPrice: number | null
    images: string[]
    averageRating: number
    reviewCount: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAddingToCart(true)

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }

      // Show success notification (you can implement a toast system)
      console.log('Added to cart!')
    } catch (error) {
      console.error('Add to cart error:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 w-full bg-gray-200">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image available
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400">
              {'★'.repeat(Math.floor(product.averageRating))}
              {'☆'.repeat(5 - Math.floor(product.averageRating))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              size="sm"
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}