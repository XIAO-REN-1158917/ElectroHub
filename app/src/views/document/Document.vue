<template>
    <el-card>
        <!-- Tag-Category -->
        <div class="mt">
            <span class="title">Category</span>
            <el-tag :type="currentTagIndex[0]===-1?'primary':'info'" class="ml mr" @click="handleSelectTag(-1,0,'')">Default</el-tag>
            <el-tag 
            :type="currentTagIndex[0]===index?'primary':'info'" 
            class="mr" 
            v-for="(item,index) in articleTag.category"
            @click="handleSelectTag(index,0,item)"
            >{{ item }}</el-tag>
        </div>

        <!-- Tag-Priority -->
        <div class="mt">
            <span class="title">Priority</span>
            <el-tag :type="currentTagIndex[1]===-1?'primary':'info'" class="ml mr" @click="handleSelectTag(-1,1,'')">Default</el-tag>
            <el-tag 
            :type="currentTagIndex[1]===index?'primary':'info'" 
            class="mr" 
            v-for="(item,index) in articleTag.priority"
            @click="handleSelectTag(index,1,item)"
            >{{ item }}</el-tag>
        </div>

        <!-- Tag-Distribution -->
        <div class="mt">
            <span class="title">Distribution</span>
            <el-tag :type="currentTagIndex[2]===-1?'primary':'info'" class="ml mr" @click="handleSelectTag(-1,2,'')">Default</el-tag>
            <el-tag 
            :type="currentTagIndex[2]===index?'primary':'info'" 
            class="mr" 
            v-for="(item,index) in articleTag.distribution"
            @click="handleSelectTag(index,2,item)"
            >{{ item }}</el-tag>
        </div>
        <el-divider/>

        <!-- Selected Tag -->
        <div class="mt">
            <span class="title">Selected</span>
            <el-tag 
            type="success" 
            class="mr" 
            closable
            v-for="item in selectedTagArray"
            :key="item.group"
            @close="handleClose(item.group)"
            >{{ item.tag }}</el-tag>
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

interface SelectedTagType{
    tag: string,
    group:number
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

const currentTagIndex = ref([-1, -1, -1])
const selectedTagArray=ref<SelectedTagType[]>([])

const handleSelectTag = (tagIndex: number, group: number, tag: string) => {
    currentTagIndex.value[group] = tagIndex

    const existedIndex = selectedTagArray.value.findIndex((item: SelectedTagType) => item.group === group)

    if (!tag) {// select Default
        selectedTagArray.value = selectedTagArray.value.filter((item: SelectedTagType) => item.group != group)
    } else {
        if (existedIndex === -1) {
            selectedTagArray.value.push({ tag, group })
        } else {
            selectedTagArray.value[existedIndex] = { tag, group }
        }
    }

}
const handleClose=(group:number)=>{
    selectedTagArray.value=selectedTagArray.value.filter((item:SelectedTagType)=>item.group!=group);
    currentTagIndex.value[group]=-1
}



</script>

<style lang="less" scoped>
.title{
    display: inline-block;
    width: 80px;
    font-size: 14px;
}
.el-tag{
    cursor: pointer;
}
</style>