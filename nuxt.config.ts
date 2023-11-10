// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // default behavior
	typescript: { shim: false },
	devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  tailwindcss: {
		viewer: false,
	},
  pinia: {},
	colorMode: {
		preference: 'dark',
	},
  css: ['~/assets/css/main.scss'],
  
})
