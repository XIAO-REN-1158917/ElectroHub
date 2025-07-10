import router from "./index";
import { useUserStore } from "@/store/auth";

router.beforeEach((to) => {
    const userStore = useUserStore();
    const isLogin = userStore.token;

    if (!isLogin) {
        if (to.path !== "/login") {
            return { path: "/login" }
        }
    } else {
        if (to.path === "/login") {
            return { path: "/" }
        }
        //First, check if the route has a meta property. 
        // If it does, and the required permissions do not include the user's existing permissions, 
        // deny access and redirect to the homepage.
        if (to.meta?.needAuth && !userStore.roles.some((role: string) => (to.meta.needAuth as string[]).includes(role))) {
            return { path: "/" }
        }
    }
})

// It's worth noting that, in most cases, the backend still verifies the token,
// so even if the roles property is manually modified in local, unauthorised access is still not possible.