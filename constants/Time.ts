
const convertTimestampDateToReadable = (date:Date):string => {
        const days = date.toLocaleDateString()
        const time = date.toLocaleTimeString()
        const time_separated = time.split(":")
        const hour = Number(time_separated[0])
        let hr = hour
        let suf = "AM"
        if (hour > 12) {
            hr = hour - 12
            suf = "PM"
        }
        if (hour === 12) { suf = "PM"}
        if (hour === 0) { hr = 12 }
        return `${days} ${hr}:${time_separated[1]}:${time_separated[2]} ${suf}`
}

export { convertTimestampDateToReadable }

export default {
    ONE_SECOND_IN_MS: 1000
}