// field label map
const fieldLabelMap: Record<string, string> = {
    description: "Description",
    address: "Address",
    equNo: "Equi. No.",
    level: "Alarm Level",
    time: "Timestamp",
    code: "Alert Code",
    status: "Status",
}

const getFieldLabel = (key: string): string => {
    return fieldLabelMap[key] || key
}

// alert level map
const alarmLevelPropsMap: Record<number, string> = {
    1: "danger",
    2: "warning",
    3: "info"
}

const alarmLevelTextMap: Record<number, string> = {
    1: "Critical",
    2: "High",
    3: "Low"
}

const getAlarmLevelForProps = (key:number) => {
    return alarmLevelPropsMap[key] || key
}
const getAlarmLevelForText = (key:number) => {
    return alarmLevelTextMap[key] || key
}

//status map
const statusTextMap: Record<number, string> = {
    1: "Unassigned",
    2: "In Progress",
    3: "Processing Error"
}

const statusButtonMap: Record<number, string> = {
    1: "Assign",
    2: "Remind",
    3: "Check"
}

const getStatusFortext = (key:number) => {
    return statusTextMap[key] || key
}
const getStatusForButton = (key: number) => {
    return statusButtonMap[key] || key
}




export {
    getFieldLabel,
    getAlarmLevelForProps,
    getAlarmLevelForText,
    getStatusFortext,
    getStatusForButton
}