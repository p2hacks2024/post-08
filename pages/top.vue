<template>
    <div class="bg">
      <div class="min-h-screen relative"> 
       
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
      </div>
      <Confetti></Confetti>
      <Footer class="footer" ></Footer>
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
  
  <script setup>
import Confetti from '@/components/confetti.vue';

  const handleButtonClick = () => {
    alert("POST-8にようこそ");
  };
  </script>
  