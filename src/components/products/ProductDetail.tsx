'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Star, ShoppingCart, Heart, Truck, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { formatPrice, formatPriceWithDiscount } from '@/lib/utils'

interface Review {
  id: string
  rating: number
  content: string | null
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  }
}

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
  categoryId: string | null
  isActive: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
  reviews: Review[]
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const images = product.images.length > 0 ? product.images : ['/placeholder.jpg']
  const isOutOfStock = product.stock <= 0
  const priceInfo = formatPriceWithDiscount(product.price, product.compareAtPrice)

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      setShowToast({ message: '❌ Product is out of stock', type: 'error' })
      setTimeout(() => setShowToast(null), 3000)
      return
    }

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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add to cart')
      }

      setShowToast({ message: '✅ Added to cart successfully!', type: 'success' })
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

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    setShowToast({ 
      message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', 
      type: 'success' 
    })
    setTimeout(() => setShowToast(null), 2000)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.compareAtPrice && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      SALE
                    </div>
                  )}
                  {isOutOfStock && (
                    <div className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Out of Stock
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                          selectedImage === index 
                            ? 'ring-2 ring-indigo-500 ring-offset-2' 
                            : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
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
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {product.name}
                      </h1>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {product.category}
                      </p>
                    </div>
                    <button
                      onClick={handleWishlist}
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Heart 
                        className={`w-6 h-6 transition-colors ${
                          isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`} 
                      />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.averageRating))}
                      {'☆'.repeat(5 - Math.floor(product.averageRating))}
                    </div>
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {product.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {priceInfo.formattedPrice}
                    </span>
                    {priceInfo.formattedCompareAt && (
                      <span className="text-xl text-gray-400 line-through">
                        {priceInfo.formattedCompareAt}
                      </span>
                    )}
                    {priceInfo.discountPercentage && (
                      <span className="text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 rounded-full">
                        Save {priceInfo.discountPercentage}%
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    {isOutOfStock ? (
                      <span className="text-red-600 font-semibold">Out of Stock</span>
                    ) : (
                      <span className="text-green-600 font-medium">
                        ✓ In Stock ({product.stock} available)
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Add to Cart */}
                {!isOutOfStock && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-gray-700">Quantity:</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          disabled={quantity >= product.stock}
                          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        Max: {product.stock}
                      </span>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-14 text-lg"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || isOutOfStock}
                    >
                      {isAddingToCart ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </div>
                      )}
                    </Button>
                  </div>
                )}

                {/* Shipping Info */}
                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="w-5 h-5 text-indigo-500" />
                      <div>
                        <p className="font-medium">Free Shipping</p>
                        <p className="text-xs text-gray-400">On orders over $100</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield className="w-5 h-5 text-indigo-500" />
                      <div>
                        <p className="font-medium">Secure Checkout</p>
                        <p className="text-xs text-gray-400">100% safe payment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews.length > 0 && (
            <div className="mt-12 bg-white rounded-3xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Customer Reviews
              </h2>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {review.user.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {review.user.name || 'Anonymous'}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-sm">
                            {'★'.repeat(review.rating)}
                            {'☆'.repeat(5 - review.rating)}
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {review.content && (
                      <p className="mt-2 text-gray-700 ml-14">{review.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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