import { useUserStore } from "@/store/auth"


export default {
    beforeMount(el: any, bingding: any) {
        const userStore = useUserStore()
        const { roles } = userStore
        const requiredPermission = bingding.value
        if (!roles.includes(requiredPermission)) {
            el.style.display="none"
        }
    }
}