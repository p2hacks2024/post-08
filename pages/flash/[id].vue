<template>
  <div class="bg">
    <div
      class="min-h-screen flex flex-col items-center justify-center pb-[20vh]"
    >
      <h1 class="text-4xl font-extrabold text-amber-500">願いは叶った？</h1>
      <h2 class="text-2xl font-semibold text-white mt-6">叶った願いを星にしよう！</h2>
      <div class="mt-2">
        <img
          :src="`https://pub-0afe10dfcf4442e4a38f75c617de9147.r2.dev/canvas_image_${imageID}.png`"
          alt="短冊の画像"
          class="rounded-lg shadow-md bg-fuchsia-300 mt-2"
        />
      </div>
      <div v-if="user_status == 'none'" class="flex flex-row mt-4 text-white text-lg">
        <p class="mr-2">現在のステータスは:</p>
        <p>{{ user_status }}</p>
        <p class="ml-2">です</p>
        <button
          class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          @click="changeStatus"
        >
          星にする
        </button>
      </div>
      <div v-else-if="user_status == 'flash'" class="flex flex-row mt-4 text-white text-lg">
        <p class="mr-2">現在のステータスは:</p>
        <p>{{ user_status }}</p>
        <p class="ml-2">です</p>
      </div>
      <p v-else class="mt-4 text-white text-lg">ステータスが読み取れませんでした。</p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useFirestore } from '~/composables/useFirestore';
import { useRoute } from 'vue-router';

const user_status = ref<string | undefined>(undefined);
let userID = ref<string | null>(null);

const route = useRoute();
const imageID = route.params.id;
console.log(imageID)

async function getUserData() {
  try {
    const data = await useFirestore().getUserData(userID.value);
    user_status.value = data?.status;
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
    alert('願いが星になりました！');
    await navigateTo('/top');
  } else {
    alert('星になる過程でエラーが起きました。');
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

<style>
.bg {
  background-image: url("@/assets/images/bg-hoshisen.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100%;
}
</style>