import { Hono } from "hono";

import { registerMiddlewares } from "@/packages/bootstrap/middlewares.bootstrap";
import { registerRoutes } from "@/packages/bootstrap/routes.bootstrap";

const app = new Hono();

// Register global middleware
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

// Not Found handler
app.notFound((c) => {
	return c.json(
		{
			success: false,
			message: `Route "${c.req.path}" not found.`,
		},
		404,
	);
});

export default app;
