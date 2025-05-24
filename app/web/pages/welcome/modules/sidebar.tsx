import { Button } from "@/web/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/web/components/ui/drawer";
import { Filter, Shield, X } from "lucide-react";
import { Fragment, useState } from "react";

function FilterContent() {
	return (
		<div className="space-y-6">
			<div className="mb-6">
				<div className="flex items-center space-x-2 mb-2">
					<Shield className="w-4 h-4 text-yellow-500" />
					<span className="font-medium">Trade Assurance</span>
				</div>
				<p className="text-sm text-gray-600">
					Protects your orders on akpstore.itpohgero.com
				</p>
			</div>
			<div className="mb-6">
				<h4 className="font-medium mb-3">Supplier features</h4>
				<div className="flex items-center space-x-2">
					<Shield className="w-4 h-4 text-blue-500" />
					<span className="text-sm">Verified Supplier</span>
				</div>
			</div>
			<div className="mb-6">
				<h4 className="font-medium mb-3">Delivery by</h4>
				<p className="text-xs text-gray-500 mb-3">
					Unit price is subject to expected delivery date
				</p>
				<div className="space-y-2">
					<div>Delivery by Jun 10</div>
					<div>Delivery by Jun 16</div>
					<div>Delivery by Jun 22</div>
				</div>
			</div>
			<div className="mb-6">
				<h4 className="font-medium mb-3">Store reviews</h4>
				<p className="text-xs text-gray-500 mb-3">
					Based on a 5-star rating system
				</p>
				<div className="space-y-1">
					<div className="flex items-center space-x-2">
						<span>4.0 & up</span>
					</div>
					<div className="flex items-center space-x-2">
						<span>4.5 & up</span>
					</div>
					<div className="flex items-center space-x-2">
						<span>5.0</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Fragment>
			<div className="hidden lg:block bg-white p-4 rounded-lg shadow-sm">
				<h3 className="font-semibold text-lg mb-4">Filters</h3>
				<FilterContent />
			</div>
			<div className="lg:hidden">
				<Drawer open={isOpen} onOpenChange={setIsOpen}>
					<DrawerTrigger asChild>
						<Button
							variant="outline"
							className="w-full mb-4 flex items-center justify-center space-x-2"
						>
							<Filter className="w-4 h-4" />
							<span>Filters</span>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="max-h-[80vh]">
						<DrawerHeader className="text-left">
							<DrawerTitle className="flex items-center justify-between">
								<span>Filters</span>
								<DrawerClose asChild>
									<Button variant="ghost" size="sm">
										<X className="w-4 h-4" />
									</Button>
								</DrawerClose>
							</DrawerTitle>
							<DrawerDescription>
								Filter products to find exactly what you're looking for
							</DrawerDescription>
						</DrawerHeader>

						<div className="px-4 pb-4 overflow-y-auto">
							<FilterContent />
						</div>

						<DrawerFooter className="pt-2">
							<div className="flex space-x-2">
								<Button className="flex-1">Apply Filters</Button>
								<Button variant="outline" className="flex-1">
									Clear All
								</Button>
							</div>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</Fragment>
	);
}
