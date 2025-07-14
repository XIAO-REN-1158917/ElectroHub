import { get } from "@/utils/http"

const Api = {
    LineChartData: "/lineChartData"
} as const;

function lineChartDataApi() {
    return get(Api.LineChartData)
}

export {lineChartDataApi}