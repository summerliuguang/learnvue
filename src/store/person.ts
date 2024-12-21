import { defineStore } from "pinia";

// Options API
/*
export const usePersonStore = defineStore('person',
    {
        actions: {
            plus(value: number) {
                this.age += value
            }
        },
        state() {
            return {
                name: 'liuguang',
                age: 18,
                talkList: JSON.parse(localStorage.getItem('talkList') as string) || [{ id: "593991fd-3523-489c-937b-83b8f0f122e9", content: "十年磨一剑，霜刃未曾试。" }]
            }
        }
    }
)
*/

// Composition API

import { reactive, ref } from "vue"
import { v4 as uuidv4 } from 'uuid'
import axios from "axios"
export const usePersonStore = defineStore('person', () => {
    let age = ref(18)
    let name = ref('liuguang')

    const talkList = reactive(JSON.parse(localStorage.getItem('talkList') as string) || [{ id: "593991fd-3523-489c-937b-83b8f0f122e9", content: "十年磨一剑，霜刃未曾试。" }])

    function plus(value: number) {
        age.value += value
    }

    async function getTalk() {
        let { data: { content } } = await axios.get('https://v1.jinrishici.com/all.json')
        let obj = { id: uuidv4(), content: content }
        talkList.unshift(obj)
    }

    return { name, age, talkList, plus, getTalk }
}
)