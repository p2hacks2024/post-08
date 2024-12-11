<template>
    <div class="bg">
        <div class="min-h-screen relative"> 
            <div class="relative z-[3]">
                <Confetti></Confetti>
                <h1>Shake Detection</h1>
                <p>Shake Strength: {{ shakeStrength }}</p>
                <button @click="requestPermission">デバイスモーションの許可を求める</button>
            </div>
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
    
      <Footer class="footer" ></Footer>
    </div>
   
</template>

<script>
export default {
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

            this.lastX = x;
            this.lastY = y;
            this.lastZ = z;
        },
    },
    beforeDestroy() {
        window.removeEventListener('devicemotion', this.handleMotion);
    },
};

</script>

<style>
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

</style>

<script setup>
import Confetti from '@/components/confetti.vue';

  const handleButtonClick = () => {
    alert("POST-8にようこそ");
  };
  </script>
  