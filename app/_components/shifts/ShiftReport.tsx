import dayjs from "dayjs"
import { getLocale, getTranslations } from "next-intl/server"
import { LucideCalendarX } from "lucide-react"

import { ShiftQuery } from "@rkh-ms/classify-lib"

import { SearchParams } from "@/app/_utils/SearchParams"
import List from "@/app/_components/List"
import DayShifts from "@/app/_components/shifts/DayShifts"
import WrappedEmpty from "@/app/_components/WrappedEmpty"


interface ShiftReportProps {
    shifts: ShiftQuery[],
    searchParams: { [key: string]: string | string[] | undefined }
}

/**This component show shifts report
 * 
 * shifts dispalyed relative to the date they created at
 */
const ShiftReport: React.FC<ShiftReportProps> = async ({ shifts, searchParams }) => {

    const locale = await getLocale()
    const t = await getTranslations()

    const params = searchParams

    //read year value from search params
    const month = params[SearchParams.month] || new Date().getMonth() + 1

    //read month value from search params
    const year = params[SearchParams.year] || new Date().getFullYear()
    console.log(`the year is: ${year}`);

    //first of all calculate number of days for the given month
    const daysNum = dayjs(`${year}-${month}-1`).daysInMonth()


    /**array that have month days as numbers and their week day*/
    const monthDays = Array.from({ length: daysNum }).map((_, index) => ({
        /**nurmic value of the day
         * 
         * e.g. 1, 12 ....
         */
        day: index + 1,

        /**the day of the week
         * 
         * e.g. 9.8.2025 -> Saturday
         */
        weekDay: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(parseInt(year as string), parseInt(month as string) - 1, index + 1))
    }))
        .map(day => {
            //for Hebrew remove the "יום" for every week day
            if (locale === 'he')
                return {
                    ...day,
                    weekDay: day.weekDay.split(' ')[1]
                }
            return day
        })
        .reverse()
        .filter(day => {
            //if not same month or/ and year then return all days to display
            if (parseInt(String(month)) !== new Date().getMonth() + 1 || parseInt(String(year)) !== new Date().getFullYear())
                return true

            //same month and year then return days smaller or equal today
            //no need to show future days
            return day.day <= parseInt(dayjs().format('DD'))
        })


    /**Object where key is number of day and value is array of shifts that start at that day */
    const dayShifts = shifts.reduce<Record<number, ShiftQuery[]>>((acc, shift) => {

        //get the day the shift start
        const day = parseInt(dayjs(shift.startTime).format('DD'))

        //check if there already key of the day the shift start
        if (acc[day])
            acc[day].push(shift)
        else
            acc[day] = [shift]

        return acc
    }, {})


    return (
        <List
        //  className="bg-[var(--color-grey-0)] rounded-md p-3
        // flex flex-col gap-4"
        >
            {shifts.length > 0 && monthDays.map(day => (
                <List.ListItem
                    key={day.day}
                    className="flex gap-3 items-center p-2"
                >
                    <DayShifts
                        day={day}
                        dayShifts={dayShifts[day.day]}
                    />
                </List.ListItem>
            ))}

            {/**if no shifts found then show a message */}
            {shifts.length === 0 &&
                <List.ListItem
                    className="p-1"
                >
                    <WrappedEmpty
                        Icon={LucideCalendarX}
                        title={t('noShiftsFound')}
                        description=""
                    />

                </List.ListItem>
            }
        </List>
    )
}

export default ShiftReport