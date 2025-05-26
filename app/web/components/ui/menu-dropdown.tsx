import type { MenuType } from "@/web/types/public-menu.type";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	ChevronDown,
	ChevronRight,
	Package,
	Sparkles,
	Star,
	TrendingUp,
	Zap,
} from "lucide-react";
import { If, Then } from "react-if";
import { NavLink } from "react-router";
import List from "./list";

interface DropdownMenuProps {
	title: string;
	data: MenuType["data"];
	footer?: MenuType["footer"];
	isOpen: boolean;
	onMouseEnter: () => void;
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
}: DropdownMenuProps) {
	const getIcon = (index: number) => {
		const icons = [Package, Zap, Star, TrendingUp, Sparkles];
		const Icon = icons[index % icons.length];
		return Icon;
	};

	const getGradient = (index: number) => {
		const gradients = [
			"from-blue-500 to-cyan-500",
			"from-purple-500 to-pink-500",
			"from-orange-500 to-red-500",
			"from-green-500 to-emerald-500",
			"from-indigo-500 to-purple-500",
			"from-pink-500 to-rose-500",
		];
		return gradients[index % gradients.length];
	};
	return (
		<div className="" onMouseEnter={onMouseEnter}>
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
								render={(item, index) => (
									<motion.div
										key={item.name}
										className="container mx-auto px-8 py-10"
									>
										<motion.div
											variants={itemVariants}
											className="mb-8 relative overflow-hidden"
										>
											<div
												className={`absolute inset-0 bg-gradient-to-r ${getGradient(index)} opacity-5 rounded-2xl`}
											/>
											<div className="relative p-6 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm">
												<div className="flex items-center space-x-4 mb-3">
													<div
														className={`w-12 h-12 bg-gradient-to-r ${getGradient(index)} rounded-xl flex items-center justify-center shadow-lg`}
													>
														{(() => {
															const Icon = getIcon(index);
															return <Icon className="w-6 h-6 text-white" />;
														})()}
													</div>
													<div className="flex-1">
														<h2 className="text-2xl font-bold text-gray-900 mb-1">
															{item.name}
														</h2>
														<p className="text-gray-600 text-sm leading-relaxed">
															{item.description}
														</p>
													</div>
													<div className="flex items-center space-x-2 text-orange-600">
														<TrendingUp className="w-5 h-5" />
														<span className="text-sm font-semibold">Hot</span>
													</div>
												</div>
											</div>
										</motion.div>

										<motion.div
											variants={itemVariants}
											className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8"
										>
											<List
												data={item.subcategories}
												render={(subcategory) => (
													<NavLink
														key={subcategory.label}
														to={subcategory.link}
														className="group"
													>
														<motion.div
															className="relative overflow-hidden bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 group-hover:border-orange-200 group-hover:-translate-y-1"
															whileHover={{ scale: 1.02 }}
															whileTap={{ scale: 0.98 }}
														>
															<div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

															<div className="relative z-10">
																<div className="flex items-center justify-between mb-2">
																	<div className="w-8 h-8 bg-gray-100 group-hover:bg-orange-100 rounded-lg flex items-center justify-center transition-colors duration-300">
																		<Package className="w-4 h-4 text-gray-600 group-hover:text-orange-600" />
																	</div>
																	<ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
																</div>
																<h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 leading-tight">
																	{subcategory.label}
																</h3>
																<div className="mt-2 flex items-center space-x-1">
																	<div className="flex -space-x-1">
																		{[...Array(3)].map((_, i) => (
																			<div
																				key={i?.toString()}
																				className="w-2 h-2 bg-orange-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
																				style={{
																					animationDelay: `${i * 0.1}s`,
																				}}
																			/>
																		))}
																	</div>
																	<span className="text-xs text-gray-500 group-hover:text-orange-600 font-medium">
																		{Math.floor(Math.random() * 1000) + 100}+
																		items
																	</span>
																</div>
															</div>
														</motion.div>
													</NavLink>
												)}
											/>
										</motion.div>

										<If condition={!!footer}>
											<Then>
												<motion.div
													variants={itemVariants}
													className="relative"
												>
													<div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl" />
													<div className="relative p-6 border border-gray-100 rounded-2xl bg-white/60 backdrop-blur-sm">
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-4">
																<div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
																	<Star className="w-5 h-5 text-white" />
																</div>
																<div>
																	<h3 className="font-bold text-gray-900 text-lg">
																		{footer?.title}
																	</h3>
																	<p className="text-sm text-gray-600 mt-1">
																		{footer?.description}
																	</p>
																</div>
															</div>
															<motion.button
																className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
																whileHover={{ scale: 1.05, x: 5 }}
																whileTap={{ scale: 0.95 }}
															>
																<span className="text-sm font-semibold">
																	View All
																</span>
																<ArrowRight className="w-4 h-4" />
															</motion.button>
														</div>
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
