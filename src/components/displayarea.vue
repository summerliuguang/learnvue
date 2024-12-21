<template>
    <div class="display">
        <h2>路由页面</h2>
        <div class="nav">
            <RouterLink to="/home" active-class="active">首页</RouterLink>
            <RouterLink :to="{path:'/news'}" active-class="active">新闻</RouterLink>
            <RouterLink :to="{name:'guanyu'}" active-class="active">关于</RouterLink>
        </div>
        <div class="displaycontent">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref,onMounted} from 'vue'
import { RouterView, RouterLink,useRouter} from 'vue-router';
export default {
    name: 'diaplayarea'
}
</script>

<script lang='ts' setup>
const router = useRouter()
// onMounted(()=>{
//   setTimeout(() => {
//     router.push('/news')
    
//   }, 3000);
// })
</script>

<style scoped>
.display {
    background-color: aliceblue;
    width: 80vw;
    min-height: 400px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: 0px 0px 10px black;
    position: relative;
    display: flex;
    flex-direction: column;
}

h2 {
    text-align: center;
}

.nav {
    text-align: center;
    margin: 5px 0;
}

.nav a {
    color: lightslategray;
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 5px;
    background-color: rgba(211, 211, 211, 0.6);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    text-decoration-line: none;
}

.nav a:hover {
    background-color: rgba(211, 211, 211, 0.8);
    color: rgba(0, 0, 0, 0.5);
}

.nav .active {
    background-color: rgba(48, 214, 26, 0.5);
}

.nav .active:hover {
    background-color: rgba(48, 214, 26, 0.5);
}

.displaycontent {
    flex: 1;
    margin: 10px;
    border-radius: 20px;
    /* border: 1px solid black; */
    padding: 10px;
    display: flex;
}
</style>