'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Sparkles, 
  Award, 
  Truck, 
  Shield, 
  Star, 
  ArrowRight,
  Heart,
  ShoppingBag,
  Clock,
  Globe,
  Users,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice: number | null
  images: string[]
  averageRating: number
  reviewCount: number
  category: string
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const [featuredRes, newRes] = await Promise.all([
        fetch('/api/products?featured=true&limit=4'),
        fetch('/api/products?limit=4&sort=newest'),
      ])
      
      const featuredData = await featuredRes.json()
      const newData = await newRes.json()
      
      setFeaturedProducts(featuredData.products || [])
      setNewArrivals(newData.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Handcrafted with Love</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Unique <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                  Handmade Treasures
                </span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 max-w-lg">
                Explore our curated collection of handcrafted goods made by skilled artisans from around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    Start Shopping
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/products?featured=true">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Featured
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl font-bold">500+</div>
                    <div className="text-indigo-200 text-sm">Unique Products</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl font-bold">100+</div>
                    <div className="text-indigo-200 text-sm">Artisans</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl font-bold">4.9★</div>
                    <div className="text-indigo-200 text-sm">Average Rating</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl font-bold">50+</div>
                    <div className="text-indigo-200 text-sm">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8 text-blue-500" />,
                title: 'Free Shipping',
                description: 'On orders over $100',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <Shield className="w-8 h-8 text-purple-500" />,
                title: 'Secure Payment',
                description: '100% secure checkout',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: <Award className="w-8 h-8 text-pink-500" />,
                title: 'Quality Guarantee',
                description: 'Handcrafted with care',
                color: 'from-pink-500 to-pink-600'
              },
              {
                icon: <Clock className="w-8 h-8 text-orange-500" />,
                title: 'Fast Delivery',
                description: '3-5 business days',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">⭐ Featured Products</h2>
              <p className="text-gray-500 mt-1">Handpicked treasures just for you</p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="outline" className="group">
                View All
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">🛍️ Shop by Category</h2>
            <p className="text-gray-500 mt-1">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Jewelry', emoji: '💍', color: 'from-pink-400 to-rose-400' },
              { name: 'Home Decor', emoji: '🏠', color: 'from-blue-400 to-cyan-400' },
              { name: 'Ceramics', emoji: '🏺', color: 'from-amber-400 to-orange-400' },
              { name: 'Woodwork', emoji: '🪵', color: 'from-emerald-400 to-teal-400' },
              { name: 'Textiles', emoji: '🧵', color: 'from-purple-400 to-violet-400' },
              { name: 'Art', emoji: '🎨', color: 'from-rose-400 to-red-400' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toUpperCase()}`}
                className="group relative overflow-hidden rounded-2xl p-6 text-center bg-gradient-to-r hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  ...(category.color && { '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-to)` })
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2">{category.emoji}</div>
                  <h3 className="text-white font-semibold text-sm">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">💬 What Our Customers Say</h2>
            <p className="text-indigo-200 mt-1">Real stories from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                text: 'Absolutely love my handmade necklace! The quality is exceptional and it arrived beautifully packaged.',
                rating: 5,
                role: 'Verified Buyer'
              },
              {
                name: 'Michael Chen',
                text: 'The ceramic vase is stunning. It\'s even more beautiful in person. Will definitely be ordering again!',
                rating: 5,
                role: 'Repeat Customer'
              },
              {
                name: 'Emily Rodriguez',
                text: 'I bought the macrame wall hanging and it\'s the perfect addition to my living room. Such amazing craftsmanship!',
                rating: 5,
                role: 'Happy Customer'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex text-yellow-300 mb-3">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="text-indigo-100 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-indigo-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Discover Something Special?
            </h2>
            <p className="text-gray-500 mb-8">
              Join thousands of happy customers who have found unique, handcrafted treasures.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Browse All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative h-56 bg-gray-100">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
          </div>
          {product.compareAtPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
              Sale
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1">
            {'★'.repeat(Math.floor(product.averageRating))}
            <span className="text-gray-400 text-xs ml-1">({product.reviewCount})</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">${Number(product.compareAtPrice).toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}