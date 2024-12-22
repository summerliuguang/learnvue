<template>
    <div class="mainhomepage">
        <articledetail />
        <articledetail />
        <articledetail />
        <articledetail />
        <articledetail />
        <articledetail />
    </div>
</template>

<script lang='ts' setup name='mainhomepage'>
import articledetail from '@/components/articledetail.vue';
</script>

<style scoped>
.mainhomepage {
    flex:1;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    padding: 20px;
}
</style>