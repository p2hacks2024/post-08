// types/tailwindcss.d.ts
import '@nuxt/schema';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    tailwindcss?: {
      cssPath?: string;
      configPath?: string;
      exposeConfig?: {
        level?: number;
      };
      config?: Record<string, any>;
      viewer?: boolean;
    };
  }

  interface NuxtOptions {
    tailwindcss?: {
      cssPath?: string;
      configPath?: string;
      exposeConfig?: {
        level?: number;
      };
      config?: Record<string, any>;
      viewer?: boolean;
    };
  }
}
