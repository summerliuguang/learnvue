<template>
    <div class="gamecontainer">
        <RouterView/>
    </div>
</template>

<script lang='ts' setup name='gamepage'>
import { RouterView } from 'vue-router';
</script>

<style scoped>
.gamecontainer {
    flex: 1;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
}
</style>