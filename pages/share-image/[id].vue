<template>
  <div class="bg">
    <div
    class="min-h-screen flex flex-col items-center justify-center pb-[20vh]"
    >
      <div class="mt-2">
        <div class="text-white text-3xl text-center font-semibold">君の願いをXで共有しよう！</div>
        <img
          :src="`https://pub-0afe10dfcf4442e4a38f75c617de9147.r2.dev/canvas_image_${imageID}.png`"
          alt="短冊の画像"
          class="rounded-lg shadow-md bg-fuchsia-300 mt-4"
        />
      </div>
      <div class="mt-6">
        <button
          class="px-6 py-2 bg-blue-700 text-white rounded-3xl shadow-md hover:bg-blue-600"
          @click="share"
        >
          X(Twitter)で共有する
        </button>
      </div>
      <div class="mt-6">
        <RouterLink
          to="/top"
          class="px-6 py-2 bg-amber-400 text-white rounded-3xl shadow-md hover:bg-amber-500"
        >
          トップページに戻る
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
//import { imageDefaultValues } from 'fabric/dist/src/shapes/Image';
import { useRoute } from 'vue-router';

const route = useRoute();
const imageID = route.params.id;
console.log(imageID)

const share = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("私はこの願い事をしました！叶うといいなぁ…");
  const imageElement = document.querySelector('img');
  const image = imageElement ? encodeURIComponent(imageElement.src) : '';
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

  window.open(shareUrl, '_blank');
};

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