import { Badge } from "@/web/components/ui/badge";
import { Button } from "@/web/components/ui/button";
import { Checkbox } from "@/web/components/ui/checkbox";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/web/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/web/components/ui/select";
import { usePublicLayout } from "@/web/context/public-layout.context";
import { cn } from "@/web/lib/utils";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

interface FilterState {
	sortBy: "name" | "price" | "createdAt" | "stockQuantity";
	sortOrder: "asc" | "desc";
	inStock: boolean;
	minPrice: string;
	maxPrice: string;
}

interface FilterContentProps {
	onApplyFilters?: (filters: FilterState) => void;
	onClearFilters?: () => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
	onApplyFilters,
	onClearFilters,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const {toggleFilter} = usePublicLayout()

	const [filters, setFilters] = useState<FilterState>({
		sortBy:
			(searchParams.get("sortBy") as FilterState["sortBy"]) || "createdAt",
		sortOrder:
			(searchParams.get("sortOrder") as FilterState["sortOrder"]) || "desc",
		inStock: searchParams.get("inStock") === "true",
		minPrice: searchParams.get("minPrice") || "",
		maxPrice: searchParams.get("maxPrice") || "",
	});

	const [tempFilters, setTempFilters] = useState<FilterState>(filters);

	const handleTempFilterChange = <K extends keyof FilterState>(
		key: K,
		value: FilterState[K],
	) => {
		setTempFilters((prev) => ({ ...prev, [key]: value }));
	};

	const applyFilters = () => {
		
		setFilters(tempFilters);

		// Update URL parameters
		const params = new URLSearchParams(searchParams);

		// Clear existing filter params first
		params.delete("sortBy");
		params.delete("sortOrder");
		params.delete("inStock");
		params.delete("minPrice");
		params.delete("maxPrice");

		// Add new filter params only if they have meaningful values
		for (const [key, value] of Object.entries(tempFilters)) {
			// Only add parameter if it's not the default value and has a meaningful value
			const shouldInclude =
				(key === "sortBy" && value !== "createdAt") ||
				(key === "sortOrder" && value !== "desc") ||
				(key === "inStock" && value === true) ||
				(key === "minPrice" && value !== "" && value !== "0") ||
				(key === "maxPrice" && value !== "" && value !== "0");

			if (shouldInclude) {
				params.set(key, value.toString());
			}
		}

		setSearchParams(params);
		onApplyFilters?.(tempFilters);
		toggleFilter();
	};

	const removeFilter = (filterKey: keyof FilterState) => {
		const newTempFilters = { ...tempFilters };
		const newFilters = { ...filters };

		// Reset to default values
		if (filterKey === "sortBy") {
			newTempFilters.sortBy = "createdAt";
			newFilters.sortBy = "createdAt";
		} else if (filterKey === "sortOrder") {
			newTempFilters.sortOrder = "desc";
			newFilters.sortOrder = "desc";
		} else if (filterKey === "inStock") {
			newTempFilters.inStock = false;
			newFilters.inStock = false;
		} else if (filterKey === "minPrice" || filterKey === "maxPrice") {
			newTempFilters[filterKey] = "";
			newFilters[filterKey] = "";
		}

		setTempFilters(newTempFilters);
		setFilters(newFilters);

		// Update URL parameters
		const params = new URLSearchParams(searchParams);
		params.delete(filterKey);
		setSearchParams(params);
	};

	// Clear all filters
	const clearFilters = () => {
		const clearedFilters: FilterState = {
			sortBy: "createdAt",
			sortOrder: "desc",
			inStock: false,
			minPrice: "",
			maxPrice: "",
		};

		const params = new URLSearchParams(searchParams);
		params.delete("sortBy");
		params.delete("sortOrder");
		params.delete("inStock");
		params.delete("minPrice");
		params.delete("maxPrice");

		setSearchParams(params);
		setFilters(clearedFilters);
		setTempFilters(clearedFilters);
		onClearFilters?.();

		console.log("Filters cleared");
	};

	const resetTempFilters = () => {
		setTempFilters(filters);
	};

	const hasPendingChanges =
		JSON.stringify(filters) !== JSON.stringify(tempFilters);

	const getActiveFiltersCount = (): number => {
		let count = 0;
		if (filters.inStock) count++;
		if (filters.minPrice && filters.minPrice !== "0") count++;
		if (filters.maxPrice && filters.maxPrice !== "0") count++;
		if (filters.sortBy !== "createdAt") count++;
		if (filters.sortOrder !== "desc") count++;
		return count;
	};

	// Get display label for filter values
	const getFilterDisplayValue = (key: string, value: string): string => {
		switch (key) {
			case "sortBy": {
				const sortByLabels: Record<string, string> = {
					createdAt: "Date Created",
					name: "Name",
					price: "Price",
					stockQuantity: "Stock Quantity",
				};
				return sortByLabels[value] || value;
			}
			case "sortOrder":
				return value === "asc" ? "Ascending" : "Descending";
			case "inStock":
				return "In Stock Only";
			case "minPrice":
				return `Min: $${value}`;
			case "maxPrice":
				return `Max: $${value}`;
			default:
				return value.toString();
		}
	};

	return (
		<div className="w-full space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Filter className="w-4 h-4" />
					Filters
					{getActiveFiltersCount() > 0 && (
						<Badge variant="secondary" className="ml-2">
							{getActiveFiltersCount()}
						</Badge>
					)}
				</div>
				<Button
					disabled={getActiveFiltersCount() === 0}
					variant="ghost"
					size="sm"
					onClick={clearFilters}
					className={cn(
						"h-8 px-2",
						getActiveFiltersCount()
							? "text-destructive"
							: "text-muted-foreground",
					)}
				>
					Clear All
				</Button>
			</div>

			<div className="space-y-3">
				<Label className="text-sm font-medium">Sort By</Label>
				<Select
					value={tempFilters.sortBy}
					onValueChange={(value: FilterState["sortBy"]) =>
						handleTempFilterChange("sortBy", value)
					}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="createdAt">Date Created</SelectItem>
						<SelectItem value="name">Name</SelectItem>
						<SelectItem value="price">Price</SelectItem>
						<SelectItem value="stockQuantity">Stock Quantity</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-3">
				<Label className="text-sm font-medium">Sort Order</Label>
				<RadioGroup
					value={tempFilters.sortOrder}
					onValueChange={(value: FilterState["sortOrder"]) =>
						handleTempFilterChange("sortOrder", value)
					}
					className="flex gap-6"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="asc" id="asc" />
						<Label htmlFor="asc" className="text-sm">
							Asc
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="desc" id="desc" />
						<Label htmlFor="desc" className="text-sm">
							Desc
						</Label>
					</div>
				</RadioGroup>
			</div>

			<div className="space-y-3">
				<Label className="text-sm font-medium">Availability</Label>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="inStock"
						checked={tempFilters.inStock}
						onCheckedChange={(checked: boolean) =>
							handleTempFilterChange("inStock", checked)
						}
					/>
					<Label htmlFor="inStock" className="text-sm">
						In Stock Only
					</Label>
				</div>
			</div>

			<div className="space-y-3">
				<Label className="text-sm font-medium">Price Range</Label>
				<div className="flex items-center gap-2">
					<Input
						type="number"
						placeholder="Min"
						value={tempFilters.minPrice}
						onChange={(e) => handleTempFilterChange("minPrice", e.target.value)}
						className="flex-1"
					/>
					<span className="text-muted-foreground">-</span>
					<Input
						type="number"
						placeholder="Max"
						value={tempFilters.maxPrice}
						onChange={(e) => handleTempFilterChange("maxPrice", e.target.value)}
						className="flex-1"
					/>
				</div>
			</div>

			{getActiveFiltersCount() > 0 && (
				<div className="space-y-3 pt-4">
					<Label className="text-sm font-medium">Active Filters</Label>
					<div className="flex flex-wrap gap-2">
						{Object.entries(filters).map(([key, value]) => {
							const shouldShow =
								(key === "sortBy" && value !== "createdAt") ||
								(key === "sortOrder" && value !== "desc") ||
								(key === "inStock" && value === true) ||
								(key === "minPrice" && value !== "" && value !== "0") ||
								(key === "maxPrice" && value !== "" && value !== "0");

							if (shouldShow) {
								return (
									<Badge
										onClick={() => removeFilter(key as keyof FilterState)}
										key={key}
										variant="secondary"
										className="flex items-center gap-1"
									>
										<span className="text-xs">
											{getFilterDisplayValue(key, value)}
										</span>
										<X className="w-3 h-3 cursor-pointer hover:text-destructive" />
									</Badge>
								);
							}
							return null;
						})}
					</div>
				</div>
			)}

			<div className="flex flex-col gap-2 pt-4">
				<Button
					onClick={applyFilters}
					className="w-full"
					disabled={!hasPendingChanges}
				>
					Apply Filters
					{hasPendingChanges && (
						<Badge
							variant="destructive"
							className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
						>
							!
						</Badge>
					)}
				</Button>

				{hasPendingChanges && (
					<Button
						variant="outline"
						size="sm"
						onClick={resetTempFilters}
						className="w-full"
					>
						Reset Changes
					</Button>
				)}
			</div>
		</div>
	);
};

export default FilterContent;
