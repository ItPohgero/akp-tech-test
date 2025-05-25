import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server-router";

const apiUrl = import.meta.env.VITE_TRPC_BASE_URL;
const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: apiUrl || "https://akpstore.itpohgero.com/trpc",
		}),
	],
});

export default trpc;
