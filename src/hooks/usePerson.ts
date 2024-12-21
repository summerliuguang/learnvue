import { ref, reactive, watch } from 'vue'
import { usePersonStore } from '@/store/person'

const personStore = usePersonStore()

export default function () {
    let person = reactive({
        name: personStore.name,
        age: personStore.age
    })

    function changeName( name = 'liuguang') {
        personStore.name = name
    }

    function addAge(year = 1) {
        personStore.age += year
    }
    function minusAge(year = 1) {
        personStore.age -= year
        if (personStore.age <= 0 ) personStore.age = 0
    }

    return {person,addAge,minusAge,changeName}
}
