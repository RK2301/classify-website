'use client'

import { useState } from "react"
import dayjs from "dayjs"
import { useLocale, useTranslations } from "next-intl"
import { MdCalendarToday } from "react-icons/md"

import { Lesson } from "@rkh-ms/classify-lib/interfaces"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

import { Calendar } from "@/components/ui/calendar"
import List from "@/app/_components/List"
import { Separator } from "@/components/ui/separator"
import LessonStatusIndicator from "@/app/_components/courses/course_details/LessonStatusIndicator"
import Restricted from "@/app/_components/access_control/Restricted"
import { usePermission } from "@/app/_hooks/use-permission"
import LessonStatusLegend from "@/app/_components/courses/course_details/LessonStatusLegend"
import LessonDropMenu from "@/app/_components/courses/course_details/lessons/LessonDropMenu"
import WrappedEmpty from "@/app/_components/WrappedEmpty"
import AddLesson from "./AddLesson"





interface LessonsCalendarProps {
    lessons: Lesson[],
    courseId: number
}


const LessonsCalendar: React.FC<LessonsCalendarProps> = ({ lessons, courseId }) => {

    const [selected, setSelected] = useState<Date>(new Date())
    const locale = useLocale()
    const t = useTranslations()

    /**lessons of the selected day */
    const lessonOfDay = lessons.filter(lesson => dayjs(lesson.startTime).isSame(selected, 'day'))

    /**if current user is manager, then show ellipsis in the right side of the lesson info,
     * 
     * if not then show the lesson status
     */
    const isManager = usePermission(Actions.readAny, Resources.Lesson)

    return (
        <div className="xl:px-9 w-full
        flex flex-col items-center gap-6">

            <div className="flex flex-col items-center gap-2 w-full">
                <Calendar
                    mode='single'
                    selected={selected}
                    onSelect={setSelected}
                    // onMonthChange={(newMonth: Date) => console.log(newMonth)}
                    required
                    className="w-full xl:w-3/4"

                    modifiers={{
                        hasLesson: (date: Date) => {
                            return lessons.some(lesson => dayjs(lesson.startTime).isSame(date, 'day'))
                        }
                    }}
                    modifiersClassNames={{
                        hasLesson: 'text-brand-400 font-medium italic'
                    }}
                />


                {/**show add lesson button only for manager */}
                <Restricted action={Actions.createAny} resource={Resources.Lesson}>
                    <div className="flex flex-row-reverse justify-start w-full">
                        <div className="basis-1/4">
                            <AddLesson date={selected} courseId={courseId} />
                        </div>
                    </div>
                </Restricted>
            </div>

            {/**list of lessons for the selected day */}
            {lessonOfDay.length > 0 && (<div className="flex flex-col gap-2.5 w-full">
                <List>
                    {lessonOfDay.map(lesson => {

                        const startTime = dayjs(lesson.startTime).format('HH:mm')
                        const endTime = dayjs(lesson.endTime).format('HH:mm')

                        const lessonDay = new Intl.DateTimeFormat(locale, { weekday: 'long' })
                            .format(dayjs(lesson.startTime).toDate())

                        let lessonDiff = dayjs(lesson.endTime).diff(dayjs(lesson.startTime))

                        const hour = Math.floor(lessonDiff / 1000 / 60 / 60)
                        lessonDiff = lessonDiff - (hour * 60 * 60 * 1000)
                        const min = Math.floor(lessonDiff / 1000 / 60)

                        const lessonDuration = `${hour}:${min < 10 ? `0${min}` : min}`


                        return (
                            <List.ListItem key={lesson.id} className="py-2 lg:px-7 w-full">
                                <div className="flex items-center justify-between">


                                    <div className="flex flex-col gap-0.5">

                                        {/**Lesson status, start and end time */}
                                        <div className="flex items-center gap-5">
                                            <div className="flex items-center gap-1.5
                                                            font-medium text-lg">
                                                <span>{startTime}</span>
                                                <span>-</span>
                                                <span>{endTime}</span>
                                            </div>


                                            {/**lesson status, only for managers, will be next to lesson time */}
                                            <Restricted action={Actions.readAny} resource={Resources.Lesson}>
                                                <LessonStatusIndicator status={lesson.status} label />
                                            </Restricted>
                                        </div>

                                        {/**day and duartion */}
                                        <div className="flex items-center gap-2 
                                                    text-[var(--color-grey-500)] h-5">
                                            <span>{lessonDay}</span>

                                            <Separator orientation='vertical' />

                                            {/**duration */}
                                            <span>{lessonDuration}</span>
                                        </div>
                                    </div>

                                    {/**if manager then show 3 dots, for menu
                                     * if not then show the lesson status
                                    */}
                                    {isManager ? <LessonDropMenu lesson={lesson} />
                                        : <LessonStatusIndicator status={lesson.status} label />}

                                </div>
                            </List.ListItem>
                        )
                    })}
                </List>

                {/**for small screen show lessons legend (showing what each color status mean) */}
                <div className="lg:hidden">
                    <LessonStatusLegend />
                </div>

            </div>)}

            {/**if no lessons found for the selected date, then show empty message */}
            {lessonOfDay.length === 0 &&
                <WrappedEmpty
                    className="md:p-1"
                    Icon={MdCalendarToday}
                    title={t('emptyLessonDateTitle')}
                    description={t('emptyLessonDateDescription', {
                        date: dayjs(selected).format('DD/MM/YYYY')
                    })}
                />}

        </div>
    )
}


export default LessonsCalendar