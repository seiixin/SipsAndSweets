import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from 'tailwindcss'; // ok ito!
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            '@src': '/src', // Define @ as an alias for src
            '@assets': '/attached_assets'
        }
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8000',
        }
    }
});

