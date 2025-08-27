<template>
    <el-card>
        <div class="mt">
            <span class="title">Category</span>
            <el-tag type="info" class="mr" v-for="item in articleTag.category">{{ item }}</el-tag>
        </div>
        <div class="mt">
            <span class="title">Priority</span>
            <el-tag type="info" class="mr" v-for="item in articleTag.priority">{{ item }}</el-tag>
        </div>
        <div class="mt">
            <span class="title">Distribution</span>
            <el-tag type="primary" class="ml mr">All</el-tag>
            <el-tag type="info" class="mr" v-for="item in articleTag.distribution">{{ item }}</el-tag>
        </div>
        <el-divider/>
        <div class="mt">
            <span class="title">Selected</span>
            <el-tag type="success" class="mr" closable>Example</el-tag>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import { articleCategoryApi } from '@/api/document';
import { onMounted,ref } from 'vue';

interface ArticleTagType{
    category: string[],
    priority: string[],
    distribution: string[]
}
const articleTag = ref<ArticleTagType>({
    category: [],
    priority: [],
    distribution:[]
})

onMounted(async() => {
    try {
        const {data} = await articleCategoryApi()
        articleTag.value=data
    } catch (error) {
        console.log(error)
    }
})
</script>

<style lang="less" scoped>
.title{
    display: inline-block;
    width: 80px;
    font-size: 14px;
}
</style>