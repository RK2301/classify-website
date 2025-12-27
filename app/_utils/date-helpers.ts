//This file have functions to work with time properly in the app
//espically when work with times and convert them from UTC to local time

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const TIME_ZONE = 'Asia/Jerusalem';

/**This function receive a UTC string date and convert it to local time date */
export const convertUTCtoLocal = (date: string) => {
    return dayjs(date).tz(TIME_ZONE)
}

/**This function receive 2 dates and return the difference between them as HH:mm:ss
 * 
 * @param start the smallest date
 * @param end the geratest date value
 * 
 * @example
 * formatTimeDiff(daysjs('2025-08-07T15:00:00.000Z'), daysjs('2025-08-07T17:00:00.000Z'))
 * will return -> 2:00:00
 */
export const formatTimeDiff = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {

    //get the difference as milliseconds
    let diff = end.diff(start)

    //convert it to format HH:mm:ss
    const hourAsMM = 60 * 60 * 1000

    const hours = Math.floor(diff / hourAsMM)

    // now check if there are mm need to be converted to minutes 
    diff = diff % hourAsMM

    const minutesAsMM = 60 * 1000
    const minutes = Math.floor(diff / minutesAsMM)

    // now convert the mm to seconds
    diff = diff % minutesAsMM
    const seconds = Math.floor(diff / 1000)

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}