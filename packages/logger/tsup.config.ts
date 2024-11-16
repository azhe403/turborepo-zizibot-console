import {defineConfig, type Options} from "tsup";

export default defineConfig((options: Options) => ({
    entry: [
        "src/**/*.ts",
    ],
    clean: true,
    dts: true,
    format: ["cjs"],
    ...options,
}));