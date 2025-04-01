import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve:{
    alias:{
      "@assets": path.resolve(__dirname,"/src/assets"),
      "@components": path.resolve(__dirname,"/src/components"),
      "@styles": path.resolve(__dirname,"src/styles"),
      "@screens": path.resolve(__dirname,"src/screens"),
      "@constants": path.resolve(__dirname,"src/constants"),
    }
  }
})