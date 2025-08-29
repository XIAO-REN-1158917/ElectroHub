<template>
    <el-dialog 
    title="Manage Permission" 
    width="600px"
    :model-value="visible"
    @open="handleOpen"
    >
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>Page Permission</span>
                </div>
            </template>
            <el-tree
                ref="treeRef"
                show-checkbox
                style="max-width: 600px;"
                :data="treeData" 
                node-key="url"
            ></el-tree>
        </el-card>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { ref } from "vue"
import { transformMenu } from '@/utils/transformMenu';

const props = defineProps({
    visible: {
        type: Boolean,
        required:true
    },
    checkedKeys: {
        type: Array,
        required:true
    }
})

const userStore=useUserStore()
const { menu } = storeToRefs(userStore)

const treeData = ref(transformMenu(menu.value))
const treeRef = ref()

const handleOpen = () => {
    console.log(props.checkedKeys)
}

</script>