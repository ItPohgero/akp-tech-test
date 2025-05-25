"use client";

import {
	ArrowRight,
	Menu,
	MessageCircle,
	ShoppingCart,
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
import { NavLink } from "react-router";

type MobileMenuProps = {
	allCategories: MenuType;
};

export function MobileMenu(props: MobileMenuProps) {
	const { allCategories } = props;
	const { menu, toggleMenu } = usePublicLayout();
	return (
		<Drawer direction="right" open={menu} onOpenChange={toggleMenu}>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<Menu />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-full max-h-screen">
				<div className="flex flex-col h-full max-h-screen">
					<div className="flex-shrink-0 p-4 border-b bg-gray-50">
						<div className="flex items-center space-x-3 mb-3">
							<div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
								<User className="w-5 h-5 text-gray-600" />
							</div>
							<div>
								<div className="font-medium">Guest User</div>
								<div className="text-sm text-gray-500">
									Sign in for better experience
								</div>
							</div>
						</div>
						<div className="flex space-x-2">
							<button
								type="button"
								className="flex-1 px-3 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600"
							>
								Sign In
							</button>
							<button
								type="button"
								className="flex-1 px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50"
							>
								Register
							</button>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto min-h-0">
						{[...Array(10)].map((_, index) => (
							<div
								key={index?.toString()}
								className="p-4 border-b border-dashed"
							>
								<h3 className="font-medium text-gray-900 mb-3">
									{allCategories.title}
								</h3>
								<div className="space-y-3">
									<div className="pl-4 space-y-2 text-sm text-gray-600">
										<List
											data={allCategories.data}
											render={(item) => (
												<div key={item.name} className="flex flex-col">
													<div className="mb-2">
														<h3 className="font-bold">{item.name}</h3>
													</div>
													<div className="flex-col space-y-2">
														<List
															data={item.subcategories}
															render={(subcategory) => (
																<div key={subcategory.label}>
																	<NavLink
																		to={subcategory.link}
																		className="flex justify-start items-center gap-x-2 text-gray-600 hover:text-gray-900"
																	>
																		<ArrowRight className="w-4 h-4" />
																		<span>{subcategory.label}</span>
																	</NavLink>
																</div>
															)}
														/>
													</div>
												</div>
											)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="flex-shrink-0 p-4 border-t bg-gray-50">
						<div className="flex items-center space-x-4">
							<ShoppingCart className="w-5 h-5 text-gray-600" />
							<MessageCircle className="w-5 h-5 text-gray-600" />
							<div className="flex-1" />
							<div className="text-xs text-gray-500">v1.0.1</div>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
