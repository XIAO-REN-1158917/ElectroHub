import Mock from "mockjs"
Mock.setup({
    timeout: "200-600" // Simulate network latency
})

// menulist for Admin
const menulist = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: "DataLine"
    },
    {
        name: "Charging Management",
        url: "/chargingstation",
        icon: "Lightning",
        children: [
            {
                name: "Monitor",
                url: "/chargingstation/monitor",
                icon: "VideoCamera"
            },
            {
                name: "Revenue",
                url: "/chargingstation/revenue",
                icon: "DataAnalysis"
            },
            {
                name: "Fault",
                url: "/chargingstation/fault",
                icon: "Warning"
            }
        ]
    },
    {
        name: "Map",
        url: "/map",
        icon: "MapLocation"
    },
    {
        name: "Operations",
        url: "/operations",
        icon: "Files",
        children: [
            {
                name: "Orders",
                url: "/operations/orders",
                icon: "DocumentCopy",
            },
            {
                name: "Detail",
                url: "/operations/detail",
                icon: "Share"
            },
            {
                name: "Total",
                url: "/operations/total",
                icon: "Money"
            },
        ]
    },
    {
        name: "Alarm",
        url: "/alarm",
        icon: "Phone"
    },
    {
        name: "Equipment",
        url: "/equipment",
        icon: "Magnet"
    },
    {
        name: "Document",
        url: "/document",
        icon: "Document"
    },
    {
        name: "Setting",
        url: "/system",
        icon: "Setting"
    },

    {
        name: "Personal",
        url: "/personal",
        icon: "User"
    },
]

// menulist for Operations Specialist
const menulist2 = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: "DataLine"
    },
    {
        name: "Charging Management",
        url: "/chargingstation",
        icon: "Lightning",
        children: [
            {
                name: "Monitor",
                url: "/chargingstation/monitor",
                icon: "VideoCamera"
            },
            {
                name: "Revenue",
                url: "/chargingstation/revenue",
                icon: "DataAnalysis"
            },
            {
                name: "Fault",
                url: "/chargingstation/fault",
                icon: "Warning"
            }
        ]
    },
    {
        name: "Map",
        url: "/map",
        icon: "MapLocation"
    },
    {
        name: "Operations",
        url: "/operations",
        icon: "Files",
        children: [
            {
                name: "Orders",
                url: "/operations/orders",
                icon: "DocumentCopy",
            },
            {
                name: "Detail",
                url: "/operations/detail",
                icon: "Share"
            },
            {
                name: "Total",
                url: "/operations/total",
                icon: "Money"
            },
        ]
    },
    {
        name: "Alarm",
        url: "/alarm",
        icon: "Phone"
    },
    {
        name: "Equipment",
        url: "/equipment",
        icon: "Magnet"
    },
    {
        name: "Personal",
        url: "/personal",
        icon: "User"
    },
]

// Login interface
Mock.mock("http://www.demo.com/login", "post", (options: any) => {
    const { username, password } = JSON.parse(options.body);
    if (username === "admin" && password === "admin123123") {
        return {
            code: 200,
            message: "Login successfully",
            data: {
                token: "token",
                user: {
                    username: "Admin",
                    roles: ["admin"]
                },
                menulist
            }
        }
    } else if (username === "user" && password === "user123123") {
        return {
            code: 200,
            message: "Login successfully",
            data: {
                token: "token",
                user: {
                    username: "Staff",
                    roles: ["user"]
                },
                menulist: menulist2
            }
        }
    } else {
        return {
            code: 401,
            message: "Invalid username or password."
        }
    }

})