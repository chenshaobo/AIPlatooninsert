<template>
    <mt-tab-container v-model="active">
        <mt-tab-container-item id="我的">
            <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="关于">
            <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
            <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
        </mt-tab-container-item>
    </mt-tab-container>
</template>


<script>
    export default {
        name: 'tabbarContainer',
        data() {
            return {
                selected: '我的'
            };
        }
    };
</script>

<style>

</style>