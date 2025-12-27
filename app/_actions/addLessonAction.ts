'use server'

import { revalidatePath } from "next/cache"

import { API } from "@rkh-ms/classify-lib/api"
import { LessonKeys } from "@rkh-ms/classify-lib/enums"

import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"


/**This server action make a request to add a new lesson for a specific course */
export const addLessonAction = async (courseId: number, data: {
    [LessonKeys.START_TIME]: string,
    [LessonKeys.END_TIME]: string,
    /**date formatted as: YYYY-MM-DD */
    date: string
}) => {

    const axios = await getServerAxios()

    //make API request to add new lesson
    return await handleServerAction(async () => {
        await axios(API.lessons.add, {
            method: 'POST',
            data: JSON.stringify({
                ...data,
                [LessonKeys.COURSE_ID]: courseId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //if add success then revalidate the lessons page cache
        revalidatePath(`/app/courses/${courseId}/lessons`)
    })

}