import { initTRPC } from "@trpc/server";
import type { Context } from "./context/main";
import { HealthSchema } from "./schema/health.schema";

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
	},
});

export type AppRouter = typeof appRouter;
