<script setup lang="ts">
import main_header from '@/components/header.vue'
import webfooter from './components/webfooter.vue';
import { RouterView } from 'vue-router';
</script>

<template>

  <body>
    <header>
      <main_header />
    </header>
    <main>
      <div class="main_content">
        <RouterView />
      </div>
    </main>
    <footer>
      <webfooter />
    </footer>
  </body>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  background-color: rgba(211, 211, 211, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

footer {
  margin-top: auto;
}

.main_content {
  flex: 1;
  flex-grow: 1;
  max-width: 1440px;
  min-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0px auto;
  justify-content: space-evenly;
  align-content: space-around;
}

@media screen and (max-width: 768px) {
  .main_content {
    padding: 0 20px;
    min-width: 250px;
    box-sizing: border-box;
}
}
</style>
