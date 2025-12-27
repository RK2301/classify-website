'use server'

import { revalidatePath } from "next/cache"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"

/**This action make a request to update course title */
export const updateCourseTitleAction = async ({ courseId, title }: { courseId: number, title: string }) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios(`/api/courses/title/${courseId}`, {
            method: 'PATCH',
            data: JSON.stringify({ title }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // after success revalidate the path to course page, so it new title will be shown
        revalidatePath(`/app/courses/${courseId}`)

    })
}