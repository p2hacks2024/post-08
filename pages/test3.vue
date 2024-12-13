<template>
    <div>
        <!-- 開始ボタン -->
        <div class="mt-4 ml-4">
            <button class="start-button" @click="isModalVisible = true">滲みだす混濁の紋章...</button>
        </div>

        <!-- モーダル -->
        <div v-if="isModalVisible" class="modal-wrapper">
            <!-- モーダル本体 -->
            <div class="modal">
                <canvas ref="canvasEl" width="350" height="400" style="border: 1px solid #ccc;" />
            </div>
        </div>

        <!-- モーダル外のボタン -->
        <div v-if="isModalVisible" class="modal-buttons">
            <button class="control-button" @click="toggleDrawingMode">
                {{ state.isDrawingMode ? "Cancel drawing mode" : "Enter drawing mode" }}
            </button>
            <button class="control-button" @click="clearCanvas">Clear Canvas</button>
            <button class="control-button" @click="isModalVisible = false">これが最後の月牙天衝だ</button>
            <button class="control-button" @click="saveCanvasAsImage">画像保存</button>
        </div>
    </div>
</template>


<script>
import { ref, reactive } from "vue";
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

        //書くのかい、書かないのかい、どっちなんだい
        const toggleDrawingMode = () => {
            if (canvas.value) {
                state.isDrawingMode = !state.isDrawingMode;
                canvas.value.isDrawingMode = state.isDrawingMode;
            }
        };

        const initializeCanvas = async () => {
            await nextTick();//DOMの更新を待つ
            if (canvas.value) {
                canvas.value.dispose();//既存のCanvasを破棄
            }
            canvas.value = new fabric.Canvas(canvasEl.value, {
                isDrawingMode: state.isDrawingMode,
            });
            canvas.value.freeDrawingBrush = new fabric.PencilBrush(canvas.value);
        };

        //モーダルが開かれたら実行
        watch(isModalVisible, async (newVal) => {
            if (newVal) {
                await initializeCanvas();//モーダルが開かれたらCanvasを初期化
            } else {
                state.isDrawingMode = false;//描画モードクリア
                //モーダルを閉じたら、Canvasを破棄する
                if (canvas.value) {
                    canvas.value.dispose();
                    canvas.value = null;//参照をクリア
                }
            }
        });

        //キャンバスのクリア
        const clearCanvas = () => {
            if (canvas.value) {
                canvas.value.clear();
            }
        };

        //画像ダウンロード
        const saveCanvasAsImage = () => {
            if (canvas.value) {
                const dataURL = canvas.value.toDataURL({
                    format: 'png',
                    quality: 1.0
                });
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'canvas-image.png';
                link.click();
            }
        };

        return {
            canvasEl,
            state,
            toggleDrawingMode,
            clearCanvas,
            isModalVisible,
            saveCanvasAsImage,
        };
    },
};
</script>

<style scoped>
canvas {
    display: block;
    margin: 20px auto;
}

/* ボタン群をモーダルの下に配置 */
.modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    /* 各ボタンの間隔 */
    margin-top: 10px;
    /* モーダルとのスペース */
}

/*ボタンの共通レイアウト*/
.control-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.control-button:hover {
    background-color: #45a049;
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
    margin: 20px 0;
    display: flex;
    justify-content: center;
}

/* スイッチボタン */
.switch-button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    background-color: #4caf50;
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
    padding: 20px;
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