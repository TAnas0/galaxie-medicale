// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import icon from 'astro-icon';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import Sonda from 'sonda/astro'; 
// import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://tanas0.github.io',
  // site: 'http://localhost:4321',
  base: '/galaxie-medicale',
  vite: {
      plugins: [tailwindcss()],
      build: {
        sourcemap: true
      }
  },
  integrations: [
    icon(),
    sentry(),
    react(),
    // spotlightjs(),
    // Sonda({server: true})
  ],
});
