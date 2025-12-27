import { MdWarningAmber } from "react-icons/md"


import { API } from "@rkh-ms/classify-lib/api"
import { Lesson } from "@rkh-ms/classify-lib/interfaces"

import getServerAxios from "@/app/_utils/getServerAxios"
import LessonsCarousel from "@/app/_components/courses/course_details/attendance/LessonsCarousel"
import { getTranslations } from "next-intl/server"
import { SearchParamsType } from "@/app/_types/searchParams"
import { SearchParams } from "@/app/_utils/SearchParams"
import WrappedEmpty from "@/app/_components/WrappedEmpty"
import LessonStatusLegend from "@/app/_components/courses/course_details/LessonStatusLegend"
import AttendanceList from "@/app/_components/courses/course_details/attendance/AttendanceList"



export const metadata = {
    title: 'Attendance'
}

type LessonsPageProps = {
    params: Promise<Record<string, string>>,
    searchParams: SearchParamsType
}



const AttendancePage: React.FC<LessonsPageProps> = async ({ params, searchParams }) => {

    const t = await getTranslations()

    const currentSearchParams = await searchParams
    const lessonId = Number(currentSearchParams[SearchParams.Id])

    const p = await params
    const courseId = Number(p.courseId)

    const axios = await getServerAxios()
    const { data } = await axios(API.lessons.getLessons(courseId))

    const lessons = data as Lesson[]

    return (
        <div className="flex flex-col gap-7">

            {/**title and description */}
            <div className="gap-1.5">
                <h1 className="font-semibold text-2xl">
                    {t('attendance')}
                </h1>

                <span className="font-medium text-[var(--color-grey-600)]">
                    {t('attendanceInstruction')}
                </span>
            </div>

            <div className="w-full flex flex-col gap-1.5">
                {/**Lessons data */}
                <LessonsCarousel lessons={lessons} />

                {/**lessons status legend */}
                <LessonStatusLegend />
            </div>


            {/**Attendance list*/}
            {
                Number.isNaN(lessonId) ?
                    <WrappedEmpty
                        Icon={MdWarningAmber}
                        title={t('attendanceSelectLessonTitle')}
                        description={t('attendanceSelectLessonDescription')}
                    />
                    : <AttendanceList lessonId={lessonId} />
            }
        </div>
    )
}

export default AttendancePage