// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

function localImageAdmin() {
  const route = (path) => fileURLToPath(new URL(path, import.meta.url));

  return {
    name: 'dandelion-local-image-admin',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') {
          return;
        }

        injectRoute({
          pattern: '/_local/image-admin',
          entrypoint: route('./src/admin-disabled/image-admin.astro'),
        });

        for (const endpoint of [
          'intake-source',
          'list-sources',
          'publish-source',
          'process-source',
          'save',
          'select-source',
          'update-media',
          'save-apartment',
          'save-apartments',
          'save-seo-fields',
          'list-gallery-registry',
          'save-gallery-order',
        ]) {
          injectRoute({
            pattern: `/api/image-admin/${endpoint}`,
            entrypoint: route(`./src/admin-disabled/api/image-admin/${endpoint}.ts`),
          });
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  // [CHANGE 2026-04-17 20:47] Convert project to static-only Astro build
  // [CHANGE 2026-05-06 13:20] Switch static site base path from /ujsite/ to domain root.
  base: '/',
  site: 'https://dandelionhouse.hu',
  output: 'static',
  redirects: {
    '/dandelion-royal-homes': '/royal/',
  },
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [localImageAdmin()],
  // [CHANGE 2026-04-19] Avoid @ characters in generated asset filenames for hosting safety.
  vite: {
    resolve: {
      alias: {
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/asset-[hash][extname]',
          chunkFileNames: 'assets/chunk-[hash].js',
          entryFileNames: 'assets/entry-[hash].js',
        },
      },
    },
  },
});
