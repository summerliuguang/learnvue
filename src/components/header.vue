<template>
    <header class="nav-header">
        <div class="header-title">
            <h1>夏日流光的个人网站</h1>
            <p>夏日流光</p>
            <nav>
                <a href="#">首页</a>
                <a href="#">文章</a>
            </nav>
        </div>
        <div class="backimg"></div>
    </header>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
    name: 'main_header'
}
</script>

<script lang="ts" setup>

let name = ref('bruce')
let age = ref(18)

function changeName() {
    name.value = 'ss'
}
function changeAge() {
    age.value++
}
</script>

<style scoped>

* {
    color:whitesmoke;
    text-shadow: 2px 2px 5px black;
}
.nav-header {
    text-align: center;
    width: 100%;
    height: 120px;
    background-color: gray;
    position: relative;
}

.backimg {
    width: 100%;
    height: 100%;
    background-image: url("@/resources/header.png");
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(1px);
    z-index: 0;
    overflow: hidden;
}

.header-title {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}

.header-title h1 {
    font-size: 2rem;
}

.header-title p {
    margin: 5px 0 0;
    font-size: 1rem;
}

nav {
    margin-top: 20px;
}

nav a {
    text-decoration: none;
    margin: 0 15px;
    font-size: 1rem;
}

nav a:hover {
    border-bottom: 2px solid white;
}
</style>