import { z } from "zod";

const VALID_SORT_FIELDS = [
	"name",
	"price",
	"createdAt",
	"stockQuantity",
] as const;
const VALID_SORT_ORDERS = ["asc", "desc"] as const;

export const ProductsListSchema = z
	.object({
		page: z.number().int().positive().default(1),
		limit: z.number().int().positive().max(100).default(10),
		search: z.string().optional(),
		sortBy: z.enum(VALID_SORT_FIELDS).default("createdAt"),
		sortOrder: z.enum(VALID_SORT_ORDERS).default("desc"),
		minPrice: z.number().nonnegative().optional(),
		maxPrice: z.number().nonnegative().optional(),
		inStock: z.boolean().optional(),
	})
	.refine(
		(data) => {
			// Ensure minPrice <= maxPrice if both are provided
			if (data.minPrice !== undefined && data.maxPrice !== undefined) {
				return data.minPrice <= data.maxPrice;
			}
			return true;
		},
		{
			message: "minPrice must be less than or equal to maxPrice",
			path: ["minPrice"],
		},
	);

export type SortField = (typeof VALID_SORT_FIELDS)[number];
export type SortOrder = (typeof VALID_SORT_ORDERS)[number];
