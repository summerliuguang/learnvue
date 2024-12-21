<script setup lang="ts">
import compute from './components/compute.vue';
import watch from './components/person.vue';
import main_header from '@/components/header.vue'
import main_footer from '@/components/footer.vue'
import querydetail from '@/views/querydetail.vue'
import displayarea from './components/displayarea.vue';
import propsdetail from './views/propsdetail.vue';
</script>

<template>

  <body>
    <header>
      <main_header />
    </header>
    <main>
      <div class="display">
        <displayarea />
      </div>
      <div class="main_content">
        <!-- <watch a="liuguang" />
        <compute />
        <test />
        <test2 /> -->
        <propsdetail id="liuguang" title="冬眠不觉晓"/>
        <querydetail />
        <propsdetail />
        <propsdetail />
        <propsdetail />
        <propsdetail />
      </div>
    </main>
    <footer>
      <main_footer />
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
  max-width: 1440px;
  min-width: 480px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0px auto;
  padding: 20px;
  /* background-color: greenyellow; */
  justify-content: space-evenly;
  align-content: space-around;
}
</style>
