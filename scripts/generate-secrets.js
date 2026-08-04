import crypto from  'crypto';
import fs  from  'fs';
import path from 'path';

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

function generateEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Please update it manually if needed.');
    return;
  }

  const secrets = {
    NEXTAUTH_SECRET: generateSecret(),
    DATABASE_URL: 'postgresql://user:password@localhost:5432/handcrafted_haven',
    NEXTAUTH_URL: 'http://localhost:3000',
    STRIPE_SECRET_KEY: 'sk_test_...',
    STRIPE_WEBHOOK_SECRET: 'whsec_...',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_...',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  };

  const envContent = Object.entries(secrets)
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('\n📝 Your NEXTAUTH_SECRET:');
  console.log(secrets.NEXTAUTH_SECRET);
  console.log('\n⚠️  Remember to update other values (DATABASE_URL, STRIPE keys) with your actual credentials.');
}

generateEnvFile();