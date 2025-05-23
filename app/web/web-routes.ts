import { type RouteConfig, index } from "@react-router/dev/routes";

const PAGES = {
    WELCOME: "web/pages/welcome/main.tsx",
}
export default [
    index(PAGES.WELCOME),

] satisfies RouteConfig;
