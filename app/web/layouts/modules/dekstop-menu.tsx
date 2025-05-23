import { DropdownMenu } from "@/web/components/ui/menu-dropdown";
import { SimpleMenuItem } from "@/web/components/ui/menu-simple";
import type { MenuType } from "@/web/types/public-menu.type";
import { motion } from "framer-motion";
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
