<template>
    <el-menu>
        <!-- To maintain consistency with the Element Plus component sytle -->
        <!-- <menu-item> is used here, but <MenuItem> would also work. -->
        <menu-item v-for="item in menuItems" :item="item" :key="item.url"></menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/auth';
import MenuItem from './MenuItem.vue';

const userStore = useUserStore();
const menuItems = userStore.menu;
console.log(userStore.menu);
</script>