<template>
    <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input v-model.trim="searchParams.name" placeholder="Please enter name">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-select placeholder="Select Department" v-model="searchParams.department">
                        <el-option label="All" value=""></el-option>
                        <el-option label="Executive Office" value="Executive Office"></el-option>
                        <el-option label="Technical" value="Technical"></el-option>
                        <el-option label="Marketing" value="Marketing"></el-option>
                        <el-option label="Maintenance" value="Maintenance"></el-option>
                        <el-option label="Operations" value="Operations"></el-option>
                        <el-option label="Customer Service" value="Customer Service"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="loadData" >Filter</el-button>
                    <el-button @click="handleReset">Reset</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" v-loading="loading">
                <el-table-column type="index" label="#"/>
                <el-table-column prop="account" label="Account"></el-table-column>
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="phone" label="Phone"></el-table-column>
                <el-table-column prop="idNo" label="ID"></el-table-column>
                <el-table-column prop="position" label="Position">
                    <template #default="scope">
                        <el-tag type="primary">{{ scope.row.position }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="department" label="Department"></el-table-column>
                <el-table-column prop="pageAuthority" label="Access Page">
                    <template #default="scope">
                        <el-tag type="success">{{ scope.row.pageAuthority }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="btnAuthority" label="Access Button">
                    <template #default="scope">
                        <el-tag type="info">{{ scope.row.btnAuthority }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  label="Operate" width="340">
                <template #default="scope">
                    <el-button 
                    type="primary" 
                    size="small" 
                    @click="HandlePermissionManagementModel(scope.row.pageAuthority)">
                        Manage Permissions
                    </el-button>
                    <el-button type="danger" size="small">
                        Delete
                    </el-button>
                    <el-button type="danger" size="small">
                        Deactivate
                    </el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
                class="fr mt mb"
                v-model:current-page="pageInfo.page"
                v-model:page-size="pageInfo.pageSize"
                background
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total=totals
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-card>
        <ManagePermissionModel 
        :visible="visible" 
        :checked-keys="checkedKeys"
        :btn-auth="btnAuth"
        @close="visible=false"
        />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useQueryTable } from "@/hooks/useQueryTable"
import ManagePermissionModel from "./ManagePermissionModel.vue"
import { getUserAuthApi } from "@/api/system"
import type { MenuItem } from "@/types/user"

interface PermissionSearchParamsType{
    name: string,
    department:string
}

const searchParams = ref<PermissionSearchParamsType>({
    name: "",
    department:""
})

const { tableData, loading, loadData, totals, pageInfo, handleCurrentChange, handleSizeChange,resetPagination } = useQueryTable("/permissionList", searchParams)

const handleReset = () => {
    searchParams.value = {
        name: "",
        department:""
    }
    resetPagination()
}

const visible = ref<boolean>(false)

function getUrlFromMenu(menu: MenuItem[]) {
    const urls: string[] = []

    function traverse(node: MenuItem) {
        if (node.url && !node.children) {
            urls.push(node.url.trim())
        }
        if (node.children&&node.children.length>0) {
            node.children.forEach((child:MenuItem) => traverse(child));
        }
    }
    menu.forEach((node: MenuItem) => traverse(node))
    return urls
}

const checkedKeys = ref<string[]>([])
const btnAuth=ref<string[]>([])
const HandlePermissionManagementModel = async (pageAuthority:string) => {
    try {
        const { data: {list, btn} } = await getUserAuthApi(pageAuthority)
        // console.log(getUrlFromMenu(list))
        checkedKeys.value = getUrlFromMenu(list)
        btnAuth.value=btn
    } catch (error) {
        console.log(error)
    }
    visible.value = true
}

</script>