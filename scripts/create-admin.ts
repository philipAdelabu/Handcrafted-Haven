// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  const password = await hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@handcraftedhaven.com' },
    update: {},
    create: {
      email: 'admin@handcraftedhaven.com',
      name: 'Admin',
      password,
      role: 'ADMIN',
    },
  })
  
  console.log('Admin user created:', admin)
}

createAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect())