<template>
    <el-row>
        <el-col :span="6">
            <el-card>
                <el-input style="width:80%;" placeholder="Enter Key Words" v-model="filterText">
                    <template #append>
                        <el-button icon="Search"></el-button>
                    </template>
                </el-input>
                <el-tree 
                style="max-width: 600px;" 
                :props="defaultProps"
                ></el-tree>
            </el-card>
        </el-col>
        <el-col :span="18"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const filterText = ref<string>("")

const defaultProps = {
    children: "",
    label:""
}
</script>