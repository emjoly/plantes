import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/plantes/' : '',
  optimizeDeps: {
    include: ['three'],
  },
});
