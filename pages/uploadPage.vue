<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div v-if="uploadedUrl" class="text-center">
                <h2 class="text-xl font-bold mb-4">アップロードされた画像</h2>
                <img :src="uploadedUrl" alt="Uploaded" class="w-full max-h-80 object-contain border" />
            </div>
            <div v-else>
                <h2 class="text-xl font-bold text-center mb-4">画像をアップロード</h2>
                <input type="file" id="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />
                <label for="fileInput">
                    <div class="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center cursor-pointer transition hover:opacity-80"
                        :class="{ 'opacity-50': uploading }">
                        <span v-if="uploading" class="text-gray-500">アップロード中...</span>
                        <div v-else class="text-gray-400 flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            <p>画像を選択してください</p>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { POST } from "/composables/api/uploadToR2";

const uploading = ref(false);
const uploadedUrl = ref("");

const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    uploading.value = true;

    try {
        const response = await POST(file);

        if (response.ok) {
            const data = await response.json();
            uploadedUrl.value = data.fileUrl;
        } else {
            console.error("アップロード失敗:", await response.text());
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    } finally {
        uploading.value = false;
    }
};
</script>

<style></style>
