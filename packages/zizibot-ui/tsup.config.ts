import {defineConfig, type Options} from "tsup";

export default defineConfig((options: Options) => ({
    entry: ["./src/**/*.tsx"],
    format: ["cjs", "esm"],
    external: ["react"],
    banner: {
        js: "'use client'",
    },
    ...options,
}));
