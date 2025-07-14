import type { Ref } from "vue";
import { onBeforeUnmount, onMounted, ref,markRaw } from "vue";
import * as echarts from 'echarts'


export function useChart(chartRef:Ref<HTMLElement|null>,getChartOptions: () => Promise<any>) {
    const chartInstance = ref<echarts.ECharts | null>(null)
    

    const initChart = async () => {
        if (chartRef.value) {
            const options = await getChartOptions();
            // Turn off Vue reactivity to avoid conflicts with ECharts reactivity.
            chartInstance.value = markRaw(echarts.init(chartRef.value));
            chartInstance.value.setOption(options);
        }
    }

    const resizeChart = () => {
        chartInstance.value?.resize()
    }

    onMounted(() => {
        initChart()
        window.addEventListener("resize",resizeChart)
    })

    // To prevent memory leaks.
    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeChart)
        if (chartInstance.value) {
            chartInstance.value.dispose()
        }
    })

}