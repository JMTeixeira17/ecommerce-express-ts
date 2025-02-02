import { z } from "zod";

export const createOrderItemSchema = z.object({
  orderItems: z.array(
    z.object({
      productId: z.string().uuid('Invalid product id'),
      quantity: z.number().int().positive('Quantity must be a positive integer'),
    })
  ).nonempty('At least one product is required')
});