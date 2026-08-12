import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-touch-icon.png"],
      manifest: {
        name: "Blick — Monitoramento de Plantação",
        short_name: "Blick",
        description: "Dashboard de monitoramento de saúde da plantação de milho via visão computacional.",
        lang: "pt-BR",
        theme_color: "#16191C",
        background_color: "#16191C",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        globIgnores: ["icon.png"],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});