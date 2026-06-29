import type { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";

export const registerMiddlewares = (app: Hono): void => {
	app.use("*", requestId());

	app.use("*", logger());

	app.use("*", secureHeaders());

	app.use(
		"*",
		cors({
			origin: "*",
			credentials: true,
			allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
		}),
	);
};
