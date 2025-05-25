import { createAuthClient } from "better-auth/react";

const baseUrl = import.meta.env.VITE_BETTER_AUTH_URL;
export const authClient = createAuthClient({
	baseURL: baseUrl || "http://localhost:5173",
});
