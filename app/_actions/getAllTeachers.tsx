'use server'

import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { TeacherQuery } from "@rkh-ms/classify-lib"

/**Server action to get all teachers */
export const GetAllTeachers = async () => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        const { data } = await axios('/api/users/teachers/allTeachers')
        return data as Exclude<TeacherQuery, 'Subjects'>[]
    })
}