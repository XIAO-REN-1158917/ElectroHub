<template>
    <el-dialog 
    title="Manage Permission" 
    width="600px"
    :model-value="visible"
    @open="handleOpen"
    @close="handleClose"
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
        <el-card class="mt">
            <template #header>
                <div class="card-header">
                    <span>Button Permission</span>
                </div>
            </template>
            <el-checkbox-group v-model="initBtnAuth">
                <el-checkbox label="All" value="all"></el-checkbox>
                <el-checkbox label="Add" value="add"></el-checkbox>
                <el-checkbox label="Edit" value="edit"></el-checkbox>
                <el-checkbox label="Delete" value="delete"></el-checkbox>
            </el-checkbox-group>
        </el-card>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { ref } from "vue"
import { transformMenu } from '@/utils/transformMenu';

const props = defineProps<{
    visible: boolean,
    checkedKeys: string[],
    btnAuth: string[]
}>()

const userStore=useUserStore()
const { menu } = storeToRefs(userStore)

const treeData = ref(transformMenu(menu.value))
const treeRef = ref()
const initBtnAuth=ref<string[]>([])

const handleOpen = () => {
    // console.log(props.checkedKeys)
    treeRef.value.setCheckedKeys(props.checkedKeys)
    console.log("btnAuth:",props.btnAuth)
    initBtnAuth.value=props.btnAuth
}

const emit = defineEmits(["close"])
const handleClose = () => {
    emit("close")
}



</script>