import { getTranslations } from "next-intl/server"

import { API } from "@rkh-ms/classify-lib/api"
import { Actions, Resources } from '@rkh-ms/classify-lib/accesscontrol'

import getServerAxios from "@/app/_utils/getServerAxios"
import { PaginationResponse, TeacherQuery } from "@rkh-ms/classify-lib"
import PaginationBar from "@/app/_components/PaginationBar"
import AssignNewTeacherList from "@/app/_components/courses/course_details/teachers/AssignNewTeacherList"
import { restrictedRouteServer } from "@/app/_components/access_control/restrictedRouteServer"
import { getSearchParams } from "@/app/_utils/getSearchParams"


export const metadata = {
    title: 'Assign Teacher'
}

type AssignNewTeacherProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
    params: Promise<Record<string, string>>
}


const AssignNewTeacher: React.FC<AssignNewTeacherProps> = async ({ searchParams, params }) => {

    //protect the route for manager only
    await restrictedRouteServer(Actions.readAny, Resources.TeacherCourse)


    const t = await getTranslations()
    const axios = await getServerAxios()

    const searchP = getSearchParams(await searchParams)
    const { data } = await axios(API.teachers_course.getTeachersToAssign(1) + `${searchP ? `?${searchP}` : ''}`)
    const teachers = data as PaginationResponse<Exclude<TeacherQuery, 'Subjects'>>

    const p = await params
    const courseId = Number(p.courseId)


    return (
        <div className="flex flex-col gap-5 lg:px-9 pt-5">
            <span className="font-medium text-lg">{t('assignTeacher')}</span>

            <AssignNewTeacherList
                teachers={teachers.rows}
                courseId={courseId}
            />

            {teachers.rows.length > 0 && <PaginationBar
                pagination={teachers.pagination}
                className="text-sm mt-3"
            />}

        </div>
    )
}

export default AssignNewTeacher