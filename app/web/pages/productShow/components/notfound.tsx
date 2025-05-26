import { NAVIGATE } from "@/web/web-routes";
import { Fragment } from "react";
import { NavLink } from "react-router";

export default function ProductNotFound({ slug }: { slug: string }) {
	return (
		<Fragment>
			<div className="min-h-screen bg-gray-50 py-8">
				<div className="container mx-auto px-4">
					<nav className="mb-8">
						<ol className="flex items-center space-x-2 text-sm text-gray-600">
							<li>
								<a href="/" className="hover:text-blue-600">
									Home
								</a>
							</li>
							<li>/</li>
							<li>
								<a href="/products" className="hover:text-blue-600">
									Products
								</a>
							</li>
							<li>/</li>
							<li className="text-gray-900">Product Not Found</li>
						</ol>
					</nav>

					<div className="max-w-4xl mx-auto text-center">
						<div className="bg-white rounded-lg shadow-lg p-12">
							<div className="mb-8">
								<div className="text-6xl text-gray-300 mb-4">📦</div>
								<h1 className="text-4xl font-bold text-gray-900 mb-4">
									Product Not Found
								</h1>
								<p className="text-xl text-gray-600 mb-8">
									Sorry, we couldn't find the product you're looking for.
								</p>
							</div>

							<div className="bg-gray-50 rounded-lg p-6 mb-8">
								<h3 className="font-semibold text-gray-900 mb-2">Details</h3>
								<p className="text-gray-600">
									Product ID:{" "}
									<code className="bg-gray-200 px-2 py-1 rounded text-sm">
										{slug}
									</code>
								</p>
							</div>
							<div className="flex justify-center">
								<NavLink
									to={NAVIGATE.ROOT}
									className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
								>
									Browse All Products
								</NavLink>
							</div>
							<div className="mt-8 pt-8 border-t border-gray-200">
								<h3 className="font-semibold text-gray-900 mb-4">
									What you can do:
								</h3>
								<ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
									<li>• Check if the product ID is correct</li>
									<li>• Browse our product catalog</li>
									<li>• Use the search function to find similar products</li>
									<li>• Contact our support team if you need help</li>
								</ul>
							</div>
						</div>
						<div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
							<h3 className="font-semibold text-red-900 mb-2">
								Debug Information
							</h3>
							<div className="text-sm text-red-700 space-y-1">
								<div>
									<strong>Route Param Slug:</strong> {slug}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
