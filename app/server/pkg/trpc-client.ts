import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server-router";

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const RAILWAY_PUBLIC_DOMAIN = process.env.RAILWAY_PUBLIC_DOMAIN
const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: NODE_ENV === "production" ? `${RAILWAY_PUBLIC_DOMAIN}/trpc` : `http://localhost:${PORT}/trpc`,
		}),
	],
});

export default trpc;
