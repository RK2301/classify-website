'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { StudentCourseKeys } from "@rkh-ms/classify-lib/enums"
import { revalidatePath } from "next/cache"

/**This server action made a request to withdrawal a student from a specific course */
export const withdrawalStudentAction = async (courseId: number, studentId: string) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        // first make request to withdrawal the student
        await axios(API.students_course.withdrawal, {
            method: 'PATCH',
            data: JSON.stringify({
                [StudentCourseKeys.COURSE_ID]: courseId,
                [StudentCourseKeys.STUDENT_ID]: studentId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // after success withdrawal, revalidate the path to students course page
        revalidatePath(`/app/courses/${courseId}/students`)
    })
}
