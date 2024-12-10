<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-4xl font-extrabold text-blue-600">Flashページへようこそ</h1>
    <p class="mt-4 text-gray-700 text-lg">
      このページは工事中です。
    </p>
    <button
      class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      @click="handleButtonClick"
    >
      ボタンをクリック
    </button>
  </div>
</template>

<script setup lang='ts'>
//import { ref } from 'vue';
import { useFirestore } from '~/composables/useFirestore';

async function handleButtonClick() {
  const data = await useFirestore().getUserData('testuser001');
  if (data) {
    console.log(data);
  } else {
    console.log('error');
  }
}
</script>