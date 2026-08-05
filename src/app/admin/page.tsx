'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  isActive: boolean
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Check if user is admin - redirect if not
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
  }, [session, status, router])

  // Fetch products only if admin
  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchProducts()
    }
  }, [session])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  // Don't render anything if not admin
  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your products and orders</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          Add New Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold mt-2">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Products</h3>
          <p className="text-2xl font-bold mt-2">
            {products.filter(p => p.isActive).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Low Stock</h3>
          <p className="text-2xl font-bold mt-2">
            {products.filter(p => p.stock < 10).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-2xl font-bold mt-2">
            {new Set(products.map(p => p.category)).size}
          </p>
        </div>
      </div>

      {/* Product Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Products</h2>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products yet. Click "Add New Product" to get started!</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${product.stock < 10 ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingProduct(product)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={async () => {
                        if (confirm('Delete this product?')) {
                          // Delete product
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Product Modal */}
      {(showCreateForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowCreateForm(false)
            setEditingProduct(null)
          }}
          onSuccess={() => {
            setShowCreateForm(false)
            setEditingProduct(null)
            fetchProducts()
          }}
        />
      )}
    </div>
  )
}

// Product Form Component
function ProductForm({
  product,
  onClose,
  onSuccess,
}: {
  product?: Product | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || 'OTHER',
    description: '',
    images: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save product')
      
      onSuccess()
    } catch (error) {
      console.error('Save product error:', error)
      alert('Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="JEWELRY">Jewelry</option>
              <option value="HOME_DECOR">Home Decor</option>
              <option value="CLOTHING">Clothing</option>
              <option value="ART">Art</option>
              <option value="CERAMICS">Ceramics</option>
              <option value="WOODWORK">Woodwork</option>
              <option value="TEXTILES">Textiles</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-md h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URLs (one per line)</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={formData.images.join('\n')}
              onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\n').filter(Boolean) })}
              placeholder="https://example.com/image1.jpg"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}