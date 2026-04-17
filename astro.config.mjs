// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // [CHANGE 2026-04-17 20:47] Convert project to static-only Astro build
  // [CHANGE 2026-04-17 21:06] Set base path for /ujsite/ static deploy
  base: '/ujsite/',
  output: 'static',
});
