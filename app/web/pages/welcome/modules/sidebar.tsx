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
import { Filter, X } from "lucide-react";
import { Fragment, useState } from "react";
import FilterContent from "./filter-content";

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
