import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite Configuration for Promptineer Chrome Extension
 * 
 * This config handles:
 * - Multiple entry points (popup, options, background worker)
 * - React with Fast Refresh for HMR
 * - Chrome Extension Manifest V3
 * - Environment variables
 * - Code splitting and optimization
 * - Development and production builds
 */

export default defineConfig(() => {
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = !isDev;

  return {
    /**
     * Project root directory and base path
     */
    root: process.cwd(),
    base: isDev ? '/' : '/',

    /**
     * Plugins configuration
     */
    plugins: [
      /**
       * React plugin with Fast Refresh (HMR)
       * Enables hot module replacement during development
       */
      react({
        fastRefresh: isDev,
        jsxRuntime: 'automatic',
      }),
    ],

    /**
     * Alias configuration for cleaner imports
     */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@styles': path.resolve(__dirname, 'src/styles'),
      },
    },

    /**
     * Server configuration for development
     */
    server: {
      port: 5173,
      strictPort: false,
      host: 'localhost',
      hmr: {
        host: 'localhost',
        port: 5173,
      },
      /**
       * Disable CORS warnings in extension development
       */
      middlewareMode: false,
    },

    /**
     * Build configuration
     */
    build: {
      /**
       * Output directory for built extension
       */
      outDir: 'dist',

      /**
       * Empty output directory before build
       */
      emptyOutDir: true,

      /**
       * Rollup options for build optimization
       */
      rollupOptions: {
        input: {
          popup: path.resolve(__dirname, 'public/popup.html'),
          options: path.resolve(__dirname, 'public/options.html'),
        },
        output: {
          /**
           * Code splitting strategy
           */
          manualChunks: {
            // Vendor chunks to optimize loading
            'react-vendor': ['react', 'react-dom'],
            'state-vendor': ['zustand'],
            'http-vendor': ['axios'],
          },
        },
      },

      /**
       * Minification for production
       */
      minify: isProd ? 'esbuild' : false,

      /**
       * Terser minification options (commented - using esbuild instead)
       */
      // terserOptions: {
      //   compress: {
      //     drop_console: isProd,
      //   },
      // },

      /**
       * Source maps for debugging
       */
      sourcemap: isDev ? 'inline' : false,

      /**
       * CSS code splitting
       */
      cssCodeSplit: true,

      /**
       * Report compressed size
       */
      reportCompressedSize: true,

      /**
       * Chunk size warning limit (in KB)
       */
      chunkSizeWarningLimit: 500,

      /**
       * Test configuration
       */
      lib: false,
    },

    /**
     * Environment variables configuration
     */
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VITE_API_BASE_URL': JSON.stringify(
        process.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
      ),
      'process.env.VITE_ENV': JSON.stringify(process.env.VITE_ENV || 'development'),
      'process.env.VITE_DEBUG': JSON.stringify(process.env.VITE_DEBUG || 'false'),
    },

    /**
     * CSS configuration
     */
    css: {
      /**
       * PostCSS configuration is handled in postcss.config.cjs
       */

      /**
       * CSS preprocessor options
       */
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.css";`,
        },
      },
    },

    /**
     * Optimization configuration
     */
    optimize: {
      /**
       * Dependency pre-bundling for development speed
       */
      include: ['react', 'react-dom', 'zustand', 'axios'],
    },

    /**
     * Logging level
     */
    logLevel: isDev ? 'info' : 'warn',
  };
});
