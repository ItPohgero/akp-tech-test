"use client";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/web/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";
import Logo from "./common/logo";

export function SidebarLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<GalleryVerticalEnd className="size-4" />
					</div>
					<div className="flex flex-col gap-0.5 leading-none">
						<Logo />
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
