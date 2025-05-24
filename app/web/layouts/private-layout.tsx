import { authClient } from "@/lib/better-auth.client";
import { Navigate, Outlet } from "react-router";
import type { Route } from "./+types/private-layout";

export async function clientLoader() {
  try {
    const session = await authClient.getSession();
    return { user: session.data?.user || null };
  } catch {
    return { user: null };
  }
}

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
  const { data: user, isPending } = authClient.useSession();
  const currentUser = loaderData?.user || user;
  if (isPending && !loaderData) {
    return <div>Loading...</div>;
  }
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
}