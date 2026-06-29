import type { Hono } from "hono";

export const registerRoutes = (app: Hono): void => {
	app.get("/", (c) => {
		return c.json({
			success: true,
			message: "Hono Backend Starter",
			version: "0.1.0",
		});
	});

	app.get("/health", (c) => {
		return c.json({
			success: true,
			status: "ok",
		});
	});
};
