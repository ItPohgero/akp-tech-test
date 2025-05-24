import type { MenuType } from "@/web/types/public-menu.type";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { If, Then } from "react-if";
import { NavLink, useNavigate } from "react-router";
import List from "./list";

interface DropdownMenuProps {
	title: string;
	data: MenuType["data"];
	footer?: MenuType["footer"];
	isOpen: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

const dropdownVariants = {
	hidden: {
		opacity: 0,
		y: -20,
		scaleY: 0.8,
		transformOrigin: "top",
	},
	visible: {
		opacity: 1,
		y: 0,
		scaleY: 1,
		transformOrigin: "top",
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1],
			staggerChildren: 0.05,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scaleY: 0.8,
		transformOrigin: "top",
		transition: {
			duration: 0.2,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		x: -20,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const chevronVariants = {
	closed: { rotate: 0 },
	open: { rotate: 180 },
};

export function DropdownMenu({
	title,
	data,
	footer,
	isOpen,
	onMouseEnter,
	onMouseLeave,
}: DropdownMenuProps) {
	const navigate = useNavigate();
	return (
		<div className="" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<motion.button
				type="button"
				className={`flex items-center space-x-1 text-left py-2 px-3 rounded-md transition-all duration-200 ${
					isOpen ? "bg-gray-100 text-orange-600" : "hover:bg-gray-50"
				}`}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<span className="text-sm font-medium">{title}</span>
				<motion.div
					variants={chevronVariants}
					animate={isOpen ? "open" : "closed"}
					transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
				>
					<ChevronDown className="w-3 h-3" />
				</motion.div>
			</motion.button>

			<AnimatePresence>
				<If condition={isOpen}>
					<Then>
						<motion.div
							variants={dropdownVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="absolute top-full left-0 right-0 w-screen bg-white  shadow-xl z-50"
							style={{
								marginLeft: "calc(-50vw + 50%)",
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							}}
						>
							<List
								data={data}
								render={(item) => (
									<motion.div className="container mx-auto px-6 py-8">
										<motion.div variants={itemVariants} className="mb-6">
											<div className="flex items-center space-x-3 mb-2">
												<h2 className="text-xl font-bold text-gray-900">
													{item.name}
												</h2>
											</div>
											<p className="text-gray-600 text-sm">
												{item.description}
											</p>
										</motion.div>

										<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
											<List
												data={item.subcategories}
												render={(subcategory) => (
													<NavLink to={subcategory.link}>
														<motion.div
															key={subcategory?.toString()}
															variants={itemVariants}
															className="flex flex-col items-center text-center"
														>
															<span className="text-sm font-medium text-gray-800">
																{subcategory.label}
															</span>
														</motion.div>
													</NavLink>
												)}
											/>
										</div>

										<If condition={!!footer}>
											<Then>
												<motion.div
													variants={itemVariants}
													className="mt-8 pt-6 border-t border-gray-100"
												>
													<div className="flex items-center justify-between">
														<div>
															<h3 className="font-semibold text-gray-900 text-sm">
																{footer?.title}
															</h3>
															<p className="text-xs text-gray-500 mt-1">
																{footer?.description}
															</p>
														</div>
														<motion.button
															onClick={() =>
																navigate(footer?.viewAllLink || "")
															}
															className="text-sm text-orange-600 hover:text-orange-700 font-medium"
															whileHover={{ scale: 1.05, x: 5 }}
															transition={{ duration: 0.2 }}
														>
															{footer?.viewAllLink}
														</motion.button>
													</div>
												</motion.div>
											</Then>
										</If>
									</motion.div>
								)}
							/>
						</motion.div>
					</Then>
				</If>
			</AnimatePresence>
		</div>
	);
}
