<template>
    <div class="test">
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
        <h2>当前的和为：{{ sum }}</h2>
        <button @click="changeSum">求和</button>
        <br>
        <button @click="personStore.getTalk">获取一句话</button>
        <button @click="clearTalk">清空</button>
        <ul>
            <li v-for="key in talkList" :key="key.id">{{ key.content }} </li>
        </ul>
    </div>
</template>



<script lang="ts">
import { ref, reactive, watch } from 'vue'
import { defineProps } from 'vue';
import { usePersonStore } from '@/store/person';
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia';

export default {
    name: 'person'
}
</script>

<script lang="ts" setup>

const personStore = usePersonStore()
const {name,age,talkList} = storeToRefs(personStore)

personStore.$subscribe((mutate,state)=>{
    localStorage.setItem('talkList',JSON.stringify(state.talkList))
})

const numberList = ref([1, 2, 3, 4, 5])
let x = defineProps(['a'])

let n = ref(1)
let sum = ref(1)

function changeSum() {
    sum.value++
}

let firstname = ref()





function clearTalk() {
    personStore.talkList.length = 0
}
const stop = watch(sum, (newSum, oldSum) => {
    console.log('new:', newSum, 'old:', oldSum)
    if (newSum > 10) {
        stop();
    }
})

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

function changeAll(){
    personStore.$patch(
        {
            name:'lisi',
        }
    )
    personStore.plus(5)

}
watch(() => personStore.age, (newv, oldv) => {
    console.log('change', newv, oldv)
}, { deep: true })
</script>

<style scoped>
.test {
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