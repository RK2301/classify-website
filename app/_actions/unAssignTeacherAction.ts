'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { TeacherCourseKeys } from "@rkh-ms/classify-lib/enums"
import { revalidatePath } from "next/cache"

/**This server action made a request to unassign a teacher from a specific course */
export const unAssignTeacherAction = async (courseId: number, teacherId: string) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        // first make request to unassign the teacher
        await axios(API.teachers_course.unassign, {
            method: 'PATCH',
            data: JSON.stringify({
                [TeacherCourseKeys.COURSE_ID]: courseId,
                [TeacherCourseKeys.TEACHER_ID]: teacherId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // after success unassign, revalidate the path to teachers course page
        revalidatePath(`/app/courses/${courseId}/teachers`)
    })
}
