<template>
  <div class="bg">
  <div
    class="min-h-screen flex flex-col items-center justify-center"
  >
    <button
      class="mt-6 px-6 py-2 bg-orange-400 text-white rounded-full shadow-md hover:bg-yellow-400"
      @click="signin"
    >
      Xのアカウントを連携して始める
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
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useFirestore } from "~/composables/useFirestore";
import { ref } from "vue";

let login_status = ref<boolean>(false);

async function signin() {
  const provider = new TwitterAuthProvider();
  const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          console.log(`uuid: ${user?.uid}`);
          localStorage.setItem('uuid', user?.uid)
          login_status.value = true;
          alert('ログインに成功しました。')
        } else {
          alert('ログインに失敗しました。');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
}

</script>