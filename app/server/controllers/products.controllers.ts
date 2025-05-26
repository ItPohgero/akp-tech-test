import type { Prisma } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import type { Context } from "../context/main";
import { ProductsListSchema } from "../schema/product_list.schema";
import { ProductShowSchema } from "../schema/product_show.schema";

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;
const router = t.router;

export const ProductsControllers = router({
	all: publicProcedure
		.input(ProductsListSchema)
		.query(async ({ ctx, input }) => {
			const {
				limit,
				page,
				sortBy,
				sortOrder,
				inStock,
				maxPrice,
				minPrice,
				search,
			} = input;

			const skip = (page - 1) * limit;
			const where: Prisma.ProductWhereInput = {};

			// Search conditions
			if (search) {
				where.name = {
					contains: search,
					mode: "insensitive",
				};
			}

			// Sorting min and max price conditions
			if (minPrice !== undefined || maxPrice !== undefined) {
				where.price = {};
				if (minPrice !== undefined) {
					where.price.gte = minPrice;
				}
				if (maxPrice !== undefined) {
					where.price.lte = maxPrice;
				}
			}

			// In-stock conditions
			if (inStock !== undefined) {
				if (inStock) {
					where.stockQuantity = {
						gt: 0,
					};
				} else {
					where.OR = [{ stockQuantity: { lte: 0 } }, { stockQuantity: null }];
				}
			}

			// Sorting conditions
			const orderBy: Prisma.ProductOrderByWithRelationInput = {};
			orderBy[sortBy] = sortOrder;

			const [products, totalCount] = await Promise.all([
				ctx.prisma.product.findMany({
					select: {
						slug: true,
						imageUrl: true,
						name: true,
						price: true,
						stockQuantity: true,		
						createdAt: true,				
					},
					where,
					orderBy,
					skip,
					take: limit,
				}),
				ctx.prisma.product.count({ where }),
			]);

			// Calculate pagination details
			const totalPages = Math.ceil(totalCount / limit);
			const hasNextPage = page < totalPages;
			const hasPreviousPage = page > 1;

			return {
				data: products,
				pagination: {
					currentPage: page,
					totalPages,
					totalCount,
					limit,
					hasNextPage,
					hasPreviousPage,
				},
				filters: {
					search,
					sortBy,
					sortOrder,
					minPrice,
					maxPrice,
					inStock,
				},
			};
		}),
	show: publicProcedure.input(ProductShowSchema).query(({ ctx, input }) => {
		return ctx.prisma.product.findUnique({
			where: {
				slug: input.slug,
			},
		});
	}),
});
