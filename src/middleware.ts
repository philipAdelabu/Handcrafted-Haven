import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

interface Token {
  id?: string
  role?: string
  email?: string
  name?: string
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request }) as Token | null
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/cart') ||
    request.nextUrl.pathname.startsWith('/checkout') ||
    request.nextUrl.pathname.startsWith('/orders')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check admin routes
  if (isAdminRoute) {
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }
    
    // Check if user has admin role
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/admin/:path*',
  ],
}