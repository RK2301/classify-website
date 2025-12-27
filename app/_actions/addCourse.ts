'use server'

import { CourseFormFields } from "@/app/_types/formsFields"
import { API } from '@rkh-ms/classify-lib/api'
import { handleServerAction } from "../_utils/handleServerAction"
import getServerAxios from "../_utils/getServerAxios"

/**This server action is to make a API request to add a new course. */
export const addCourse = async (data: CourseFormFields) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {
        await axios(API.courses.add, {
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })
}