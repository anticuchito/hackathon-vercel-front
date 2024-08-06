// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/vue-tailwind-datepicker.ts', '~/plugins/axiosClient.ts'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/globals.css'],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    'nuxt-headlessui',
    '@nuxt/icon',
    '@nuxtjs/leaflet',
    'nuxt-swiper'
  ],
  icon: {
    componentName: 'icon',
  },
});
