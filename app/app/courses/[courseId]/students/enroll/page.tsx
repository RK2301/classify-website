import { getTranslations } from "next-intl/server"

import { API } from "@rkh-ms/classify-lib/api"
import { Actions, Resources } from '@rkh-ms/classify-lib/accesscontrol'
import { PaginationResponse, StudentQuery } from "@rkh-ms/classify-lib"

import getServerAxios from "@/app/_utils/getServerAxios"
import PaginationBar from "@/app/_components/PaginationBar"
import { restrictedRouteServer } from "@/app/_components/access_control/restrictedRouteServer"
import { getSearchParams } from "@/app/_utils/getSearchParams"
import EnrollStudents from "@/app/_components/courses/course_details/students/EnrollStudent"


export const metadata = {
    title: 'Enroll Student'
}

type EnrollStudentPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
    params: Promise<Record<string, string>>
}


const EnrollStudentPage: React.FC<EnrollStudentPageProps> = async ({ searchParams, params }) => {

    //protect the route for manager only
    await restrictedRouteServer(Actions.readAny, Resources.StudentCourse)


    const t = await getTranslations()
    const axios = await getServerAxios()

    const searchP = getSearchParams(await searchParams)
    const { data } = await axios(API.students_course.getStudentsToEnroll(1) + `${searchP ? `?${searchP}` : ''}`)
    const students = data as PaginationResponse<StudentQuery>

    const p = await params
    const courseId = Number(p.courseId)


    return (
        <div className="flex flex-col gap-5 lg:px-9 pt-5">
            <span className="font-medium text-lg">{t('enrollStudent')}</span>

            <EnrollStudents
                students={students.rows}
                courseId={courseId}
            />

            {students.rows.length > 0 &&
                <PaginationBar
                    pagination={students.pagination}
                    className="text-sm mt-3"
                />}

        </div>
    )
}

export default EnrollStudentPage