import Link from "next/link"
import dayjs from "dayjs"
import { getLocale, getTranslations } from "next-intl/server"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"

import CourseStatusChip from "@/app/_components/courses/CourseStatusChip"
import CourseTeachers from "@/app/_components/courses/CourseTeachers"
import { Button } from "@/components/ui/button"
import { Language } from "@/app/_types/Language"
import { CourseQuery } from "@/app/_types/queriesTypes"
import SwapIcon from "@/app/_components/SwapIcon"
import AnimatedCourseCard from "./AnimatedCourseCard"


interface CourseCardProps {
    course: CourseQuery,
    /**If true then means the card will be shown inside course page
     * 
     * so title and course status chip will be hidden,
     * 
     * in addition to view button
     */
    inCourse?: boolean
}


const CourseCard: React.FC<CourseCardProps> = async ({
    course,
    inCourse = false
}) => {
    const locale = (await getLocale()) as Language
    const t = await getTranslations()

    return (
        
        <AnimatedCourseCard>

            {/**Course title and status (Not started, on going and completed) */}
            {!inCourse && 
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-medium text-[var(--color-grey-900)]">{course.title}</h1>
                    <CourseStatusChip startDate={course.startDate} endDate={course.endDate} />
                </div>
            }


            {/**Course details grid */}
            <div className="grid grid-cols-2 items-start gap-x-4 gap-y-3">


                {/* Item 1: Subject */}
                <div className="flex flex-col">
                    <span className="text-sm text-[var(--color-grey-500)]">{t('subject')}</span>
                    <span className="font-medium text-[var(--color-grey-900)]">{course.Subject[locale]}</span>
                </div>

                {/* Item 2: Number of Lessons */}
                <div className="flex flex-col">
                    <span className="text-sm text-[var(--color-grey-500)]">{t('numberOfLessons')}</span>
                    <span className="font-medium text-[var(--color-grey-900)]">{course.numberOfLessons}</span>
                </div>

                {/* Item 3: Start Date */}
                <div className="flex flex-col">
                    <span className="text-sm text-[var(--color-grey-500)]">{t('startDate')}</span>
                    <span className="font-medium text-[var(--color-grey-900)]">{dayjs(course.startDate).format('DD/MM/YYYY')}</span>
                </div>

                {/* Item 4: End Date */}
                <div className="flex flex-col">
                    <span className="text-sm text-[var(--color-grey-500)]">{t('endDate')}</span>
                    <span className="font-medium text-[var(--color-grey-900)]">{dayjs(course.endDate).format('DD/MM/YYYY')}</span>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-[var(--color-grey-200)]" />

            {/**Teachers */}
            <div className="flex justify-between items-center gap-1.5">
                <CourseTeachers teachers={course.Teachers} title={course.title} />

                {!inCourse && <div className="w-1/4">
                    <Button
                        variant="secondary"
                        asChild
                    >
                        <Link href={`/app/courses/${course.id}`}>
                            <span className="text-sm"> {t('details')} </span>
                            <SwapIcon
                                ltrIcon={<HiChevronRight className="h-3 w-3" />}
                                rtlIcon={<HiChevronLeft className="h-3 w-3" />}
                            />
                        </Link>
                    </Button>
                </div>}
            </div>

        </AnimatedCourseCard>
    )
}

export default CourseCard