import {
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";
import { LoadingBarContainer } from "react-top-loading-bar";

import { AlertTriangle, Check, Copy, Home, RefreshCw } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "./web/components/ui/button";

import type { Route } from "./+types/root";
import "./web/styles/app.css";
import { Else, If, Then } from "react-if";
import { Alert, AlertDescription } from "./web/components/ui/alert";
import { Card, CardContent, CardHeader } from "./web/components/ui/card";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				{/* Add font display swap to prevent layout shift */}
				<style>{`
					body { 
						font-family: Inter, system-ui, sans-serif; 
						font-display: swap;
					}
				`}</style>
			</head>
			<body suppressHydrationWarning={true}>
				<LoadingBarContainer>{children}</LoadingBarContainer>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const [copied, setCopied] = useState(false);
	let message = "Something went wrong";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;
	let errorCode = "500";

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "Page not found" : "Something went wrong";
		details =
			error.status === 404
				? "The page you're looking for doesn't exist."
				: error.statusText || details;
		errorCode = error.status.toString();
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
		message = "Development error";
	}

	const handleRefresh = () => {
		window.location.reload();
	};

	const handleGoBack = () => {
		window.history.back();
	};

	const copyErrorDetails = async () => {
		const errorText = `Error: ${message}\nDetails: ${details}\n${stack ? `Stack: ${stack}` : ""}`;
		await navigator.clipboard.writeText(errorText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
			<div className="w-full max-w-md space-y-6">
				<Card>
					<CardHeader className="text-center pb-4">
						<div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
							<AlertTriangle className="w-6 h-6 text-red-600" />
						</div>
						<h1 className="text-2xl font-semibold text-gray-900">{message}</h1>
						<p className="text-sm text-muted-foreground">Error {errorCode}</p>
					</CardHeader>

					<CardContent className="space-y-4">
						<Alert>
							<AlertDescription className="text-center">
								{details}
							</AlertDescription>
						</Alert>
						<If condition={stack}>
							<Then>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-medium text-gray-900">
											Development details
										</h3>
										<Button
											variant="outline"
											size="sm"
											onClick={copyErrorDetails}
											className="h-8 px-2"
										>
											<If condition={copied}>
												<Then>
													<Fragment>
														<Check className="w-3 h-3 mr-1" />
														Copied
													</Fragment>
												</Then>
												<Else>
													<Fragment>
														<Copy className="w-3 h-3 mr-1" />
														Copy
													</Fragment>
												</Else>
											</If>
										</Button>
									</div>
									<div className="bg-gray-900 rounded-md p-3 overflow-hidden">
										<pre className="text-green-400 text-xs overflow-x-auto font-mono">
											<code>{stack}</code>
										</pre>
									</div>
								</div>
							</Then>
						</If>
						<div className="flex flex-col gap-2 pt-2">
							<Button onClick={handleRefresh} className="w-full">
								<RefreshCw className="w-4 h-4 mr-2" />
								Try again
							</Button>
							<Button
								variant="outline"
								onClick={handleGoBack}
								className="w-full"
							>
								<Home className="w-4 h-4 mr-2" />
								Go Back
							</Button>
						</div>
					</CardContent>
				</Card>
				<div className="text-center">
					<p className="text-sm text-muted-foreground">
						Need help?{" "}
						<NavLink to="/" className="text-primary hover:underline">
							Contact support
						</NavLink>
					</p>
				</div>
			</div>
		</div>
	);
}
