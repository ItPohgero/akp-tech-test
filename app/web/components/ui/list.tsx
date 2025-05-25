import { Button } from "@/web/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Else, If, Then } from "react-if";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
		if (totalPages <= 5) return i + 1;

		if (currentPage <= 3) return i + 1;
		if (currentPage >= totalPages - 2) return totalPages - 4 + i;
		return currentPage - 2 + i;
	});

	return (
		<div className="flex items-center justify-center space-x-2 mt-6">
			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{totalPages > 5 && currentPage > 3 && (
				<>
					<Button variant="outline" onClick={() => onPageChange(1)}>
						1
					</Button>
					<span className="text-gray-500">...</span>
				</>
			)}

			{pages.map((page) => (
				<Button
					key={page}
					variant={currentPage === page ? "default" : "outline"}
					onClick={() => onPageChange(page)}
				>
					{page}
				</Button>
			))}

			{totalPages > 5 && currentPage < totalPages - 2 && (
				<>
					<span className="text-gray-500">...</span>
					<Button variant="outline" onClick={() => onPageChange(totalPages)}>
						{totalPages}
					</Button>
				</>
			)}

			<Button
				variant="outline"
				size="icon"
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages || totalPages === 0}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
};

interface ListProps<TypeData> {
	loading?: boolean;
	skeleton?: number;
	data: TypeData[] | undefined;
	render: (item: TypeData, index: number) => React.ReactNode;
	renderSkeleton?: (index: number) => React.ReactNode;
	notFound?: React.ReactNode;
	advertisements?: React.ReactNode[];
	adPositions?: number[]; // positions where ads should be placed
	// Pagination props
	pagination?: boolean;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
}

const List = <TypeData,>({
	loading,
	skeleton = 4,
	data = [],
	render,
	renderSkeleton,
	notFound,
	advertisements = [],
	adPositions = [],
	// Pagination props
	pagination = false,
	currentPage = 1,
	totalPages = 1,
	onPageChange = () => {},
}: ListProps<TypeData>) => {
	const validData = Array.isArray(data) ? data : [];

	// Function to check if an ad should be displayed at a specific position
	const shouldShowAd = (position: number): boolean => {
		return adPositions.includes(position) && position >= 2; // Only allow positions >= 2
	};

	// Function to get the ad index for a specific position
	const getAdIndex = (position: number): number => {
		return adPositions.indexOf(position) % advertisements.length;
	};

	const renderListWithAds = () => {
		const result: React.ReactNode[] = [];

		validData.forEach((item, index) => {
			// Add the list item
			result.push(
				<React.Fragment key={`item-${index?.toString()}`}>
					{render(item, index)}
				</React.Fragment>,
			);

			// Check if we should add an ad after this item
			const position = index + 1; // 1-based position
			if (shouldShowAd(position) && advertisements.length > 0) {
				const adIndex = getAdIndex(position);
				result.push(
					<React.Fragment key={`ad-after-${position}`}>
						{advertisements[adIndex]}
					</React.Fragment>,
				);
			}
		});

		return result;
	};

	return (
		<React.Fragment>
			<If condition={loading}>
				<Then>
					{Array.from({ length: skeleton }).map((_, index) => (
						<React.Fragment key={`skeleton-${index?.toString()}`}>
							{renderSkeleton ? (
								renderSkeleton(index)
							) : (
								<div className="loading" />
							)}
						</React.Fragment>
					))}
				</Then>
				<Else>
					<If condition={validData?.length === 0}>
						<Then>{notFound ? notFound : null}</Then>
						<Else>
							{renderListWithAds()}
							{pagination && totalPages > 1 && (
								<div className="col-span-full">
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={onPageChange}
									/>
								</div>
							)}
						</Else>
					</If>
				</Else>
			</If>
		</React.Fragment>
	);
};

export default List;
