import path from "node:path";

import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
	mode: isProduction ? "production" : "development",

	target: "node",

	entry: {
		index: "./src/index.ts",
	},

	output: {
		path: path.resolve(process.cwd(), "dist"),
		filename: "[name].js",
		chunkFilename: "chunks/[name].[contenthash].js",
		clean: true,
		module: true,
		library: {
			type: "module",
		},
	},

	experiments: {
		outputModule: true,
	},

	resolve: {
		extensions: [".ts", ".js"],

		alias: {
			"@": path.resolve(process.cwd(), "src"),
			"@/types": path.resolve(process.cwd(), "src/types"),
			"@/packages": path.resolve(process.cwd(), "src/packages"),
			"~": path.resolve(process.cwd(), "tests"),
		},
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							target: "es2022",
							parser: {
								syntax: "typescript",
								decorators: false,
								dynamicImport: true,
							},
						},
					},
				},
				type: "javascript/auto",
			},
		],
	},

	plugins: [
		new TsCheckerRspackPlugin(),

		new rspack.DefinePlugin({
			__DEV__: JSON.stringify(!isProduction),
		}),
	],

	optimization: {
		minimize: false,

		usedExports: true,

		sideEffects: true,

		providedExports: true,

		concatenateModules: true,

		runtimeChunk: "single",

		splitChunks: {
			chunks: "async",

			minSize: 20000,

			maxAsyncRequests: 30,

			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "async",
					priority: 10,
				},

				common: {
					minChunks: 2,
					name: "common",
					chunks: "async",
					priority: 5,
				},
			},
		},
	},

	devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
});
