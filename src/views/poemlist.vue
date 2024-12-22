<template>
    <div class="poemcontainer">
        <button @click="personStore.getTalk">获取一句古诗</button>
        <button @click="clearTalk">清空</button>
        <div class="poemlist">
            <ul>
                <li v-for="key in talkList" :key="key.id">{{ key.content }} </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup name='poemlist'>

import { usePersonStore } from '@/store/person';
import { storeToRefs } from 'pinia';

const personStore = usePersonStore()
const { name, age, talkList } = storeToRefs(personStore)

personStore.$subscribe((mutate, state) => {
    localStorage.setItem('talkList', JSON.stringify(state.talkList))
})

function clearTalk() {
    personStore.talkList.length = 0
}

</script>

<style scoped>
.poemcontainer {
    flex: 1;
    margin-top: 10px;
    padding-left: 40px;
}

button {
    color: black;
    height: 36px;
    width: 150px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 0 10px;
    font-size: 20px;
}

.poemlist {
    margin-top: 20px;
    gap: 20px;
    column-count: 3;
    column-width: 300px;
    height: 100%;
}
ul {
}

li {
    padding: 10px;
    font-size: 20px;
    color: #555;
}
</style>