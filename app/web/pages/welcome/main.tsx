import trpc from "@/server/pkg/trpc-client";
import { User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Else, If, Then } from "react-if";
import ProductCard from "./modules/product-card";
import Sidebar from "./modules/sidebar";
import { FiltersSkeleton } from "./modules/skeleton-filters";
import { ProductCardSkeleton } from "./modules/skeleton-product-card";
import { WelcomeBannerSkeleton } from "./modules/skeleton-welcome-banner";
import { useSearchParams } from "react-router";
import List from "@/web/components/ui/list";
import type { SortField } from "@/server/schema/product_list.schema";

export default function WelcomePage() {
	const [search, setSearch] = useSearchParams();

	const [data, setData] = useState<Awaited<ReturnType<typeof trpc.products.all.query>>>();
	const [loading, setLoading] = useState<boolean>(true);
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
			}
			try {
				setLoading(true);
				const result = await trpc.products.all.query({
					search: search.get("q") || "",
					limit: 12,
					page: Number.parseInt(search.get("page") || "1"),
					...(search.get("sortBy") && { sortBy: sortBy(search.get("sortBy") || "") }),
					...(search.get("sortOrder") && { sortOrder: search.get("sortOrder") === 'asc' ? 'asc' : 'desc' }),
					...(search.get("inStock") && { inStock: search.get("inStock") === "true" }),
					...(search.get("minPrice") && { minPrice: Number.parseInt(search.get("minPrice") || "0") }),
					...(search.get("maxPrice") && { maxPrice: Number.parseInt(search.get("maxPrice") || "0") }),
				});
				setData(result);
			} catch (err) {
				setError(err as Error);
				console.error("Failed to fetch products:", err);
			} finally {
				setLoading(false);
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
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col lg:flex-row gap-6 relative">
					<aside className="w-full lg:w-64 space-y-6">
						<div className="lg:sticky lg:top-40 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
							<If condition={loading}>
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
						<If condition={loading}>
							<Then>
								<WelcomeBannerSkeleton />
							</Then>
							<Else>
								<div className="bg-gradient-to-r from-orange-100 to-orange-50 p-4 rounded-lg mb-6 flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
											<User className="w-4 h-4 text-white" />
										</div>
										<span>Sign in to get up to US$25 welcome perks!</span>
									</div>
									<button
										type="button"
										className="text-gray-400 hover:text-gray-600"
									>
										<X />
									</button>
								</div>
							</Else>
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
								render={(product: Awaited<ReturnType<typeof trpc.products.all.query>>['data'][number]) => (
									<ProductCard
										slug={product.slug}
										imageUrl={product.imageUrl || ""}
										name={product.name}
										price={product.price}
										stockQuantity={product.stockQuantity || 0}
									/>
								)}
								notFound={<div className="col-span-full text-center text-gray-500">No products found.</div>}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
