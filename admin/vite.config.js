import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5000, // قم بتغيير المنفذ إلى الرقم الذي تريده
    },
    plugins: [
        tailwindcss(),
        react()
    ],
})