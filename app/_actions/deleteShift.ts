'use server'

import { revalidatePath } from "next/cache"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"

/**This action make a delete request to delete a specific shift */
export const deleteShiftAction = async (shiftId: string) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios(`/api/shifts/${shiftId}`, {
            method: 'DELETE'
        })

        //if shift deleted then revalidate the shifts page
        revalidatePath('/app/shifts')
    })
}