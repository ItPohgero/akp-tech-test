import { betterAuth } from "better-auth"

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL || process.env.RAILWAY_PUBLIC_DOMAIN
		? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
		: "http://localhost:5173",


	secret: process.env.BETTER_AUTH_SECRET,

	database: {
		provider: "postgresql",
		url: process.env.DATABASE_URL,
	},

	trustedOrigins: [
		"http://localhost:3000",
		"http://localhost:5173",
		"https://your-app-name.up.railway.app",
		process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : "",
	].filter(Boolean),
})