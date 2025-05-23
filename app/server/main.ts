import { createHonoServer } from "react-router-hono-server/bun";
import { HonoApp } from "./pkg/hono";

export default await createHonoServer({
  app: HonoApp(),
});