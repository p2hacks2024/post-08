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
            shakeStrength: 0,
            lastX: null,
            lastY: null,
            lastZ: null,
        };
    },
    mounted() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', this.handleMotion);
        } else {
            alert("DeviceMotionEvent is not supported on your device.");
        }
    },
    beforeDestroy() {
        window.removeEventListener('devicemotion', this.handleMotion);
    },
    methods: {
        handleMotion(event) {
            const { accelerationIncludingGravity } = event;
            const { x, y, z } = accelerationIncludingGravity;

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