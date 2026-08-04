#!/bin/bash

echo "🔧 Fixing Prisma setup..."

# Clean Prisma
echo "🧹 Cleaning Prisma..."
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma

# Reinstall Prisma
echo "📦 Reinstalling Prisma..."
npm install @prisma/client@latest
npm install prisma@latest --save-dev

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "📤 Pushing schema to database..."
npx prisma db push

echo "✅ Prisma setup complete!"