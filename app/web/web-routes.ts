import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

const LAYOUT = {
	PUBLIC: "web/layouts/public-layout.tsx",
	PRIVATE: "web/layouts/private-layout.tsx",
};
const PAGES = {
	WELCOME: "web/pages/welcome/main.tsx",
	DASHBOARD: "web/pages/dashboard/main.tsx",
	AUTH: "web/pages/auth/main.tsx",
};

export const NAVIGATE = {
	AUTH: "auth",
	DASHBOARD: "dashboard",
};
export default [
	layout(LAYOUT.PUBLIC, [index(PAGES.WELCOME)]),
	route(NAVIGATE.AUTH, PAGES.AUTH),
	layout(LAYOUT.PRIVATE, [route(NAVIGATE.DASHBOARD, PAGES.DASHBOARD)]),
] satisfies RouteConfig;
