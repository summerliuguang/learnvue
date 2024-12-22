<template>
    <div class="article-container">
        <article class="article">
            <header>
                <h2>{{ title }}</h2>
                <div class="tags">
                    <span>#测试</span>
                    <span>#动漫</span>
                    <span>#网页</span>
                    <span>#笔记</span>
                </div>
            </header>
            <div class="content">
                {{ content }}
            </div>
            <footer class="article-footer">
                <span>liuguang</span>
                <span>发表于 2024.12.03</span>
            </footer>
        </article>
        <div class="article-image">
            <img src="/src/resources/cover.png" alt="右侧图片">
        </div>
    </div>
</template>

<script lang="ts" setup name="articledetail">

import { ref } from 'vue'

let title = ref('冬眠不觉晓')
let content = ref('冬眠不觉晓，冷月伴清宵。枝影霜华覆，梦中听鹊噪。寒梅开暗香，飞雪映山腰。待到春雷动，心随新绿飘。')

</script>
<style scoped>
.article-container {
    display: flex;
    background-color: #fff;
    padding: 1.2em;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    width: 390px;
    max-width: 460px;
    max-height: 300px;
    aspect-ratio: 16/10;
    overflow: hidden;
    flex-grow: 1;
    box-sizing: border-box;
}

.article {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}

.article header {
    text-align: center;
}

.article h2 {
    font-size: 1.4em;
    margin: 0 0 0.2em;
}

.tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.2em;
}

.tags span {
    background: #f2f2f2;
    color: #666;
    border-radius: 0.4em;
    padding: 0.2em 0.4em;
    font-size: 1em;
}

.article .content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.1em;
    line-height: 1.5;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
    margin: auto 0;
}

.article .content:hover {
    color: dodgerblue;
}

.article-footer {
    font-size: 0.5em;
}

.article-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: right;
}

.article-image img {
    height: 100%;
    width: auto;
    border-radius: 10px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
    object-fit: cover;
    transition: transform 0.4s ease-in-out;
}

.article-image img:hover {
    height: 105%;
}
</style>