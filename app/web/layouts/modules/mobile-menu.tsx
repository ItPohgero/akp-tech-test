"use client";

import {
	ChevronRight,
	Grid3X3,
	Menu,
	Package,
	TrendingUp,
	User,
} from "lucide-react";

import { Button } from "@/web/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
} from "@/web/components/ui/drawer";
import List from "@/web/components/ui/list";
import { usePublicLayout } from "@/web/context/public-layout.context";
import type { MenuType } from "@/web/types/public-menu.type";
import { NAVIGATE } from "@/web/web-routes";
import { useNavigate } from "react-router";

type MobileMenuProps = {
	allCategories: MenuType;
	allPopularProduct: MenuType;
};

export function MobileMenu(props: MobileMenuProps) {
	const { allCategories, allPopularProduct } = props;
	const { menu, toggleMenu } = usePublicLayout();
	const navigate = useNavigate();

	return (
		<Drawer direction="right" open={menu} onOpenChange={toggleMenu}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="p-2">
					<Menu className="w-5 h-5" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-full max-h-screen w-full max-w-sm">
				<div className="flex flex-col h-full max-h-screen bg-white">
					{/* Header Section */}
					<div className="flex-shrink-0 p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
						<div className="flex items-center space-x-4 mb-4">
							<div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
								<User className="w-6 h-6 text-white" />
							</div>
							<div>
								<div className="font-semibold text-lg">Welcome!</div>
								<div className="text-orange-100 text-sm">
									Sign in to get personalized deals
								</div>
							</div>
						</div>
						<div className="flex space-x-3">
							<Button
								onClick={() => {
									toggleMenu();
									navigate(NAVIGATE.AUTH);
								}}
								className="flex-1 bg-white text-orange-600 hover:bg-orange-50 font-medium"
							>
								Sign In
							</Button>
							<Button
								onClick={() => {
									toggleMenu();
									navigate(NAVIGATE.AUTH);
								}}
								className="flex-1 bg-white text-orange-600 hover:bg-orange-50 font-medium"
							>
								Register
							</Button>
						</div>
					</div>

					{/* Content Section */}
					<div className="flex-1 overflow-y-auto">
						{/* Popular Products Section */}
						<div className="p-4">
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
									<TrendingUp className="w-4 h-4 text-red-600" />
								</div>
								<h2 className="font-bold text-gray-900 text-lg">
									Hot Products
								</h2>
								<div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
									NEW
								</div>
							</div>

							<div className="grid grid-cols-1 gap-3">
								<List
									data={allPopularProduct.data}
									render={(item) => (
										<div key={item.name} className="bg-gray-50 rounded-xl p-4">
											<div className="flex items-center justify-between mb-3">
												<h3 className="font-semibold text-gray-900 flex-1">
													{item.name}
												</h3>
												<ChevronRight className="w-4 h-4 text-gray-400" />
											</div>
											<p className="text-sm text-gray-600 mb-3 line-clamp-2">
												{item.description}
											</p>
											<div className="grid grid-cols-2 gap-2">
												<List
													data={item.subcategories.slice(0, 4)}
													render={(subcategory) => (
														<div
															key={subcategory.label}
															className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-orange-50 transition-colors cursor-pointer group"
														>
															<div className="w-2 h-2 bg-orange-400 rounded-full" />
															<span className="text-sm text-gray-700 group-hover:text-orange-600 font-medium">
																{subcategory.label}
															</span>
														</div>
													)}
												/>
											</div>
											{item.subcategories.length > 4 && (
												<div className="mt-2 text-center">
													<span className="text-xs text-orange-600 font-medium">
														+{item.subcategories.length - 4} more
													</span>
												</div>
											)}
										</div>
									)}
								/>
							</div>
						</div>

						<div className="p-4 border-t border-gray-100">
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
									<Grid3X3 className="w-4 h-4 text-blue-600" />
								</div>
								<h2 className="font-bold text-gray-900 text-lg">
									All Categories
								</h2>
							</div>

							<div className="space-y-3">
								<List
									data={allCategories.data}
									render={(item) => (
										<div
											key={item.name}
											className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
										>
											<div className="flex items-center justify-between mb-3">
												<h3 className="font-semibold text-gray-900">
													{item.name}
												</h3>
												<ChevronRight className="w-4 h-4 text-gray-400" />
											</div>
											<p className="text-sm text-gray-600 mb-4">
												{item.description}
											</p>
											<div className="space-y-2">
												<List
													data={item.subcategories.slice(0, 6)}
													render={(subcategory) => (
														<div
															key={subcategory.label}
															className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
														>
															<div className="flex items-center space-x-3">
																<Package className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
																<span className="text-sm text-gray-700 group-hover:text-gray-900">
																	{subcategory.label}
																</span>
															</div>
															<ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-orange-500" />
														</div>
													)}
												/>
											</div>
											{item.subcategories.length > 6 && (
												<div className="mt-3 pt-3 border-t border-gray-100">
													<button
														type="button"
														className="w-full text-center text-sm text-orange-600 font-medium hover:text-orange-700"
													>
														View all {item.subcategories.length} categories
													</button>
												</div>
											)}
										</div>
									)}
								/>
							</div>
						</div>
					</div>
					<div className="flex-shrink-0 pb-4 border-t border-gray-100 bg-gray-50">
						<div className="mt-3 text-center">
							<span className="text-xs text-gray-400">Version 2.1.0</span>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
