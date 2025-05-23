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
});

export type AppRouter = typeof appRouter;
