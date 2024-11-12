/// <reference types="vitest" />
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    test: {
        maxWorkers: 1,
        minWorkers: 1,
        coverage: {
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.type.ts", "src/**/*.types.ts"],
            reporter: ["text", "json", "html", "lcov"],
            provider: "v8"
        },
        testTimeout: 40000,
        hookTimeout: 20000,
        mockReset: false,
        clearMocks: false
    },
    plugins: [tsconfigPaths()]
});