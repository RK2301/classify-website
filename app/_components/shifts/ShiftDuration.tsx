'use client'
import dayjs from "dayjs"

import { useDuration } from "./useDuration"
import { formatTimeDiff } from "@/app/_utils/date-helpers"

/**This component shows shift duration
 * 
 * when shift is already ended then will show the duration of the shift
 * 
 * when shift not yet ended then will show duration until now and will keep calculating
 */
const ShiftDuration = ({
    startTime,
    endTime
}: {
    startTime: string,
    endTime?: string | null
}) => {

    const duration = useDuration(endTime ? undefined : startTime)

    return (
        <span>{endTime ? formatTimeDiff(dayjs(startTime), dayjs(endTime)) : duration}</span>
    )

}

export default ShiftDuration