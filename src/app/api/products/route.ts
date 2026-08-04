import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const productQuerySchema = z.object({
  category: z.string().optional(),
  minPrice: z.string().transform(Number).optional(),
  maxPrice: z.string().transform(Number).optional(),
  search: z.string().optional(),
  featured: z.string().transform(Number).optional(),
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('12'),
  sort: z.enum(['newest', 'price-asc', 'price-desc', 'popular']).default('newest'),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = productQuerySchema.parse({
      category: searchParams.get('category'),
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
      search: searchParams.get('search'),
      featured: searchParams.get('featured'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      sort: searchParams.get('sort'),
    })

    const where: any = {
      isActive: true,
    }

    if (params.category) {
      where.category = params.category
    }

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ]
    }

    if (params.minPrice || params.maxPrice) {
      where.price = {}
      if (params.minPrice) where.price.gte = params.minPrice
      if (params.maxPrice) where.price.lte = params.maxPrice
    }

    if (params.featured) {
      where.isFeatured = true
    }

    const orderBy: any = {}
    switch (params.sort) {
      case 'price-asc':
        orderBy.price = 'asc'
        break
      case 'price-desc':
        orderBy.price = 'desc'
        break
      case 'popular':
        // In production, you'd sort by sales count or reviews
        orderBy.createdAt = 'desc'
        break
      default:
        orderBy.createdAt = 'desc'
    }

    const skip = (params.page - 1) * params.limit

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: params.limit,
        include: {
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ])

    const productsWithRating = products.map(product => {
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
        : 0
      return {
        ...product,
        averageRating: avgRating,
        reviewCount: product.reviews.length,
      }
    })

    return NextResponse.json({
      products: productsWithRating,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In production, check if user is authenticated and has seller/admin role
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
        description: body.description,
        price: body.price,
        compareAtPrice: body.compareAtPrice,
        stock: body.stock,
        category: body.category,
        images: body.images || [],
        sellerId: body.sellerId,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create Product Error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}