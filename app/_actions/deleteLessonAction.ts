'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { revalidatePath } from "next/cache"

/**This action server make request to delete a lesson */
export const deleteLessonAction = async (courseId: number, lessonId: number) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        //  first make request to delete the lesson
        await axios(API.lessons.delete(lessonId), {
            method: 'DELETE'
        })

        //after success delete, revalidate the cache
        revalidatePath(`/app/courses/${courseId}/lessons`)
    })
}