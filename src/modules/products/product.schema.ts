import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string()
        .min(2, "The name must have at least 2 characters.")
        .max(20, 'The name must have a maximum of 20 characters.'),
    price: z.number().positive("The price must be positive."),
    description: z.string()
        .min(10, "The description must have at least 10 characters.")
        .max(100, 'The description must have a maximum of 100 characters.'),
    quantity: z.number().positive("The quantity must be positive."),
});

export const updateProductSchema = z.object({
    name: z.string()
        .min(2, "The name must have at least 2 characters.")
        .max(20, 'The name must have a maximum of 20 characters.'),
    price: z.number().positive("The price must be positive."),
    description: z.string()
        .min(10, "The description must have at least 10 characters.")
        .max(100, 'The description must have a maximum of 100 characters.'),
    quantity: z.number().positive("The quantity must be positive."),
});