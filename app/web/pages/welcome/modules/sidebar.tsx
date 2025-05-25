import { Button } from "@/web/components/ui/button";
import { Card, CardContent } from "@/web/components/ui/card";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/web/components/ui/drawer";
import { usePublicLayout } from "@/web/context/public-layout.context";
import { X } from "lucide-react";
import { Fragment } from "react";
import FilterContent from "./filter-content";

export default function Sidebar() {
	const { filter, toggleFilter } = usePublicLayout();
	return (
		<Fragment>
			<Card className="hidden lg:block">
				<CardContent>
					<h3 className="font-semibold text-lg mb-4">Filters</h3>
					<FilterContent />
				</CardContent>
			</Card>
			<div className="lg:hidden">
				<Drawer open={filter} onOpenChange={toggleFilter}>
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
