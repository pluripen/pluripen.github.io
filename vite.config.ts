import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  // Use relative paths so the build works on GitHub Pages subpaths
  // (e.g. https://<user>.github.io/<repo>/) without extra config.
  base: './',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/**/*',
          dest: 'assets',
        },
      ],
    }),
  ],
})

