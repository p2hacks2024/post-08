<template>
    <div class="confetti-container">
      <button @click="launchConfetti" class="launch-button">Launch Confetti!</button>
    </div>
  </template>
  
  <script setup>
  import confetti from 'canvas-confetti';

  const customRectangle = (ctx) => {

  ctx.beginPath();
  ctx.rect(0, 0, 20, 10); // 長方形の幅と高さを指定
  ctx.fill();
  ctx.closePath();
};

  const launchConfetti = () => {

    confetti({
      particleCount: 10,//枚数
      angle: -90,// 発射角度(デフォルト90度)
      spread: 45,  // 失速具合 デフォルト0.9
      gravity: 0.2, 
      drift: 0,// default:0 数値を上げると横に流れる
      ticks: 300,   // confettiが動く長さ (default: 200)
      origin: {
        x: 0.5,
        y: 0,
      },
      colors: ['#D9E9FC', '#FFA7A7', '#FFCA1A','#97C31A' ],
      shapes: ['square'], // カスタムシェイプ
    scalar: 10.0,
    zIndex: 10,
      
    });
  };
  </script>
  
  <style>

.confetti-container {
  display: flex;
  justify-content: center;
  align-items: start;
}
  
  .launch-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #165B33;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .launch-button:hover {
    background-color: #146B3A;
  }


  </style>
  