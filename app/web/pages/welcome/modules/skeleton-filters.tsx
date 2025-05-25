import { Skeleton } from "@/web/components/ui/skeleton";

export function FiltersSkeleton() {
	return (
		<div className="bg-white border p-4 rounded-lg shadow-sm space-y-6">
			<Skeleton className="h-6 w-16" />

			<div className="space-y-2">
				<div className="flex items-center space-x-2">
					<Skeleton className="h-4 w-12" />
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-4" />
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-center space-x-2">
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-24" />
				</div>
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-3/4" />
			</div>

			<div className="space-y-3">
				<Skeleton className="h-4 w-28" />
				<div className="flex items-center space-x-2">
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>

			<div className="space-y-3">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-3 w-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-4 w-28" />
				</div>
			</div>

			<div className="space-y-3">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-3 w-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-8" />
				</div>
			</div>
		</div>
	);
}
