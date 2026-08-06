import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function TestProductsPage() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
      },
      take: 10,
    })

    const count = await prisma.product.count()

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">📦 Products in Database</h1>
        <p className="mb-4">Total products: <strong>{count}</strong></p>
        
        {count === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">⚠️ No products found in database. Please seed the database.</p>
            <code className="block mt-2 bg-gray-100 p-2 rounded text-sm">
              node prisma/seed.js
            </code>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm font-mono">{product.slug}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{product.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive ? '✅ Active' : '❌ Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link 
                          href={`/products/${product.id}`} 
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View by ID
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link 
                          href={`/products/${product.slug}`} 
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          View by Slug
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Test page error:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Error loading products</h1>
        <p className="text-gray-700">{String(error)}</p>
      </div>
    )
  }
}