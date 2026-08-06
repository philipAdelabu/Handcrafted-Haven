const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

// Define ProductCategory enum
const ProductCategory = {
  JEWELRY: 'JEWELRY',
  HOME_DECOR: 'HOME_DECOR',
  CLOTHING: 'CLOTHING',
  ART: 'ART',
  CERAMICS: 'CERAMICS',
  WOODWORK: 'WOODWORK',
  TEXTILES: 'TEXTILES',
  OTHER: 'OTHER',
}

// Product data
const productData = [
  // JEWELRY
  {
    name: 'Handmade Silver Leaf Necklace',
    slug: 'handmade-silver-leaf-necklace',
    description: 'Delicate sterling silver necklace featuring a handcrafted leaf pendant. Each piece is uniquely textured and polished to a brilliant shine.',
    price: 89.99,
    compareAtPrice: 119.99,
    stock: 15,
    categoryEnum: ProductCategory.JEWELRY,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
    ],
  },
  {
    name: 'Boho Beaded Bracelet Set',
    slug: 'boho-beaded-bracelet-set',
    description: 'Set of 3 handcrafted bracelets made with natural gemstones including amethyst, rose quartz, and lapis lazuli.',
    price: 45.00,
    compareAtPrice: null,
    stock: 25,
    categoryEnum: ProductCategory.JEWELRY,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181b2a48f',
    ],
  },
  {
    name: 'Hammered Copper Cuff',
    slug: 'hammered-copper-cuff',
    description: 'Stunning hammered copper cuff bracelet with a warm, rustic finish. Each piece is hand-forged and textured.',
    price: 68.50,
    compareAtPrice: 85.00,
    stock: 10,
    categoryEnum: ProductCategory.JEWELRY,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1603481588274-5d8ba5d2b8c4',
    ],
  },
  {
    name: 'Gemstone Pendant Necklace',
    slug: 'gemstone-pendant-necklace',
    description: 'Elegant necklace featuring a natural amethyst gemstone pendant set in sterling silver.',
    price: 95.00,
    compareAtPrice: 125.00,
    stock: 8,
    categoryEnum: ProductCategory.JEWELRY,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
    ],
  },
  {
    name: 'Leather Wrap Bracelet',
    slug: 'leather-wrap-bracelet',
    description: 'Handcrafted leather wrap bracelet with sterling silver accents. Features multiple wraps and a secure magnetic closure.',
    price: 52.00,
    compareAtPrice: 68.00,
    stock: 20,
    categoryEnum: ProductCategory.JEWELRY,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181b2a48f',
    ],
  },

  // HOME DECOR
  {
    name: 'Macrame Wall Hanging',
    slug: 'macrame-wall-hanging-art',
    description: 'Large, intricately woven macrame wall hanging made with 100% natural cotton rope. Features beautiful knot patterns and flowing fringe.',
    price: 95.00,
    compareAtPrice: 125.00,
    stock: 8,
    categoryEnum: ProductCategory.HOME_DECOR,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
    ],
  },
  {
    name: 'Handthrown Ceramic Vase',
    slug: 'handthrown-ceramic-vase',
    description: 'Beautiful hand-thrown ceramic vase with a stunning reactive glaze. The unique color variations make each piece one-of-a-kind.',
    price: 55.00,
    compareAtPrice: 75.00,
    stock: 12,
    categoryEnum: ProductCategory.HOME_DECOR,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1612196808214-b7e239e85646',
    ],
  },
  {
    name: 'Woven Wall Basket Set',
    slug: 'woven-wall-basket-set',
    description: 'Set of 3 handwoven wall baskets made from sustainable seagrass. Each basket features unique weaving patterns.',
    price: 72.00,
    compareAtPrice: null,
    stock: 20,
    categoryEnum: ProductCategory.HOME_DECOR,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1587676189910-84bc6e50b86c',
    ],
  },
  {
    name: 'Terracotta Pot Set',
    slug: 'terracotta-pot-set',
    description: 'Set of 3 handmade terracotta pots with a rustic finish. Each pot is hand-thrown and fired in a traditional kiln.',
    price: 44.99,
    compareAtPrice: 59.99,
    stock: 20,
    categoryEnum: ProductCategory.HOME_DECOR,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
    ],
  },
  {
    name: 'Natural Soy Wax Candle Set',
    slug: 'natural-soy-wax-candle-set',
    description: 'Set of 3 hand-poured soy wax candles in a beautiful ceramic holder. Scented with essential oils including lavender, eucalyptus, and vanilla.',
    price: 39.99,
    compareAtPrice: 49.99,
    stock: 25,
    categoryEnum: ProductCategory.HOME_DECOR,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1602874801007-bd36f177c1e8',
    ],
  },

  // CERAMICS
  {
    name: 'Handmade Stoneware Mug',
    slug: 'handmade-stoneware-mug',
    description: 'Rustic stoneware mug with a beautiful matte glaze finish. Each mug is hand-thrown on the potter\'s wheel.',
    price: 34.99,
    compareAtPrice: 44.99,
    stock: 30,
    categoryEnum: ProductCategory.CERAMICS,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
    ],
  },
  {
    name: 'Ceramic Planter with Stand',
    slug: 'ceramic-planter-with-stand',
    description: 'Elegant ceramic planter with a sleek wooden stand. Features a beautiful textured finish in a soft sage green.',
    price: 49.99,
    compareAtPrice: 65.00,
    stock: 15,
    categoryEnum: ProductCategory.CERAMICS,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
    ],
  },
  {
    name: 'Ceramic Berry Bowl Set',
    slug: 'ceramic-berry-bowl-set',
    description: 'Set of 4 handcrafted ceramic berry bowls with a beautiful speckled glaze. Each bowl features a subtle hand-thrown texture.',
    price: 48.00,
    compareAtPrice: 62.00,
    stock: 20,
    categoryEnum: ProductCategory.CERAMICS,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
    ],
  },

  // WOODWORK
  {
    name: 'Walnut Serving Board',
    slug: 'walnut-serving-board',
    description: 'Beautiful handcrafted serving board made from premium walnut wood. Features a natural oil finish that brings out the wood\'s rich grain.',
    price: 79.99,
    compareAtPrice: 99.99,
    stock: 18,
    categoryEnum: ProductCategory.WOODWORK,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1607532941433-304659e8198a',
    ],
  },
  {
    name: 'Handcarved Wooden Spoon Set',
    slug: 'handcarved-wooden-spoon-set',
    description: 'Set of 3 hand-carved wooden spoons made from sustainably sourced maple wood. Each spoon is individually carved and sanded to a smooth finish.',
    price: 38.00,
    compareAtPrice: null,
    stock: 25,
    categoryEnum: ProductCategory.WOODWORK,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd',
    ],
  },
  {
    name: 'Wooden Chess Set',
    slug: 'wooden-chess-set',
    description: 'Beautiful handmade chess set crafted from walnut and maple wood. Each piece is individually turned and polished to perfection.',
    price: 195.00,
    compareAtPrice: 250.00,
    stock: 6,
    categoryEnum: ProductCategory.WOODWORK,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1580541832626-2a7131ee809f',
    ],
  },

  // TEXTILES
  {
    name: 'Handwoven Wool Blanket',
    slug: 'handwoven-wool-blanket',
    description: 'Luxurious handwoven blanket made from 100% premium wool. Features traditional patterns inspired by Scandinavian design.',
    price: 145.00,
    compareAtPrice: 185.00,
    stock: 10,
    categoryEnum: ProductCategory.TEXTILES,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1557914590-4a8ea5b81cf0',
    ],
  },
  {
    name: 'Handwoven Cotton Kitchen Towels',
    slug: 'handwoven-cotton-kitchen-towels',
    description: 'Set of 4 handwoven kitchen towels made from 100% organic cotton. Features beautiful striped patterns in earthy tones.',
    price: 42.00,
    compareAtPrice: 54.00,
    stock: 30,
    categoryEnum: ProductCategory.TEXTILES,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1585584114963-d50302ceaf4a',
    ],
  },
  {
    name: 'Handwoven Table Runner',
    slug: 'handwoven-table-runner',
    description: 'Beautiful handwoven table runner in a classic Scandinavian pattern. Made from organic cotton and linen blend.',
    price: 58.00,
    compareAtPrice: 75.00,
    stock: 15,
    categoryEnum: ProductCategory.TEXTILES,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1585584114963-d50302ceaf4a',
    ],
  },

  // ART
  {
    name: 'Abstract Watercolor Painting',
    slug: 'abstract-watercolor-painting',
    description: 'Original abstract watercolor painting on high-quality cotton paper. Features vibrant colors and fluid shapes.',
    price: 120.00,
    compareAtPrice: 150.00,
    stock: 5,
    categoryEnum: ProductCategory.ART,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    ],
  },
  {
    name: 'Hand-painted Silk Scarf',
    slug: 'hand-painted-silk-scarf',
    description: 'Luxurious silk scarf hand-painted with a beautiful floral design. Each scarf is individually painted using traditional techniques.',
    price: 85.00,
    compareAtPrice: null,
    stock: 12,
    categoryEnum: ProductCategory.ART,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
    ],
  },
]

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
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

    // Create a sample customer
    console.log('👤 Creating sample customer...')
    const customerPassword = await hash('customer123', 12)
    const customer = await prisma.user.upsert({
      where: { email: 'customer@example.com' },
      update: {},
      create: {
        email: 'customer@example.com',
        name: 'Sample Customer',
        password: customerPassword,
        role: 'CUSTOMER',
      },
    })
    console.log(`✅ Customer user created: ${customer.email}`)

    // Create cart for customer
    await prisma.cart.upsert({
      where: { userId: customer.id },
      update: {},
      create: {
        userId: customer.id,
      },
    })
    console.log('🛒 Customer cart created')

    // Create categories
    console.log('📂 Creating categories...')
    const categories = [
      { name: 'Jewelry', slug: 'jewelry', description: 'Handcrafted jewelry pieces', isActive: true },
      { name: 'Home Decor', slug: 'home-decor', description: 'Beautiful home decorations', isActive: true },
      { name: 'Ceramics', slug: 'ceramics', description: 'Hand-thrown ceramic pieces', isActive: true },
      { name: 'Woodwork', slug: 'woodwork', description: 'Handcrafted wooden items', isActive: true },
      { name: 'Textiles', slug: 'textiles', description: 'Handwoven textile products', isActive: true },
      { name: 'Art', slug: 'art', description: 'Original artwork and prints', isActive: true },
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

    for (const product of productData) {
      try {
        // Map enum to category name
        const categoryNameMap = {
          'JEWELRY': 'Jewelry',
          'HOME_DECOR': 'Home Decor',
          'CERAMICS': 'Ceramics',
          'WOODWORK': 'Woodwork',
          'TEXTILES': 'Textiles',
          'ART': 'Art',
          'CLOTHING': 'Clothing',
          'OTHER': 'Other'
        }
        
        const categoryName = categoryNameMap[product.categoryEnum] || 'Other'
        const categoryId = categoryMap[categoryName]?.id || null

        await prisma.product.upsert({
          where: { slug: product.slug },
          update: {
            ...product,
            categoryId,
          },
          create: {
            ...product,
            categoryId,
          },
        })
        productCount++
        console.log(`  ✅ Added: ${product.name}`)
      } catch (error) {
        console.error(`  ❌ Failed to add: ${product.name}`, error.message)
      }
    }
    console.log(`✅ ${productCount} products seeded successfully!`)

    // Update featured products count
    const featuredCount = productData.filter(p => p.isFeatured).length
    console.log(`⭐ ${featuredCount} featured products set`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n🔑 Login Credentials:')
    console.log('Admin: admin@handcraftedhaven.com / admin123')
    console.log('Customer: customer@example.com / customer123')
  } catch (error) {
    console.error('Seeding error:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })