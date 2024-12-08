<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center"
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
</template>

<script setup>
const handleButtonClick = () => {
  alert("POST-8にようこそ");
};
</script>
