import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { ContextData } from "../context/main";
import { appRouter } from "../server-router";

export function HonoApp() {
	const app = new Hono();
	app.get("/.well-known/*", (c) => c.text("Not found", 404));
	app.use(
		"/trpc/*",
		trpcServer({
			router: appRouter,
			createContext: ContextData,
		}),
	);
	return app;
}
