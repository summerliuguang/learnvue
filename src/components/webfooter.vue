<template>
    <footer>
        <div class="footer">
            <span>Copyright © 2024 夏日流光 版权所有</span>
        </div>
    </footer>
</template>

<script lang="ts" setup name='webfooter'>
</script>

<style scoped>
.footer {
    bottom: 0;
    left: 0;
    background-color: lightgray;
    color: white;
    text-align: center;
    padding: 10px;
    z-index: 1000;
}

.footer a {
    color: white;
    text-decoration: none;
}

.footer a:hover {
    color: rgb(105, 105, 240);
}

.footer img {
    width: 18px;
    margin-right: 8px;
    vertical-align: bottom;
}
</style>