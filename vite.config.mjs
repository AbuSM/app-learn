import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss({
            config: {
                theme: {
                    extend: {
                        colors: {
                            "primary-dark": "#1C2434",
                        },
                    },
                },
            },
        }),
    ],
    server: {
        host: "0.0.0.0",
    },
});
