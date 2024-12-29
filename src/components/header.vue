<template>
    <header class="nav-header">
        <div class="header-title">
            <h1>夏日流光的个人网站</h1>
            <p>夏日流光</p>
            <nav>
                <RouterLink to="/home" active-class="active">首页</RouterLink>
                <RouterLink :to="{ name: 'investigate' }" active-class="active">探索</RouterLink>
                <RouterLink :to="{ path: '/game' }" active-class="active">游戏</RouterLink>
                <RouterLink :to="{ path: '/tool' }" active-class="active">工具</RouterLink>
            </nav>
        </div>
        <div class="backimg"></div>
    </header>
</template>

<script lang="ts" setup name='header'>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
* {
    color: whitesmoke;
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