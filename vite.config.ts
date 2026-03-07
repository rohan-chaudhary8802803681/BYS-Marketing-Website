import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    reportCompressedSize: false, // Disable to fix kbbrotliCompress: 101 on Windows
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          icons: ['lucide-react'],
          three: ['three'],
          animations: ['gsap', 'framer-motion'],
        },
      },
    },
  },
});
