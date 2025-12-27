import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { LucideBookOpen } from "lucide-react"

import { Actions, Resources } from '@rkh-ms/classify-lib/accesscontrol'
import { PaginationResponse } from "@rkh-ms/classify-lib"
import { API } from "@rkh-ms/classify-lib/api"

import getServerAxios from "@/app/_utils/getServerAxios"
import { Button } from "@/components/ui/button"
import { CourseQuery } from "@/app/_types/queriesTypes"
import CoursesContainer from "@/app/_components/courses/CoursesContainer"
import PaginationBar from "@/app/_components/PaginationBar"
import { SearchParamsType } from "@/app/_types/searchParams"
import { getSearchParams } from "@/app/_utils/getSearchParams"
import CoursesOperations from "@/app/_components/courses/CoursesOperations"
import RestrictedServer from "@/app/_components/access_control/RestrictedServer"
import WrappedEmpty from "@/app/_components/WrappedEmpty"



export const metadata = {
    title: 'Courses'
}



interface CoursesPageProps {
    searchParams: SearchParamsType
}



const CoursesPage: React.FC<CoursesPageProps> = async ({
    searchParams
}) => {

    const t = await getTranslations()

    const currentSearchParams = await searchParams
    const allSearchParams = getSearchParams(currentSearchParams)

    // fetch courses
    const axios = await getServerAxios()
    const { data } = await axios(API.courses.getCourses + (allSearchParams ? `?${allSearchParams}` : ''))
    const courses = data as PaginationResponse<CourseQuery>

    /**a key based on current params to force the animation of courses
     * 
     * to be played when params change (appliyng filters, changing page, etc)
     */
    const animationKey = JSON.stringify(currentSearchParams)

    return (
        <div className="flex flex-col gap-5 w-full">

            <div className="flex justify-between items-center gap-3">
                <div className="basis-auto">
                    <h1 className="text-2xl font-semibold">{t('courses')}</h1>
                </div>

                {/**Only manager can add courses */}
                <RestrictedServer action={Actions.createAny} resource={Resources.Course}>
                    <div className="basis-1/3 lg:basis-1/5">

                        <Link href='/app/courses/add'>
                            <Button>
                                {t('addCourse')}
                            </Button>
                        </Link>
                    </div>
                </RestrictedServer>
            </div>

            <CoursesOperations />

            {/**Courses List or Empty State */}
            {courses.rows.length > 0 && <CoursesContainer courses={courses.rows} cacheKey={animationKey}/>}
            {courses.rows.length === 0 &&
                <WrappedEmpty
                    Icon={LucideBookOpen}
                    title={t('emptyCoursesTitle')}
                    description={t('emptyCoursesDescription')}
                />
            }

            <div className="flex justify-center">
                <div className="w-full lg:w-3/5">
                    <PaginationBar pagination={courses.pagination} />
                </div>
            </div>

        </div>
    )
}

export default CoursesPage