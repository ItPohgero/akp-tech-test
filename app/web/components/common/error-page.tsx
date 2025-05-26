import { Alert, AlertDescription } from "@/web/components/ui/alert";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";

function ErrorPage({ data }: { data: Error | null }) {
	const handleRefresh = () => {
		window.location.reload();
	};

	const handleGoHome = () => {
		window.history.back();
	};

	return (
		<div className="min-h-[70vh] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
			<div className="max-w-md w-full space-y-6">
				<div className="text-center">
					<div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
						<AlertTriangle className="w-8 h-8 text-red-600" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Oops!</h1>
					<p className="text-gray-600">Something went wrong</p>
				</div>
				<Alert className="border-red-200 bg-red-50">
					<AlertTriangle className="h-4 w-4 text-red-600" />
					<AlertDescription className="text-red-800">
						We encountered an unexpected error. Please try refreshing the page
						or go back to the homepage.
					</AlertDescription>
				</Alert>
				<div className="bg-white rounded-lg p-6 shadow-sm border">
					<h3 className="font-semibold text-gray-900 mb-2">Error Details</h3>
					<p className="text-sm text-gray-600 mb-4">
						Error Code:{" "}
						<span className="font-mono bg-gray-100 px-2 py-1 rounded">500</span>
					</p>
					<p className="text-sm text-gray-600">{data?.message}</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-3">
					<Button
						onClick={handleRefresh}
						className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
					>
						<RefreshCw className="w-4 h-4" />
						Try Again
					</Button>
					<Button
						onClick={handleGoHome}
						className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
					>
						<Home className="w-4 h-4" />
						Go Home
					</Button>
				</div>

				<div className="text-center text-sm text-gray-500">
					Need help?{" "}
					<NavLink
						to="/support"
						className="text-blue-600 hover:text-blue-800 underline"
					>
						Contact Support
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;
