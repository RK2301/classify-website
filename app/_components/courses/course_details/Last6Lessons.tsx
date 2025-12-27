import dayjs from "dayjs"
import { getLocale, getTranslations } from "next-intl/server"

import { Lesson } from "@rkh-ms/classify-lib/interfaces"

import LessonStatusIndicator from "@/app/_components/courses/course_details/LessonStatusIndicator"
import LessonStatusLegend from "@/app/_components/courses/course_details/LessonStatusLegend"


interface Last6LessonsProps {
    lessons: Lesson[]
}


/**This component shows last 6 lessons data (in case lesson has less or equal 6, then all of them will be shown) */
const Last6Lessons: React.FC<Last6LessonsProps> = async ({ lessons }) => {

    const locale = await getLocale()
    const t = await getTranslations()

    return (
        <div className="flex flex-col gap-1">

            {/**Title */}
            <span className="text-sm">{t('latestLessons')}</span>


            {/**Lessons container */}
            <div
                className="
                grid grid-cols-3
                bg-[var(--color-grey-0)]
                rounded-xl
                border border-[var(--color-grey-200)]
                hover:shadow-lg transition-all duration-300
                overflow-hidden"
            >
                {lessons.map((lesson, index) => {
                    const lessonDate = dayjs(lesson.startTime)
                    const lessonDay = new Intl.DateTimeFormat(locale, { weekday: 'long' })
                        .format(lessonDate.toDate())

                    const startTime = dayjs(lesson.startTime).format('HH:mm')
                    const endTime = dayjs(lesson.endTime).format('HH:mm')

                    return (
                        <div
                            key={lesson.id}
                            className={`
                            flex flex-col justify-center items-center py-3
                            transition-all duration-150
                            hover:bg-[var(--color-grey-100)]/50
                            ${lessons.length > 3 && index < 3 ? 'border-b border-[var(--color-grey-200)]' : ''}
                        `}
                        >

                            {/* Date */}
                            <div
                                dir="ltr"
                                className="flex items-center gap-1.5
                                         px-2 py-0.5 rounded-md 
                                       bg-[var(--color-grey-200)]/40 dark:bg-[var(--color-grey-200)]/20
                                       relative"
                            >
                                <span className="font-semibold text-lg text-[var(--color-grey-900)]">
                                    {lessonDate.format('DD')}
                                </span>
                                <span className="text-sm text-[var(--color-grey-600)]">
                                    {lessonDate.format('MM')}
                                </span>

                                {/**Lesson status as a colored dot */}
                                <div className="absolute top-0 -left-2">
                                    <LessonStatusIndicator status={lesson.status} />
                                </div>
                            </div>

                            {/* Day */}
                            <span className="font-semibold mt-1 text-[var(--color-grey-900)]">
                                {lessonDay}
                            </span>

                            {/* Time */}
                            <div className="flex items-center gap-1 text-sm mt-0.5 text-[var(--color-grey-500)]">
                                <span>{startTime}</span>
                                <span>-</span>
                                <span>{endTime}</span>
                            </div>

                        </div>
                    )
                })}
            </div>

            {/**Show status legend */}
            <LessonStatusLegend />

        </div>
    )
}

export default Last6Lessons
