import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server-router";

const port = import.meta.env.VITE_API_PORT || 5173;
const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: process.env.TRPC_URL || `http://localhost:${port}/trpc`,
		}),
	],
});

export default trpc;
