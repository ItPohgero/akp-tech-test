import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		reactRouterHonoServer({
			runtime: "bun",
			serverEntryPoint: "./app/server/main.ts",
		}),
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./app"),
		},
	},
	server: {
		host: true,
		port: 5173
	}
});
