import { Skeleton } from "@/web/components/ui/skeleton";

export function ProductCardSkeleton() {
	return (
		<div className="bg-white rounded-lg shadow-sm overflow-hidden">
			<div className="relative">
				<Skeleton className="w-full h-48" />
				<div className="absolute top-2 right-2">
					<Skeleton className="w-8 h-8 rounded-full" />
				</div>
			</div>
			<div className="p-4 space-y-3">
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>

				<Skeleton className="h-5 w-20" />

				<div className="flex items-center justify-between">
					<Skeleton className="h-3 w-16" />
					<div className="flex items-center space-x-1">
						<Skeleton className="h-3 w-3" />
						<Skeleton className="h-3 w-6" />
					</div>
				</div>

				<div className="pt-3 border-t space-y-2">
					<Skeleton className="h-3 w-24" />
					<div className="flex items-center space-x-2">
						<Skeleton className="h-3 w-3" />
						<Skeleton className="h-3 w-12" />
					</div>
				</div>
			</div>
		</div>
	);
}
