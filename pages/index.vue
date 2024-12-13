<template>
  <div class="bg">
   
  
  <div
    class="min-h-screen flex flex-col items-center justify-center"
  >
       <router-link to="/login">
    <button
      class="mt-6 px-6 py-2 bg-orange-400 text-white rounded-full shadow-md hover:bg-yellow-400"
      @click="handleButtonClick"
    >
      Xのアカウントを連携して始める
    </button>
  </router-link>
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

<script setup>

</script>


