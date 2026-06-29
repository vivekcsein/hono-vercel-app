import type { Hono } from "hono";

import { registerMiddlewares } from "./middlewares.bootstrap";
import { registerRoutes } from "./routes.bootstrap";

export const registerBootstrap = (app: Hono): void => {
	registerMiddlewares(app);
	registerRoutes(app);

	app.onError((error, c) => {
		return c.json(
			{
				success: false,
				message: error.message,
			},
			500,
		);
	});

	app.notFound((c) => {
		return c.json(
			{
				success: false,
				message: `Route "${c.req.path}" not found.`,
			},
			404,
		);
	});
};
