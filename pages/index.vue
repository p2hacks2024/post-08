<template>
  <div class="bg">
  <div
    class="min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-4xl font-extrabold text-blue-600">POST-8へようこそ</h1>
    <p class="mt-4 text-gray-700 text-lg">
      これはNuxt.jsとTailwind CSSを使った簡単なホームページです。
    </p>
    <button
      class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      @click="handleButtonClick"
    >
      ボタンをクリック
    </button>
  </div>
  </div>
</template>

<style>
  .bg {
    background-image: url("@/assets/images/bg-hoshisen.png");
    background-size: cover; /* 画像をコンテナのサイズに合わせて拡大・縮小 */
    background-position: center center; /* 画像の位置を中央に設定 */
    background-repeat: no-repeat; /* 画像が繰り返し表示されないように設定 */
    height: 100%; 
  }
</style>

<script setup>
const handleButtonClick = () => {
  alert("POST-8にようこそ");
};
</script>


