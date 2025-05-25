import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server-router";

const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: process.env.TRPC_BASE_URL || "https://akpstore.itpohgero.com/trpc",
		}),
	],
});

export default trpc;
