<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-4xl font-extrabold text-blue-600">ログインページ</h1>
    <p class="mt-4 text-gray-700 text-lg m-4">
      X(Twitter)アカウントでログインすると、このアプリがもっと楽しくなります！
    </p>
    <div v-if="login_status===true" class="text-lg text-gray-700 mt-2">
      ログイン中です
    </div>
    <div v-else class="text-lg text-gray-700">
      <button
        class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        @click="signin"
      >
        X(Twitter)でログイン
      </button>
    </div>
  </div>
</template>

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
          localStorage.setItem('uid', user?.uid)
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

async function checkLoginStatus() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
}

onMounted(async () => {
  await checkLoginStatus();
})

</script>
