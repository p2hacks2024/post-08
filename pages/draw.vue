<template>
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
                <canvas ref="canvasElement" :width="500" :height="200" />            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import * as fabric from "fabric";
export default {
    setup() {
        const isModalVisible = ref(false);
        const canvasElement = ref<HTMLCanvasElement>()
        const canvas = computed(
            () =>
                new fabric.Canvas(canvasElement.value!, {
                    preserveObjectStacking: true,
                })
        )
        onMounted(() => {
            canvas.value.isDrawingMode = true
        })


        return { isModalVisible };
    },
};
</script>

<style scoped>
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