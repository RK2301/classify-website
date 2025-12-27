'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { LessonCalendar } from "../_types/queriesTypes"

/**based on given dates range, make API request to fetch all lessons in the range */
export const getAllLessons = async(start: Date, end: Date) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        const {data} = await axios(`${API.lessons.allLessons}/all/lessons?start=${start.toISOString()}&end=${end.toISOString()}`, {
            method: 'GET'
        })
        const lessons = data as LessonCalendar[]

        return lessons
    })
}