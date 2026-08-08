// prisma/seed.ts
import { PrismaClient, ProductCategory } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

// Define product type using the enum
interface ProductSeed {
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice: number | null
  stock: number
  categoryEnum: ProductCategory // Use enum instead of category
  isFeatured: boolean
  images: string[]
}

const products: ProductSeed[] = [
  {
    name: 'Handmade Silver Leaf Necklace',
    slug: 'handmade-silver-leaf-necklace',
    description: 'Delicate sterling silver necklace featuring a handcrafted leaf pendant.',
    price: 89.99,
    compareAtPrice: 119.99,
    stock: 15,
    categoryEnum: 'JEWELRY', // Use the enum value
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'],
  },
  // ... add more products
]

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  console.log('👤 Creating admin user...')
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@handcraftedhaven.com' },
    update: {},
    create: {
      email: 'admin@handcraftedhaven.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log(`✅ Admin user created: ${admin.email}`)

  // Create categories
  console.log('📂 Creating categories...')
  const categories = [
    { name: 'Jewelry', slug: 'jewelry', description: 'Handcrafted jewelry pieces' },
    { name: 'Home Decor', slug: 'home-decor', description: 'Beautiful home decorations' },
    { name: 'Ceramics', slug: 'ceramics', description: 'Hand-thrown ceramic pieces' },
    { name: 'Woodwork', slug: 'woodwork', description: 'Handcrafted wooden items' },
    { name: 'Textiles', slug: 'textiles', description: 'Handwoven textile products' },
    { name: 'Art', slug: 'art', description: 'Original artwork and prints' },
  ]

  const categoryMap = {}
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
    categoryMap[category.name] = created
    console.log(`  ✅ Created category: ${category.name}`)
  }

  // Seed products with categories
  console.log('📦 Seeding products...')
  let productCount = 0

  const productData = [
    {
      name: 'Handmade Silver Leaf Necklace',
      slug: 'handmade-silver-leaf-necklace',
      description: 'Delicate sterling silver necklace featuring a handcrafted leaf pendant.',
      price: 89.99,
      compareAtPrice: 119.99,
      stock: 15,
      categoryId: categoryMap['Jewelry']?.id || null,
      categoryEnum: 'JEWELRY',
      images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'],
      isFeatured: true,
    },
    {
      name: 'Boho Beaded Bracelet Set',
      slug: 'boho-beaded-bracelet-set',
      description: 'Set of 3 handcrafted bracelets made with natural gemstones.',
      price: 45.00,
      compareAtPrice: null,
      stock: 25,
      categoryId: categoryMap['Jewelry']?.id || null,
      categoryEnum: 'JEWELRY',
      images: ['https://images.unsplash.com/photo-1611085583191-a3b181b2a48f'],
      isFeatured: false,
    },
    {
      name: 'Macrame Wall Hanging',
      slug: 'macrame-wall-hanging-art',
      description: 'Large, intricately woven macrame wall hanging made with natural cotton rope.',
      price: 95.00,
      compareAtPrice: 125.00,
      stock: 8,
      categoryId: categoryMap['Home Decor']?.id || null,
      categoryEnum: 'HOME_DECOR',
      images: ['https://images.unsplash.com/photo-1541701494587-cb58502866ab'],
      isFeatured: true,
    },
    // Add more products from earlier...
  ]

  for (const product of productData) {
    try {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      })
      productCount++
      console.log(`  ✅ Added: ${product.name}`)
    } catch (error) {
      console.error(`  ❌ Failed to add: ${product.name}`, error)
    }
  }
  console.log(`✅ ${productCount} products seeded successfully!`)

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n🔑 Login Credentials:')
  console.log('Admin: admin@handcraftedhaven.com / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 