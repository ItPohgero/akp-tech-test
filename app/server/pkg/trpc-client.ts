import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server-router";

const port = import.meta.env.VITE_API_PORT || 5173;
const url = import.meta.env.VITE_TRPC_URL || `http://localhost:${port}/trpc`;

const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url
		}),
	],
});

export default trpc;
