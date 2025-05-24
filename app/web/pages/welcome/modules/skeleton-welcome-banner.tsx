import { Skeleton } from "@/web/components/ui/skeleton";

export function WelcomeBannerSkeleton() {
	return (
		<div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg mb-6 flex items-center justify-between">
			<div className="flex items-center space-x-3">
				<Skeleton className="w-8 h-8 rounded-full" />
				<Skeleton className="h-4 w-64" />
			</div>
			<Skeleton className="w-6 h-6" />
		</div>
	);
}
