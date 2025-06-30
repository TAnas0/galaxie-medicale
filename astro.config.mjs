// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import icon from 'astro-icon';
import alpinejs from '@astrojs/alpinejs';
// import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://tanas0.github.io',
  // site: 'http://localhost:4321',
  base: '/galaxie-medicale',
  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [icon(), alpinejs()],
});