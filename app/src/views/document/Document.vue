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
    <el-button type="primary" class="mt mb" @click="exportToHtml">Export to HTML</el-button>
    <Editor
        v-model="editorContent"
        api-key="jfd1rnfkcxg1krkdxq6aeh72f87kdkzrbi2t1v9oe3zb3n0g"
        :init="{
            toolbar_mode: 'sliding',
            plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
            ],
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
            ],
            uploadcare_public_key: 'b409000d8d22794a3d8a',
        }"
    />
    <el-button type="primary" @click="handleSubmit" class="mt"  v-permission="'user'">Submit</el-button>
</template>

<script lang="ts" setup>
import { articleCategoryApi } from '@/api/document';
import { onMounted, ref } from 'vue';
import Editor from '@tinymce/tinymce-vue'

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

const editorContent = ref("")
const exportToHtml = () => {
    const blob = new Blob([editorContent.value], { type: "type/html" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download="article.html";
    link.click();
    URL.revokeObjectURL(link.href)
}

const handleSubmit=()=>{
    console.log( selectedTagArray.value.map(item=>item.tag))
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