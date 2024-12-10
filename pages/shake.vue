<template>
    <div>
        <h1>Shake Detection</h1>
        <p>Shake Strength: {{ shakeStrength }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shakeStrength: 0,   //shakeの強さ
            lastX: null,
            lastY: null,
            lastZ: null,    //前回のXYZ
            lastUpdate: 0,  //最終更新時間
            updateInterval: 100, //更新間隔(ms)
        };
    },
    mounted() {     //devicemotionが使えるかどうかみる
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', this.handleMotion);
        } else {
            alert("お使いのデバイスではサポートされていません。");
        }
    },
    beforeDestroy() {
        window.removeEventListener('devicemotion', this.handleMotion);
    },
    methods: {
        handleMotion(event) {
            const currentTime = Date.now();     //現在の時間をミリ秒単位で取得
            if (currentTime - this.lastUpdate < this.updateInterval) {  //lastUpdate) の差が updateInterval 未満であれば、処理をスキップ
                return; 
            }
            this.lastUpdate = currentTime;

            //accelerationIncludingGravity プロパティを取得し、x, y, z の各軸の加速度データを抽出
            const { acceleration } = event;
            const { x, y, z } = acceleration;

            //前回の加速度データ (lastX, lastY, lastZ) が存在する場合、現在の加速度データとの変化量 (deltaX, deltaY, deltaZ) を計算
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
};
</script>

<style scoped>
h1 {
    text-align: center;
}
p {
    text-align: center;
    font-size: 2em;
}
</style>