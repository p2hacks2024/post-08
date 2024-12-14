<template>
    <div class="bg">
        <div class="min-h-screen relative"> 
            <div class="relative z-0">
                <!-- <Confetti></Confetti>
                <h1>Shake Detection</h1>
                <p>Shake Strength: {{ shakeStrength }}</p> -->
     
                <button class="bg-[#ffac30] rounded-[35px] hover:bg-yellow-500"  @click="requestPermission"><div class="text-white">デバイスモーションの許可</div></button>
            

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
        </div>
      <div>
        <button class="view-next-image">
            <div>次の願いを見る</div>
        </button>
      </div>
      <!-- トップに戻る -->
      <div class="return-top-button">
      <router-link to="/top" class=" text-white font-light">トップに戻る</router-link>
      </div>
      <Footer class="footer" ></Footer>
    </div>
</template>

<script>
import confetti from 'canvas-confetti';

const customRectangle = (ctx) => {

  ctx.beginPath();
  ctx.rect(0, 0, 20, 10); // 長方形の幅と高さを指定
  ctx.fill();
  ctx.closePath();
};

export default {
    components: {
        Confetti,
    },
    data() {
        return {
            shakeStrength: 0,   // shakeの強さ
            lastX: null,
            lastY: null,
            lastZ: null,    // 前回のXYZ座標
            lastUpdate: 0,  // 最終更新時間
            updateInterval: 100, // 更新間隔（ミリ秒）
        };
    },
    methods: {
        requestPermission() {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                DeviceMotionEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('devicemotion', this.handleMotion);
                            alert('success')
                        } else {
                            alert("デバイスモーションの許可が得られませんでした。");
                        }
                    })
                    .catch(error => {
                        alert("デバイスモーションの許可リクエスト中にエラーが発生しました:", error);
                    });
            } else {
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', this.handleMotion);
                } else {
                    alert("お使いのデバイスではサポートされていません。");
                }
            }
        },
        launchConfetti() {
            confetti({
            particleCount: 10,
            angle: -90,
            spread: 45,
            gravity: 0.2,
            drift: 0,
            ticks: 300,
            origin: {
            x: 0.5,
            y: 0,
            },
            colors: ['#D9E9FC', '#FFA7A7', '#FFCA1A', '#97C31A'],
            shapes: ['square'],
            scalar: 10.0,
            zIndex: 10,
            });
        },
        handleMotion(event) {
            const currentTime = Date.now();     // 現在の時間をミリ秒単位で取得
            if (currentTime - this.lastUpdate < this.updateInterval) {  // lastUpdate の差が updateInterval 未満であれば、処理をスキップ
                return; 
            }
            this.lastUpdate = currentTime;

            // accelerationIncludingGravity プロパティを取得し、x, y, z の各軸の加速度データを抽出
            const { acceleration } = event;
            const { x, y, z } = acceleration;

            // 前回の加速度データ (lastX, lastY, lastZ) が存在する場合、現在の加速度データとの変化量 (deltaX, deltaY, deltaZ) を計算
            if (this.lastX !== null && this.lastY !== null && this.lastZ !== null) {
                const deltaX = Math.abs(this.lastX - x);
                const deltaY = Math.abs(this.lastY - y);
                const deltaZ = Math.abs(this.lastZ - z);
                this.shakeStrength = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

            }

                if (this.shakeStrength > 5.0) {
                    this.launchConfetti();
                }

            this.lastX = x;
            this.lastY = y;
            this.lastZ = z;
        },
    },
    mounted() {
        this.requestPermission();
    },
    beforeDestroy() {
        window.removeEventListener('devicemotion', this.handleMotion);
    },
};

</script>

<style>
.confetti-container {
  display: flex;
  justify-content: center;
  align-items: start;
}
h1 {
    text-align: center;
}
p {
    text-align: center;
    font-size: 2em;
}
button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 1em;
    z-index: 3;
}

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

.return-top-button {
  width: 150px;
  height: 40px;
  font-size: 14px;
  background-color: #ffac30;
  color: white;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: fixed; /* 固定位置 */
  bottom: 30vh; /* 下部に配置 */
  left: 50%; /* 水平中央に配置 */
  transform: translateX(-50%); /* 中央揃え */
  z-index: 10; /* 最前面に表示 */
  display: flex; /* Flexboxを使用 */
  justify-content: center; /* 水平方向に中央揃え */
  align-items: center; /* 垂直方向に中央揃え */
}

.view-next-image {
  width: 150px;
  height: 40px;
  font-size: 14px;
  background-color: #ffac30;
  color: white;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: fixed; /* 固定位置 */
  bottom: 34vh; /* 下部に配置 */
  left: 50%; /* 水平中央に配置 */
  transform: translateX(-50%); /* 中央揃え */
  z-index: 10; /* 最前面に表示 */
  display: flex; /* Flexboxを使用 */
  justify-content: center; /* 水平方向に中央揃え */
  align-items: center; /* 垂直方向に中央揃え */
}

</style>

<script setup>
import Confetti from '@/components/confetti.vue';

</script>