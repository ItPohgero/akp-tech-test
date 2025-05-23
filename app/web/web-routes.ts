import { type RouteConfig, index, layout } from "@react-router/dev/routes";

const LAYOUT = {
	PUBLIC: "web/layouts/public-layout.tsx",
};
const PAGES = {
	WELCOME: "web/pages/welcome/main.tsx",
};
export default [
	layout(LAYOUT.PUBLIC, [index(PAGES.WELCOME)]),
] satisfies RouteConfig;
