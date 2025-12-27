'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { revalidatePath } from "next/cache"
import { LessonKeys } from "@rkh-ms/classify-lib/enums"

/**This action server make request to cancel a lesson 
 * 
 * @param cancel if true then make request to cancel the lesson (default), if false then make request to un-cancel, if already cancelled
*/
export const cancelLessonAction = async (courseId: number, lessonId: number, cancel: boolean = true) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        //  first make request to delete the lesson
        await axios(API.lessons.update, {
            method: 'PATCH',
            data: JSON.stringify({
                [LessonKeys.ID]: lessonId,
                cancel
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //after success delete, revalidate the cache
        revalidatePath(`/app/courses/${courseId}/lessons`)
    })
}