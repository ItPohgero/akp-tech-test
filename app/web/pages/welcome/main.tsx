import { authClient } from "@/lib/better-auth.client";
import trpc from "@/server/pkg/trpc-client";
import type { SortField } from "@/server/schema/product_list.schema";
import ErrorPage from "@/web/components/common/error-page";
import { Alert, AlertDescription, AlertTitle } from "@/web/components/ui/alert";
import List from "@/web/components/ui/list";
import { NAVIGATE } from "@/web/web-routes";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Else, If, Then } from "react-if";
import { NavLink, useSearchParams } from "react-router";
import ProductCard from "./modules/product-card";
import Sidebar from "./modules/sidebar";
import { FiltersSkeleton } from "./components/skeleton-filters";
import { ProductCardSkeleton } from "./components/skeleton-product-card";
import { WelcomeBannerSkeleton } from "./components/skeleton-welcome-banner";

export default function WelcomePage() {
	const { data: user } = authClient.useSession();
	const [search, setSearch] = useSearchParams();

	const [data, setData] =
		useState<Awaited<ReturnType<typeof trpc.products.all.query>>>();
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingSidebar, setLoadingSidebar] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			const sortBy = (value: string): SortField => {
				switch (value) {
					case "name":
						return "name";
					case "price":
						return "price";
					case "stockQuantity":
						return "stockQuantity";
					default:
						return "createdAt";
				}
			};
			try {
				setLoading(true);
				const result = await trpc.products.all.query({
					search: search.get("q") || "",
					limit: 12,
					page: Number.parseInt(search.get("page") || "1"),
					...(search.get("sortBy") && {
						sortBy: sortBy(search.get("sortBy") || ""),
					}),
					...(search.get("sortOrder") && {
						sortOrder: search.get("sortOrder") === "asc" ? "asc" : "desc",
					}),
					...(search.get("inStock") && {
						inStock: search.get("inStock") === "true",
					}),
					...(search.get("minPrice") && {
						minPrice: Number.parseInt(search.get("minPrice") || "0"),
					}),
					...(search.get("maxPrice") && {
						maxPrice: Number.parseInt(search.get("maxPrice") || "0"),
					}),
				});
				setData(result);
			} catch (err) {
				setError(err as Error);
				console.error("Failed to fetch products:", err);
			} finally {
				// Simulation of loading
				setTimeout(() => {
					setLoadingSidebar(false);
					setLoading(false);
				}, 1000);
			}
		};

		fetchProducts();
	}, [search]);

	const handlePageChange = (newPage: number) => {
		setSearch({ page: newPage.toString() });
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	if (error) return <ErrorPage data={error} />;

	return (
		<div className="min-h-screen ">
			<div className="container mx-auto px-4 pb-6 pt-6">
				<div className="flex flex-col lg:flex-row gap-6 relative">
					<aside className="w-full lg:w-64 space-y-6">
						<div className="lg:sticky lg:top-40 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
							<If condition={loadingSidebar}>
								<Then>
									<FiltersSkeleton />
								</Then>
								<Else>
									<Sidebar />
								</Else>
							</If>
						</div>
					</aside>

					<main className="flex-1 min-w-0">
						<If condition={!user}>
							<Then>
								<If condition={loading}>
									<Then>
										<WelcomeBannerSkeleton />
									</Then>
									<Else>
										<Alert className="mb-6">
											<User className="w-4 h-4" />
											<AlertTitle>Welcome</AlertTitle>
											<AlertDescription className="text-sm flex items-center gap-1">
												Sign in to get up to $25!{" "}
												<NavLink
													to={NAVIGATE.AUTH}
													className="text-orange-600 hover:text-orange-800 underline"
												>
													Sign In
												</NavLink>
											</AlertDescription>
										</Alert>
									</Else>
								</If>
							</Then>
						</If>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							<List
								loading={loading}
								skeleton={12}
								renderSkeleton={ProductCardSkeleton}
								data={data?.data || []}
								pagination={true}
								totalPages={data?.pagination.totalPages || 1}
								currentPage={data?.pagination.currentPage || 1}
								onPageChange={handlePageChange}
								render={(
									product: Awaited<
										ReturnType<typeof trpc.products.all.query>
									>["data"][number],
								) => (
									<ProductCard
										slug={product.slug}
										imageUrl={product.imageUrl || ""}
										name={product.name}
										price={product.price}
										stockQuantity={product.stockQuantity || 0}
									/>
								)}
								notFound={
									<div className="col-span-full text-center text-gray-500">
										No products found.
									</div>
								}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
