import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**'],     // Entry file for your package
    format: ['cjs', 'esm'],      // Output both CommonJS and ESModules formats
    dts: true,                  // Generate TypeScript declaration files (*.d.ts)
    sourcemap: true,            // Include source maps for easier debugging
    clean: true,                // Clean the output folder before each build
    splitting: false,           // Disable code splitting (good for libraries)
    minify: false,              // Optional: turn on minification if needed
    target: 'es2020',           // Output JS target version (adjust if needed)
});

