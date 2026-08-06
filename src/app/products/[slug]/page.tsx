import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamic import for the product detail component
const ProductDetail = dynamic(
  () => import('@/components/products/ProductDetail').then(mod => mod.ProductDetail),

)

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Dynamic import for Prisma
    const { prisma } = await import('@/lib/db')
    
    const product = await prisma.product.findUnique({
      where: { 
        id: params.id,
        isActive: true,
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