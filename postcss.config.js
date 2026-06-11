/**
 * PostCSS Configuration for Promptineer Extension
 * 
 * PostCSS is a JavaScript tool that transforms CSS using plugins
 * This configuration enables:
 * - Tailwind CSS framework
 * - Autoprefixer for vendor prefixes
 */

module.exports = {
  plugins: {
    /**
     * Tailwind CSS
     * Utility-first CSS framework for rapid UI development
     * https://tailwindcss.com/
     */
    tailwindcss: {},

    /**
     * Autoprefixer
     * Adds vendor prefixes to CSS rules for browser compatibility
     * https://github.com/postcss/autoprefixer
     */
    autoprefixer: {},
  },
};
