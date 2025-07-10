import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/layouts/DefaultLayout.vue"),
        redirect: "/dashboard",
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: () => import("@/views/dashboard/DashBoard.vue")
            },
            {
                path: "/chargingstation/monitor",
                name: "monitor",
                component: () => import("@/views/chargingstation/Monitor.vue")
            },
            {
                path: "/chargingstation/revenue",
                name: "revenue",
                component: () => import("@/views/chargingstation/Revenue.vue")
            },
            {
                path: "/chargingstation/fault",
                name: "faultReport",
                component: () => import("@/views/chargingstation/FaultReport.vue")
            },
            {
                path: "/map",
                name: "map",
                component: () => import("@/views/map/ElectornicMap.vue")
            },
            {
                path: "/operations/orders",
                name: "orders",
                component: () => import("@/views/operations/Orders.vue")
            },
            {
                path: "/operations/detail",
                name: "detail",
                component: () => import("@/views/operations/Detail.vue")
            },
            {
                path: "/operations/total",
                name: "total",
                component: () => import("@/views/operations/Total.vue")
            },
            {
                path: "/alarm",
                name: "alarm",
                component: () => import("@/views/alarm/Alarm.vue")
            },
            {
                path: "/equipment",
                name: "equipment",
                component: () => import("@/views/equipment/Equipment.vue")
            },
            {
                path: "/document",
                name: "document",
                component: () => import("@/views/document/Document.vue")
            },
            {
                path: "/system",
                name: "system",
                component: () => import("@/views/system/System.vue")
            },
            {
                path: "/personal",
                name: "personal",
                component: () => import("@/views/personal/Personal.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue")
    },
    {
        path: "/:pathMacth(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue")
    }
]

export default routes