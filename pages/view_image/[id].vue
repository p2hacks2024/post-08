<template>
  <div class="bg">
    <div
    class="min-h-screen flex flex-col items-center justify-center pb-[20vh]"
    >
      <div class="mt-2">
        <div class="text-amber-500 text-3xl text-center font-semibold">いつか星になる願いごとです</div>
        <img
          :src="`https://pub-0afe10dfcf4442e4a38f75c617de9147.r2.dev/canvas_image_${imageID}.png`"
          alt="短冊の画像"
          class="rounded-lg shadow-md bg-fuchsia-300 mt-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const imageID = route.params.id;
  console.log(imageID)
</script>

<style>
  .bg {
    background-image: url("@/assets/images/bg-hoshisen.png");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100%;
  }
  </style>