<template>
  <footer class="absolute bottom-0 left-0 w-full bg-[#FFE4CF] text-white text-center flex items-center justify-center" 
  style="height: 25vh;">
    <div class="p-5 grid gap-10 grid-cols-2 items-center">
    
      <!-- 1つ目のボタン -->
      <router-link to="/test" class="p-3 bg-white rounded-[35px] border-4 border-[#2898D7] overflow-hidden hover:bg-gray-200" style="width: 40vw; height: 20vh;">
      <div class="flex justify-center items-start">
          <p class="text-gray-500 text-md font-bold">願い事を見返す</p>
        </div>
        <div class="flex justify-center items-center h-full">
    <img src="@/assets/images/view_icon.png" 
         alt="writting_icon" 
         class="max-h-[70%] w-auto object-contain" />
        </div>
      </router-link>


      <!-- 2つ目のボタン -->
      <router-link to="/draw" class="p-3 bg-white rounded-[35px] border-4 border-[#ED4759] overflow-hidden  hover:bg-gray-200" style="width: 40vw; height: 20vh;">
        <div class="flex justify-center items-start">
          <p class="text-gray-500 text-md font-bold">願い事を書く</p>
        </div>
        <div class="flex justify-center items-center h-full">
    <img src="@/assets/images/writting_icon.png" 
         alt="writting_icon" 
         class="max-h-[70%] w-auto object-contain" /> </div>
        </router-link>
      </div>


  </footer>
</template>

<script setup>
</script>
