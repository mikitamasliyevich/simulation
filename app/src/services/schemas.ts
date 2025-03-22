import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
})

export const InventoryItemSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  quantity: z.number().int().positive('Quantity must be a positive number'),
})

export type Product = z.infer<typeof ProductSchema>
export type InventoryItem = z.infer<typeof InventoryItemSchema>
