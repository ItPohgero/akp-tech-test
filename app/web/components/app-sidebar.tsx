import type * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/web/components/ui/sidebar";
import { NavUser } from "./nav-user";

import { BarChartIcon, Box, LayoutDashboardIcon } from "lucide-react";

import { authClient } from "@/lib/better-auth.client";
import { NavMain } from "@/web/components/nav-main";
import { NAVIGATE } from "../web-routes";
import { SidebarLogo } from "./sidebar-logo";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: NAVIGATE.DASHBOARD,
			icon: LayoutDashboardIcon,
		},
		{
			title: "Products",
			url: NAVIGATE.GUARD.PRODUCTS,
			icon: Box,
		},
		{
			title: "Analytics",
			url: NAVIGATE.GUARD.ANALYTICS,
			icon: BarChartIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: user } = authClient.useSession();
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<SidebarLogo />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						avatar: user?.user.image || "",
						email: user?.user.email || "",
						name: user?.user.name || "",
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}
