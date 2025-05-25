import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import { DropdownMenu } from "@/web/components/ui/menu-dropdown";
import { SimpleMenuItem } from "@/web/components/ui/menu-simple";
import type { MenuType } from "@/web/types/public-menu.type";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

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
			<nav className="hidden lg:block pb-4 relative">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
					<motion.div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
						<DropdownMenu
							title={allCategories.title}
							data={allCategories.data}
							footer={allCategories.footer}
							isOpen={activeDropdown === "All categories"}
							onMouseEnter={() => handleMouseEnter("All categories")}
							onMouseLeave={handleMouseLeave}
						/>
					</motion.div>

					<div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-2 mt-4 lg:mt-0">
						<SimpleMenuItem href="/">Get the app</SimpleMenuItem>
						<SimpleMenuItem href="/acc">Become a supplier</SimpleMenuItem>
					</div>
				</div>
			</nav>
		</Fragment>
	);
}

export function SearchItem() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [isSearching, setIsSearching] = useState<boolean>(false);
	useEffect(() => {
		const queryFromUrl = searchParams.get("q");
		if (queryFromUrl) {
			setSearchQuery(queryFromUrl);
		}
	}, [searchParams]);

	const handleSearch = () => {
		if (searchQuery.trim()) {
			setIsSearching(true);
			const newParams = new URLSearchParams(searchParams);
			newParams.set("q", searchQuery.trim());
			newParams.set("page", "1");
			setSearchParams(newParams);
		} else {
			handleClearSearch();
		}
		setIsSearching(false);
	};

	const handleClearSearch = () => {
		setSearchQuery("");
		const newParams = new URLSearchParams(searchParams);
		newParams.delete("q");
		newParams.set("page", "1");
		setSearchParams(newParams);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
	};

	const currentQuery = searchParams.get("q") || "";
	const showClearButton = currentQuery || searchQuery;

	return (
		<Fragment>
			<div className="relative">
				<Input
					value={searchQuery}
					onChange={handleInputChange}
					onKeyUp={handleKeyPress}
					type="text"
					placeholder="What are you looking for?"
					className="w-full pl-4 pr-24 h-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
					disabled={isSearching}
				/>
				{showClearButton && (
					<Button
						onClick={handleClearSearch}
						type="button"
						variant="ghost"
						size="sm"
						className="absolute right-28 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
						title="Clear search"
					>
						<X className="w-4 h-4 text-gray-400" />
					</Button>
				)}
				<Button
					onClick={handleSearch}
					type="button"
					disabled={isSearching}
					className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<Search className="w-4 h-4" />
					<span className="hidden lg:inline ml-1">
						{isSearching ? "..." : "Search"}
					</span>
				</Button>
			</div>
		</Fragment>
	);
}
