<template>
    <div>
        <button class="start-button" @click="toggleDrawingMode">
            {{ state.isDrawingMode ? "Cancel drawing mode" : "Enter drawing mode" }}        </button>
    </div>
    <canvas ref="canvasEl" width="800" height="600" style="border: 1px solid #ccc;" />
    <button class="start-button" @click="clearCanvas">Clear Canvas</button>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import * as fabric from "fabric";

export default {
    name: "DrawingCanvas",
    setup() {
        const canvasEl = ref(null);
        const canvas = ref(null);
        const state = reactive({
            isDrawingMode: false,
            drawingColor: "#000000",
            lineWidth: 2,
            shadowBlur: 0,
        });

        const toggleDrawingMode = () => {
            if (canvas.value) {
                state.isDrawingMode = !state.isDrawingMode;
                canvas.value.isDrawingMode = state.isDrawingMode;
            }
        };

        const clearCanvas = () => {
            if (canvas.value) {
                canvas.value.clear();
            }
        };

        onMounted(() => {
            canvas.value = new fabric.Canvas(canvasEl.value, {
                isDrawingMode: state.isDrawingMode,
            });
            canvas.value.freeDrawingBrush = new fabric.PencilBrush(canvas.value);
        });

        return {
            canvasEl,
            state,
            toggleDrawingMode,
            clearCanvas,
        };
    },
};
</script>

<style scoped>
canvas {
    display: block;
    margin: 20px auto;
}

/* はじめるボタン */
.start-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: 2px solid #4caf50;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

/* はじめるボタンのホバー */
.start-button:hover {
    background-color: white;
    color: #4caf50;
    border-color: #4caf50;
}
</style>