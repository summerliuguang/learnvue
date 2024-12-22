<template>
    <div class="profilecontent">
        <h2>姓名：{{ name }}</h2><br>
        <h2>年龄：{{ age }}</h2><br>
        <input placeholder="firstname" ref="firstname">
        <button @click="changeName(firstname.value)">修改名字</button>
        <button @click="changeAll">修改全部</button>
        <br>
        <select v-model.number="n">
            <option v-for="key in numberList" :value="key"> {{ key }} </option>
        </select>
        <button @click="addAge(n)">增加年龄</button>
        <button @click="minusAge(n)">减少年龄</button>
    </div>
</template>

<script lang="ts" setup name='userdata'>

import { ref, reactive, watch } from 'vue'
import { usePersonStore } from '@/store/person';
import { storeToRefs } from 'pinia';

const personStore = usePersonStore()
const { name, age, talkList } = storeToRefs(personStore)

const numberList = ref([1, 2, 3, 4, 5])
let n = ref(1)

let firstname = ref()


function changeName(name: string) {
    personStore.name = name
}

function addAge(year: number) {
    personStore.age += year
}

function minusAge(year: number) {

    if (personStore.age <= year) personStore.age = 0
    else personStore.age -= year
}

function changeAll() {
    personStore.$patch(
        {
            name: 'lisi',
        }
    )
    personStore.plus(5)

}
watch(() => personStore.age, (newv, oldv) => {
    console.log('change', newv, oldv)
}, { deep: true })
</script>

<style scoped>
.profilecontent {
    flex: 1;
    margin-top: 10px;
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

input,
select,
button {
    margin: 5px;
    width: 100px;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>