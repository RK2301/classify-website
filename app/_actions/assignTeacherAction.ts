'use server'

import { API } from "@rkh-ms/classify-lib/api"
import { revalidatePath } from "next/cache"

import { TeacherCourseKeys } from "@rkh-ms/classify-lib/enums"

import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"



/**This server action made a request to assign a teacher from a course */
export const assignTeacherAction = async (courseId: number, teacherId: string) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        // first make request to assign the teacher
        await axios(API.teachers_course.assign, {
            method: 'POST',
            data: JSON.stringify({
                [TeacherCourseKeys.COURSE_ID]: courseId,
                teacher: teacherId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // after success unassign, revalidate the path to teachers course page
        revalidatePath(`/app/courses/${courseId}/teachers`)
    })
}
