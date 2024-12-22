<template>
    <div class="test">
        姓:<input placeholder="firstname" v-model="firstname"> <br>
        名:<input placeholder="lastname" v-model="lastname"><br>
        <span>全名：{{ fullname }}</span><br>
        <button @click="changeName">修改名字</button>
    </div>
</template>

<script lang="ts" setup name='compute'>

import { ref, reactive, computed } from 'vue'

let firstname = ref('summer')
let lastname = ref('liuguang')

let fullname = computed({
    get() {
        return firstname.value.slice(0, 1).toUpperCase() + firstname.value.slice(1) + '-' + lastname.value
    },

    set(val) {
        const x = val.split('-')
        firstname.value = x[0]
        lastname.value = x[1]

    }
})
function changeName() {
    fullname.value = 'li-si'
}
console.log(fullname.value)
</script>

<style scoped>
.test {
    margin-top: 10px;
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}
</style>