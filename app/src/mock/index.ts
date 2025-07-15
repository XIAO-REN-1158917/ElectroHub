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
        name: "Charging Station",
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
                name: "Fault Report",
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
        name: "Charging Station",
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
                name: "Fault Report",
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
Mock.mock("https://www.demo.com/login", "post", (options: any) => {
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

// ECharts chart API - Line chart
Mock.mock("https://www.demo.com/lineChartData", "get", () => {
  return {
    code: 200,
    message: "Operation successful",
    data: {
      list: [
        { name: "Charging Volume", data: [20, 50, 30, 70, 60, 80, 40, 60, 50] },
        { name: "Charging Duration", data: [40, 60, 50, 80, 70, 90, 60, 70, 80] },
        { name: "Charging Power", data: [30, 40, 60, 50, 70, 20, 30, 40, 60] }
      ]
    }
  };
});

// ECharts chart API - Pie chart
Mock.mock("https://www.demo.com/pieChartData", 'get', () => {
  return {
    code: 200,
    message: 'Operation successful',
    data: {
      list: [
        { value: 35, name: 'Pile' },
        { value: 30, name: 'Station' },
        { value: 25, name: 'Pole' }
      ]
    }
  };
});

// ECharts chart API - Radar chart
Mock.mock("https://www.demo.com/radarChartData", 'get', () => {
  return {
    code: 200,
    message: 'Operation successful',
    data: {
      list: [42, 30, 200, 350, 500, 180]
    }
  };
});

// Mock data - Station list
let chargingStation = [
  {
    name: "RapidCharge Power Spot",
    id: "VXZ10001",
    city: "New Plymouth",
    fast: 93,
    slow: 39,
    status: 2,
    now: 7,
    fault: 3,
    person: "Mia Thomas",
    tel: 25109209,
  },
  {
    name: "EcoCharge Charging Hub",
    id: "VXZ10002",
    city: "Rotorua",
    fast: 93,
    slow: 30,
    status: 4,
    now: 16,
    fault: 1,
    person: "Amelia Martin",
    tel: 23490692,
  },
  {
    name: "EcoCharge Charge Zone",
    id: "VXZ10003",
    city: "Invercargill",
    fast: 83,
    slow: 35,
    status: 3,
    now: 11,
    fault: 0,
    person: "Isabella Moore",
    tel: 25213909,
  },
  {
    name: "PowerBay EV Station",
    id: "VXZ10004",
    city: "Nelson",
    fast: 93,
    slow: 38,
    status: 4,
    now: 11,
    fault: 3,
    person: "Lucas Taylor",
    tel: 25022225,
  },
  {
    name: "EcoCharge Charge Zone",
    id: "VXZ10005",
    city: "Wellington",
    fast: 85,
    slow: 33,
    status: 3,
    now: 15,
    fault: 1,
    person: "Isabella Moore",
    tel: 28374253,
  },
  {
    name: "Greenlight Charge Zone",
    id: "VXZ10006",
    city: "Wellington",
    fast: 85,
    slow: 36,
    status: 5,
    now: 12,
    fault: 3,
    person: "Lucas Taylor",
    tel: 28765429,
  },
  {
    name: "GridGo Power Spot",
    id: "VXZ10007",
    city: "New Plymouth",
    fast: 88,
    slow: 30,
    status: 4,
    now: 10,
    fault: 0,
    person: "Lucas Taylor",
    tel: 28435666,
  },
  {
    name: "RapidCharge Energy Point",
    id: "VXZ10008",
    city: "Tauranga",
    fast: 70,
    slow: 35,
    status: 3,
    now: 18,
    fault: 2,
    person: "Lucas Taylor",
    tel: 21741695,
  },
  {
    name: "ChargePoint Electric Bay",
    id: "VXZ10009",
    city: "Wellington",
    fast: 95,
    slow: 40,
    status: 4,
    now: 15,
    fault: 2,
    person: "James Smith",
    tel: 29710406,
  },
  {
    name: "AmpStation Charge Zone",
    id: "VXZ10010",
    city: "Palmerston North",
    fast: 92,
    slow: 33,
    status: 4,
    now: 8,
    fault: 3,
    person: "Olivia Brown",
    tel: 29086525,
  },
  {
    name: "AmpStation Electric Bay",
    id: "VXZ10011",
    city: "Wellington",
    fast: 76,
    slow: 33,
    status: 5,
    now: 25,
    fault: 0,
    person: "Ethan Jackson",
    tel: 20305946,
  },
  {
    name: "PowerBay Electric Bay",
    id: "VXZ10012",
    city: "Christchurch",
    fast: 82,
    slow: 29,
    status: 3,
    now: 16,
    fault: 3,
    person: "Emma Wilson",
    tel: 22036243,
  },
  {
    name: "EcoCharge Charge Zone",
    id: "VXZ10013",
    city: "Tauranga",
    fast: 83,
    slow: 39,
    status: 3,
    now: 6,
    fault: 0,
    person: "Emma Wilson",
    tel: 27108017,
  },
  {
    name: "EcoCharge Electric Bay",
    id: "VXZ10014",
    city: "Nelson",
    fast: 74,
    slow: 37,
    status: 3,
    now: 18,
    fault: 2,
    person: "Emma Wilson",
    tel: 27355088,
  },
  {
    name: "ChargePoint Energy Point",
    id: "VXZ10015",
    city: "Rotorua",
    fast: 74,
    slow: 34,
    status: 5,
    now: 7,
    fault: 2,
    person: "Ava Miller",
    tel: 28679462,
  },
  {
    name: "ElectraStop Charge Zone",
    id: "VXZ10016",
    city: "Invercargill",
    fast: 74,
    slow: 32,
    status: 4,
    now: 6,
    fault: 2,
    person: "James Smith",
    tel: 26334107,
  },
  {
    name: "AmpStation Energy Point",
    id: "VXZ10017",
    city: "Wellington",
    fast: 87,
    slow: 30,
    status: 5,
    now: 9,
    fault: 1,
    person: "Charlotte White",
    tel: 23817581,
  },
  {
    name: "ElectraStop Power Spot",
    id: "VXZ10018",
    city: "Napier",
    fast: 78,
    slow: 33,
    status: 5,
    now: 11,
    fault: 0,
    person: "Noah Davis",
    tel: 27667091,
  },
  {
    name: "RapidCharge Electric Bay",
    id: "VXZ10019",
    city: "Napier",
    fast: 76,
    slow: 29,
    status: 2,
    now: 21,
    fault: 1,
    person: "Noah Davis",
    tel: 22213863,
  },
  {
    name: "VoltPort Power Spot",
    id: "VXZ10020",
    city: "Invercargill",
    fast: 95,
    slow: 34,
    status: 3,
    now: 12,
    fault: 1,
    person: "Logan Harris",
    tel: 21346019,
  },
  {
    name: "ChargePoint Energy Point",
    id: "VXZ10021",
    city: "Hamilton",
    fast: 88,
    slow: 28,
    status: 2,
    now: 11,
    fault: 0,
    person: "Noah Davis",
    tel: 24026672,
  },
  {
    name: "AmpStation Charge Zone",
    id: "VXZ10022",
    city: "Invercargill",
    fast: 87,
    slow: 37,
    status: 2,
    now: 9,
    fault: 2,
    person: "Liam Johnson",
    tel: 29945152,
  },
  {
    name: "AmpStation Charge Zone",
    id: "VXZ10023",
    city: "Napier",
    fast: 79,
    slow: 39,
    status: 3,
    now: 3,
    fault: 1,
    person: "Jacob Thompson",
    tel: 23201378,
  },
  {
    name: "RapidCharge EV Station",
    id: "VXZ10024",
    city: "Napier",
    fast: 75,
    slow: 34,
    status: 5,
    now: 25,
    fault: 3,
    person: "Isabella Moore",
    tel: 21659264,
  },
  {
    name: "GridGo Charging Hub",
    id: "VXZ10025",
    city: "Auckland",
    fast: 86,
    slow: 33,
    status: 4,
    now: 5,
    fault: 2,
    person: "Olivia Brown",
    tel: 29224657,
  },
  {
    name: "RapidCharge Power Spot",
    id: "VXZ10026",
    city: "Palmerston North",
    fast: 72,
    slow: 31,
    status: 5,
    now: 13,
    fault: 1,
    person: "Mia Thomas",
    tel: 21569493,
  },
  {
    name: "ElectraStop Charging Hub",
    id: "VXZ10027",
    city: "Dunedin",
    fast: 72,
    slow: 34,
    status: 4,
    now: 16,
    fault: 1,
    person: "Mason Anderson",
    tel: 26237417,
  },
  {
    name: "SparkHub Charging Hub",
    id: "VXZ10028",
    city: "Nelson",
    fast: 78,
    slow: 30,
    status: 3,
    now: 15,
    fault: 2,
    person: "Liam Johnson",
    tel: 25819993,
  },
  {
    name: "GridGo Charging Hub",
    id: "VXZ10029",
    city: "Palmerston North",
    fast: 75,
    slow: 40,
    status: 4,
    now: 10,
    fault: 3,
    person: "Liam Johnson",
    tel: 27716191,
  },
  {
    name: "Greenlight EV Station",
    id: "VXZ10030",
    city: "Auckland",
    fast: 73,
    slow: 37,
    status: 5,
    now: 19,
    fault: 0,
    person: "Logan Harris",
    tel: 27773318,
  },
  {
    name: "GridGo Electric Bay",
    id: "VXZ10031",
    city: "Auckland",
    fast: 73,
    slow: 28,
    status: 5,
    now: 23,
    fault: 2,
    person: "Emma Wilson",
    tel: 29810170,
  },
  {
    name: "ElectraStop Power Spot",
    id: "VXZ10032",
    city: "Hamilton",
    fast: 80,
    slow: 33,
    status: 4,
    now: 20,
    fault: 0,
    person: "Noah Davis",
    tel: 21624052,
  },
];
// Data backup
const originalChargingStation = JSON.parse(JSON.stringify(chargingStation));
// Station list API
Mock.mock("https://www.demo.com/stationList", 'post', (options: any) => {
  chargingStation = originalChargingStation
  const { id, name, status, page, pageSize } = options.body ? JSON.parse(options.body) : {}
  // Filter mock data based on query parameters (for demonstration only)
  if (id) {
    chargingStation = chargingStation.filter(item => item.id === id);
  }
  if (name) {
    chargingStation = chargingStation.filter(item => item.name.includes(name));
  }
  // If a specific status is selected (excluding 1 = 'All'), apply status filter
  if (status != 1) {
    chargingStation = chargingStation.filter(item => item.status === status);
  }
  // pagination
  const total = chargingStation.length;
  const start = (page - 1) * pageSize;
  const paginatedItems = chargingStation.slice(start, start + pageSize);
  return {
    code: 200,
    success: true,
    data: {
      list:paginatedItems,
      total
    },
  };
});