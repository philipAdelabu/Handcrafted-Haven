'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: string
}

interface Session {
  user: SessionUser
}

export function Header() {
  const { data: session, status } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' }
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (status === 'loading') {
    return (
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Handcrafted Haven
            </Link>
            <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Handcrafted Haven
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="hover:text-primary-600">
              Products
            </Link>
            
            {session ? (
              <>
                <Link href="/orders" className="hover:text-primary-600">
                  Orders
                </Link>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin" className="hover:text-primary-600 font-semibold text-primary-600">
                    Admin Panel
                  </Link>
                )}
                <Link href="/cart" className="hover:text-primary-600">
                  Cart
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {session.user?.name || session.user?.email}
                  </span>
                  <Button variant="outline" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/products" className="hover:text-primary-600">
                Products
              </Link>
               <Link href="/about" className="hover:text-primary-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary-600">
              Contact
            </Link>
              {session ? (
                <>
                  <Link href="/orders" className="hover:text-primary-600">
                    Orders
                  </Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin" className="hover:text-primary-600 font-semibold text-primary-600">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/cart" className="hover:text-primary-600">
                    Cart
                  </Link>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      {session.user?.name || session.user?.email}
                    </p>
                    <Button variant="outline" onClick={() => signOut()} className="w-full">
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}