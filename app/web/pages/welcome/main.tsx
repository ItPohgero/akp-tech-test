import type trpc from "@/server/pkg/trpc-client";

export function meta() {
	return [
		{ title: "Wahyu" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

type HealthQueryResult = Awaited<ReturnType<typeof trpc.health.query>>;
export default function Welcome() {
	return <div>Welcome</div>;
}
