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
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  const video = ref<HTMLVideoElement | null>(null);
  const selectedCameraId = ref<string>(''); // 当前选中的摄像头ID
  const cameras = ref<{ deviceId: string, label: string }[]>([]); // 存储可用摄像头列表
  
  let stream: MediaStream | null = null;
  
  // 获取所有摄像头设备
  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      cameras.value = videoDevices.map(device => ({
        deviceId: device.deviceId,
        label: device.label || 'Unnamed Camera',
      }));
  
      // 默认选择第一个摄像头
      if (cameras.value.length > 0) {
        selectedCameraId.value = cameras.value[0].deviceId;
        // startCamera(selectedCameraId.value); // 自动启动第一个摄像头
      }
    } catch (error) {
      console.error('获取设备失败:', error);
    }
  };
  
  // 启动摄像头流
  const startCamera = async (deviceId: string) => {
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
    getCameras();
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
  