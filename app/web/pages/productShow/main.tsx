import trpc from "@/server/pkg/trpc-client";
import { Button } from "@/web/components/ui/button";
import { NAVIGATE } from "@/web/web-routes";
import { ArrowLeft, Check } from "lucide-react";
import { If, Then } from "react-if";
import {
	type LoaderFunctionArgs,
	type MetaFunction,
	NavLink,
	useLoaderData,
	useParams,
} from "react-router";
import NotFound from "./modules/notfound";

interface LoaderData {
	product: Awaited<ReturnType<typeof trpc.products.show.query>> | null;
	notFound?: boolean;
}

export async function loader({ params }: LoaderFunctionArgs) {
	const { slug } = params;
	if (!slug) {
		throw new Response("Product ID is required", {
			status: 400,
			statusText: "Bad Request",
		});
	}
	try {
		const product = await trpc.products.show.query({ slug: slug as string });
		if (!product) {
			return { product: null, notFound: true };
		}
		return { product, notFound: false };
	} catch (error) {
		if (error instanceof Error) {
			if (
				"data" in error &&
				typeof error.data === "object" &&
				error.data !== null
			) {
				const trpcError = error.data as { httpStatus: number };
				if (trpcError.httpStatus === 404) {
					return { product: null, notFound: true };
				}
			}
		}
		throw new Response("Failed to load product", {
			status: 500,
			statusText: "Internal Server Error",
		});
	}
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data || data.notFound || !data.product) {
		return [
			{ title: "Product Not Found - Very Cool App" },
			{
				name: "description",
				content: "The requested product could not be found.",
			},
			{
				property: "og:title",
				content: "Product Not Found - Very Cool App",
			},
			{
				property: "og:description",
				content: "The requested product could not be found.",
			},
		];
	}
	const { product } = data;
	return [
		{ title: `${product?.name} - Very Cool App` },
		{
			property: "og:title",
			content: `${product?.name} - Very Cool App`,
		},
		{
			name: "description",
			content:
				product?.description || `Check out ${product?.name} on Very Cool App`,
		},
		{
			property: "og:description",
			content:
				product?.description || `Check out ${product?.name} on Very Cool App`,
		},
		{
			property: "og:type",
			content: "product",
		},
		{
			property: "og:image",
			content: product?.imageUrl,
		},
		{
			name: "keywords",
			content: `${product?.name}, product, shop, electronics`,
		},
	];
};

export default function ProductShow() {
	const data = useLoaderData<LoaderData>();
	const params = useParams();
	const { product } = data;

	if (data.notFound || !data.product) {
		return <NotFound slug={params.slug as string} />;
	}
	return (
		<div className="py-8 container mx-auto">
			<div className="">
				<div className="mx-auto">
					<div>
						<div className="lg:flex">
							<div className="lg:w-1/2">
								<If condition={!!product?.imageUrl}>
									<Then>
										<img
											src={product?.imageUrl || ""}
											alt={product?.name}
											className="w-full h-96 lg:h-full object-cover"
										/>
									</Then>
									<Then>
										<div className="w-full h-96 lg:h-full bg-gray-200 flex items-center justify-center">
											<span className="text-gray-400">No Image</span>
										</div>
									</Then>
								</If>
							</div>
							<div className="lg:w-1/2 p-8">
								<NavLink className="flex justify-start items-center gap-x-2 mb-4 bg-slate-50 hover:bg-slate-100 rounded-sm w-max px-2" to={NAVIGATE.ROOT}>
									<ArrowLeft className="w-5 h-5"/>
									<span>Back</span>
								</NavLink>
								<div className="mb-4">
									<span className="text-sm text-gray-500">
										ID: {params.slug}
									</span>
								</div>
								<h1 className="text-3xl font-bold text-gray-900 mb-4">
									{product?.name}
								</h1>
								<p className="text-gray-600 mb-6 leading-relaxed">
									{product?.description || "No description available."}
								</p>
								<div className="mb-4">
									<span className="text-3xl font-bold text-green-600">
										$
										{typeof product?.price === "number"
											? `$${product?.price}`
											: product?.price || "Price not available"}
									</span>
								</div>
								<div className="mb-4">
									Stock: {product?.stockQuantity || "0"}
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
									<Button
										type="button"
										className="bg-orange-500 hover:bg-orange-600 w-full"
									>
										Add to Cart
									</Button>
									<Button
										type="button"
										variant="outline"
										className="border-orange-500 w-full"
									>
										Chat Now
									</Button>
								</div>
								<div className="mt-8 pt-8 border-t border-gray-200">
									<h3 className="font-semibold text-gray-900 mb-4">Detail</h3>
									<ul className="space-y-2 text-sm text-gray-600">
										<li className="flex space-x-2">
											<Check className="w-4 h-4" />
											<span>
												Minimun Order : {product?.minimumOrderQuantity || "0"}
											</span>
										</li>
										<li className="flex space-x-2">
											<Check className="w-4 h-4" />
											<span>1-year warranty included</span>
										</li>
										<li className="flex space-x-2">
											<Check className="w-4 h-4" />
											<span>24/7 customer support</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
