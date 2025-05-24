import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { ContextData } from "../context/main";
import { appRouter } from "../server-router";
import { auth } from "@/lib/auth";

export function HonoApp() {
	const app = new Hono();
	app.get("/.well-known/*", (c) => c.text("Not found", 404));
	app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
	app.use(
		"/trpc/*",
		trpcServer({
			router: appRouter,
			createContext: ContextData,
		}),
	);
	return app;
}
