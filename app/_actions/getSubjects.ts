'use server'

import { Subject } from "@rkh-ms/classify-lib/interfaces"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"

/**Server action to get all subjects */
export const GetSubjects = async () => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        const { data } = await axios('/api/subjects')
        return data as Subject[]
    })
}