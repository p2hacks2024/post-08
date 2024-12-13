<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  borderColor?: string
}>(), {
})
</script>

<template>
  <!-- 背景画像を設定したいコンテナ -->
  <div :class="[`border-${borderColor}`, 'bg-og']" class="min-h-screen relative items-start justify-start border-solid border-[12px]">
    <div class="flex items-start justify-start h-full w-full">
      <div class="flex flex-col justify-between w-full h-full">
        <h1 class=" text-white text-[80px] p-20 font-black text-left">
          {{ title }}
        </h1>
        <p class="text-white text-2xl pb-10 px-20 font-bold mb-0">
          hoshisen.com
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* OGP用の背景画像設定 */
.bg-og {
  background-image: url('http://localhost:3000/_nuxt/assets/images/bg-hoshisen.png'); /* 画像のパス */
  background-size: 100% auto; /* 画像をコンテナに合わせて拡大 */
  background-repeat: no-repeat; /* 繰り返しなし */
}
</style>
