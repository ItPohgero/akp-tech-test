import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import { DropdownMenu } from "@/web/components/ui/menu-dropdown";
import { SimpleMenuItem } from "@/web/components/ui/menu-simple";
import type { MenuType } from "@/web/types/public-menu.type";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Fragment, useState } from "react";

type DesktopMenu = {
	allCategories: MenuType;
};

export default function DesktopMenu(props: DesktopMenu) {
	const { allCategories } = props;
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const handleMouseEnter = (menuName: string): void => {
		setActiveDropdown(menuName);
	};
	const handleMouseLeave = (): void => {
		setActiveDropdown(null);
	};
	return (
		<Fragment>
			<nav className="hidden md:block pb-4 relative">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between">
					<motion.div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
						<DropdownMenu
							title={allCategories.title}
							data={allCategories.data}
							footer={allCategories.footer}
							isOpen={activeDropdown === "All categories"}
							onMouseEnter={() => handleMouseEnter("All categories")}
							onMouseLeave={handleMouseLeave}
						/>
					</motion.div>

					<div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
						<SimpleMenuItem href="/">Get the app</SimpleMenuItem>
						<SimpleMenuItem href="/acc">Become a supplier</SimpleMenuItem>
					</div>
				</div>
			</nav>
		</Fragment>
	);
}

export function SearchItem() {
	return (
		<Fragment>
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
					<span className="hidden md:inline">Search</span>
				</Button>
			</div>
		</Fragment>
	);
}
