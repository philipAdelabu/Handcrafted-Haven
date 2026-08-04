import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ProductDetail } from '@/components/products/ProductDetail'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { 
      id: params.id,
      isActive: true,
    },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
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
    ...product,
    averageRating: avgRating,
    reviewCount: product.reviews.length,
  }

  return <ProductDetail product={productWithRating} />
}