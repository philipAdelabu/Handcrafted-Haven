'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  description: string
  price: number
  compareAtPrice: number | null
  stock: number
  images: string[]
  averageRating: number
  reviewCount: number
  category: string
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }

      // Show success message (you can add a toast notification here)
      alert('Added to cart successfully!')
    } catch (error) {
      console.error('Add to cart error:', error)
      alert('Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const images = product.images.length > 0 ? product.images : ['/placeholder.jpg']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-yellow-400">
              {'★'.repeat(Math.floor(product.averageRating))}
              {'☆'.repeat(5 - Math.floor(product.averageRating))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <div className="text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
          )}

          <div className="border-t pt-6">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>✓ Free shipping on orders over $100</span>
              <span>•</span>
              <span>✓ 30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}