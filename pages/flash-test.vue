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
      @click="changeStatus"
    >
      ボタンをクリック
    </button>
    <div v-if="user_status" class="flex flex-row mt-4 text-gray-700 text-lg">
      <p class="mr-2">現在のステータスは:</p>
      <p>{{ user_status }}</p>
      <p class="ml-2">です</p>
    </div>
    <p v-else class="mt-4 text-gray-700 text-lg">ステータスが読み取れませんでした。</p>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useFirestore } from '~/composables/useFirestore';

const user_status = ref<string | undefined>(undefined);
let userID = ref<string | null>(null);

async function getUserData() {
  try {
    const data = await useFirestore().getUserData(userID.value);
    user_status.value = data?.status;
    console.log(data?.imageID)
    console.log('status: ', user_status.value)
    return user_status;
  } catch(e){
    console.error(e);
    alert('ユーザー情報の取得に失敗しました。');
  }
}

async function changeStatus() {
  let data = await useFirestore().setStatusData(userID.value);
  if(data != null){
    console.log(userID)
    console.log('Status is changed.');
    alert('ステータスが変更されました。');
  } else {
    alert('ステータスの変更に失敗しました。');
  }
}

async function getUserID() {
  userID.value = localStorage.getItem('uuid')
  console.log(userID)
}

onMounted(async () => {
  await getUserID();
  await getUserData();
})

</script>