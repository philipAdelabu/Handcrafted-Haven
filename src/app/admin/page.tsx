'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  Package, 
  Tag, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { ProductManagement } from '@/components/admin/ProductManagement'
import { CategoryManagement } from '@/components/admin/CategoryManagement'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin?callbackUrl=/admin')
      return
    }
    
    if (session.user?.role !== 'ADMIN') {
      router.push('/')
      return
    }
    
    fetchStats()
    setLoading(false)
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      // Fetch products count
      const productsRes = await fetch('/api/products?limit=1')
      const productsData = await productsRes.json()
      
      // Fetch categories count
      const categoriesRes = await fetch('/api/categories')
      const categoriesData = await categoriesRes.json()
      
      setStats({
        products: productsData.pagination?.total || 0,
        categories: categoriesData.length || 0,
        orders: 0,
        users: 0,
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">✨ Admin Dashboard</h1>
              <p className="text-indigo-100 text-lg">
                Welcome back, {session.user?.name || 'Admin'}! Here's what's happening with your store.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-800">{stats.products}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Categories</p>
                <p className="text-3xl font-bold text-gray-800">{stats.categories}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>All categories active</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">{stats.orders}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-yellow-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>3 pending orders</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats.users}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              <Users className="w-4 h-4 mr-1" />
              <span>5 new this week</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.querySelector('[data-tab="products"]')?.click()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.querySelector('[data-tab="categories"]')?.click()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Category
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="bg-gray-50 border-b border-gray-200 p-0">
              <TabsTrigger 
                value="products" 
                data-tab="products"
                className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                <Package className="w-4 h-4 mr-2 inline" />
                Products
              </TabsTrigger>
              <TabsTrigger 
                value="categories"
                data-tab="categories"
                className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
              >
                <Tag className="w-4 h-4 mr-2 inline" />
                Categories
              </TabsTrigger>
              <TabsTrigger 
                value="orders"
                className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
              >
                <ShoppingBag className="w-4 h-4 mr-2 inline" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="p-6">
              <ProductManagement />
            </TabsContent>

            <TabsContent value="categories" className="p-6">
              <CategoryManagement />
            </TabsContent>

            <TabsContent value="orders" className="p-6">
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Orders Coming Soon</h3>
                <p className="text-gray-400">Order management features are currently in development.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}