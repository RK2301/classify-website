'use client'
import { useRef, useState } from 'react'
import { DatesSetArg, EventInput } from '@fullcalendar/core/index.js'
import dayjs from 'dayjs'


import { getAllLessons } from '@/app/_actions/getAllLessons'
import { LessonCalendar } from '@/app/_types/queriesTypes'
import useRequest from '@/app/_hooks/use-request'
import { courseColor } from '@/app/_utils/course-color'
import LessonDialog from "@/app/_components/dashboard/LessonDialog"
import WrappedCalendar from '../WrappedCalendar'

/**structure of range state */
type Range = {
    start: Date,
    end: Date
}

const LessonsCalendar = () => {

    const [events, setEvents] = useState<EventInput[]>([])

    /**selected lesson to show it's details inside dialog */
    const [selectedLesson, setSelectedLesson] = useState<LessonCalendar | undefined>(undefined)
    /**dialog state */
    const [open, setOpen] = useState<boolean>(false)

    /**range of fetched lessons */
    const [range, setRange] = useState<Range | null>(null)


    /**Ref all lessons fetched, so later when user click specific event,
     * 
     * it's data will be shown inside a dialog
     */
    const lessonsRef = useRef<LessonCalendar[] | null>(null)

    const { doRequest } = useRequest<LessonCalendar[]>({
        // throw error, so can be handled and show error message in the calendar
        toThrowError: true,
        onSuccess: (res) => {
            if (!res) return

            //  set the ref current with the lessons fetched
            lessonsRef.current = res

            //  set events 
            setEvents(res.map(lesson => ({
                id: String(lesson.id),
                title: lesson.Course.title,
                start: dayjs(lesson.startTime).toDate(),
                end: dayjs(lesson.endTime).toDate(),
                backgroundColor: courseColor(lesson.course_id),
                textColor: "#334155", // slate-700 (readable),
            })))
        }
    })


    const loadLessons = async (range: Range) => {
        // make call to fetch lessons based on the current range
        try {
            await doRequest(() => getAllLessons(range.start, range.end))
        } catch (err) {
            console.error(err);
        }
    }

    /**A function to be called when a range in the calendar selected
     * 
     * based on the range, the events will be fetched
     * 
     * lessons will be fetched only if range is after| before the current range
     * 
     * otherwise no need to fetch again data from current range
     */
    const handleDatesSet = async (info: DatesSetArg) => {
        console.log(info);

        /**new range to set if need to update it & fetch data
         * the default is to always have lessons from prevoius month | current | next month
         */
        const newRange = {
            start: dayjs(info.start).subtract(1, 'month').startOf('month').toDate(),
            end: dayjs(info.start).add(1, 'month').endOf('month').toDate()
        }

        // if range is null then set the range to the range selected
        // (first render)
        if (!range) {
            setRange(newRange)
            loadLessons(newRange)
        }
        //  if the selected range is before the current or after the current range, then reset 
        //  the range to the new one
        else if (dayjs(info.start).isBefore(dayjs(range.start)) ||
            dayjs(info.end).isAfter(dayjs(range.end))) {

            setRange(newRange)
            loadLessons(newRange)
        }
    }



    return (
        <>
            <WrappedCalendar
                events={events}

                datesSet={handleDatesSet}
                eventClick={(event) => {
                    // when event clicked, open dialog to show it's details
                    setOpen(true)
                    setSelectedLesson(lessonsRef.current?.find(lesson => lesson.id === Number(event.event.id)))
                }}
            />

            <LessonDialog open={open} onOpenChange={setOpen} lesson={selectedLesson} />
        </>
    )
}

export default LessonsCalendar