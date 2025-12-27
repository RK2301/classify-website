import { formatTimeDiff } from "@/app/_utils/date-helpers"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

/**This custom hook receive a date time and return as string the difference between now time and the given time
 * 
 * string formatted as HH:mm:ss
 * 
 * the hook wil run as long as start date is a valid string date, to calculte the diff between now and the given time
 * 
 * @example
 * let's say start is: '2025-08-01T15:00:00.000Z' and now is '2025-08-01T16:00:00.000Z'
 * so will return 1:00:00 and will keep run to calculte the difference ...
 * so 1:00:01 1:00:02 and so on ....
 * hook will stop when start become undefined or null
*/
export const useDuration = (start?: string) => {

    const [duration, setDuration] = useState<string | null>()

    useEffect(() => {

        //check if start time is exists
        //if so then need to start a timer that update duration every second
        if (start) {
            const id = setInterval(() => {

                //call to cal the duration and set it as duration
                const formatedDuration = formatTimeDiff(dayjs(start), dayjs())
                setDuration(formatedDuration)
            }, 1000)

            return () => clearInterval(id)
        }

    }, [start])

    return duration
}