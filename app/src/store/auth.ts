import { defineStore } from "pinia";
import { loginApi } from "@/api/user";
import { useTabsStore } from "@/store/tabs";



interface LoginParams {
    username: string;
    password: string
}
// Both Options and Composition are used in this project to demonstrate the author's understanding of both styles.
// However, in real-world development, typically only one approach is chosen for consistency.
export const useUserStore = defineStore("user", {
    state: () => ({
        token: sessionStorage.getItem("token") || "",
        roles: sessionStorage.getItem("roles") ? JSON.parse(sessionStorage.getItem("roles")!) : [],
        username: sessionStorage.getItem("username") || "",
        menu: sessionStorage.getItem("menu") ? JSON.parse(sessionStorage.getItem("menu")!) : [],
    }),
    actions: {
        async login(data: LoginParams) {
            try {
                const { data: { token, user: { username, roles }, menulist } } = await loginApi(data);
                this.token = token
                this.roles = roles
                this.menu = menulist
                this.username = username
                sessionStorage.setItem("token", token)
                sessionStorage.setItem("roles", JSON.stringify(roles))
                sessionStorage.setItem("username", username)
                sessionStorage.setItem("menu", JSON.stringify(menulist))
            } catch (error) {
            }
        },

        reset() {
            this.token = "";
            this.roles = [];
            this.username = "";
            this.menu = [];
        },

        logout() {
            this.reset();
            sessionStorage.clear()
            const tabsStore = useTabsStore();
            tabsStore.reset();
        }
    }
})