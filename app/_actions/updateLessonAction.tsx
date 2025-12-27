'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { revalidatePath } from "next/cache"
import { LessonKeys } from "@rkh-ms/classify-lib/enums"

/**This action server make request to update a lesson 
 * 
 * */
export const updateLessonAction = async (courseId: number, lessonId: number, data: {
    /**new start time for the lesson */
    [LessonKeys.START_TIME]: string,
    /**new end time for the lesson */
    [LessonKeys.END_TIME]: string,
    /**date formatted as: YYYY-MM-DD */
    date: string
}) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        //  first make request to delete the lesson
        await axios(API.lessons.update, {
            method: 'PATCH',
            data: JSON.stringify({
                [LessonKeys.ID]: lessonId,
                ...data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //after success delete, revalidate the cache
        revalidatePath(`/app/courses/${courseId}/lessons`)
    })
}