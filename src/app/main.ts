import { Hono } from "hono";

import { registerMiddlewares } from "@/packages/bootstrap/middlewares.bootstrap";
import { registerRoutes } from "@/packages/bootstrap/routes.bootstrap";

const createApp = (): Hono => {
	const app = new Hono();

	// Register application middleware
	registerMiddlewares(app);

	// Register application routes
	registerRoutes(app);

	// Global error handler
	app.onError((error, c) => {
		return c.json(
			{
				success: false,
				message: error.message,
			},
			500,
		);
	});

	// Not found handler
	app.notFound((c) => {
		return c.json(
			{
				success: false,
				message: `Route "${c.req.path}" not found.`,
			},
			404,
		);
	});

	return app;
};

export default createApp;
