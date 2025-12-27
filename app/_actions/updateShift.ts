'use server'

import { revalidatePath } from "next/cache"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"


export const updateShift = async (shiftId: string, startTime: string, endTime: string) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios(`/api/shifts/${shiftId}`, {
            method: 'PUT',
            data: JSON.stringify({
                startTime,
                endTime
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //if success then revalidate the path of the shifts page
        revalidatePath('/app/shifts')
    })

}