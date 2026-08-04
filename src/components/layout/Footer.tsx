import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Handcrafted Haven</h3>
            <p className="text-gray-400">
              Unique handmade treasures from artisans around the world.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products?category=JEWELRY">Jewelry</Link></li>
              <li><Link href="/products?category=HOME_DECOR">Home Decor</Link></li>
              <li><Link href="/products?category=CERAMICS">Ceramics</Link></li>
              <li><Link href="/products?category=WOODWORK">Woodwork</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@handcraftedhaven.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Handcrafted Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}