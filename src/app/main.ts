import type { Hono } from "hono";
import { registerBootstrap } from "../packages/bootstrap/app.bootstrap";

export const registerApp = (app: Hono): void => {
	registerBootstrap(app);
};
