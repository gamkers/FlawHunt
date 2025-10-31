import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Using root path for custom domain
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
