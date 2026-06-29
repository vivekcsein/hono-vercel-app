import createApp from "@/app/main";
import { envAppConfig as env } from "@/packages/env/app.env";

type AppInstance = ReturnType<typeof createApp>;

let app: AppInstance | null = null;
let bootstrapError: Error | null = null;
let bootstrapPromise: Promise<AppInstance> | null = null;

const jsonResponse = (body: Record<string, unknown>, status: number): Response => {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

const isDevelopment = (): boolean => {
	return env.NODE_ENV !== "production";
};

const log = {
	info(message: string): void {
		process.stdout.write(`[INFO] ${message}\n`);
	},

	error(message: string): void {
		process.stderr.write(`[ERROR] ${message}\n`);
	},
};

const bootstrap = async (): Promise<AppInstance> => {
	if (bootstrapPromise) {
		return bootstrapPromise;
	}

	bootstrapPromise = Promise.resolve()
		.then(() => {
			const hono = createApp();

			app = hono;

			log.info("Application bootstrapped successfully.");

			return hono;
		})
		.catch((error: unknown) => {
			bootstrapError = error instanceof Error ? error : new Error("Unknown bootstrap error.");

			log.error(bootstrapError.message);

			throw bootstrapError;
		})
		.finally(() => {
			bootstrapPromise = null;
		});

	return bootstrapPromise;
};

export default {
	async fetch(request: Request): Promise<Response> {
		if (app) {
			return app.fetch(request);
		}

		if (bootstrapError) {
			return jsonResponse(
				{
					success: false,
					message: "Application failed to initialize.",
					...(isDevelopment() && {
						error: bootstrapError.message,
					}),
				},
				503,
			);
		}

		try {
			const hono = await bootstrap();

			return hono.fetch(request);
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : "Unknown bootstrap error.";

			return jsonResponse(
				{
					success: false,
					message: "Application unavailable.",
					...(isDevelopment() && {
						error: message,
					}),
				},
				503,
			);
		}
	},
};
