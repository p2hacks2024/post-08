<template>
    <div>
        <canvas ref="canvasEl" width="600" height="500" style="border: 1px solid #ccc;" />
        <button class="control-button" @click="toggleDrawingMode">
            {{ state.isDrawingMode ? "Cancel drawing mode" : "Enter drawing mode" }}
        </button>
        <button class="control-button" @click="clearCanvas">Clear Canvas</button>
        <button class="control-button" @click="saveCanvasAsImage">画像保存</button>
    </div>
</template>


<script>
import { onMounted, ref, reactive } from "vue";
import * as fabric from "fabric";
import { POST } from "/composables/api/uploadToR2";

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

        /*
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
        */

        /*
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
        */

        onMounted(() => {
            canvas.value = new fabric.Canvas(canvasEl.value, {
                isDrawingMode: state.isDrawingMode,
            });
            canvas.value.freeDrawingBrush = new fabric.PencilBrush(canvas.value);
        });

        //キャンバスのクリア
        const clearCanvas = () => {
            if (canvas.value) {
                canvas.value.clear();
            }
        };

        //ランダムなファイル名を生成
        const generateRandomFileName = (length = 8) => {
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let result = "";
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };

        //画像ダウンロード,R2アップロード
        const saveCanvasAsImage = async () => {
            if (canvas.value) {
                //Canvasから画像データを取得
                const dataURL = canvas.value.toDataURL({
                    format: "png",
                    quality: 1.0,
                });

                //ダウンロード処理
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "canvas_image.png";
                link.click();

                //R2にアップロード
                const blob = dataURLToBlob(dataURL);
                const file = new File([blob], "canvas_image_" + generateRandomFileName() + ".png", { type: "image/png" });

                try {
                    const response = await POST(file);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("アップロード成功:", data);
                    } else {
                        console.error("アップロード失敗:", await response.text());
                    }
                } catch (error) {
                    console.error("アップロードエラー:", error);
                }
            }
        };

        //dataURLをBlobに変換
        const dataURLToBlob = (dataURL) => {
            const [header, base64] = dataURL.split(",");
            const mime = header.match(/:(.*?);/)[1];
            const binary = atob(base64);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type: mime });
        };

        return {
            canvasEl,
            state,
            toggleDrawingMode,
            clearCanvas,
            isModalVisible,
            saveCanvasAsImage,
            onMounted,
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