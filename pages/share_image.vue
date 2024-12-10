<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center"
  >
    <div class="mt-6">
      <img
        src="https://via.placeholder.com/150"
        alt="ランダムな画像"
        class="rounded-lg shadow-md"
      />
    </div>
    <div class="mt-6">
      <button
        class="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        @click="share"
      >
        Xで共有する
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const share = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("私はこの願い事をしました！叶うといいなぁ…");
  const imageElement = document.querySelector('img');
  const image = imageElement ? encodeURIComponent(imageElement.src) : '';
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

  window.open(shareUrl, '_blank');
};
</script>
