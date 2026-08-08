import { User, Product, Order, Cart, CartItem, OrderItem, Review } from '@prisma/client'

export type SafeUser = Omit<User, 'password'>

export interface ProductWithDetails extends Product {
  averageRating: number
  reviewCount: number
}

export interface CartWithItems extends Cart {
  items: (CartItem & {
    product: Product
  })[]
}

export interface OrderWithItems extends Order {
  items: (OrderItem & {
    product: Product
  })[]
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  apartment?: string | null
  city: string
  state: string
  zipCode: string
  country: string
}