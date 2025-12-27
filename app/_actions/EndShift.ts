'use server'

import { Location } from "@/app/_types/Location"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { revalidatePath } from "next/cache"


/**this function is about make a request to the server to end a shift
 * 
 * @param id shift id to asks server to end
 * @param endLocation location of the user when clicks end shift
 */
export const endShift = async (id: string, endLocation: Location) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {
        await axios('/api/shifts/end', {
            method: 'PUT',
            data: JSON.stringify({
                id,
                endLocation
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        revalidatePath('/app/shifts')
    })
}