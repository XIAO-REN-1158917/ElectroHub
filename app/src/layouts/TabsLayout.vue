<template>
    <el-tabs
        v-model="currentTab.name"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
        closable
        @tab-remove="remove"
    >
        <el-tab-pane 
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        >
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>&nbsp{{ item.name }}</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
    <RouterView/>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store/tabs';
import { useUserStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore()
const {menu} = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const { tabs, currentTab } = storeToRefs(tabsStore)
const {setCurrentTab,addTab,removeTab} = tabsStore
const handleClick = ({ index }: { index: number }) => {
    router.push(tabs.value[index].url)
    setCurrentTab(tabs.value[index].name,tabs.value[index].url)
}
const remove = (TabPaneName:string) => {
    removeTab(TabPaneName)
    router.push(currentTab.value.url)
}

function findObjectByUrl(arr:any[], url:string) {
    for (const item of arr) {
        if (item.url === url) {
            return item
        }
        if (item.children) {
            const found:any = findObjectByUrl(item.children, url)
            if (found) {
                return found
            }
        }
    }
    return null
}

const { name, url, icon } = findObjectByUrl(menu.value, route.path)
addTab(name, url, icon)
setCurrentTab(name,url)

</script>

<style lang="less" scoped>
.demo-tabs{
    :deep(.is-active) {
        background-color: rgb(34, 136, 255) !important;
        color: #fff !important;
    }
}
</style>