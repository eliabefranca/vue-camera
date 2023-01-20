<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

const webcam = ref<any>(null);
const deviceId = ref('');
const cameras = ref<any[]>([]);
const imgSrc = ref<string | null>(null);

async function takePhoto() {
  try {
    const img = await webcam.value.takePhoto();
    console.log(img);
  } catch (err) {
    console.log(err);
  }
}

function setCamera() {
  webcam.value.changeCamera(deviceId.value === '' ? null : deviceId.value);
}

function loadCameras() {
  webcam.value.loadCameras();
  cameras.value = webcam.value.cameras;
}

const emit = defineEmits(['photoTaken']);

function photoTakenEvent({ blob, image_data_url }: any) {
  emit('photoTaken', { blob, image_data_url });
  imgSrc.value = image_data_url;
}

onMounted(() => {
  loadCameras();
});
</script>
<template>
  <div class="flex pl-12 pt-12 pr-3 w-1/2 gap-3 justify-between">
    <div class="flex flex-col px-3">
      <label for="webcam">Select the camera</label>
      <select
        id="webcam"
        class="px-3 py-2 mt-1 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @change="setCamera"
        v-model="deviceId"
      >
        <option value="">-</option>
        <option v-for="camera in cameras" :value="camera.deviceId">
          {{ camera.label }}
        </option>
      </select>
    </div>
    <button
      class="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="takePhoto"
    >
      Take a photo
    </button>
  </div>

  <div class="flex flex-wrap w-full max-h-max p-12">
    <div class="w-1/2 p-3">
      <WebCam ref="webcam" @photoTaken="photoTakenEvent" />
    </div>
    <div class="w-1/2 p-3 flex items-center justify-center">
      <p class="text-4xl text-slate-300" v-if="!imgSrc">
        Photo will appear here
      </p>
      <img :src="imgSrc" v-else />
    </div>
  </div>
</template>
