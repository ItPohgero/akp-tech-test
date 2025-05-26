import { authClient } from "@/lib/better-auth.client";
import { Navigate, Outlet } from "react-router";
import type { Route } from "./+types/private-layout";

import { AppSidebar } from "@/web/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/web/components/ui/breadcrumb";
import { Separator } from "@/web/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/web/components/ui/sidebar";
import { NAVIGATE } from "../web-routes";

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
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href={NAVIGATE.DASHBOARD}>
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Home</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
