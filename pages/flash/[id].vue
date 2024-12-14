<template>
  <div class="bg">
    <!-- GIF再生中のオーバーレイ -->
    <div
      v-if="showGIF"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <!-- 全画面GIF -->
      <img
        src="@/assets/images/flash.gif"
        alt="Flash Animation"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- メインコンテンツ -->
    <div
      class="min-h-screen flex flex-col items-center justify-center pb-[20vh]"
    >
      <h1 class="text-4xl font-extrabold text-white">願いは叶った？</h1>
      <h2 class="text-2xl font-semibold text-white mt-6">
        叶った願いを星にしよう
      </h2>
      <div class="mt-2">
        <img
          :src="`https://pub-0afe10dfcf4442e4a38f75c617de9147.r2.dev/canvas_image_${imageID}.png`"
          alt="短冊の画像"
          class="rounded-lg shadow-md bg-[#ffb1c6] mt-2"
        />
      </div>

      <div
        v-if="user_status == 'none'"
        class="flex flex-col items-center mt-4 text-white text-xs"
      >
        <p>この願いはまだ星になっていません。</p>
        <button
          class="mt-6 px-6 py-2 bg-blue-800 text-white rounded-[35px] shadow-md hover:bg-blue-800"
          @click="handleFlash"
        >
          FLASH！で願いを星に
        </button>
      </div>

      <div
        v-else-if="user_status == 'flash'"
        class="flex flex-col items-center mt-4 text-white text-xs"
      >
        <p>この願いはもう星になっています。</p>
      </div>

      <p v-else class="mt-4 text-white text-lg">
        ステータスが読み取れませんでした。
      </p>

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

<script setup lang="ts">
import { ref } from 'vue';
import { useFirestore } from '~/composables/useFirestore';
import { useRoute } from 'vue-router';

const user_status = ref<string | undefined>(undefined);
const showGIF = ref(false); // GIF表示の状態管理
let userID = ref<string | null>(null);

const route = useRoute();
const imageID = route.params.id;
console.log(imageID);

async function getUserData() {
  try {
    const data = await useFirestore().getUserData(userID.value);
    user_status.value = data?.status;
    console.log('status: ', user_status.value);
    return user_status;
  } catch (e) {
    console.error(e);
    alert('ユーザー情報の取得に失敗しました。');
  }
}

async function changeStatus() {
  const data = await useFirestore().setStatusData(userID.value);
  if (data != null) {
    console.log('Status is changed.');
    alert('願いが星になりました！');
    await navigateTo('/top');
  } else {
    alert('星になる過程でエラーが起きました。');
  }
}

async function getUserID() {
  userID.value = localStorage.getItem('uuid');
  console.log(userID.value);
}

// FLASHボタンのクリック処理
async function handleFlash() {
  showGIF.value = true; // GIFを表示

  // 一定時間待機するPromise関数を作成（ms: number型）
  const wait = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // 3秒待機
  await wait(3000);

  showGIF.value = false; // GIFを非表示
  await changeStatus(); // 状態更新
}

onMounted(async () => {
  await getUserID();
  await getUserData();
});
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
