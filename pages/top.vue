<template>
  <div class="bg">
    <div class="min-h-screen relative z-0">
      <img
        src="@/assets/images/boy.png"
        alt="boy"
        class="boy-image"
      />
      <img
        src="@/assets/images/bambooLeaves-1.png"
        alt="bambooLeaves"
        class="bamboo-image"
      />

      <!-- 願いごとへ飛ぶのボタン -->
      <div class="flex justify-center items-center absolute top-1/3 right-0 transform -translate-x-1/2 -translate-y-1/2">
        <button @click="handleButtunClick" class="p-4 bg-yellow-100 rounded-full shadow-md  overflow-hidden hover:bg-yellow-300" style="width: 30vw; height: 20vh;">
          <div class="flex justify-center items-start p-2">
            <p class="text-gray-500 text-xs font-light">みんなの願いごとを見る
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.bg {
  background-image: url("@/assets/images/bg-hoshisen.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100%;
}

.min-h-screen {
  position: relative;
  min-height: 100vh;
  overflow: hidden; /* コンテンツがはみ出ないようにする */
}

.boy-image {
  position: absolute;
  top: 55%; 
  left: 30%;
  transform: translate(-50%, -50%);
  z-index: 1;
  max-height: 50vh; 
}

.bamboo-image {
  position: absolute;
  top: 55%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 0;
  max-height: 90vh; 
}

.footer {
  z-index: 2; /* 画像よりも上に表示 */
}

</style>

<script setup lang="ts">
import { useFirestore } from '~/composables/useFirestore';

async function handleButtunClick() {
  const randImageID = await useFirestore().getRandomImageId();
  console.log(randImageID);
  await navigateTo(`/view-image/${randImageID}`)
}
</script>
