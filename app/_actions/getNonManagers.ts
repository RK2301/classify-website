'use server'

import { UserAttributes } from "@rkh-ms/classify-lib"
import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"

/**This server cation to fetch all teachers that aren't manager or have been managers in the past */
export const getNonManagers = async () => {

    return handleServerAction(async () => {
        const axios = await getServerAxios()

        //fetch all teacehrs that aren't managers
        const { data } = await axios('/api/users/teachers/non-managers')
        const nonManagers: UserAttributes[] = data

        return nonManagers
    })

}