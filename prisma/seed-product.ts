import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    name: 'Handmade Silver Ring',
    slug: 'handmade-silver-ring',
    description: 'Beautiful sterling silver ring with unique hand-hammered texture.',
    price: 89.99,
    stock: 12,
    category: 'JEWELRY',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e'],
  },
  {
    name: 'Macrame Wall Hanging',
    slug: 'macrame-wall-hanging',
    description: 'Intricately woven macrame wall art piece made with natural cotton rope.',
    price: 75.00,
    stock: 8,
    category: 'HOME_DECOR',
    images: ['https://images.unsplash.com/photo-1541701494587-cb58502866ab'],
  },
  // Add more products here
]

async function seedProducts() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }
  console.log('Products seeded successfully!')
}

seedProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect())