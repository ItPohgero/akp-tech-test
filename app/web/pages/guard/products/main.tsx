import trpc from "@/server/pkg/trpc-client";
import type { SortField } from "@/server/schema/product_list.schema";
import ErrorPage from "@/web/components/common/error-page";
import List from "@/web/components/ui/list";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ProductCardSkeleton } from "../../welcome/components/skeleton-product-card";
import ProductCard from "../../welcome/modules/product-card";

export default function ProductsPage() {
	const [search, setSearch] = useSearchParams();
	const [data, setData] =
		useState<Awaited<ReturnType<typeof trpc.products.all.query>>>();
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
		<main className="flex-1 min-w-0 container mx-auto py-10">
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
	);
}
