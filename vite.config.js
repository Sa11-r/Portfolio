import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base: the built site works from any GitHub Pages URL
  // (https://<user>.github.io/<repo-name>/), whatever the repository is called.
  base: './',
})
