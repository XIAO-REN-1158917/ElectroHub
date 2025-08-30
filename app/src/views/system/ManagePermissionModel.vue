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
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="$emit('close')">Cancel</el-button>
                <el-button type="primary" @click="handleSubmit">Submit</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { ref } from "vue"
import { transformMenu } from '@/utils/transformMenu';
import { editAuthApi } from '@/api/system';
import { ElMessage } from 'element-plus';

const props = defineProps<{
    visible: boolean,
    checkedKeys: string[],
    btnAuth: string[],
    account:string
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

const emit = defineEmits(["close","reload"])
const handleClose = () => {
    emit("close")
}
const handleSubmit=async() => {
    try {
        const res = await editAuthApi(props.account, initBtnAuth.value, treeRef.value.getCheckedKeys(true))
        if (res.code === 200) {
            ElMessage({
                message: res.message,
                type:"success"
            })
            emit("close")
            emit("reload")
        }
    } catch (error) {
        console.log(error)
    }
 }


</script>