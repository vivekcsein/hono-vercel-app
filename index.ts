import { Hono } from "hono";

import { registerApp } from "./src/app/main";

const app = new Hono();

registerApp(app);

export default app;
