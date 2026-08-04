import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@handcraftedhaven.com' },
    update: {},
    create: {
      email: 'admin@handcraftedhaven.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Handmade Ceramic Vase',
      slug: 'handmade-ceramic-vase',
      description: 'Beautiful hand-thrown ceramic vase with a natural glaze finish. Perfect for displaying dried flowers or as a standalone art piece.',
      price: 45.99,
      compareAtPrice: 59.99,
      stock: 15,
      category: 'CERAMICS',
      images: [
        'https://images.unsplash.com/photo-1612196808214-b7e239e85646',
      ],
    },
    {
      name: 'Wooden Serving Board',
      slug: 'wooden-serving-board',
      description: 'Handcrafted from sustainable walnut wood, this serving board is perfect for charcuterie, cheese, or as a decorative piece.',
      price: 68.00,
      compareAtPrice: null,
      stock: 20,
      category: 'WOODWORK',
      images: [
        'https://images.unsplash.com/photo-1607532941433-304659e8198a',
      ],
    },
    {
      name: 'Handwoven Wool Blanket',
      slug: 'handwoven-wool-blanket',
      description: 'Cozy handwoven blanket made from 100% natural wool. Each blanket is unique with its own pattern and color variations.',
      price: 120.00,
      compareAtPrice: 150.00,
      stock: 8,
      category: 'TEXTILES',
      images: [
        'https://images.unsplash.com/photo-1557914590-4a8ea5b81cf0',
      ],
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })