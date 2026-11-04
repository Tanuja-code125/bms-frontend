import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // This configures Tailwind automatically without needing an init command
  ],
})
