import { NAVIGATE } from "@/web/web-routes";
import { NavLink } from "react-router";

export default function Logo() {
	return (
		<NavLink to={NAVIGATE.ROOT}>
			<div className="text-orange-500 text-2xl font-bold">akpstore</div>
			<p className="text-[7pt] text-muted-foreground">itpohgero.com</p>
		</NavLink>
	);
}
