import { z } from "zod";

export const ProductsListSchema = z.object({
	page: z.number().int().positive().default(1),
	limit: z.number().int().positive().max(100).default(10),
	search: z.string().optional(),
	sortBy: z.enum(['name', 'price', 'createdAt', 'stockQuantity']).default('createdAt'),
	sortOrder: z.enum(['asc', 'desc']).default('desc'),
	minPrice: z.number().optional(),
	maxPrice: z.number().optional(),
	inStock: z.boolean().optional(),
});

export type ProductsListInput = z.infer<typeof ProductsListSchema>;