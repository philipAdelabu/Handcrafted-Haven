import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const password = await hash('admin123', 12)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@handcraftedhaven.com' },
      update: {
        role: 'ADMIN',
      },
      create: {
        email: 'admin@handcraftedhaven.com',
        name: 'Admin User',
        password,
        role: 'ADMIN',
      },
    })
    
    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@handcraftedhaven.com')
    console.log('🔑 Password: admin123')
    console.log('👤 Role:', admin.role)
  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()