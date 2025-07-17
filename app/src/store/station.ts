import { defineStore } from "pinia";
import type { RowType } from "@/types/station";
import { ref } from "vue";

export const useStationStore = defineStore("station", () => {
    // Using ref here to reassign the whole value, rather than using reactive.
    const rowData = ref<RowType>({
        name: "",
        id: "",
        city: "",
        fast: "",
        slow: "",
        status: 1,
        inUse: "",
        fault: "",
        person: "",
        tel: ""
    });

    const setRowData = (row: RowType) => {
        rowData.value = row
    };

    const resetFormData = () => {
        rowData.value = {
            name: "",
            id: "",
            city: "",
            fast: "",
            slow: "",
            status: 1,
            inUse: "",
            fault: "",
            person: "",
            tel: ""
        }
    }


    return {
        rowData,
        setRowData,
        resetFormData
    }

})