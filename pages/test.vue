<template>
  <!--ここにいれる-->

  <div>
    <!-- 開始ボタン -->
    <div className="mt-4 ml-4">
      <button class="start-button" @click="isModalVisible = true">滲みだす混濁の紋章...</button>
    </div>

    <!-- モーダル -->
    <div v-if="isModalVisible" class="modal-wrapper">

      <!-- 閉じるボタン -->
      <div className="close-container">
        <button class="close-button" @click="isModalVisible = false">終わりにしようぜアイゼン...</button>
      </div>


      <!-- 枠 -->
      <div class="modal">
        <!-- スイッチ -->
        <div v-if="isButtonVisible" class="switch-container">
          <button class="switch-button" @click="handleButtonClick">
            ボタンを押して始める
          </button>
        </div>
        <!--描画-->
        <div>
          <button class="start-button" @click="toggleDrawingMode">
            {{ state.isDrawingMode ? "Cancel drawing mode" : "Enter drawing mode" }} </button>
        </div>
        <canvas ref="canvasEl" width="350" height="400" style="border: 1px solid #ccc;" />
        <button class="start-button" @click="clearCanvas">Clear Canvas</button>
      </div>
    </div>
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
    const isModalVisible = ref(false);
    const isSwitchOn = ref(false);
    const isButtonVisible = ref(true);

    const toggleSwitch = () => {
      isSwitchOn.value = !isSwitchOn.value;
    };

    const handleButtonClick = () => {
      isButtonVisible.value = false; // ボタンを非表示
      toggleSwitch(); // 必要に応じてスイッチのロジックを追加
    };

    watch(isModalVisible, (newVal) => {
      if (newVal) {
        isButtonVisible.value = true; // モーダルが開くたびにボタンを再表示
      }
    });

    const toggleDrawingMode = () => {
      if (canvas.value) {
        state.isDrawingMode = !state.isDrawingMode;
        canvas.value.isDrawingMode = state.isDrawingMode;
      }
      //console.log(state.isDrawingMode)
      //console.log(canvas.value.isDrawingMode)
    };

    // isSwitchOn が true のときに処理を実行
    watch(isModalVisible, (newVal) => {
        canvas.value = new fabric.Canvas(canvasEl.value, {
          isDrawingMode: state.isDrawingMode,
        });
        canvas.value.freeDrawingBrush = new fabric.PencilBrush(canvas.value);
        console.log(state.isDrawingMode)
    });
    /*
    // isSwitchOn が true のとき Drawing モードを有効化
    watch(isSwitchOn, (newVal) => {
        if (newVal && canvas.value) {
            canvas.value.isDrawingMode = state.isDrawingMode;
        }
    });
    */

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
      isModalVisible,
      isSwitchOn,
      toggleSwitch,
      isButtonVisible,
      handleButtonClick,
    };
  },
};
</script>

<style scoped>
canvas {
  display: block;
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

/* スイッチボタンのコンテナ */
.switch-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* スイッチボタン */
.switch-button {
  padding: 20px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #9e45da;
  color: white;
  border: 2px solid #4caf50;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.switch-button:hover {
  background-color: white;
  color: #4caf50;
  border-color: #4caf50;
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

/* モーダル */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 600px;
  background-color: white;
  border: 2px solid #010101;
  box-shadow: 0 2px 10px rgba(164, 57, 57, 0.2);
  border-radius: 10px;
  text-align: center;
}

/*閉じるボタンのコンテナ*/
.close-container {
  display: flex;
  /* Flexbox を有効に */
  justify-content: center;
  /* 水平方向で中央揃え */
  align-items: center;
  /* 垂直方向の中央揃え（必要に応じて） */
  margin-bottom: 10px;
  /* モーダルとの距離を調整 */
}

/* 閉じるボタン */
.close-button {
  /*transform: translateX(700%);*/
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: 2px solid #f44336;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

/* 閉じるボタンのホバー */
.close-button:hover {
  background-color: white;
  color: #f44336;
  border-color: #f44336;
}
</style>