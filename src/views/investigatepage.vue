<template>
    <div class="investigate">
        <div class="nav">
            <h2>项目</h2>
            <button @click="routeTo('/investigate/userdata')">个人信息</button>
            <button @click="routeTo('/investigate/poemlist')">古诗一言</button>
            <button @click="routeTo('/investigate/news')">新闻公告</button>
            <button @click="routeTo('/investigate/signup')">登陆/注册</button>
        </div>
        <div class="investigatearea">
            <RouterView />
        </div>

    </div>
</template>

<script lang='ts' setup name='investigatepage'>
import { RouterView, useRouter } from 'vue-router';
const router = useRouter()
function routeTo(path: string) {
    router.push(path)
}
</script>

<style scoped>
.investigate {
    width: 100%;
    flex-grow: 1;
    display: flex;
}

.nav {
    min-width: 100px;
    width: 200px;
    background-color: rgb(82, 90, 103);
    display: flex;
    flex-direction: column;
}

h2 {
    color: white;
    text-align: center;
    margin: 0;
    padding: 10px;
}

button {
    color: white;
    height: 40px;
    background-color: transparent;
    border: none;
    font-size: 20px;
}

button:hover {
    background-color: rgb(92, 103, 121);
}

.investigatearea {
    background-color: white;
    flex: 1;
    flex-grow: 1;
}

@media screen and (max-width: 768px) {
    .nav {
        min-width: 60px;
        width: 100px;
    }

    h2 {
        font-size: 1.2em;
    }

    button {
        font-size: 0.8em;
        height: 24px;
    }

}
</style>