import { authClient } from "@/lib/better-auth.client";
import Logo from "@/web/components/common/logo";
import type { MenuType } from "@/web/types/public-menu.type";
import { Globe, Menu, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Else, If, Then } from "react-if";
import { Outlet, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
	PublicLayoutProvider,
	usePublicLayout,
} from "../context/public-layout.context";
import { NAVIGATE } from "../web-routes";
import type { Route } from "./+types/public-layout";
import DesktopMenu, { SearchItem } from "./modules/dekstop-menu";
import Footer from "./modules/footer";
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

	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsSticky(scrollTop > 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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
		<PublicLayoutProvider defaultFilterValue={false} defaultMenuValue={false}>
			<header className="bg-white border-b sticky top-0 z-50 hidden lg:block">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-4">
						<div className="flex items-center">
							<Logo />
						</div>
						<div className="flex-1 max-w-3xl mx-4">
							<SearchItem />
						</div>
						<div className="flex items-center justify-between py-2 text-sm space-x-4">
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-1">
									<Globe className="w-4 h-4" />
									<span>English-USD</span>
								</div>
								<ShoppingCart className="w-4 h-4" />
								<If condition={!!currentUser}>
									<Then>
										<div className="flex items-center space-x-4">
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
						</div>
					</div>
					<DesktopMenu allCategories={DataAllCategory} />
				</div>
			</header>

			<header className="bg-white h-16 lg:hidden">
				<div className="mx-auto px-4">
					<div className="flex items-center justify-between py-4">
						<div className="flex items-center">
							<Logo />
						</div>
						<div className="flex items-center justify-between py-2 text-sm space-x-4">
							<div className="hover:bg-gray-100 rounded">
								<MobileMenu allCategories={DataAllCategory} />
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="bg-white border-b sticky top-0 z-50 lg:hidden">
				<div className="container mx-auto px-4 py-2 flex items-center justify-between gap-x-2">
					<div className="w-full">
						<SearchItem />
					</div>
					<If condition={isSticky}>
						<Then>
							<MenuSticky />
						</Then>
					</If>
				</div>
			</div>

			<Outlet />
			<Footer />
		</PublicLayoutProvider>
	);
}

const MenuSticky = () => {
	const { toggleMenu } = usePublicLayout();
	return (
		<div>
			<Button onClick={toggleMenu} variant="outline">
				<Menu />
			</Button>
		</div>
	);
};
