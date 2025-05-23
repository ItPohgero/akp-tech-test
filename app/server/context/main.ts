export async function ContextData() {
	return {};
}
export type Context = Awaited<ReturnType<typeof ContextData>>;
