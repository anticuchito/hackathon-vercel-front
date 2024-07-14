// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/vue-tailwind-datepicker.ts'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/globals.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
});
