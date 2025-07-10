import { defineStore } from "pinia";
import { ref } from "vue";
import type { MenuItem } from "@/types/user";


export const useTabsStore = defineStore("tabs", () => {
    const tabs = ref<MenuItem[]>([]);

    const currentTab = ref<{ name: string, url: string }>({
        name: "",
        url: ""
    });

    const addTab = (name: string, url: string, icon: string) => {
        //If the currently accessed route is not in the stored tabs array, add it.
        if (!tabs.value.some((tab) => tab.url === url)) {
            tabs.value.push({ name, url, icon })
        }
    };

    const setCurrentTab = (name: string, url: string) => {
        currentTab.value = { name, url }
    };


    const removeTab = (name: string) => {
        if (currentTab.value.name !== name) return;

        const currentIndex = tabs.value.findIndex(tab => tab.name === name);
        if (tabs.value.length === 1) return;

        tabs.value = tabs.value.filter(tab => tab.name !== name);

        const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        currentTab.value = tabs.value[newIndex];
    };

    const reset = () => {
        tabs.value = [];
        currentTab.value = { name: "", url: "" };
    };


    return {
        tabs,
        addTab,
        currentTab,
        setCurrentTab,
        removeTab,
        reset
    }
})