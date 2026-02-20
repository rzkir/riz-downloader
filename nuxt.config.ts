import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001',
    },
  },
  app: {
    head: {
      title: 'DownTik.to - Download TikTok Video by Link!',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [
        {
          href: 'https://api.fontshare.com/v2/css?f[]=plus-jakarta-sans@400,500,600,700,800&display=swap',
          rel: 'stylesheet',
        },
      ],
      script: [
        {
          src: 'https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js',
          defer: true,
        },
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag === 'iconify-icon',
    },
  },
  vite: {
    plugins: [tailwindcss() as unknown as Plugin],
  },
})