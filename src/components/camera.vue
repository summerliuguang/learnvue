<template>
  <div>
    <h2>选择摄像头</h2>
    <select v-model="selectedCameraId" @change="changeCamera">
      <option v-for="camera in cameras" :key="camera.deviceId" :value="camera.deviceId">
        {{ camera.label || 'Unnamed Camera' }}
      </option>
    </select>

    <h2>摄像头视频显示</h2>
    <video ref="video" autoplay></video>
    <button @click="startCamera(selectedCameraId)">开启摄像头</button>
    <button @click="stopCamera">停止摄像头</button>
  </div>
</template>

<script setup lang="ts" name="camera">

import { ref, onMounted, onUnmounted, watch } from 'vue';
const video = ref<HTMLVideoElement | null>(null);
const selectedCameraId = ref<string>(''); // 当前选中的摄像头ID
const cameras = ref<{ deviceId: string, label: string }[]>([]); // 存储可用摄像头列表
let cameraRight = false;
let stream: MediaStream | null = null;

// 请求摄像头权限
function requestCameraPermission() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => {
      cameraRight = true;
      getCameras();
    })
    .catch(error => {
      console.error('请求摄像头权限失败:', error);
      cameras.value = [{ deviceId: '0', label: '未检测到摄像头设备' }];
    });
}
// 获取所有摄像头设备
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    if (!devices || devices.length === 0) {
      console.error('未检测到任何媒体设备，请检查设备连接及权限设置');
      return;
    }

    const videoDevices: { deviceId: string; label: string }[] = [];
    for (const device of devices) {
      if (device.kind === 'videoinput') {
        const label = device.label || 'Unnamed Camera';
        console.log('摄像头设备:', device);

        videoDevices.push({
          deviceId: device.deviceId,
          label,
        });
      }
    }

    if (videoDevices.length === 0) {
      console.error('未找到可用的摄像头设备，请确保摄像头已正确连接并可被系统识别');
      return;
    }

    cameras.value = videoDevices;

    // 默认选择第一个摄像头
    if (cameras.value.length > 0) {
      selectedCameraId.value = cameras.value[0].deviceId;
    }
  } catch (error) {
    console.error('获取设备失败:', error);
  }
};


// 启动摄像头流
const startCamera = async (deviceId: string) => {
  if (!cameraRight) {
    console.error('未获取摄像头权限，无法开启摄像头');
    return;
  }
  try {
    const constraints = {
      video: { deviceId: { exact: deviceId } }
    };
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (video.value) {
      video.value.srcObject = stream;
    }
  } catch (error) {
    console.error('访问摄像头失败:', error);
  }
};

// 切换摄像头
const changeCamera = () => {
  stopCamera();
  startCamera(selectedCameraId.value);
};

// 停止摄像头流
const stopCamera = () => {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  }
  if (video.value) {
    video.value.srcObject = null;
  }
};

// 在组件挂载时获取可用的摄像头设备
onMounted(() => {
  requestCameraPermission();
});

// 在组件卸载时停止摄像头
onUnmounted(() => {
  stopCamera();
});
</script>

<style scoped>
video {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
}
</style>