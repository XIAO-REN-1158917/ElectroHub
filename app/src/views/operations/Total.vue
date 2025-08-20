<template>
    <el-row>
        <el-col :span="6">
            <el-card>
                <el-input 
                style="width:80%;" 
                placeholder="Enter Key Words" 
                v-model="filterText">
                    <template #append>
                        <el-button icon="Search"></el-button>
                    </template>
                </el-input>
                <el-tree 
                ref="treeRef"
                class="mt"
                style="max-width: 600px;" 
                :props="defaultProps"
                :data="cityListData"
                :filter-node-method="filterNode"
                ></el-tree>
            </el-card>
        </el-col>
        <el-col :span="18"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import { cityListApi } from "@/api/operations"
import type {ElTree} from "element-plus"

interface CityListDataType {
    label: string,
    children?:CityListDataType
}

const filterText = ref<string>("")
const cityListData = ref<CityListDataType[]>([])
const treeRef = ref<InstanceType<typeof ElTree>>()

watch(filterText, (val) => {
    treeRef.value!.filter(val)
})

const defaultProps = {
    children: "children",
    label:"label"
}

onMounted(async() => {
    try { 
        const { data } = await cityListApi()
        cityListData.value=data
    } catch (error) {
        console.log(error)
    }
})

const filterNode = (value:string,data:CityListDataType) => {
    if (!value) return true
    return data.label.includes(value)
}
</script>