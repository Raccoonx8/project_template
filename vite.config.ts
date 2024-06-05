import react from "@vitejs/plugin-react";
import path from "path";
import { env } from "process";
import { ProxyOptions } from "vite";
import { coverageConfigDefaults, defineConfig } from "vitest/config";
import packageJSON from "./package.json";

const BACKEND_URL = packageJSON.proxy;
const api = ["/api"];
const proxy: Record<string, string | ProxyOptions> | undefined = {};
api.forEach((item) => {
    proxy[item] = {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) =>
            !env.BACKEND_HOST ? path.replace(/^\/api/, "") : path,
    };
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        proxy,
    },
    resolve: {
        alias: {
            "~/core": path.resolve(__dirname, "src/logic/core"),
            "~/domains": path.resolve(__dirname, "src/logic/domains"),
            "~/elements": path.resolve(__dirname, "src/ui/elements"),
            "~/templates": path.resolve(__dirname, "src/ui/templates"),
            "~/widgets": path.resolve(__dirname, "src/ui/widgets"),
            "~/hoc": path.resolve(__dirname, "src/ui/hoc"),
            "~/sections": path.resolve(__dirname, "src/ui/sections"),
            "~/pages": path.resolve(__dirname, "src/ui/pages"),
            "~/utils": path.resolve(__dirname, "src/utils"),
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: ["src/utils/tests/vitest_setup.ts"],
        coverage: {
            include: ["**/src/ui/**/*", "**/src/logic/**/*"],
            exclude: [
                "**/src/**/index.ts",
                "**/src/**/*.stories.tsx",
                "*/src/ui/app/main.tsx",
                ...coverageConfigDefaults.exclude,
            ],
        },
    },
});
