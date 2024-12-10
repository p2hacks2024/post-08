<template>
    <div>
      <div>
        <button @click="toggleDrawingMode">
          {{ isDrawingMode ? "Cancel drawing mode" : "Enter drawing mode" }}
        </button>
        <label>
          Color:
          <input type="color" v-model="drawingColor" @input="updateBrush" />
        </label>
        <label>
          Line Width:
          <input
            type="range"
            min="1"
            max="10"
            v-model.number="lineWidth"
            @input="updateBrush"
          />
        </label>
        <label>
          Shadow Blur:
          <input
            type="range"
            min="0"
            max="20"
            v-model.number="shadowBlur"
            @input="updateBrush"
          />
        </label>
      </div>
      <canvas ref="canvasEl" width="800" height="600" style="border: 1px solid #ccc;"></canvas>
      <button @click="clearCanvas">Clear Canvas</button>
    </div>
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
  
      const updateBrush = () => {
        if (canvas.value && canvas.value.freeDrawingBrush) {
          canvas.value.freeDrawingBrush.color = state.drawingColor;
          canvas.value.freeDrawingBrush.width = state.lineWidth;
          canvas.value.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: state.shadowBlur,
            offsetX: 0,
            offsetY: 0,
            color: state.drawingColor,
          });
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
        updateBrush();
      });
  
      return {
        canvasEl,
        ...state,
        toggleDrawingMode,
        updateBrush,
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
  </style>
  