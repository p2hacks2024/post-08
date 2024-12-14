<template>
  <footer
    v-if="!isHiddenPage"
    class="absolute bottom-0 left-0 w-full bg-[#FFE4CF] text-white text-center flex items-center justify-center"
    style="height: 25vh;"
  >
    <div class="p-5 grid gap-10 grid-cols-2 items-center">
      <!-- 1つ目のボタン -->
      <button
        class="p-3 bg-white rounded-[35px] border-4 border-[#2898D7] overflow-hidden hover:bg-gray-200"
        style="width: 40vw; height: 20vh;"
        @click="toFlashPage"
      >
        <div class="flex justify-center items-start">
          <p class="text-gray-500 text-sm font-light">願い事を見返す</p>
        </div>
        <div class="flex justify-center items-center h-full">
          <img
            src="@/assets/images/view_icon.png"
            alt="view_icon"
            class="max-h-[70%] w-auto object-contain"
          />
        </div>
      </button>

      <!-- 2つ目のボタン -->
      <router-link
        to="/draw"
        class="p-3 bg-white rounded-[35px] border-4 border-[#ED4759] overflow-hidden hover:bg-gray-200"
        style="width: 40vw; height: 20vh;"
      >
        <div class="flex justify-center items-start">
          <p class="text-gray-500 text-sm font-light">願い事を書く</p>
        </div>
        <div class="flex justify-center items-center h-full">
          <img
            src="@/assets/images/writting_icon.png"
            alt="writting_icon"
            class="max-h-[70%] w-auto object-contain"
          />
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useFirestore } from '~/composables/useFirestore';

// 現在のルートを取得
const route = useRoute();

// フッターを非表示にしたいページを条件として指定
const isHiddenPage = computed(() => route.path === '/' || route.path === '/login');

const user_status = ref<string | undefined>(undefined);
let userID = ref<string | null>(null);
let imageID = ref<string | undefined>(undefined);

async function getUserData() {
  try {
    const data = await useFirestore().getUserData(userID.value);
    user_status.value = data?.status;
    imageID.value = data?.imageID
    console.log(imageID.value)
    //console.log('status: ', user_status.value)
    return user_status;
  } catch(e){
    console.error(e);
    alert('ユーザー情報の取得に失敗しました。');
  }
}

async function getUserID() {
  userID.value = localStorage.getItem('uuid')
  console.log(userID.value)
}

onMounted(async () => {
  await getUserID();
  await getUserData();
})

async function toFlashPage() {
  await navigateTo(`/flash/${imageID.value}`)
}
</script>
