// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    script: [{ src: "https://js.stripe.com/v3/", defer: true }],
  },
  css: ["vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@pinia/nuxt"],
  pages: true,
  render: {
    csp: {
      hashAlgorithm: "sha256",
      policies: {
        "default-src": ["'self'"],
        "script-src": [
          "'self'",
          "https://js.stripe.com",
          "'unsafe-inline'", // This line is necessary to allow Stripe.js to execute inline scripts
        ],
        "connect-src": ["'self'", "https://api.stripe.com"],
        "img-src": ["'self'", "https://*.stripe.com"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "object-src": ["'none'"],
        "font-src": ["'self'", "https:"],
        "frame-src": ["'self'", "https://js.stripe.com"],
        "worker-src": ["'self'", "blob:"],
      },
    },
  },
});
