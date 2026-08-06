import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ProductDetail } from '@/components/products/ProductDetail'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  // In Next.js 16, params is a Promise that needs to be awaited
  const { id } = await params
  
  console.log('Product ID from params:', id)

  if (!id) {
    console.error('No product ID provided')
    notFound()
  }

  try {
    const product = await prisma.product.findUnique({
      where: { 
        id: id,
      },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!product) {
      console.log('Product not found with ID:', id)
      notFound()
    }

    const avgRating = product.reviews.length > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
      : 0

    const productWithRating = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      stock: product.stock,
      images: product.images,
      averageRating: avgRating,
      reviewCount: product.reviews.length,
      category: product.category?.name || 'Uncategorized',
      categoryId: product.categoryId,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      reviews: product.reviews,
    }

    return <ProductDetail product={productWithRating} />
  } catch (error) {
    console.error('Product page error:', error)
    notFound()
  }
}