import { Shield, Star } from "lucide-react";
import { Fragment } from "react";

type Props = {
	imageUrl: string;
	name: string;
	price: string;
};
export default function ProductCard(props: Props) {
	const { imageUrl, name, price } = props;
	return (
		<Fragment>
			<div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
				<div className="relative">
					<img
						src={imageUrl || "/api/placeholder/300/300"}
						alt={name}
						className="w-full h-48 object-cover"
					/>
					<button
						type="button"
						className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
					>
						<span className="text-gray-400">♡</span>
					</button>
				</div>
				<div className="p-4">
					<h3 className="font-medium text-sm mb-2 line-clamp-2">{name}</h3>
					<p className="text-orange-500 font-semibold mb-2">{price}</p>
					<div className="flex items-center justify-between text-xs text-gray-500">
						<span>MOQ: 1 piece</span>
						<div className="flex items-center space-x-1">
							<Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
							<span>4.5</span>
						</div>
					</div>
					<div className="mt-3 pt-3 border-t text-xs text-gray-500">
						<p>Professional Supplier</p>
						<div className="flex items-center space-x-2 mt-1">
							<Shield className="w-3 h-3 text-blue-500" />
							<span>Verified</span>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
