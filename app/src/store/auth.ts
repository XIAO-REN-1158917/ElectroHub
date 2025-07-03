import { defineStore } from "pinia";

// Both Options and Composition are used in this project to demonstrate the author's understanding of both styles.
// However, in real-world development, typically only one approach is chosen for consistency.
export const useUserStore = defineStore("user", {
    state: () => ({
        token: null,
        roles: [],
        username: "",
        menu: []
    }),
    actions: {

    }
})