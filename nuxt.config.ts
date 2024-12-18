// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages"
  },

  modules: ["nitro-cloudflare-dev", '@nuxtjs/tailwindcss','nuxt-og-image'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },

  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      HOSHISEN_TOKEN_KEY: process.env.HOSHISEN_TOKEN_KEY,
      HOSHISEN_ACCESS_KEY: process.env.HOSHISEN_ACCESS_KEY,
      HOSHISEN_SECRET_ACCESS_KEY: process.env.HOSHISEN_SECRET_ACCESS_KEY,
      HOSHISEN_ENDPOINT: process.env.HOSHISEN_ENDPOINT,
    },
  },

  typescript: {
    strict: true
  },

  ssr: true,

  plugins: ['~/plugins/firebase.client'],

  vite: {
    server: {
      proxy: {
        '/__/auth/': {
          target: 'https://p2hacks2024-post-8.firebaseapp.com', // 転送先のURL, ユーザー認証をリダイレクトに変更したため必要
          changeOrigin: true, // CORSヘッダーをターゲットのものに変更
          rewrite: (path) => path.replace(/^\/__\/auth\//, '/__/auth/'), // パスの調整（この場合、実質不要）
        },
      },
    },
  },

  app: {
    baseURL: '/'
  },

})