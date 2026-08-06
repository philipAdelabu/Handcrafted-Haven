import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Fetch cart
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    )
    const tax = subtotal * 0.08
    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + tax + shipping

    return NextResponse.json({
      ...cart,
      subtotal,
      tax,
      shipping,
      total,
    })
  } catch (error) {
    console.error('Cart GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST - Add to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity = 1 } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      )
    }

    // Check if product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (!product.isActive) {
      return NextResponse.json(
        { error: 'Product is not available' },
        { status: 400 }
      )
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
      })
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    })

    let cartItem

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity
      
      // Check if new quantity exceeds stock
      if (newQuantity > product.stock) {
        return NextResponse.json(
          { error: `Only ${product.stock} items available in stock` },
          { status: 400 }
        )
      }

      cartItem = await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
        data: {
          quantity: newQuantity,
        },
        include: {
          product: true,
        },
      })
    } else {
      // Check if quantity exceeds stock
      if (quantity > product.stock) {
        return NextResponse.json(
          { error: `Only ${product.stock} items available in stock` },
          { status: 400 }
        )
      }

      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
        include: {
          product: true,
        },
      })
    }

    // Get updated cart with all items
    const updatedCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Calculate new totals
    const subtotal = updatedCart?.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    ) || 0

    return NextResponse.json({
      success: true,
      message: 'Added to cart successfully',
      cartItem,
      cart: updatedCart,
      subtotal,
      itemCount: updatedCart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
    })
  } catch (error) {
    console.error('Cart POST Error:', error)
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    if (quantity < 0) {
      return NextResponse.json(
        { error: 'Quantity must be 0 or greater' },
        { status: 400 }
      )
    }

    // Get cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }

    if (quantity === 0) {
      // Remove item
      await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
      })
      
      return NextResponse.json({
        success: true,
        message: 'Item removed from cart',
      })
    }

    // Update quantity
    const cartItem = await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
      data: {
        quantity,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Cart updated successfully',
      cartItem,
    })
  } catch (error) {
    console.error('Cart PUT Error:', error)
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

// DELETE - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Get cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
    })
  } catch (error) {
    console.error('Cart DELETE Error:', error)
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    )
  }
}