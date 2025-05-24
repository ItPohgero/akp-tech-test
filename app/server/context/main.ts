import prisma from "@/server/pkg/prisma-client";

export async function ContextData() {
	return {
		prisma,
	};
}
export type Context = Awaited<ReturnType<typeof ContextData>>;
