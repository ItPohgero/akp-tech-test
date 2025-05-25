import { initTRPC } from "@trpc/server";
import type { Context } from "./context/main";
import { HealthSchema } from "./schema/health.schema";
import { ProductShowSchema } from "./schema/product_show.schema";

const t = initTRPC.context<Context>().create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
	health: publicProcedure.input(HealthSchema).query(async () => {
		return {
			example: "Hello world",
		};
	}),
	products: {
		all: publicProcedure.query(({ ctx }) => {
			console.log("Fetching all products");

			return ctx.prisma.product.findMany();
		}),
		show: publicProcedure.input(ProductShowSchema).query(({ ctx, input }) => {
			return ctx.prisma.product.findUnique({
				where: {
					slug: input.slug,
				},
			});
		}),
	},
});

export type AppRouter = typeof appRouter;
