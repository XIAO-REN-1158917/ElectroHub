<template>
    <div class="header">
        <div class="personal">
            <el-badge :is-dot="info>0" class="item">
                <el-icon><Bell /></el-icon>
            </el-badge>
            <el-avatar 
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            class="ml mr"
            />
            <!-- A static URL is used here for demonstration purposes; in a real project, this would be a dynamic URL. -->
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    Welcome, {{ username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="User" command="user">Personal</el-dropdown-item>
                        <el-dropdown-item icon="SwitchButton" command="logout">Logout</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

//A simple unread message count is set here for demonstration purposes. 
// In a real project, this number should be fetched from the backend.
const info = ref(1)
const userStore = useUserStore();
const { username } = storeToRefs(userStore);
const router = useRouter()

const handleCommand = (command:string) => {
    if (command == "user") {
        router.push("/personal")
    } else {
        userStore.logout()
        router.push("/login")
    }
}

</script>

<style lang="less" scoped>
.header{
    background-color: #fff;
    height: 60px;
    pad: 0 20px;
    .personal{
        float: right;
        display: flex;
        height: 60px;
        align-items: center;
        .item{
            margin-top: 10px;
        }
    }
}
</style>