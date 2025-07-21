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
    inUse: 7,
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
    inUse: 16,
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
    inUse: 11,
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
    inUse: 11,
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
    inUse: 15,
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
    inUse: 12,
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
    inUse: 10,
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
    inUse: 18,
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
    inUse: 15,
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
    inUse: 8,
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
    inUse: 25,
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
    inUse: 16,
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
    inUse: 6,
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
    inUse: 18,
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
    inUse: 7,
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
    inUse: 6,
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
    inUse: 9,
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
    inUse: 11,
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
    inUse: 21,
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
    inUse: 12,
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
    inUse: 11,
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
    inUse: 9,
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
    inUse: 3,
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
    inUse: 25,
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
    inUse: 5,
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
    inUse: 13,
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
    inUse: 16,
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
    inUse: 15,
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
    inUse: 10,
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
    inUse: 19,
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
    inUse: 23,
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
    inUse: 20,
    fault: 0,
    person: "Noah Davis",
    tel: 21624052,
  },
];
// Data backup
const originalChargingStation = JSON.parse(JSON.stringify(chargingStation));
// Station list API
Mock.mock("https://www.demo.com/station", 'post', (options: any) => {
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

//Add/Edit station
Mock.mock("https://www.demo.com/station/edit", 'post', (options: any) => {
    const res: any = JSON.parse(options.body);
    //Print the added or edited data here to indicate that the backend has received it.
  console.log("add/edit:",res)
  return {
    code: 200,
    success: true,
    data: "successful",
  };
});

//Delete station
Mock.mock("https://www.demo.com/station/delete", "post", (options: any) => {
  console.log("Delete Station", JSON.parse(options.body))
  return {
    code: 200,
    success: true,
    data: "successful",
  };
})

//Revenue Report - EChart
Mock.mock("https://www.demo.com/revenueChart", "get", () => {
  return {
    code: 200,
    success: true,
    data: {
      list:[
        {
          name:"Sales",
          data:[60, 40, 120, 140, 160, 80, 140]
        },
        {
          name:"Views",
          data:[600, 400, 600, 700, 800, 400, 700]
        },
      ]
    }
  };
})

// Mock data for revenue list
let chargingStation2 = [
  {
    "name": "Highland Ridge Hub",
    "id": "VXZ10001",
    "city": "Hastings",
    "count": 135,
    "electricity": 7563,
    "parkingFee": 2356,
    "serviceFee": 5633,
    "month": 2155,
    "member": 2698,
    "percent": -5.3,
    "mpercent": 2.3
  },
  {
    "name": "Evergreen Plug-in Point",
    "id": "VXZ10002",
    "city": "Tauranga",
    "count": 125,
    "electricity": 8000,
    "parkingFee": 3000,
    "serviceFee": 7000,
    "month": 5000,
    "member": 3500,
    "percent": 2.5,
    "mpercent": 2.4
  },
  {
    "name": "Brookside EV Depot",
    "id": "VXZ10003",
    "city": "Palmerston North",
    "count": 123,
    "electricity": 8200,
    "parkingFee": 3100,
    "serviceFee": 7100,
    "month": 5200,
    "member": 3600,
    "percent": 3.0,
    "mpercent": 3.5
  },
  {
    "name": "Seaside Ridge Station",
    "id": "VXZ10004",
    "city": "New Plymouth",
    "count": 110,
    "electricity": 7800,
    "parkingFee": 2900,
    "serviceFee": 6900,
    "month": 4900,
    "member": 3400,
    "percent": -1.8,
    "mpercent": -2.6
  },
  {
    "name": "Hilltop Charge Dock",
    "id": "VXZ10005",
    "city": "Blenheim",
    "count": 125,
    "electricity": 8300,
    "parkingFee": 3200,
    "serviceFee": 7200,
    "month": 5300,
    "member": 3700,
    "percent": 3.5,
    "mpercent": -0.1
  },
  {
    "name": "Skyline Peak EV Bay",
    "id": "VXZ10006",
    "city": "Timaru",
    "count": 115,
    "electricity": 7900,
    "parkingFee": 2950,
    "serviceFee": 7050,
    "month": 5100,
    "member": 3450,
    "percent": -2.2,
    "mpercent": -0.8
  },
  {
    "name": "Coastal View Station",
    "id": "VXZ10007",
    "city": "Taupo",
    "count": 104,
    "electricity": 7600,
    "parkingFee": 2800,
    "serviceFee": 6800,
    "month": 4800,
    "member": 3300,
    "percent": 1.5,
    "mpercent": 0.7
  },
  {
    "name": "Summit Peak Station",
    "id": "VXZ10008",
    "city": "Gisborne",
    "count": 129,
    "electricity": 8400,
    "parkingFee": 3250,
    "serviceFee": 7250,
    "month": 5400,
    "member": 3750,
    "percent": 4.0,
    "mpercent": 6.2
  },
  {
    "name": "Lakewood Charge Hub",
    "id": "VXZ10009",
    "city": "Whangarei",
    "count": 123,
    "electricity": 8150,
    "parkingFee": 3100,
    "serviceFee": 7100,
    "month": 5150,
    "member": 3500,
    "percent": -2.8,
    "mpercent": -0.4
  },
  {
    "name": "Meadowlands Charging Port",
    "id": "VXZ10010",
    "city": "Napier",
    "count": 123,
    "electricity": 8100,
    "parkingFee": 3050,
    "serviceFee": 7050,
    "month": 5100,
    "member": 3450,
    "percent": 2.7,
    "mpercent": 3.4
  },
  {
    "name": "Bluehaven Station",
    "id": "VXZ10011",
    "city": "Christchurch",
    "count": 102,
    "electricity": 7400,
    "parkingFee": 2700,
    "serviceFee": 6700,
    "month": 4700,
    "member": 3250,
    "percent": 1.2,
    "mpercent": 0.6
  },
  {
    "name": "Glenridge EV Center",
    "id": "VXZ10012",
    "city": "Dunedin",
    "count": 107,
    "electricity": 7650,
    "parkingFee": 2850,
    "serviceFee": 6850,
    "month": 4850,
    "member": 3350,
    "percent": 1.7,
    "mpercent": 1.3
  },
  {
    "name": "Westport Electric Point",
    "id": "VXZ10013",
    "city": "Nelson",
    "count": 100,
    "electricity": 7200,
    "parkingFee": 2600,
    "serviceFee": 6600,
    "month": 4600,
    "member": 3200,
    "percent": -0.9,
    "mpercent": 0.5
  },
  {
    "name": "Pinehill EV Centre",
    "id": "VXZ10014",
    "city": "Whanganui",
    "count": 117,
    "electricity": 7950,
    "parkingFee": 3000,
    "serviceFee": 7100,
    "month": 5150,
    "member": 3500,
    "percent": 2.6,
    "mpercent": 3.1
  },
  {
    "name": "Windmere Charging Bay",
    "id": "VXZ10015",
    "city": "Auckland",
    "count": 106,
    "electricity": 7700,
    "parkingFee": 2800,
    "serviceFee": 6900,
    "month": 4950,
    "member": 3400,
    "percent": 2.0,
    "mpercent": -1.5
  },
  {
    "name": "Northfield Charger",
    "id": "VXZ10016",
    "city": "Invercargill",
    "count": 115,
    "electricity": 7900,
    "parkingFee": 2950,
    "serviceFee": 7050,
    "month": 5100,
    "member": 3450,
    "percent": 2.3,
    "mpercent": 0.9
  },
  {
    "name": "Central Loop Hub",
    "id": "VXZ10017",
    "city": "Rotorua",
    "count": 112,
    "electricity": 7800,
    "parkingFee": 2900,
    "serviceFee": 7000,
    "month": 5050,
    "member": 3400,
    "percent": -2.1,
    "mpercent": 0.8
  },
  {
    "name": "Riverbend Charging Dock",
    "id": "VXZ10018",
    "city": "Wellington",
    "count": 117,
    "electricity": 7900,
    "parkingFee": 2950,
    "serviceFee": 7050,
    "month": 5100,
    "member": 3450,
    "percent": -2.4,
    "mpercent": -2.7
  },
  {
    "name": "Harbour Drive Station",
    "id": "VXZ10019",
    "city": "Hamilton",
    "count": 112,
    "electricity": 7750,
    "parkingFee": 2850,
    "serviceFee": 6950,
    "month": 4950,
    "member": 3350,
    "percent": -1.9,
    "mpercent": -1.1
  },
  {
    "name": "Foxhill Charging Point",
    "id": "VXZ10020",
    "city": "Queenstown",
    "count": 107,
    "electricity": 7650,
    "parkingFee": 2800,
    "serviceFee": 6800,
    "month": 4850,
    "member": 3300,
    "percent": 1.6,
    "mpercent": -0.9
  },
  {
    "name": "Stonebridge Station",
    "id": "VXZ10021",
    "city": "Hastings",
    "count": 103,
    "electricity": 7500,
    "parkingFee": 2750,
    "serviceFee": 6750,
    "month": 4750,
    "member": 3250,
    "percent": 1.3,
    "mpercent": 2.8
  },
  {
    "name": "Southridge Charging Point",
    "id": "VXZ10022",
    "city": "Tauranga",
    "count": 126,
    "electricity": 8200,
    "parkingFee": 3150,
    "serviceFee": 7150,
    "month": 5200,
    "member": 3550,
    "percent": 3.1,
    "mpercent": 4.4
  },
  {
    "name": "Greenway Charging Hub",
    "id": "VXZ10023",
    "city": "Palmerston North",
    "count": 132,
    "electricity": 8400,
    "parkingFee": 3250,
    "serviceFee": 7250,
    "month": 5350,
    "member": 3650,
    "percent": -3.7,
    "mpercent": -5.5
  },
  {
    "name": "Clearwater Station",
    "id": "VXZ10024",
    "city": "New Plymouth",
    "count": 108,
    "electricity": 7700,
    "parkingFee": 2850,
    "serviceFee": 6850,
    "month": 4900,
    "member": 3350,
    "percent": 1.8,
    "mpercent": -2.3
  },
  {
    "name": "Oakridge EV Spot",
    "id": "VXZ10025",
    "city": "Blenheim",
    "count": 113,
    "electricity": 7850,
    "parkingFee": 2950,
    "serviceFee": 6950,
    "month": 5050,
    "member": 3400,
    "percent": 2.0,
    "mpercent": 2.2
  },
  {
    "name": "Oceanview Plug-in Hub",
    "id": "VXZ10026",
    "city": "Timaru",
    "count": 123,
    "electricity": 8100,
    "parkingFee": 3050,
    "serviceFee": 7050,
    "month": 5150,
    "member": 3500,
    "percent": -2.8,
    "mpercent": -3.2
  },
  {
    "name": "Silverlake EV Station",
    "id": "VXZ10027",
    "city": "Taupo",
    "count": 120,
    "electricity": 8000,
    "parkingFee": 3000,
    "serviceFee": 7000,
    "month": 5100,
    "member": 3450,
    "percent": 2.4,
    "mpercent": 0.8
  },
  {
    "name": "Redcliff Charger Port",
    "id": "VXZ10028",
    "city": "Gisborne",
    "count": 117,
    "electricity": 7950,
    "parkingFee": 3000,
    "serviceFee": 7100,
    "month": 5150,
    "member": 3500,
    "percent": 2.6,
    "mpercent": 3.9
  },
  {
    "name": "Sunset Valley Station",
    "id": "VXZ10029",
    "city": "Whangarei",
    "count": 130,
    "electricity": 8250,
    "parkingFee": 3150,
    "serviceFee": 7150,
    "month": 5250,
    "member": 3550,
    "percent": -3.4,
    "mpercent": -2.3
  },
  {
    "name": "Meadowfield Station",
    "id": "VXZ10030",
    "city": "Napier",
    "count": 114,
    "electricity": 7850,
    "parkingFee": 2950,
    "serviceFee": 6950,
    "month": 5050,
    "member": 3400,
    "percent": 2.2,
    "mpercent": -1.4
  },
  {
    "name": "Fernhill Charger Bay",
    "id": "VXZ10031",
    "city": "Christchurch",
    "count": 114,
    "electricity": 7850,
    "parkingFee": 2950,
    "serviceFee": 6950,
    "month": 5050,
    "member": 3400,
    "percent": 2.2,
    "mpercent": 1.8
  },
  {
    "name": "Maple Junction Station",
    "id": "VXZ10032",
    "city": "Dunedin",
    "count": 129,
    "electricity": 8350,
    "parkingFee": 3200,
    "serviceFee": 7200,
    "month": 5300,
    "member": 3600,
    "percent": -3.6,
    "mpercent": -2.6
  }
];

// backup
const originalChargingStation2 = JSON.parse(JSON.stringify(chargingStation2));
// revenue list API
Mock.mock("https://www.demo.com/revenueList", 'post', (options: any) => {
  chargingStation2 = originalChargingStation2
  const { name = "", page = 1, pageSize = 10 } = options.body ? JSON.parse(options.body) : {}
  // filter
  console.log("revenue statistic",name,page,pageSize)
  if (name) {
    chargingStation2 = chargingStation2.filter(item => item.name.includes(name));
  }
  // pagination
  const total = chargingStation2.length;
  const start = (page - 1) * pageSize;
  const paginatedItems = chargingStation2.slice(start, start + pageSize);
  return {
    code: 200,
    success: true,
    data:{
      list:paginatedItems,
      total,
    }  
  };
});


let chargingPile = [
  {
    id: "VXZ10001",
    name: "UrbanChargeHub50",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1,
        record:[
            {time:"12:08:17",msg:"Charged 80 kWh, cost $80."},
            {time:"13:12:09",msg:"Charged50kWh，cost $50."},
            {time:"13:15:22",msg:"Charged60kWh，cost $60."},
            {time:"16:22:33",msg:"Charged70kWh，cost $70."},
            {time:"17:27:17",msg:"Charged90kWh，cost $90."},
            {time:"18:08:33",msg:"Charged100kWh，cost $100."},
        ]
      },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "29°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "30°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10002",
    name: "PowerStation70",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "27°c", status: 6 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },

    ],
  },
  {
    id: "VXZ10003",
    name: "HyperChargePort21",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
     
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10004",
    name: "FastPowerPoint7",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10005",
    name: "UrbanPowerPoint1",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10006",
    name: "FastGridPoint82",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10007",
    name: "BlueEnergySpot63",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10008",
    name: "HyperVoltBase17",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10009",
    name: "SmartVoltBase16",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10010",
    name: "SolarEnergySpot86",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10011",
    name: "HyperStation3",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10012",
    name: "SmartGridPoint94",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10013",
    name: "SolarPowerPoint18",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10014",
    name: "UrbanStation52",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10015",
    name: "HyperPowerDock52",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10016",
    name: "SolarPowerPoint53",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10017",
    name: "GreenPowerPoint5",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10018",
    name: "SmartVoltBase73",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10019",
    name: "SmartPowerDock66",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10020",
    name: "PowerGridPoint53",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10021",
    name: "FastChargeHub25",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10022",
    name: "PowerChargeHub10",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10023",
    name: "GreenChargeHub44",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10024",
    name: "SmartGridPoint30",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10025",
    name: "GreenChargePort29",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10026",
    name: "GreenChargePort67",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10027",
    name: "SmartGridPoint92",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10028",
    name: "BlueEnergySpot42",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10029",
    name: "SolarGridPoint30",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10030",
    name: "UrbanChargePort3",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10031",
    name: "SmartEnergySpot19",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10032",
    name: "PowerGridPoint38",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
]
//Charging pile list API
Mock.mock("https://www.demo.com/currentList", "post", () => {
  return {
    code: 200,
    success: true,
    data: chargingPile
  }
})