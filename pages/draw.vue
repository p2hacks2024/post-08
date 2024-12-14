<template>
   <div class="bg">
    <div class="min-h-screen relative">
    <div class="content-layer">
        <!-- 上部のボタン -->
        <div class="controls-top">
            <button class="control-button-top" @click="saveCanvasAsImage">画像をダウンロード</button>
            <button class="control-button-top" @click="uploadCanvasToR2">画像をアップロード</button>
        </div>
        <!-- メインコンテンツ -->
        <div class="main-content">
            <!-- キャンバス -->
            <div class="canvas-wrapper">
                <canvas ref="canvasEl" class="canvas"/>
                <div class="controls-side">
                <button class="control-button-side" @click="toggleDrawingMode">
                    {{ state.isDrawingMode ? "書くのをやめる" : "書き始める" }}
                </button>
                <button class="control-button-side" @click="clearCanvas">全て消す</button>
                </div>
            </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import * as fabric from "fabric";
import { POST } from "/composables/api/uploadToR2";
import { useFirestore } from "~/composables/useFirestore";

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
                const randID = generateRandomFileName();
                const file = new File([blob], "canvas_image_" + randID + ".png", { type: "image/png" });

                const userID = localStorage.getItem('uuid');

                try {
                    const response = await POST(file);
                    if (response.ok) {
                        const data = await response.json();
                        useFirestore().loginUser(userID);
                        useFirestore().setImageId(userID, randID);
                        console.log("アップロード成功:", data);
                        alert('アップロードに成功しました。')
                        await navigateTo(`/share-image/${randID}`)
                    } else {
                        console.error("アップロード失敗:", await response.text());
                        alert('アップロードに失敗しました。')
                    }
                } catch (error) {
                    console.error("アップロードエラー:", error);
                    alert('アップロードすることができませんでした。')
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
.bg {
  background-image: url("@/assets/images/bg-hoshisen.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100%;
}


/* コンテンツレイヤー */
.content-layer {
    position: relative;
    justify-content: center;  
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100vw;
    height: auto;
    max-height: 70vh
}

.canvas-wrapper {
    display: flex;
    justify-content: center; /* 水平方向に中央配置 */
    align-items: center; /* 垂直方向に中央配置 */
    width: 60vw;  /* 幅を30%に設定 */
    height: 50vh; /* 高さは自動調整 */
    max-height: 80vh; /* 高さを最大80vhに設定 */
    position: relative; /* 中央配置のため */
    margin-top: 5vh; /* 上部に少し余白を追加 */
}

.canvas {
    background-color: pink;
    width: 70vw; /* 幅を親要素に合わせる */
    height: 60vh; /* 高さは自動調整 */
    max-height: 100%; /* 親要素の高さに合わせて調整 */
}


/* 上部のボタン */
.controls-top {
    display: flex;
    flex-direction: rowz; /* ボタンを縦に並べる */
    position: fixed; /* ビューポートに固定 */
    bottom: 30vh; /* ビューポートの高さの45%に配置 */
    left: 50%; /* 水平方向の中央に配置 */
    transform: translateX(-50%); /* 中央揃え調整 */
    gap: 10px; /* ボタン間の間隔 */
}

/* 上部ボタンのスタイル */
.control-button-top {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 35px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.control-button-top:hover {
    background-color: #45a049;
}

/* サイドボタンのスタイル */
.controls-side {
    display: flex;
    flex-direction: row; /* ボタンを横に並べる */
    gap: 10px;
    position: fixed; /* ビューポートに固定 */
    bottom: 40vh; /* フッターからの距離 */
    left: 50%; /* 水平方向の中央に配置 */
    transform: translateX(-50%); /* 中央揃え調整 */
    margin: 0; /* マージンをリセット */
    z-index: 100; /* 他の要素より前面に表示 */
}

.control-button-side {
    width: 150px; /* 固定幅 */
    height: 40px; /* 固定高さ */
    font-size: 14px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 35px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;
}

.control-button-side:hover {
    background-color: #1976d2;
}
</style>
