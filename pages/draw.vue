<template>
    <div class="background-layer"></div>
    <div class="content-layer">
        <!-- 上部のボタン -->
        <div class="controls-top">
            <button class="control-button-top" @click="saveCanvasAsImage">画像を保存</button>
            <button class="control-button-top" @click="uploadCanvasToR2">Upload</button>
        </div>
        <!-- メインコンテンツ -->
        <div class="main-content">
            <!-- キャンバス -->
            <div class="canvas-wrapper">
                <canvas ref="canvasEl" class="canvas" width="600" height="500" />
            </div>
            <!-- サイドのボタン -->
            <div class="controls-side">
                <button class="control-button-side" @click="toggleDrawingMode">
                    {{ state.isDrawingMode ? "描画モード解除あちゃああ" : "描画モード開始" }}
                </button>
                <button class="control-button-side" @click="clearCanvas">キャンバスをクリア</button>
            </div>
        </div>
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

        //ダウンロード処理
        const saveCanvasAsImage = () => {
            if (canvas.value) {
                const dataURL = canvas.value.toDataURL({
                    format: "png",
                    quality: 1.0,
                });

                // キャンバスをクリア、描画モードをリセット
                //clearCanvas();
                //state.isDrawingMode = false;

                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "canvas_image.png";
                link.click();
            }
        };

        //アップロード処理
        const uploadCanvasToR2 = async () => {
            if (canvas.value) {
                const dataURL = canvas.value.toDataURL({
                    format: "png",
                    quality: 1.0,
                });

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
            uploadCanvasToR2,
        };
    },
};
</script>

<style scoped>
/* リセット: 背景とフッター間のマージン解消 */
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

/* 背景レイヤー */
.background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url("@/assets/images/bg-hoshisen.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
}

/* コンテンツレイヤー */
.content-layer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
}

/* キャンバスとサイドボタンの配置 */
.main-content {
    display: flex; /* 横並びに配置 */
    align-items: center;
    justify-content: center;
    gap: 20px; /* キャンバスとボタンの間隔 */
    margin: 24px 0; /* 上下の余白 */
    margin-left: 180px; /* 右にずらす */
}

/* キャンバスのスタイル */
.canvas-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.canvas {
    border: 2px solid blue;
    background-color: white;
}

/* 上部のボタン */
.controls-top {
    display: flex;
    gap: 10px;
}

/* 上部ボタンのスタイル */
.control-button-top {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.control-button-top:hover {
    background-color: #45a049;
}

/* サイドボタンのスタイル */
.controls-side {
    display: flex;
    flex-direction: column; /* ボタンを縦に並べる */
    gap: 10px;
}

.control-button-side {
    width: 150px; /* 固定幅 */
    height: 40px; /* 固定高さ */
    font-size: 14px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;
}

.control-button-side:hover {
    background-color: #1976d2;
}
</style>
