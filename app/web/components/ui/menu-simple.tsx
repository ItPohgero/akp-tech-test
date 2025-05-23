import { motion } from "framer-motion";
import { NavLink } from "react-router";

interface SimpleMenuItemProps {
	children: React.ReactNode;
	href: string;
}

export function SimpleMenuItem({ children, href }: SimpleMenuItemProps) {
	return (
		<NavLink to={href}>
			<motion.div
				className="text-sm font-medium hover:text-orange-600 py-2 px-3 rounded-md hover:bg-gray-50 transition-all duration-200 block"
				whileHover={{
					scale: 1.02,
					backgroundColor: "rgb(249 250 251)",
					color: "rgb(234 88 12)",
				}}
				whileTap={{ scale: 0.98 }}
				transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
			>
				{children}
			</motion.div>
		</NavLink>
	);
}
