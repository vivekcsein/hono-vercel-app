import { envAppConfig } from "@/packages/env/app.env";
import app from "../index";

const port = envAppConfig.APP_PORT;

console.log(`🚀 http://localhost:${port}`);

export default {
	port,
	fetch: app.fetch,
};
