import dayjs from "dayjs"
import { useLocale } from "next-intl"

import { LessonStatus } from "@rkh-ms/classify-lib/enums"
import { Lesson } from "@rkh-ms/classify-lib/interfaces"

import { cn } from "@/lib/utils"
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams"
import { SearchParams } from "@/app/_utils/SearchParams"
import LessonStatusIndicator from "../LessonStatusIndicator"


interface LessonItemProps {
    lesson: Lesson
}

/**This component shows a lesson info inside a lessons carousel, for reporting attendance */
const LessonItem: React.FC<LessonItemProps> = ({ lesson }) => {

    const locale = useLocale()
    const { setSearchParam, getSearchParam } = useClassifyCustomSearchParams()

    /**whenever this lesson selected to display it's attendance */
    const selected = Number(getSearchParam(SearchParams.Id)) === lesson.id

    /**if lesson is cancelled or scheduled, then a request to report attendance for
     * the lesson should be disabled
     */
    const disabled = lesson.status === LessonStatus.CANCELLED ||
        lesson.status === LessonStatus.SCHEDULED

    const lessonDate = dayjs(lesson.startTime)
    const lessonDay = new Intl.DateTimeFormat(locale, { weekday: 'long' })
        .format(lessonDate.toDate())

    const startTime = dayjs(lesson.startTime).format('HH:mm')
    const endTime = dayjs(lesson.endTime).format('HH:mm')

    /**when a lesson selected to report a attendace
     * then put it's id in search params
     */
    const onSelect = () => {
        if (disabled) return
        setSearchParam(SearchParams.Id, String(lesson.id))
    }


    return (
        <div
            key={lesson.id}
            onClick={onSelect}
            className={cn(
                // Base Layout & Shape
                "group relative flex flex-col items-center gap-1  py-3 px-4 rounded-xl border cursor-pointer transition-all duration-300 ease-out",

                // Default Colors (Unselected) - using transparent border to prevent layout shift
                "bg-[var(--color-grey-0)] border-transparent",

                // Hover State (Unselected)
                !selected && "hover:border-[var(--color-grey-200)] hover:bg-[var(--color-grey-50)]",

                // Selected State - Modern "Tint & Glow" look
                selected && [
                    "border-[var(--color-brand-500)]",
                    // We use an arbitrary value for opacity here since your CSS vars might not support tailwind opacity syntax directly without config
                    // If tailwind opacity works for you, use bg-brand-500/10. If not, use this color-mix:
                    "bg-[color-mix(in_srgb,var(--color-brand-500),transparent_85%)]",
                    "shadow-[0_0_15px_-3px_rgba(63,114,175,0.15)]" // Subtle brand glow
                ],

                // Disabled State
                disabled && "opacity-50 cursor-not-allowed hover:border-transparent hover:bg-[var(--color-grey-0)]"
            )}

        >
            {/**lesson day */}
            <span className="text-gray-500 dark:text-gray-400 text-sm">
                {lessonDay}
            </span>

            {/**lesson date */}
            <div className={cn(`relative font-medium text-xl transition-colors`)}>
                <span>{lessonDate.format('DD/MM')}</span>

                {/**Lesson status */}
                <div className="absolute top-0 -end-2">
                    <LessonStatusIndicator status={lesson.status} />
                </div>
            </div>

            {/**lesson time */}
            <div className="flex gap-1 items-center text-gray-500 dark:text-gray-400 ">
                <span>{startTime}</span>
                <span className="opacity-50">-</span>
                <span>{endTime}</span>
            </div>

        </div>
    )
}

export default LessonItem