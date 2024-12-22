<template>
    <div class="newscontainer">
    <div>
        <ul>
            <li v-for="news in newsList" :key="news.id">
                <!-- <RouterLink :to="`/investigate/news/querydetail?title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->
                <RouterLink :to="{
                    path: '/investigate/news/querydetail',
                    query: {
                        id: news.id,
                        title: news.title,
                        content: news.content
                    }
                }">
                    {{ news.title }}
                </RouterLink>
                <!-- <RouterLink :to="`/investigate/news/paramsdetail/${news.id}/${news.title}/${news.content}`">
                    {{ news.title }}
                </RouterLink> -->
                <!-- <RouterLink :to="{
                    name: 'propsdetail',
                    params: {
                        id: news.id,
                        title: news.title,
                        content: news.content
                    }
                }">
                    {{ news.title }}
                </RouterLink> -->
                <button class="shownews" @click="shownews(news)">查看</button>
            </li>
        </ul>
    </div>
    <div class="newcontent">
        <RouterView></RouterView>
    </div>
</div>
</template>

<script lang='ts' setup name='news'>

import { onMounted, onUnmounted, reactive } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router';

const newsList = reactive([
    { id: 'news01', title: '突发，这一千套房', content: '全部免费送' },
    { id: 'news02', title: '重要通知', content: '今天是周五' },
    { id: 'news03', title: '错过等一年', content: '明天就是冬至了' },
    { id: 'news04', title: '为什么流光不睡觉', content: '在学习vue' }
])

const router = useRouter()

interface NewsInter {
    id: string,
    title: string,
    content: string
}
function shownews(news: NewsInter) {
    router.replace(
        {
            path: '/investigate/news/querydetail',
            query: {
                id: news.id,
                title: news.title,
                content: news.content
            }
        }
    )
}
</script>

<style scoped>
.newscontainer {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    padding: 20px;
}
li {
    min-width: 200px;
    list-style-type: none;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
}

a {
    color: rgb(6, 100, 100);
    text-decoration-line: none;
    font-weight: 500;
}

a:hover {
    font-size: large;
}

.newcontent {
    /* border: 1px solid black; */
    flex-grow: 1;
    margin-left: 20px;
    border-radius: 16px;
    padding: 12px;
}

.shownews {
    border: none;
    box-shadow: 2px 2px 5px black;
    padding: 2px;
    border-radius: 5px;
    margin-right: 8px;
    margin-left: auto;
}

.shownews:hover {
    scale: 110%;
}
</style>