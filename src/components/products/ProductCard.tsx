'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import { formatPrice } from '@/lib/utils'

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
    stock?: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add to cart')
      }

      setShowToast({ message: '✅ Added to cart!', type: 'success' })
      setTimeout(() => setShowToast(null), 3000)
    } catch (error) {
      console.error('Add to cart error:', error)
      setShowToast({ 
        message: error instanceof Error ? error.message : '❌ Failed to add to cart', 
        type: 'error' 
      })
      setTimeout(() => setShowToast(null), 3000)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0

  return (
    <>
      <Link href={`/products/${product.slug || product.id}`}>
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
          {/* Image Container */}
          <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No image
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.compareAtPrice && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md animate-pulse">
                  SALE
                </span>
              )}
              {product.averageRating >= 4.5 && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  ★ Best Seller
                </span>
              )}
              {isOutOfStock && (
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                }`} 
              />
            </button>

            {/* Quick Add Button - Shows on Hover */}
            {!isOutOfStock && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isAddingToCart ? 'Adding...' : 'Quick Add'}
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-yellow-400 text-sm">
                {'★'.repeat(Math.floor(product.averageRating))}
                {'☆'.repeat(5 - Math.floor(product.averageRating))}
              </div>
              <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-gray-700">
                  {product.averageRating.toFixed(1)}
                </span>
              </div>
              {!isOutOfStock && product.stock !== undefined && product.stock < 10 && (
                <span className="text-xs text-red-500 font-medium">
                  Only {product.stock} left!
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 max-w-md animate-slide-up z-50 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 ${
          showToast.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <span className="text-sm">{showToast.message}</span>
        </div>
      )}
    </>
  )
}