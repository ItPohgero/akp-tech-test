import Logo from "@/web/components/common/logo";
import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import type { MenuType } from "@/web/types/public-menu.type";
import { Globe, Search, ShoppingCart, User } from "lucide-react";
import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import DesktopMenu from "./modules/dekstop-menu";
import { MobileMenu } from "./modules/mobile-menu";

export default function PublicLayout() {
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
			<header className="bg-white shadow-sm border-b">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-4">
						<div className="flex items-center space-x-8">
							<Logo />
						</div>
						<div className="flex-1 max-w-2xl mx-4 hidden md:block">
							<div className="relative">
								<Input
									type="text"
									placeholder="What yout loking for?"
									className="w-full pl-4 pr-12 h-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
								/>
								<Button
									type="button"
									className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-6 bg-orange-500 text-white rounded-full hover:bg-orange-600"
								>
									<Search className="w-5 h-5" />
									<span>Search</span>
								</Button>
							</div>
						</div>

						<div className="flex items-center justify-between py-2 text-sm">
							<div className="hidden md:flex items-center space-x-4">
								<div className="flex items-center space-x-1">
									<Globe className="w-4 h-4" />
									<span>English-USD</span>
								</div>
								<ShoppingCart className="w-4 h-4" />
								<span>Sign in</span>
								<button
									type="button"
									className="bg-orange-500 text-white px-4 py-1 rounded"
								>
									Create account
								</button>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="hidden md:flex items-center space-x-4">
								<User className="w-5 h-5" />
							</div>
							<div className="md:hidden p-2 hover:bg-gray-100 rounded">
								<MobileMenu allCategories={DataAllCategory} />
							</div>
						</div>
					</div>
					<DesktopMenu allCategories={DataAllCategory} />
				</div>
			</header>
			<Outlet />
		</Fragment>
	);
}
