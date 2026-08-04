import { User, Product, Order, Cart, CartItem } from '@prisma/client'

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