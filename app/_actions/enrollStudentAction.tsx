'use server'

import { API } from "@rkh-ms/classify-lib/api"
import { revalidatePath } from "next/cache"

import { StudentCourseKeys } from "@rkh-ms/classify-lib/enums"

import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"



/**This server action made a request to enroll a student to a specific course */
export const enrolStudentAction = async (courseId: number, studentId: string) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        // first make request to assign the teacher
        await axios(API.students_course.enroll, {
            method: 'POST',
            data: JSON.stringify({
                [StudentCourseKeys.COURSE_ID]: courseId,
                studentId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // after success unassign, revalidate the path to students course page
        revalidatePath(`/app/courses/${courseId}/students`)
    })
}
