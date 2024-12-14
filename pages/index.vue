<template>
  <div class="bg">
  <div
    class="min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-7xl text-white font-black m-10">星閃</h1>
    <div class="text-amber-400 text-lg">ログインしていない方はこちら</div>
    <button
      class="mt-2 mb-6 px-6 py-2 bg-orange-400 text-white rounded-full shadow-md hover:bg-yellow-400"
      @click="signin"
    >
      Xのアカウントを連携して始める
    </button>
    <div class="text-amber-400 text-lg">ログイン済みの方はこちら</div>
    <button
      class="mt-2 px-6 py-2 bg-orange-400 text-white rounded-full shadow-md hover:bg-yellow-400"
      @click="handleButtonClick"
    >
      トップページに移動する
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

<script setup lang='ts'>
// import firebaseApp from '@/src/main.js'
import { getAuth, signInWithRedirect, getRedirectResult, TwitterAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'top', // これがTOPページのルート名
    component: () => import('@/pages/top.vue'), // ルートに対応するコンポーネント
  },
  // その他のルート
];

async function signin() {
  const provider = new TwitterAuthProvider();
  const auth = getAuth();

  try {
    // Twitterでのリダイレクトログインを開始
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("リダイレクトログインエラー:", error);
  }
}

async function handleButtonClick() {
  await navigateTo('/top')
}

</script>