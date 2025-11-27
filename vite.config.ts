import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'beto',
            fileName: 'beto',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
});
