import { authClient } from "@/lib/better-auth.client";
import Logo from "@/web/components/common/logo";
import type { MenuType } from "@/web/types/public-menu.type";
import { Globe, ShoppingCart, User } from "lucide-react";
import { Else, If, Then } from "react-if";
import { Outlet, useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../components/ui/button";
import { NAVIGATE } from "../web-routes";
import type { Route } from "./+types/public-layout";
import DesktopMenu, { SearchItem } from "./modules/dekstop-menu";
import { MobileMenu } from "./modules/mobile-menu";

export async function clientLoader(): Promise<{
	user:
		| Awaited<ReturnType<typeof authClient.getSession>>["data"]["user"]
		| null;
}> {
	try {
		const session = await authClient.getSession();
		return { user: session.data?.user || null };
	} catch {
		return { user: null };
	}
}

export default function PublicLayout({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigate();
	const { data: user } = authClient.useSession();
	const currentUser = loaderData?.user || user;

	const DataAllCategory: MenuType = {
		title: "All categories",
		data: [
			{
				name: "All categories",
				description:
					"Explore a wide range of products across various categories.",
				subcategories: [
					{
						label: "Home Decor",
						link: "/home-decor",
					},
					{
						label: "Industrial",
						link: "/industrial",
					},
					{
						label: "Health & Personal Care",
						link: "/health-personal-care",
					},
					{
						label: "Fashion & Beauty",
						link: "/fashion-beauty",
					},
					{
						label: "Sports & Entertainment",
						link: "/sports-entertainment",
					},
					{
						label: "Tools & Home Improvement",
						link: "/tools-home-improvement",
					},
				],
			},
		],
		footer: {
			title: "Popular Categories",
			description: "Most searched categories this week",
			viewAllLink: "/all-categories",
		},
	};
	return (
		<Fragment>
			<header className="bg-white shadow-sm border-b sticky top-0 z-50">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-4">
						<div className="flex items-center">
							<Logo />
						</div>
						<div className="flex-1 max-w-3xl mx-4 hidden lg:block">
							<SearchItem />
						</div>
						<div className="flex items-center justify-between py-2 text-sm space-x-4">
							<div className="hidden lg:flex items-center space-x-4">
								<div className="flex items-center space-x-1">
									<Globe className="w-4 h-4" />
									<span>English-USD</span>
								</div>
								<ShoppingCart className="w-4 h-4" />
								<If condition={!!currentUser}>
									<Then>
										<div className="hidden lg:flex items-center space-x-4">
											<Button
												onClick={() => navigate(NAVIGATE.DASHBOARD)}
												variant="outline"
											>
												<User className="w-5 h-5" />
												<span>{currentUser?.name}</span>
											</Button>
										</div>
									</Then>
									<Else>
										<Button
											onClick={() => navigate(NAVIGATE.AUTH)}
											type="button"
											className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1"
										>
											Create account
										</Button>
									</Else>
								</If>
							</div>
							<div className="lg:hidden hover:bg-gray-100 rounded">
								<MobileMenu allCategories={DataAllCategory} />
							</div>
						</div>
					</div>
					<DesktopMenu allCategories={DataAllCategory} />
				</div>
				<div className="mb-2 container mx-auto px-4 lg:hidden">
					<SearchItem />
				</div>
			</header>
			<Outlet />
		</Fragment>
	);
}
