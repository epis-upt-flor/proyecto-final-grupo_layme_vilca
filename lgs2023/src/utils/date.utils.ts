import { Interval , DateTime } from 'luxon'
export default abstract class DateUtils {
    static getDatesFromRange(start : DateTime){
        const dates = Interval.fromDateTimes(start,start.plus({days : 7}))
        return dates.splitBy({day : 1}).map(date => ({
            date : date.start?.toISODate(),
            name : date.start?.weekdayLong?.substring(0,2).toUpperCase()
        }))
    }
}