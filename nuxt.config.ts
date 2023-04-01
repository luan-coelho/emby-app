export default defineNuxtConfig({
  css: [
    'normalize.css/normalize.css',
    'primevue/resources/themes/soho-dark/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '/global.css'
  ],
  build: {
    transpile: ['primevue']
  }
});
